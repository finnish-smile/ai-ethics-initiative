import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

async function renderPage(flag) {
  vi.resetModules()
  vi.stubEnv('VITE_SUBMISSIONS_OPEN', flag)
  const { default: BuildConstitution } = await import('./BuildConstitution.jsx')
  return renderToStaticMarkup(
    <MemoryRouter>
      <BuildConstitution />
    </MemoryRouter>
  )
}

afterEach(() => vi.unstubAllEnvs())

describe('BuildConstitution with submissions off', () => {
  // R.2: the flag-off page is frozen. Baseline: the page as of Oct 24 with the
  // approved rubric and the "Fill in your details." step.
  it('R.2: renders exactly as before', async () => {
    await expect(await renderPage('false')).toMatchFileSnapshot('./__snapshots__/BuildConstitution.flag-off.html')
  })

  it('R.1: the submit button is disabled and says submissions open soon', async () => {
    const html = await renderPage('false')
    expect(html).toMatch(/<button type="submit" class="btn btn--accent" disabled="">Submit my constitution/)
    expect(html).toContain('Submissions open soon.')
  })

  it('treats a missing flag as off', async () => {
    expect(await renderPage('')).toBe(await renderPage('false'))
  })
})

describe('BuildConstitution with submissions on', () => {
  it('the submit button is live and "Submissions open soon." is gone', async () => {
    const html = await renderPage('true')
    expect(html).not.toContain('Submissions open soon.')
    expect(html).toMatch(/<button type="submit" class="btn btn--accent">Submit my constitution/)
  })
})
