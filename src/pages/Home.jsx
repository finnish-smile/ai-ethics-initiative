import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const LINES = [
  { text: 'We develop Christlike leaders', from: 'left' },
  { text: 'who treat artificial intelligence as a stewardship —', from: 'right' },
  { text: 'harnessing it ethically', from: 'left' },
  { text: 'for people,', from: 'up' },
  { text: 'communities,', from: 'up' },
  { text: 'and the world.', from: 'up' },
]

export default function Home() {
  const [revealed, setRevealed] = useState(LINES.map(() => false))
  const lineRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = lineRefs.current.indexOf(entry.target)
          if (idx !== -1) {
            setRevealed((prev) => {
              if (prev[idx]) return prev
              const next = [...prev]
              next[idx] = true
              return next
            })
          }
        })
      },
      { threshold: 0.5 },
    )
    lineRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setLineRef = (i) => (el) => {
    lineRefs.current[i] = el
  }

  return (
    <>
      <div className="hero-title">
        <h1>Welcome</h1>
        <div className="hero-subtitle">to the BYU Marriott AI &amp; Ethics Initiative</div>
      </div>

      <div className="reveal-lines">
        {LINES.slice(0, 3).map((line, i) => (
          <div
            key={line.text}
            ref={setLineRef(i)}
            className={`reveal-line reveal-${line.from} ${revealed[i] ? 'revealed' : ''}`}
          >
            {line.text}
          </div>
        ))}
        <div className="reveal-line-group">
          {LINES.slice(3).map((line, i) => {
            const idx = i + 3
            return (
              <div
                key={line.text}
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
