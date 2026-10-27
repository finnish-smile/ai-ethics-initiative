import { describe, expect, it } from 'vitest'
import { chunkRanges, mimeFor, submitEntry, SubmitError } from './submissions.js'

const MB = 1024 * 1024

describe('chunkRanges (2.9)', () => {
  it('splits into 8 MB pieces with a shorter last piece, covering every byte once', () => {
    const size = 186.4 * MB
    const r = chunkRanges(size)
    expect(r[0]).toEqual({ start: 0, end: 8 * MB })
    expect(r.every((x, i) => i === 0 || x.start === r[i - 1].end)).toBe(true)
    expect(r.at(-1).end).toBe(size)
    expect(r.at(-1).end - r.at(-1).start).toBeLessThan(8 * MB)
    expect(r.slice(0, -1).every((x) => x.end - x.start === 8 * MB)).toBe(true)
  })
  it('handles a file smaller than one piece, and an exact multiple', () => {
    expect(chunkRanges(1000)).toEqual([{ start: 0, end: 1000 }])
    expect(chunkRanges(16 * MB)).toHaveLength(2)
    expect(chunkRanges(0)).toEqual([])
  })
})

describe('mimeFor', () => {
  it('maps by extension, ignoring case', () => {
    expect(mimeFor('A.MOV')).toBe('video/quicktime')
    expect(mimeFor('notes.md')).toBe('text/markdown')
    expect(mimeFor('x.m4v')).toBe('video/x-m4v')
  })
})

// A fake script + Drive that records every call.
function fakeService({ startError, finishError, failPutAt } = {}) {
  const calls = []
  let n = 0
  const fetchImpl = async (url, init) => {
    if (url === 'SCRIPT') {
      const body = JSON.parse(init.body)
      calls.push(body.action)
      const err = body.action === 'start' ? startError : finishError
      if (err) return { json: async () => ({ ok: false, ...err }) }
      if (body.action === 'start') return { json: async () => ({ ok: true, uploadUrl: `DRIVE-${body.kind}` }) }
      return { json: async () => ({ ok: true }) }
    }
    n += 1
    calls.push(`put ${url} ${init.headers['Content-Range']}`)
    if (failPutAt === n) throw new TypeError('network down')
    const [, , end, total] = init.headers['Content-Range'].match(/bytes (\d+)-(\d+)\/(\d+)/)
    if (Number(end) + 1 < Number(total)) return { status: 308, ok: false }
    return { status: 200, ok: true, json: async () => ({ id: `id-${url}` }) }
  }
  return { calls, deps: { url: 'SCRIPT', fetchImpl, origin: 'http://localhost', chunk: 4 } }
}
const file = (name, size) => ({ name, size, slice: (a, b) => `bytes ${a}-${b}` })
const entry = (extra = {}) => ({
  fields: { name: 'Hannah', email: ' H@byu.edu ', major: 'Marketing', year: 'Senior' },
  doc: file('c.pdf', 3),
  video: file('v.mov', 10),
  ...extra,
})

describe('submitEntry', () => {
  it('starts, uploads and finishes in order, with progress over both files', async () => {
    const { calls, deps } = fakeService()
    const progress = []
    await submitEntry({ ...entry(), onProgress: (s, t) => progress.push([s, t]) }, deps)
    expect(calls).toEqual([
      'start',
      'put DRIVE-doc bytes 0-2/3',
      'start',
      'put DRIVE-video bytes 0-3/10',
      'put DRIVE-video bytes 4-7/10',
      'put DRIVE-video bytes 8-9/10',
      'finish',
    ])
    expect(progress.at(-1)).toEqual([13, 13])
    expect(progress.map((p) => p[0])).toEqual([0, 3, 7, 11, 13])
  })

  it('2.12: a third entry is refused before any file uploads', async () => {
    const { calls, deps } = fakeService({ startError: { code: 'limit', error: 'twice' } })
    const err = await submitEntry(entry(), deps).catch((e) => e)
    expect(err).toBeInstanceOf(SubmitError)
    expect(err.code).toBe('limit')
    expect(calls).toEqual(['start'])
  })

  it('5.6/5.7: an upload that stops partway never calls finish', async () => {
    const { calls, deps } = fakeService({ failPutAt: 3 })
    const err = await submitEntry(entry(), deps).catch((e) => e)
    expect(err.code).toBe('error')
    expect(calls).not.toContain('finish')
  })

  it('sends the trimmed email to the script', async () => {
    const bodies = []
    const { deps } = fakeService()
    const spy = async (url, init) => {
      if (url === 'SCRIPT') bodies.push(JSON.parse(init.body))
      return deps.fetchImpl(url, init)
    }
    await submitEntry(entry(), { ...deps, fetchImpl: spy })
    expect(bodies.every((b) => (b.email ?? b.fields.email) === 'H@byu.edu')).toBe(true)
  })
})
