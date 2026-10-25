/**
 * Constitution submissions: receives entries from the website and stores them
 * in the club's Google Drive, logs each one in a Google Sheet, emails the club,
 * and sends the student a receipt.
 *
 * Runs as the club account, ai.ethics.byu@gmail.com (Deploy > Web app > Execute as: Me).
 * Setup steps are in apps-script/README.md.
 *
 * Flow: the site calls `start` once per file and gets a one-time Drive upload URL;
 * the browser sends the file there (into Incoming). When both files are in, the
 * site calls `finish`, which moves them to Submissions, adds the Sheet row, and
 * sends the emails. An upload that never reaches `finish` stays in Incoming and
 * is not an entry.
 */

// ---- Settings: fill these in from the club account ----
const INCOMING_FOLDER_ID = 'PASTE_INCOMING_FOLDER_ID'       // uploads land here first
const SUBMISSIONS_FOLDER_ID = 'PASTE_SUBMISSIONS_FOLDER_ID' // complete entries only
const SHEET_ID = 'PASTE_SHEET_ID'                           // Google Sheet that logs entries
const NOTIFY_EMAIL = 'ai.ethics.byu@gmail.com'              // where "new entry" emails go
const CONTACT_EMAIL = 'ai.ethics.byu@gmail.com'             // shown to students
const MAX_ENTRIES_PER_EMAIL = 2
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://finnish-smile.github.io',
]

const MAX_BYTES = { doc: 10 * 1024 * 1024, video: 300 * 1024 * 1024 }
const ALLOWED_TYPES = {
  doc: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/markdown',
  ],
  video: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'],
}
const BYU_EMAIL = /^[^\s@]+@byu\.edu$/i
const EMAIL_COLUMN = 3 // Sheet columns: Submitted | Name | Email | Major | Year | Constitution | Video | Reviewed

// Every refusal carries a code the site can act on: 'closed', 'limit', or 'invalid'.
function refuse(code, message) {
  const err = new Error(message)
  err.code = code
  return err
}

// The site posts JSON as text/plain (no CORS preflight). Two actions only:
// neither one returns entries or file links.
function doPost(e) {
  try {
    // Kill switch: Project Settings > Script properties > SUBMISSIONS_OPEN = true
    const open = PropertiesService.getScriptProperties().getProperty('SUBMISSIONS_OPEN')
    if (open !== 'true') throw refuse('closed', 'Submissions are closed.')

    const req = JSON.parse(e.postData.contents)
    if (req.action === 'start') return json(startUpload(req))
    if (req.action === 'finish') return json(finishEntry(req))
    throw refuse('invalid', 'Unknown action')
  } catch (err) {
    return json({ ok: false, code: err.code || 'error', error: String(err.message || err) })
  }
}

function startUpload(req) {
  const kind = req.kind // 'doc' or 'video'
  if (!MAX_BYTES[kind]) throw refuse('invalid', 'Unknown file kind')
  if (!ALLOWED_ORIGINS.includes(req.origin)) throw refuse('invalid', 'Origin not allowed')
  if (!ALLOWED_TYPES[kind].includes(req.mimeType)) throw refuse('invalid', 'File type not allowed')
  if (!(req.size > 0 && req.size <= MAX_BYTES[kind])) throw refuse('invalid', 'File too large')
  checkEmail(req.email) // before any upload, so a third entry sends nothing

  const safeName = String(req.name || 'file').replace(/[^\w.\- ]+/g, '_').slice(0, 120)
  const stamp = Utilities.formatDate(new Date(), 'America/Denver', 'yyyy-MM-dd HHmm')
  const res = UrlFetchApp.fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true',
    {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
        'X-Upload-Content-Type': req.mimeType,
        'X-Upload-Content-Length': String(req.size),
        // Lets the browser at this origin send the file to the upload slot.
        Origin: req.origin,
      },
      payload: JSON.stringify({
        name: stamp + ' ' + String(req.email).toLowerCase() + ' ' + safeName,
        parents: [INCOMING_FOLDER_ID],
      }),
      muteHttpExceptions: true,
    }
  )
  if (res.getResponseCode() !== 200) {
    throw new Error('Drive refused the upload: ' + res.getContentText().slice(0, 200))
  }
  return { ok: true, uploadUrl: res.getHeaders().Location }
}

