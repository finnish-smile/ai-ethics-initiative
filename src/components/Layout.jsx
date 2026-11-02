import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ScrollLogo from './ScrollLogo.jsx'
import useRevealOnScroll from '../hooks/useRevealOnScroll.js'
import '../reveal.css'

// Build your constitution sits right after Home as the current call to
// action; Principles follows — it's the intellectual center of the
// initiative, not one option among equals. Kickstart keeps its existing
// route but surfaces under the "Learn" label so it doesn't read as the
// primary product; "Calendar" is relabeled "Events" to match the homepage's
// language for the same page.
const NAV = [
  { to: '/', label: 'Home' },
  { to: '/constitution', label: 'Build your constitution' },
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

const NAV_HEIGHT = 79

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const location = useLocation()
  // Principles renders the footer inside its own scrolling frame instead.
  const onPrinciples = location.pathname.replace(/\/+$/, '') === '/principles'

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollProgress(window.matchMedia('(max-width: 640px)').matches ? 1 : 0)
    setMenuOpen(false)
  }, [location.pathname])

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
    // Below the mobile nav breakpoint there's no room for the full wordmark
    // next to the hamburger toggle — the full-width logo pushes the toggle
    // button off-screen. Keep the logo permanently in its short/collapsed
    // state on narrow viewports, regardless of scroll position.
    const mq = window.matchMedia('(max-width: 640px)')
    const onScroll = () => {
      const p = mq.matches ? 1 : Math.max(0, Math.min(1, window.scrollY / 100))
      setScrollProgress(p)

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
      const isDark = Array.from(darkEls).some((el) => {
        const r = el.getBoundingClientRect()
        return r.top < NAV_HEIGHT && r.bottom > 0
      })
      setOnDark(isDark)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener('change', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onScroll)
    }
  }, [location.pathname])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="nav-fade" aria-hidden="true" />
      <header className="nav" data-open={menuOpen} data-over={onDark ? 'dark' : 'light'}>
        <div className="wrap">
          <Link className="brand" to="/" aria-label="AI & Ethics Initiative — home">
            <ScrollLogo progress={scrollProgress} light={onDark} />
          </Link>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} aria-current={location.pathname === n.to ? 'page' : undefined}>
                <span className="nav__label">{n.label}</span>
              </Link>
            ))}
          </nav>
          <button
            className="nav__toggle"
            type="button"
            aria-label="Menu"
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
