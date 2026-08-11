import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const LINES = [
  { text: 'We develop Christlike leaders', from: 'left' },
  { text: 'who treat artificial intelligence as a', from: 'right' },
  {
    text: (
      <a href="#" className="stewardship-word">
        stewardship —
      </a>
    ),
    from: 'scale',
    key: 'stewardship-line',
  },
  { text: 'harnessing it ethically', from: 'left' },
  { text: 'for people,', from: 'up' },
  { text: 'communities,', from: 'up' },
  { text: 'and the world.', from: 'up' },
]

const GROW_DISTANCE = 500
const MAX_GROW = 0.5

export default function Home() {
  const [revealed, setRevealed] = useState(LINES.map(() => false))
  const [heroScale, setHeroScale] = useState(1)
  const lineRefs = useRef([])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      setHeroScale(1 + Math.min(1, y / GROW_DISTANCE) * MAX_GROW)

      if (y <= 0) {
        setRevealed((prev) => (prev.some(Boolean) ? LINES.map(() => false) : prev))
        return
      }
      setRevealed((prev) => {
        let changed = false
        const next = [...prev]
        lineRefs.current.forEach((el, i) => {
          if (!el) return
          const rect = el.getBoundingClientRect()
          const shouldShow = rect.top < window.innerHeight * 0.75
          if (shouldShow !== next[i]) {
            next[i] = shouldShow
            changed = true
          }
        })
        return changed ? next : prev
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const setLineRef = (i) => (el) => {
    lineRefs.current[i] = el
  }

  return (
    <>
      <div className="hero-title">
        <h1 style={{ transform: `scale(${heroScale})` }}>Welcome</h1>
        <div className="hero-subtitle">to the BYU Marriott AI &amp; Ethics Initiative</div>
      </div>

      <div className="reveal-lines">
        {LINES.slice(0, 4).map((line, i) => (
          <div
            key={line.key || line.text}
            ref={setLineRef(i)}
            className={`reveal-line reveal-${line.from} ${revealed[i] ? 'revealed' : ''}`}
          >
            {line.text}
          </div>
        ))}
        <div className="reveal-line-group">
          {LINES.slice(4).map((line, i) => {
            const idx = i + 4
            return (
              <div
                key={line.key || line.text}
                ref={setLineRef(idx)}
                className={`reveal-line reveal-${line.from} ${revealed[idx] ? 'revealed' : ''}`}
                style={{ transitionDelay: revealed[idx] ? `${i * 0.15}s` : '0s' }}
              >
                {line.text}
              </div>
            )
          })}
        </div>
      </div>

      <p className="body-text center">
        The AI &amp; Ethics Initiative is a BYU student-run initiative, faculty-supervised and
        funded through the BYU Marriott School of Business, focused on developing Christlike,
        ethical leadership around artificial intelligence.
      </p>

      <Link to="/get-involved" className="btn-outline hero-cta">
        Get Involved
      </Link>
    </>
  )
}
