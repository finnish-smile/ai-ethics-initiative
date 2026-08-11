import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import ScrollLogo from './ScrollLogo.jsx'

export default function Layout() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollProgress(0)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      const p = Math.max(0, Math.min(1, window.scrollY / 100))
      setScrollProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="site-header">
        <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
          <ScrollLogo progress={scrollProgress} />
        </Link>
        <nav className="site-nav">
          <Link to="/about">About</Link>
          <Link to="/get-involved">Get Involved</Link>
          <Link to="/principles">Principles</Link>
          <Link to="/events">Events</Link>
          <Link to="/kickstart">Kickstart</Link>
          <Link to="/newsfeed">Newsfeed</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">A BYU Marriott AI and Ethics Initiative</footer>
    </div>
  )
}
