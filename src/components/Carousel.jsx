import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { spotlights } from '../data/events.js'

const INTERVAL_MS = 6500
const TRANSITION_MS = 720

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [leaving, setLeaving] = useState(null)
  const hoveringRef = useRef(false)
  const timerRef = useRef(null)

  const show = (next) => {
    const n = spotlights.length
    const i = ((next % n) + n) % n
    setCurrent((cur) => {
      if (i === cur) return cur
      setLeaving(cur)
      setTimeout(() => setLeaving(null), TRANSITION_MS)
      return i
    })
  }

  useEffect(() => {
    const reset = () => {
      clearInterval(timerRef.current)
      if (hoveringRef.current) return
      timerRef.current = setInterval(() => show(current + 1), INTERVAL_MS)
    }
    reset()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const onMouseEnter = () => {
    hoveringRef.current = true
    clearInterval(timerRef.current)
  }
  const onMouseLeave = () => {
    hoveringRef.current = false
    timerRef.current = setInterval(() => show(current + 1), INTERVAL_MS)
  }

  return (
    <div className="hero-main" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="hero-stage">
        {spotlights.map((s, i) => {
          const state = i === current ? 'is-active' : i === leaving ? 'is-leaving' : ''
          return (
            <article className={`hero-slide ${state}`} key={s.title}>
              <div className={`hero-slide__media ph${s.tone === 'navy' ? ' hero-slide__media--navy' : ''}`}>
                <span>{s.ph}</span>
              </div>
              <div className="hero-slide__body">
                <p className="kicker">{s.cat}</p>
                <h2>{s.title}</h2>
                {s.blurb && <p className="hero-slide__blurb">{s.blurb}</p>}
                <Link className="btn btn--accent" to={s.href}>
                  {s.cta}
                  <span className="arrow">&rarr;</span>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
      <div className="hero-controls">
        <div className="hero-dots">
          {spotlights.map((s, i) => (
            <button
              key={s.title}
              className="hero-dot"
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => show(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
