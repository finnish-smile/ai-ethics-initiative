import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../explore-nav.css'

const EXPLORE_ITEMS = [
  {
    to: '/principles',
    label: 'Principles',
    sub: 'Build your personal constitution',
    ph: 'photo · principles',
  },
  {
    to: '/events',
    label: 'Events',
    sub: 'Logo contest & case competition',
    ph: 'photo · events',
  },
  {
    to: '/kickstart',
    label: 'Kickstart',
    sub: 'AI basics, hands-on',
    ph: 'photo · kickstart',
  },
  {
    to: '/newsletter',
    label: 'Newsletter',
    sub: 'Curated AI & ethics news',
    ph: 'photo · newsletter',
  },
]

export default function ExploreNav() {
  const [activeIdx, setActiveIdx] = useState(null)
  const isTouchRef = useRef(false)
  const navRef = useRef(null)

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches
  }, [])

  useEffect(() => {
    if (activeIdx === null) return
    const onOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveIdx(null)
    }
    document.addEventListener('touchstart', onOutside)
    return () => document.removeEventListener('touchstart', onOutside)
  }, [activeIdx])

  const handleClick = (idx) => (e) => {
    // On touch devices the first tap previews (expands) the button instead
    // of navigating immediately; tapping the already-active button (or
    // using a real pointer) navigates as normal.
    if (isTouchRef.current && activeIdx !== idx) {
      e.preventDefault()
      setActiveIdx(idx)
    }
  }

  return (
    <nav className="explore-nav" aria-label="Explore the initiative" ref={navRef}>
      {EXPLORE_ITEMS.map((item, idx) => (
        <Link
          key={item.to}
          to={item.to}
          className={`explore-btn ${activeIdx === idx ? 'is-active' : ''}`}
          onClick={handleClick(idx)}
          onFocus={() => isTouchRef.current && setActiveIdx(idx)}
        >
          <span className="explore-btn__circle">
            <span className="explore-btn__bg ph" aria-hidden="true">
              <span>{item.ph}</span>
            </span>
            <span className="explore-btn__arrow" aria-hidden="true">
              &rarr;
            </span>
          </span>
          <span className="explore-btn__text">
            <span className="explore-btn__label">{item.label}</span>
            <span className="explore-btn__sub">{item.sub}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}