function finishEntry(req) {
  const f = req.fields || {}
  const clean = (v) => String(v || '').trim().slice(0, 200)
  const email = clean(f.email).toLowerCase()

  const lock = LockService.getScriptLock()
  lock.waitLock(20000) // two finishes at once can't both slip under the limit
  try {
    checkEmail(email)
    const docFile = fileInIncoming(req.docId, 'doc')
    const videoFile = fileInIncoming(req.videoId, 'video')
    const submissions = DriveApp.getFolderById(SUBMISSIONS_FOLDER_ID)
    docFile.moveTo(submissions)
    videoFile.moveTo(submissions)

    SpreadsheetApp.openById(SHEET_ID).getSheets()[0].appendRow([
      new Date(),
      clean(f.name),
      email,
      clean(f.major),
      clean(f.year),
      docFile.getUrl(),
      videoFile.getUrl(),
      '', // Reviewed (the team fills this in)
    ])
    SpreadsheetApp.flush()

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New constitution entry: ' + clean(f.name),
      body: [
        'Name: ' + clean(f.name),
        'Email: ' + email,
        'Major: ' + clean(f.major),
        'Year: ' + clean(f.year),
        '',
        'Constitution: ' + docFile.getUrl(),
        'Video: ' + videoFile.getUrl(),
      ].join('\n'),
    })

    MailApp.sendEmail({
      to: email,
      replyTo: CONTACT_EMAIL,
      name: 'BYU AI & Ethics Initiative',
      subject: 'We received your AI constitution',
      body: [
        'Hi ' + clean(f.name) + ',',
        '',
        'Thanks, your constitution is in. Here is what we received:',
        '',
        '  Constitution: ' + clean(req.docName),
        '  Video: ' + clean(req.videoName),
        '',
        'Keep this email as your record. Need to change something? Reply to this email or write to ' +
          CONTACT_EMAIL + '.',
        '',
        'BYU AI & Ethics Initiative',
      ].join('\n'),
    })
  } finally {
    lock.releaseLock()
  }
  return { ok: true }
}

// BYU email, and fewer than MAX_ENTRIES_PER_EMAIL entries already in the Sheet.
function checkEmail(raw) {
  const email = String(raw || '').trim().toLowerCase()
  if (!BYU_EMAIL.test(email)) {
    throw refuse('invalid', 'Please use your BYU email address (ending in @byu.edu).')
  }
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0]
  const rows = sheet.getLastRow() - 1
  if (rows < 1) return
  const used = sheet
    .getRange(2, EMAIL_COLUMN, rows, 1)
    .getValues()
    .filter((r) => String(r[0]).trim().toLowerCase() === email).length
  if (used >= MAX_ENTRIES_PER_EMAIL) {
    throw refuse('limit', "You've already submitted twice. To make a change, reach out to " + CONTACT_EMAIL + '.')
  }
}

// Only accept a file that really landed in Incoming, of the right kind.
function fileInIncoming(id, kind) {
  const file = DriveApp.getFileById(String(id))
  if (!ALLOWED_TYPES[kind].includes(file.getMimeType())) throw refuse('invalid', 'Wrong file kind')
  const parents = file.getParents()
  while (parents.hasNext()) if (parents.next().getId() === INCOMING_FOLDER_ID) return file
  throw refuse('invalid', 'File is not in the Incoming folder')
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

// Run once from the editor to grant permissions and check the settings.
function testSetup() {
  Logger.log('Incoming: ' + DriveApp.getFolderById(INCOMING_FOLDER_ID).getName())
  Logger.log('Submissions: ' + DriveApp.getFolderById(SUBMISSIONS_FOLDER_ID).getName())
  Logger.log('Sheet: ' + SpreadsheetApp.openById(SHEET_ID).getName())
  Logger.log('SUBMISSIONS_OPEN: ' + PropertiesService.getScriptProperties().getProperty('SUBMISSIONS_OPEN'))
  Logger.log('Email quota left today: ' + MailApp.getRemainingDailyQuota())
}
