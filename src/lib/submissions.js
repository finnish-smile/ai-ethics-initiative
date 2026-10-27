// The only place the site talks to the submissions Apps Script (see apps-script/).
//
// For each file: ask the script for a one-time Drive upload URL ("start"),
// then send the file there in 8 MB pieces. When both files are in, "finish"
// logs the entry, moves the files to Submissions, and sends the emails.

export const SUBMIT_URL = import.meta.env.VITE_SUBMIT_URL || ''
export const CONTACT_EMAIL = 'ai.ethics.byu@gmail.com'
export const CHUNK_BYTES = 8 * 1024 * 1024 // Drive needs a multiple of 256 KB

// code: 'limit' (third entry), 'closed', 'invalid', or 'error'.
export class SubmitError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}

const MIME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  txt: 'text/plain',
  md: 'text/markdown',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  m4v: 'video/x-m4v',
}

// From the extension, not file.type, which browsers fill in inconsistently.
export function mimeFor(name) {
  return MIME[name.split('.').pop().toLowerCase()] || 'application/octet-stream'
}

// Byte ranges [start, end) covering the whole file once, in order.
export function chunkRanges(size, chunk = CHUNK_BYTES) {
  const ranges = []
  for (let start = 0; start < size; start += chunk) ranges.push({ start, end: Math.min(start + chunk, size) })
  return ranges
}

export async function callScript(body, { url = SUBMIT_URL, fetchImpl = fetch } = {}) {
  if (!url) throw new SubmitError('error', 'VITE_SUBMIT_URL is not set')
  let data
  try {
    // text/plain (the default for a string body) avoids a CORS preflight, which Apps Script can't answer.
    const res = await fetchImpl(url, { method: 'POST', body: JSON.stringify(body) })
    data = await res.json()
  } catch (err) {
    throw new SubmitError('error', `Could not reach the submissions service: ${err.message}`)
  }
  if (!data.ok) throw new SubmitError(data.code || 'error', data.error || 'Submission refused')
  return data
}

// Sends one file; calls onBytes(bytesSentSoFar) after each piece. Returns the Drive file id.
export async function uploadFile(file, kind, email, onBytes = () => {}, deps = {}) {
  const fetchImpl = deps.fetchImpl || fetch
  const origin = deps.origin || window.location.origin
  const { uploadUrl } = await callScript(
    { action: 'start', kind, name: file.name, mimeType: mimeFor(file.name), size: file.size, origin, email },
    deps
  )
  for (const { start, end } of chunkRanges(file.size, deps.chunk)) {
    let res
    try {
      res = await fetchImpl(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Range': `bytes ${start}-${end - 1}/${file.size}` },
        body: file.slice(start, end),
      })
    } catch (err) {
      throw new SubmitError('error', `Upload interrupted: ${err.message}`)
    }
    onBytes(end)
    if (end === file.size) {
      if (!res.ok) throw new SubmitError('error', `Upload failed (${res.status})`)
      return (await res.json()).id
    }
    if (res.status !== 308) throw new SubmitError('error', `Upload failed (${res.status})`)
  }
  throw new SubmitError('error', 'Empty file')
}

// Sends a whole entry. onProgress(sentBytes, totalBytes) covers both files.
// The entry limit is checked by the script when the first file starts, so a
// third entry is refused before anything uploads.
export async function submitEntry({ fields, doc, video, onProgress = () => {} }, deps = {}) {
  const total = doc.size + video.size
  const email = fields.email.trim()
  onProgress(0, total)
  const docId = await uploadFile(doc, 'doc', email, (n) => onProgress(n, total), deps)
  const videoId = await uploadFile(video, 'video', email, (n) => onProgress(doc.size + n, total), deps)
  await callScript(
    { action: 'finish', docId, videoId, docName: doc.name, videoName: video.name, fields: { ...fields, email } },
    deps
  )
  return { receivedAt: new Date() }
}
