import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ScrollLogo from './ScrollLogo.jsx'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/about', label: 'About' },
  { to: '/principles', label: 'Principles' },
  { to: '/events', label: 'Events' },
  { to: '/news', label: 'News' },
  { to: '/connections', label: 'Connections' },
]

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function NewsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="14" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17 8h4v9a3 3 0 0 1-3 3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 8h8M6 12h8M6 16h5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 15l6-6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 11l-2 2a3 3 0 0 0 4 4l2-2M16 13l2-2a3 3 0 0 0-4-4l-2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" />
    </svg>
  )
}

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollProgress(window.matchMedia('(max-width: 640px)').matches ? 1 : 0)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    // Below the mobile nav breakpoint there's no room for the full wordmark
    // next to the hamburger toggle — the full-width logo pushes the toggle
    // button off-screen. Keep the logo permanently in its short/collapsed
    // state on narrow viewports, regardless of scroll position.
    const mq = window.matchMedia('(max-width: 640px)')
    const onScroll = () => {
      const p = mq.matches ? 1 : Math.max(0, Math.min(1, window.scrollY / 100))
      setScrollProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener('change', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onScroll)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="nav" data-open={menuOpen}>
        <div className="wrap">
          <Link className="brand" to="/" aria-label="AI & Ethics Initiative — home">
            <ScrollLogo progress={scrollProgress} />
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
                  <Link to="/about">About the Initiative</Link>
                </li>
                <li>
                  <Link to="/principles">Principles of Ethical AI Use</Link>
                </li>
                <li>
                  <Link to="/events">Events Calendar</Link>
                </li>
                <li>
                  <Link to="/news">News &amp; Newsletter</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="foot__h">Resources</h4>
              <ul>
                <li>
                  <Link to="/principles#coursework">Using AI in Coursework</Link>
                </li>
                <li>
                  <Link to="/principles#disclosure">Disclosure &amp; Citation</Link>
                </li>
                <li>
                  <Link to="/connections">Campus Partners</Link>
                </li>
                <li>
                  <Link to="/about#contact">Request a Workshop</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="foot__h">Connect</h4>
              <div className="foot__social">
                <Link to="/news#newsletter" aria-label="Newsletter">
                  <MailIcon />
                </Link>
                <Link to="/news" aria-label="News">
                  <NewsIcon />
                </Link>
                <Link to="/connections" aria-label="Partners">
                  <LinkIcon />
                </Link>
                <Link to="/events" aria-label="Recordings">
                  <PlayIcon />
                </Link>
              </div>
              <ul>
                <li>
                  <Link to="/news#newsletter">Join the mailing list</Link>
                </li>
                <li>
                  <Link to="/events">Upcoming events</Link>
                </li>
                <li>
                  <Link to="/about#team">Meet the team</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot__band">
          <div className="foot__wordmark">AI Ethics Initiative</div>
          <p className="foot__fine">
            &copy; {new Date().getFullYear()} AI Ethics Initiative &nbsp;|&nbsp; <a href="#">Privacy Notice</a>{' '}
            &nbsp;&middot;&nbsp; <a href="#">Accessibility</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
