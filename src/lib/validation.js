// Checks run in the browser before anything is uploaded. The Apps Script
// repeats the email and size checks, so these are for the student's benefit,
// not the lock.

export const DOC_MAX_MB = 10
export const DOC_EXT = ['pdf', 'docx', 'doc', 'txt', 'md']
export const DOC_ACCEPT = '.pdf,.docx,.doc,.txt,.md'

export const VIDEO_MAX_MB = 300
export const VIDEO_EXT = ['mp4', 'mov', 'webm', 'm4v']
export const VIDEO_ACCEPT = 'video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.m4v'
export const VIDEO_MIN_S = 30
export const VIDEO_MAX_S = 120

export const BYU_EMAIL_MESSAGE = 'Please use your BYU email address (ending in @byu.edu).'

// Top-level atom names a valid MP4/MOV/M4V file can start with.
const ISO_ATOMS = ['ftyp', 'moov', 'mdat', 'wide', 'free', 'skip', 'pnot']

export const ext = (name) => name.split('.').pop().toLowerCase()

export function isByuEmail(email) {
  return /^[^\s@]+@byu\.edu$/i.test(String(email || '').trim())
}

export function formatSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// 108 -> "1:48"
export function formatDuration(seconds) {
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export function checkDoc(file) {
  if (!DOC_EXT.includes(ext(file.name))) return 'Please upload a PDF, Word document, or plain-text file.'
  if (file.size > DOC_MAX_MB * 1024 * 1024) return `That file is larger than ${DOC_MAX_MB} MB.`
  if (file.size === 0) return 'That file appears to be empty.'
  return null
}

// Reads the video's duration from its metadata so length is checked
// before upload, not after. Resolves null if the browser can't read it.
export function readDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const v = document.createElement('video')
    v.preload = 'metadata'
    v.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve(v.duration)
    }
    v.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    v.src = url
  })
}

// The file's first bytes (its "magic number"), so a renamed non-video is rejected.
async function looksLikeVideo(file) {
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  if (ext(file.name) === 'webm') return head[0] === 0x1a && head[1] === 0x45 && head[2] === 0xdf && head[3] === 0xa3
  return ISO_ATOMS.includes(String.fromCharCode(head[4], head[5], head[6], head[7]))
}

// Returns { error, seconds }. `seconds` is shown in the file box.
export async function checkVideo(file, { getDuration = readDuration } = {}) {
  if (!VIDEO_EXT.includes(ext(file.name))) return { error: 'Please upload an MP4, MOV, or WebM video.' }
  if (file.size === 0) return { error: 'That file appears to be empty.' }
  if (file.size > VIDEO_MAX_MB * 1024 * 1024) return { error: `That video is larger than ${VIDEO_MAX_MB} MB.` }
  if (!(await looksLikeVideo(file))) {
    return { error: 'That file is not a valid MP4, MOV, or WebM video. Please export it in one of those formats.' }
  }
  const seconds = await getDuration(file)
  // Browser can't read the length (or reports Infinity, as Chrome can for WebM): checked on review instead.
  if (seconds == null || !Number.isFinite(seconds)) return { error: null, seconds: null }
  if (seconds < VIDEO_MIN_S || seconds > VIDEO_MAX_S) {
    return {
      error: `Your video is ${Math.round(seconds)} seconds. It needs to be between ${VIDEO_MIN_S} and ${VIDEO_MAX_S} seconds.`,
    }
  }
  return { error: null, seconds }
}
