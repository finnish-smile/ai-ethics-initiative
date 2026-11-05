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

  it('4.4: has no doGet and no action other than start, finish and linkedin', () => {
    expect(code).not.toMatch(/function doGet/)
    const actions = [...code.matchAll(/req\.action === '(\w+)'/g)].map((m) => m[1])
    expect(actions.sort()).toEqual(['finish', 'linkedin', 'start'])
  })

  it('4.4: start returns only an upload URL; finish and linkedin return only ok', () => {
    const returns = [...code.matchAll(/return \{ ok: true([^}]*)\}/g)].map((m) => m[1].trim())
    expect(returns.sort()).toEqual(['', '', ', uploadUrl: res.getHeaders().Location'])
  })

  it('2.12: start checks the email and entry limit before opening an upload slot', () => {
    const start = code.slice(code.indexOf('function startUpload'), code.indexOf('function finishEntry'))
    expect(start.indexOf('checkEmail(req.email)')).toBeGreaterThan(-1)
    expect(start.indexOf('checkEmail(req.email)')).toBeLessThan(start.indexOf('UrlFetchApp.fetch'))
  })
})

describe('Code.gs LinkedIn links', () => {
  const add = code.slice(code.indexOf('function addLinkedIn'), code.indexOf('function checkEmail'))
  it('checks the email and link before touching the Sheet', () => {
    expect(add.indexOf('BYU_EMAIL.test(email)')).toBeLessThan(add.indexOf('SpreadsheetApp'))
    expect(add.indexOf('cleanLinkedIn(req.url)')).toBeLessThan(add.indexOf('SpreadsheetApp'))
  })
  it('writes only the LinkedIn column and emails the student', () => {
    expect(add).toMatch(/getRange\(row, LINKEDIN_COLUMN\)\.setValue\(url\)/)
    expect(add).toMatch(/to: email/)
  })
})
