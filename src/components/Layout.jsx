import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ScrollLogo from './ScrollLogo.jsx'
import useRevealOnScroll from '../hooks/useRevealOnScroll.js'
import '../reveal.css'

// The site's main pillars. Principles comes right after Home — it's the
// intellectual center of the initiative, not one option among equals.
// Kickstart keeps its existing route but surfaces under the "Learn" label;
// "Calendar" is relabeled "Events" to match the homepage. Build your
// constitution is an event, not a pillar, so it's reached from the
// homepage, the Events page, and the footer rather than the main menu.
const NAV = [
  { to: '/', label: 'Home' },
  { to: '/principles', label: 'Principles' },
  { to: '/kickstart', label: 'Learn' },
  { to: '/get-involved', label: 'Events' },
  { to: '/news', label: 'News' },
]

// The site footer. Exported so the Principles page can render this same
// footer inside its embedded outline (see pages/Principles.jsx): that page
// scrolls inside an iframe, so a footer outside it would sit pinned under
// the frame instead of scrolling in at the end of the content.
export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__cols">
          <div className="foot__contact">
            <h4 className="foot__h">Contact</h4>
            <p>
              Email: <a href="mailto:ai-ethics@byu.edu">ai-ethics@byu.edu</a>
            </p>
            <p>Office hours: Mon&ndash;Fri, 8&ndash;5</p>
          </div>
          <div>
            <h4 className="foot__h">Explore</h4>
            <ul>
              <li>
                <Link to="/constitution">Build your constitution</Link>
              </li>
              <li>
                <Link to="/principles">Principles of Ethical AI Use</Link>
              </li>
              <li>
                <Link to="/get-involved">Events Calendar</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="foot__h">Resources</h4>
            <ul>
              <li>
                <Link to="/kickstart">Learn</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="foot__h">Connect</h4>
            <ul>
              <li>
                <Link to="/news#newsletter">Join the mailing list</Link>
              </li>
              <li>
                <Link to="/get-involved">Upcoming events</Link>
              </li>
              <li>
                <Link to="/kickstart#share-idea">Suggest a use-case</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot__band">
        <div className="foot__wordmark">BYU Marriott AI &amp; Ethics Initiative</div>
      </div>
    </footer>
  )
}

// Header geometry (mirrored in isaac-site.css, --nav-*). The header picks
// one of three layouts by measuring what fits (see the measuring effect):
//   wide   — full name + links on one 79px row (the name still telescopes)
//   mid    — only the short name fits beside the links: at the top of the
//            page the links sit on their own line under the full name
//            (adding NAV_EXTRA), then merge into one row on scroll
//   narrow — short name + menu button
const NAV_HEIGHT = 79
const NAV_EXTRA = 40
// Minimum space kept between the name and the first link.
const NAV_GAP = 24
// Scroll distance over which the name telescopes / the header collapses.
const COLLAPSE_PX = 100

