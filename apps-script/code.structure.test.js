// Structure checks on the Apps Script source. It runs in Google, not here,
// so these read the file instead of running it.
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const code = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8')
const doPost = code.slice(code.indexOf('function doPost'), code.indexOf('function startUpload'))

describe('Code.gs', () => {
  it('R.3: doPost refuses everything unless SUBMISSIONS_OPEN is true, before reading the request', () => {
    const check = doPost.indexOf("getProperty('SUBMISSIONS_OPEN')")
    expect(check).toBeGreaterThan(-1)
    expect(doPost).toMatch(/if \(open !== 'true'\) throw refuse\('closed'/)
    expect(check).toBeLessThan(doPost.indexOf('JSON.parse'))
  })

  it('4.4: has no doGet and no action other than start and finish', () => {
    expect(code).not.toMatch(/function doGet/)
    const actions = [...code.matchAll(/req\.action === '(\w+)'/g)].map((m) => m[1])
    expect(actions.sort()).toEqual(['finish', 'start'])
  })

  it('4.4: start returns only an upload URL and finish returns only ok', () => {
    const returns = [...code.matchAll(/return \{ ok: true([^}]*)\}/g)].map((m) => m[1].trim())
    expect(returns.sort()).toEqual(['', ', uploadUrl: res.getHeaders().Location'])
  })

  it('2.12: start checks the email and entry limit before opening an upload slot', () => {
    const start = code.slice(code.indexOf('function startUpload'), code.indexOf('function finishEntry'))
    expect(start.indexOf('checkEmail(req.email)')).toBeGreaterThan(-1)
    expect(start.indexOf('checkEmail(req.email)')).toBeLessThan(start.indexOf('UrlFetchApp.fetch'))
  })
})
