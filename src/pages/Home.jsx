import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const LINES = [
  { text: 'We develop Christlike leaders', from: 'left' },
  { text: 'who treat artificial intelligence as a', from: 'right' },
  {
    text: (
      <a href="#" className="stewardship-word">
        stewardship
      </a>
    ),
    from: 'scale',
    key: 'stewardship-line',
  },
  { text: '— harnessing it ethically', from: 'left', delay: '0.5s' },
  [
    { text: 'for people,', from: 'up', delay: '0.65s' },
    { text: 'communities,', from: 'up', delay: '1.15s' },
  ],
  { text: 'and the world.', from: 'up', delay: '1.3s' },
]

const FLAT_LINES = LINES.flatMap((line) => (Array.isArray(line) ? line : [line]))

const GROW_DISTANCE = 500
const MAX_GROW = 0.5

export default function Home() {
  const [revealed, setRevealed] = useState(FLAT_LINES.map(() => false))
  const [heroScale, setHeroScale] = useState(1)
  const lineRefs = useRef([])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      setHeroScale(1 + Math.min(1, y / GROW_DISTANCE) * MAX_GROW)

      if (y <= 0) {
        setRevealed((prev) => (prev.some(Boolean) ? FLAT_LINES.map(() => false) : prev))
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

  let flatIndex = 0

  return (
    <div className="worm-cursor">
      <div className="hero-title">
        <h1 style={{ transform: `scale(${heroScale})` }}>Welcome</h1>
        <div className="hero-subtitle">to the BYU Marriott AI &amp; Ethics Initiative</div>
      </div>

      <div className="reveal-lines">
        {LINES.map((line) => {
          if (Array.isArray(line)) {
            return (
              <div className="reveal-line-row" key={line.map((item) => item.text).join('-')}>
                {line.map((item) => {
                  const idx = flatIndex++
                  return (
                    <span
                      key={item.key || item.text}
                      ref={setLineRef(idx)}
                      className={`reveal-line-item reveal-${item.from} ${
                        revealed[idx] ? 'revealed' : ''
                      }`}
                      style={{ transitionDelay: revealed[idx] ? item.delay ?? '0s' : '0s' }}
                    >
                      {item.text}
                    </span>
                  )
                })}
              </div>
            )
          }

          const idx = flatIndex++
          return (
            <div
              key={line.key || line.text}
              ref={setLineRef(idx)}
              className={`reveal-line reveal-${line.from} ${revealed[idx] ? 'revealed' : ''}`}
              style={{ transitionDelay: revealed[idx] ? line.delay ?? '0s' : '0s' }}
            >
              {line.text}
            </div>
          )
        })}
      </div>

      <p className="body-text center">
        The AI &amp; Ethics Initiative is a student-run thing here at BYU (pretty awesome, if you
        ask us)! We're faculty-supervised and funded by the BYU Marriott School of Business —
        big thanks to them. Our whole goal is to grow Christlike, ethical leadership around
        AI... one inchworm step at a time. 🪱
      </p>

      <Link to="/get-involved" className="btn-outline hero-cta">
        Get Involved
      </Link>
    </div>
  )
}
