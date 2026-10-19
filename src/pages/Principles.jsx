import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { SiteFooter } from '../components/Layout.jsx'

// The Principles page embeds the team's "Stewardship of AI" outline
// document as-is (its own cream/navy-blue look, Newsreader + Hanken
// Grotesk, and all of its interactions) rather than rebuilding it in the
// site's BYU branding — see public/stewardship-outline/. It's a static
// export (Outline.dc.html + support.js + assets), so it's served
// unmodified in an iframe below the site's fixed nav bar; everything
// inside — scrolling, hover states, the principle-to-principle nav — is
// the document's own and isolated from the rest of the app.
//
// Because all the scrolling happens inside the iframe, the site footer is
// rendered *inside* it too (Layout skips its own footer on this route):
// a footer outside the frame would sit pinned under it while the outline
// scrolled. The footer is the real <SiteFooter /> rendered through a
// portal, so its links still drive this app's router, and only the
// site's footer styles are copied into the frame so the outline's own
// look is untouched.
const NAV_HEIGHT = 79

// Pull the footer's rules (plus the :root design tokens and .wrap it
// relies on) out of the site's own stylesheets, so the frame always
// matches whatever the footer CSS currently says.
function collectFooterCss() {
  const keep = (sel) =>
    sel && sel.split(',').some((s) => {
      const t = s.trim()
      return t === ':root' || t === '.wrap' || /(^|[\s>+~])\.foot(\b|__)/.test(t)
    })
  const out = []
  for (const sheet of Array.from(document.styleSheets)) {
    let rules
    try {
      rules = sheet.cssRules
    } catch {
      continue // cross-origin sheet (e.g. Google Fonts)
    }
    for (const rule of Array.from(rules)) {
      if (rule.selectorText !== undefined) {
        if (keep(rule.selectorText)) out.push(rule.cssText)
      } else if (rule.media && rule.cssRules) {
        const inner = Array.from(rule.cssRules)
          .filter((r) => keep(r.selectorText))
          .map((r) => r.cssText)
        if (inner.length) out.push(`@media ${rule.media.mediaText} { ${inner.join(' ')} }`)
      }
    }
  }
  return out.join('\n')
}

// Base element styles the footer inherits from the site's body/reset
// (isaac-site.css), scoped to the footer so nothing leaks into the outline.
// :where() keeps these at plain element-selector strength, as they are on
// the site, so the footer's own .foot__* rules still win over them.
const FRAME_CSS = `
  #dc-root, #dc-root > .sc-host { height: auto !important; }
  .site-foot-host { position: relative; z-index: 2; background: var(--paper);
    color: var(--ink); font-family: var(--font-body); font-size: 17px; line-height: 1.6;
    -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  .site-foot-host, :where(.site-foot-host) * { box-sizing: border-box; }
  :where(.site-foot-host) a { color: var(--accent-ink); text-decoration: none; }
  :where(.site-foot-host) a:hover { text-decoration: underline; text-underline-offset: 3px; }
  :where(.site-foot-host) h4 { font-family: var(--font-display); line-height: 1.08;
    letter-spacing: -0.01em; margin: 0; font-weight: 600; text-wrap: balance; }
  :where(.site-foot-host) p { text-wrap: pretty; }
`

export default function Principles() {
  const [footerHost, setFooterHost] = useState(null)

  const onFrameLoad = useCallback((e) => {
    const doc = e.currentTarget.contentDocument
    if (!doc || !doc.body) return
    const style = doc.createElement('style')
    style.textContent = collectFooterCss() + '\n' + FRAME_CSS
    doc.head.appendChild(style)
    const host = doc.createElement('div')
    host.className = 'site-foot-host'
    doc.body.appendChild(host)
    setFooterHost(host)
  }, [])

  return (
    <div style={{ paddingTop: NAV_HEIGHT }}>
      <iframe
        title="Stewardship of AI — Principles"
        src={`${import.meta.env.BASE_URL}stewardship-outline/Outline.dc.html`}
        onLoad={onFrameLoad}
        style={{
          display: 'block',
          width: '100%',
          height: `calc(100vh - ${NAV_HEIGHT}px)`,
          border: 0,
        }}
      />
      {footerHost && createPortal(<SiteFooter />, footerHost)}
    </div>
  )
}