function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}
function ramp(p, start, end) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const location = useLocation()
  const [mode, setMode] = useState(() => (window.innerWidth < 860 ? 'narrow' : 'mid'))
  const modeRef = useRef(mode)
  modeRef.current = mode
  const wrapRef = useRef(null)
  const fullNameRef = useRef(null)
  const shortNameRef = useRef(null)
  const measureLinksRef = useRef(null)
  // Principles renders the footer inside its own scrolling frame instead.
  // Its content scrolls inside an iframe, so the window never scrolls there
  // and the header would never collapse; it's shown collapsed on that page.
  const onPrinciples = location.pathname.replace(/\/+$/, '') === '/principles'

  // Header progress for the current scroll position: 0 = top of the page
  // (full name), 1 = collapsed (short name). Narrow and Principles are
  // always collapsed.
  const progressNow = () =>
    modeRef.current === 'narrow' || onPrinciples ? 1 : Math.max(0, Math.min(1, window.scrollY / COLLAPSE_PX))

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollProgress(progressNow())
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, onPrinciples])

  // Switching layout (window resized across a breakpoint): recompute the
  // name's state, and close the menu if the button is no longer shown.
  useEffect(() => {
    setScrollProgress(progressNow())
    if (mode !== 'narrow') setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  // Push the header's state into CSS custom properties (isaac-site.css).
  // In mid, the link row slides right first (qx), then rises into the
  // name's line (qy), so it never crosses the name while that telescopes;
  // in wide and narrow the row never moves. --nav-cur is the header's live
  // height (blur strip, sticky bars); --nav-h-open is its height at the
  // top of the page (page-top clearance).
  useLayoutEffect(() => {
    const mid = mode === 'mid'
    const qx = mid ? ease(ramp(scrollProgress, 0, 0.6)) : 1
    const qy = mid ? ease(ramp(scrollProgress, 0.4, 1)) : 1
    const root = document.documentElement.style
    root.setProperty('--nav-qx', String(qx))
    root.setProperty('--nav-qy', String(qy))
    root.setProperty('--nav-cur', `${NAV_HEIGHT + NAV_EXTRA * (1 - qy)}px`)
    root.setProperty('--nav-h-open', `${mid ? NAV_HEIGHT + NAV_EXTRA : NAV_HEIGHT}px`)
  }, [scrollProgress, mode])

  // Pick the layout by measuring hidden copies of the full name, the short
  // name and the link row (with the real fonts) against the header's inner
  // width, and set how far right the link row sits. Re-measured on resize
  // and once the webfonts have loaded.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current
      const linksEl = measureLinksRef.current
      if (!wrap || !linksEl || !fullNameRef.current || !shortNameRef.current) return
      const cs = getComputedStyle(wrap)
      const inner = wrap.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const links = linksEl.offsetWidth
      const full = fullNameRef.current.offsetWidth
      const short = shortNameRef.current.offsetWidth
      document.documentElement.style.setProperty('--links-shift', `${Math.max(0, inner - links)}px`)
      setMode(full + NAV_GAP + links <= inner ? 'wide' : short + NAV_GAP + links <= inner ? 'mid' : 'narrow')
    }
    measure()
    const ro = new ResizeObserver(measure)
    ;[wrapRef, fullNameRef, shortNameRef, measureLinksRef].forEach((r) => r.current && ro.observe(r.current))
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  // Close the small-screen menu with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Links to a section of a page (e.g. /news#newsletter, /kickstart#share-idea):
  // once the page has rendered and the scroll-to-top above has run, jump to
  // the element with that id. Keyed on location.key too, so clicking the same
  // section link again (or one on the page you're already on) still works.
  // The position comes from offsetTop (which ignores CSS transforms) rather
  // than scrollIntoView, because scroll-reveal blocks start shifted down and
  // would otherwise land ~30px too high once they finish animating in.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (!id) return undefined
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      let top = 0
      for (let n = el; n; n = n.offsetParent) top += n.offsetTop
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
      window.scrollTo(0, top - margin)
    }, 0)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash, location.key])

  useRevealOnScroll([location.pathname])

  useEffect(() => {
    // In the narrow layout there's no room for the full wordmark next to the
    // menu button, so the logo stays in its short/collapsed state there
    // regardless of scroll position (and on Principles, see above).
    const onScroll = () => {
      setScrollProgress(progressNow())

      // The header is a translucent glass strip now — tint and text color
      // adapt to whether a dark hero/band or the plain white page is
      // currently showing through underneath it. .phead--paper is
      // explicitly excluded — it's the white/dark-ink variant of .phead,
      // not a dark band, so the nav needs its light-background (dark text)
      // treatment over it, same as the plain white page.
      //
      // Checks every dark band for overlap with the nav strip itself
      // (not just the first one in the document) — the homepage has
      // several navy sections spaced down the page (the opening, the
      // pivot/principles/practice run, the reflective break), any of which
      // can be sitting directly under the nav at a given scroll position.
      // .mission-band is plain white and deliberately excluded.
      // .newsletter is the navy subscribe band on the News pages.
      // .cinema-finale-dark-zone only exists in the DOM while the finale's
      // pinned crossfade (see Home.jsx) is mostly navy, so nav text
      // switches partway through that fade rather than staying white into
      // a white background. .pivot starts out white and only turns navy
      // once .pivot--in is added (a plain CSS color transition, not a
      // pinned fade — see Home.jsx/homepage.css), so it's watched via that
      // class rather than unconditionally like the sections after it.
      const darkEls = document.querySelectorAll(
        '.phead:not(.phead--paper), .ks-hero--painting, .newsletter, .home-open, .cinema-finale-dark-zone, .mission, .pivot--in, .principles-framework, .practice, .reflect',
      )
      // Compare against the header's live height (taller at the top of the
      // page on wide screens, while the links sit on their own line).
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-cur')) || NAV_HEIGHT
      const isDark = Array.from(darkEls).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < navH && r.bottom > 0
      })
      setOnDark(isDark)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, onPrinciples])

  // On the dark/painting bands the header text turns white — except while
  // the small-screen menu is open, when the bar itself is solid white.
  const darkHeader = onDark && !menuOpen

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="nav-fade" aria-hidden="true" />
      {menuOpen && (
        <button className="nav-scrim" type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setMenuOpen(false)} />
      )}
      {/* Hidden copies used only to measure which header layout fits. */}
      <div className="nav-measure" aria-hidden="true">
        <div ref={fullNameRef}>
          <ScrollLogo progress={0} />
        </div>
        <div ref={shortNameRef}>
          <ScrollLogo progress={1} />
        </div>
        <div className="nav__links" ref={measureLinksRef}>
          {NAV.map((n) => (
            <a key={n.to} aria-current={location.pathname === n.to ? 'page' : undefined}>
              <span className="nav__label">{n.label}</span>
            </a>
          ))}
        </div>
      </div>
      <header className="nav" data-mode={mode} data-open={menuOpen} data-over={darkHeader ? 'dark' : 'light'}>
        <div className="wrap" ref={wrapRef}>
          <Link className="brand" to="/" aria-label="AI & Ethics Initiative — home">
            <ScrollLogo progress={scrollProgress} light={darkHeader} />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                aria-current={location.pathname === n.to ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav__label">{n.label}</span>
              </Link>
            ))}
          </nav>
          <button
            className="nav__toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {!onPrinciples && <SiteFooter />}
    </div>
  )
}
