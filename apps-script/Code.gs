/**
 * Constitution submissions: receives entries from the website and stores them
 * in the club's Google Drive, logs each one in a Google Sheet, and emails the club.
 *
 * Runs as the club account (Deploy > Web app > Execute as: Me).
 * Setup steps are in apps-script/README.md.
 */

// ---- Settings: fill these in from the club account ----
const FOLDER_ID = 'PASTE_SUBMISSIONS_FOLDER_ID'   // Drive folder where files go
const SHEET_ID = 'PASTE_SHEET_ID'                 // Google Sheet that logs entries
const NOTIFY_EMAIL = 'PASTE_CLUB_EMAIL'           // where "new entry" emails go
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

// The site posts JSON as text/plain (no CORS preflight). Two actions:
//   start  -> open a Drive upload slot for one file; the browser sends the file there
//   finish -> both files are in; log the entry and email the club
function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents)
    if (req.action === 'start') return json(startUpload(req))
    if (req.action === 'finish') return json(finishEntry(req))
    return json({ ok: false, error: 'Unknown action' })
  } catch (err) {
    return json({ ok: false, error: String(err && err.message ? err.message : err) })
  }
}

function startUpload(req) {
  const kind = req.kind // 'doc' or 'video'
  if (!MAX_BYTES[kind]) throw new Error('Unknown file kind')
  if (!ALLOWED_ORIGINS.includes(req.origin)) throw new Error('Origin not allowed')
  if (!ALLOWED_TYPES[kind].includes(req.mimeType)) throw new Error('File type not allowed')
  if (!(req.size > 0 && req.size <= MAX_BYTES[kind])) throw new Error('File too large')

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
      payload: JSON.stringify({ name: stamp + ' ' + safeName, parents: [FOLDER_ID] }),
      muteHttpExceptions: true,
    }
  )
  if (res.getResponseCode() !== 200) {
    throw new Error('Drive refused the upload: ' + res.getContentText().slice(0, 200))
  }
  return { ok: true, uploadUrl: res.getHeaders().Location }
}

function finishEntry(req) {
  const docFile = fileInFolder(req.docId)
  const videoFile = fileInFolder(req.videoId)
  const f = req.fields || {}
  const clean = (v) => String(v || '').slice(0, 200)

  SpreadsheetApp.openById(SHEET_ID).getSheets()[0].appendRow([
    new Date(),
    clean(f.name),
    clean(f.email),
    clean(f.major),
    clean(f.year),
    docFile.getUrl(),
    videoFile.getUrl(),
    '', // Reviewed (the team fills this in)
  ])

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New constitution entry: ' + clean(f.name),
    body: [
      'Name: ' + clean(f.name),
      'Email: ' + clean(f.email),
      'Major: ' + clean(f.major),
      'Year: ' + clean(f.year),
      '',
      'Constitution: ' + docFile.getUrl(),
      'Video: ' + videoFile.getUrl(),
    ].join('\n'),
  })
  return { ok: true }
}

// Only accept files that really landed in the submissions folder.
function fileInFolder(id) {
  const file = DriveApp.getFileById(String(id))
  const parents = file.getParents()
  while (parents.hasNext()) if (parents.next().getId() === FOLDER_ID) return file
  throw new Error('File is not in the submissions folder')
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

// Run once from the editor to grant permissions and check the settings.
function testSetup() {
  Logger.log('Folder: ' + DriveApp.getFolderById(FOLDER_ID).getName())
  Logger.log('Sheet: ' + SpreadsheetApp.openById(SHEET_ID).getName())
  Logger.log('Email quota left today: ' + MailApp.getRemainingDailyQuota())
}
