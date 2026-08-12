import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../mission-home.css'

const SHAKE_REVERSALS = 5
const SHAKE_WINDOW_MS = 1000
const WORM_DURATION_MS = 2500

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

const WELCOME_WORDS = [
  'so happy',
  'overjoyed',
  'thrilled',
  'ecstatic',
  'delighted',
  'stoked',
  'elated',
]

export default function Home() {
  const [revealed, setRevealed] = useState(FLAT_LINES.map(() => false))
  const [heroScale, setHeroScale] = useState(1)
  const [welcomeWord] = useState(
    () => WELCOME_WORDS[Math.floor(Math.random() * WELCOME_WORDS.length)],
  )
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

  const missionRef = useRef(null)
  useEffect(() => {
    const el = missionRef.current
    if (!el) return
    let lastX = null
    let lastDir = 0
    let reversalTimes = []
    let wormTimeout = null

    const onMouseMove = (e) => {
      if (lastX !== null) {
        const dx = e.clientX - lastX
        if (Math.abs(dx) > 4) {
          const dir = dx > 0 ? 1 : -1
          if (lastDir !== 0 && dir !== lastDir) {
            const now = Date.now()
            reversalTimes.push(now)
            reversalTimes = reversalTimes.filter((t) => now - t < SHAKE_WINDOW_MS)
            if (reversalTimes.length >= SHAKE_REVERSALS) {
              reversalTimes = []
              el.classList.add('worm-active')
              if (wormTimeout) clearTimeout(wormTimeout)
              wormTimeout = setTimeout(() => el.classList.remove('worm-active'), WORM_DURATION_MS)
            }
          }
          lastDir = dir
        }
      }
      lastX = e.clientX
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (wormTimeout) clearTimeout(wormTimeout)
    }
  }, [])

  const setLineRef = (i) => (el) => {
    lineRefs.current[i] = el
  }

  let flatIndex = 0

  return (
    <section className="mission mission--hero" data-screen-label="Mission">
      <div className="wrap">
        <div className="mission__inner worm-cursor" ref={missionRef}>
          <div className="mission__intro">
            <h2 className="mission__welcome" style={{ transform: `scale(${heroScale})` }}>
              Welcome
            </h2>
            <p className="mission__welcome-sub">We are {welcomeWord} you&apos;re here!</p>
          </div>

          <div className="mission__lines">
            {LINES.map((line) => {
              if (Array.isArray(line)) {
                return (
                  <div className="mission-line-row" key={line.map((item) => item.text).join('-')}>
                    {line.map((item) => {
                      const idx = flatIndex++
                      return (
                        <span
                          key={item.key || item.text}
                          ref={setLineRef(idx)}
                          className={`mission-line-item mission-line--${item.from} ${
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
                <p
                  key={line.key || line.text}
                  ref={setLineRef(idx)}
                  className={`mission-line mission-line--${line.from} ${
                    revealed[idx] ? 'revealed' : ''
                  }`}
                  style={{ transitionDelay: revealed[idx] ? line.delay ?? '0s' : '0s' }}
                >
                  {line.text}
                </p>
              )
            })}
          </div>

          <p className="mission__blurb">
            The AI &amp; Ethics Initiative is a student-run venture here at BYU (pretty awesome,
            if you ask us)! We're faculty-supervised and funded by the BYU Marriott School of
            Business — big thanks to them. Our whole goal is to grow Christlike, ethical
            leadership around AI... one inch at a time. 🪱
          </p>

          <div className="mission__actions">
            <Link className="btn btn--accent" to="/get-involved">
              Get Involved<span className="arrow">&rarr;</span>
            </Link>
            <Link className="btn btn--ghost" to="/about">
              More about us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
