// Structure checks: one path for submissions.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
function sourceFiles(dir = SRC) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return name === '__snapshots__' ? [] : sourceFiles(p)
    return /\.(jsx?|tsx?)$/.test(name) && !/\.test\./.test(name) ? [p] : []
  })
}
const filesContaining = (needle) =>
  sourceFiles()
    .filter((p) => readFileSync(p, 'utf8').includes(needle))
    .map((p) => relative(SRC, p).replaceAll('\', '/'))

describe('submissions structure', () => {
  it('7.2: only src/lib/submissions.js uses the script URL', () => {
    expect(filesContaining('VITE_SUBMIT_URL')).toEqual(['lib/submissions.js'])
    expect(filesContaining('script.google.com')).toEqual([])
  })
})
