import { describe, expect, it } from 'vitest'
import { checkDoc, checkVideo, formatDuration, isByuEmail } from './validation.js'

// A File-like object: name, size, and slice() for the first-bytes check.
function fakeFile(name, size, headBytes = []) {
  const head = new Uint8Array(12)
  head.set(headBytes)
  return {
    name,
    size,
    slice: () => ({ arrayBuffer: async () => head.buffer }),
  }
}
const MB = 1024 * 1024
const MP4_HEAD = [0, 0, 0, 0x20, ...'ftyp'.split('').map((c) => c.charCodeAt(0))]
const WEBM_HEAD = [0x1a, 0x45, 0xdf, 0xa3]
const seconds = (n) => ({ getDuration: async () => n })

describe('isByuEmail (1.3)', () => {
  it('accepts BYU addresses in any case', () => {
    expect(isByuEmail('x@byu.edu')).toBe(true)
    expect(isByuEmail('X@BYU.EDU')).toBe(true)
  })
  it('rejects other domains and look-alikes', () => {
    expect(isByuEmail('x@gmail.com')).toBe(false)
    expect(isByuEmail('x@byu.edu.com')).toBe(false)
    expect(isByuEmail('x@notbyu.edu')).toBe(false)
    expect(isByuEmail('')).toBe(false)
  })
})

describe('checkDoc (2.4)', () => {
  it('accepts PDF, DOC, DOCX, TXT and MD up to 10 MB', () => {
    for (const n of ['a.pdf', 'a.doc', 'a.docx', 'a.txt', 'a.md', 'A.PDF']) {
      expect(checkDoc(fakeFile(n, 1000))).toBeNull()
    }
    expect(checkDoc(fakeFile('a.pdf', 10 * MB))).toBeNull()
  })
  it('rejects other types', () => {
    expect(checkDoc(fakeFile('a.zip', 1000))).toMatch(/PDF, Word document, or plain-text/)
    expect(checkDoc(fakeFile('a.pages', 1000))).not.toBeNull()
  })
  it('rejects empty files', () => {
    expect(checkDoc(fakeFile('a.pdf', 0))).toBe('That file appears to be empty.')
  })
  it('rejects files over 10 MB', () => {
    expect(checkDoc(fakeFile('a.pdf', 10 * MB + 1))).toBe('That file is larger than 10 MB.')
  })
})

describe('checkVideo (2.5)', () => {
  it('accepts MP4, MOV, WebM and M4V between 30 and 120 seconds', async () => {
    for (const n of ['v.mp4', 'v.mov', 'v.m4v']) {
      expect((await checkVideo(fakeFile(n, 50 * MB, MP4_HEAD), seconds(60))).error).toBeNull()
    }
    expect((await checkVideo(fakeFile('v.webm', 50 * MB, WEBM_HEAD), seconds(60))).error).toBeNull()
    expect((await checkVideo(fakeFile('v.mp4', MB, MP4_HEAD), seconds(30))).error).toBeNull()
    expect((await checkVideo(fakeFile('v.mp4', MB, MP4_HEAD), seconds(120))).error).toBeNull()
  })
  it('returns the length so the file box can show it', async () => {
    expect((await checkVideo(fakeFile('v.mp4', MB, MP4_HEAD), seconds(108))).seconds).toBe(108)
    expect(formatDuration(108)).toBe('1:48')
  })
  it('rejects other lengths with "Your video is N seconds…"', async () => {
    expect((await checkVideo(fakeFile('v.mp4', MB, MP4_HEAD), seconds(148))).error).toBe(
      'Your video is 148 seconds. It needs to be between 30 and 120 seconds.'
    )
    expect((await checkVideo(fakeFile('v.mp4', MB, MP4_HEAD), seconds(12))).error).toMatch(/^Your video is 12 seconds/)
  })
  it('rejects other types, empty files and files over 300 MB', async () => {
    expect((await checkVideo(fakeFile('v.avi', MB, MP4_HEAD), seconds(60))).error).not.toBeNull()
    expect((await checkVideo(fakeFile('v.mp4', 0, MP4_HEAD), seconds(60))).error).toBe('That file appears to be empty.')
    expect((await checkVideo(fakeFile('v.mp4', 300 * MB + 1, MP4_HEAD), seconds(60))).error).toBe(
      'That video is larger than 300 MB.'
    )
  })
})

describe('checkVideo first-bytes check (2.8)', () => {
  it('rejects a renamed non-video file', async () => {
    const zipAsMp4 = fakeFile('v.mp4', MB, [0x50, 0x4b, 0x03, 0x04])
    expect((await checkVideo(zipAsMp4, seconds(60))).error).toMatch(/not a valid MP4, MOV, or WebM/)
    const mp4AsWebm = fakeFile('v.webm', MB, MP4_HEAD)
    expect((await checkVideo(mp4AsWebm, seconds(60))).error).toMatch(/not a valid/)
  })
})
