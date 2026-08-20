import { useEffect, useRef, useState } from 'react'
import ExploreNav from '../components/ExploreNav.jsx'
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
// The reveal sequence only spends the first 65% of the pinned scroll range;
// the rest is a held pause — nothing changes — before the page is allowed
// to continue scrolling toward the buttons/footer.
const REVEAL_FRACTION = 0.65

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
  const [cueOpacity, setCueOpacity] = useState(1)
  const [welcomeWord] = useState(
    () => WELCOME_WORDS[Math.floor(Math.random() * WELCOME_WORDS.length)],
  )
  const linesPinRef = useRef(null)
  const introRef = useRef(null)
  const subRef = useRef(null)
  const [pinPullUp, setPinPullUp] = useState(0)

  useEffect(() => {
    // .mission__intro is a full 100svh block with its content vertically
    // centered, which leaves empty space below the subtitle before the
    // lines section would naturally begin. Pull the lines section up to
    // close that gap, so it engages right as the subtitle scrolls out of
    // view instead of after a long empty scroll.
    const measure = () => {
      const intro = introRef.current
      const sub = subRef.current
      if (!intro || !sub) return
      const gap = intro.getBoundingClientRect().bottom - sub.getBoundingClientRect().bottom
      setPinPullUp(Math.max(0, gap - 24))
    }
    measure()
    window.addEventListener('resize', measure)
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY

      setHeroScale(1 + Math.min(1, y / GROW_DISTANCE) * MAX_GROW)
      setCueOpacity(Math.max(0, 1 - y / 120))

      // .mission__lines is pinned (position: sticky) for the length of
      // .mission__lines-pin, so it holds still on screen — right where the
      // painting (also pinned, via .mission__bg) is holding still too —
      // while scroll progress through that pinned range drives which lines
      // have appeared.
      const pin = linesPinRef.current
      if (!pin) return
      const rect = pin.getBoundingClientRect()
      // .mission__lines sticks at top: 79px (NAV_HEIGHT), not top: 0 — the
      // dwell-progress math needs that same offset or it thinks the pin
      // hasn't started yet even after the text is already stuck in place.
      const scrollable = rect.height - window.innerHeight
      const rawProgress = scrollable > 0 ? Math.min(1, Math.max(0, (79 - rect.top) / scrollable)) : 0
      const progress = Math.min(1, rawProgress / REVEAL_FRACTION)

      setRevealed((prev) => {
        const next = FLAT_LINES.map((_, i) => progress > (i + 0.2) / FLAT_LINES.length)
        return next.some((v, i) => v !== prev[i]) ? next : prev
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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

  let flatIndex = 0

  return (
    <>
      <section className="mission mission--hero" data-screen-label="Mission">
        <div className="wrap">
          <div className="mission__inner worm-cursor" ref={missionRef}>
            <div className="mission__intro" ref={introRef}>
              <h2 className="mission__welcome" style={{ transform: `scale(${heroScale})` }}>
                Welcome
              </h2>
              <p className="mission__welcome-sub" ref={subRef}>
                We are {welcomeWord} you&apos;re here!
              </p>
              <div className="scroll-cue mission__scroll-cue" style={{ opacity: cueOpacity }}>
                Scroll
              </div>
            </div>

            <div className="mission__lines-pin" ref={linesPinRef} style={{ marginTop: -pinPullUp }}>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section explore-section" data-screen-label="Explore">
        <div className="wrap">
          <div className="section-head explore-section__head">
            <div>
              <p className="kicker">Explore</p>
              <h2>Find your way in</h2>
            </div>
          </div>
          <ExploreNav />
        </div>
      </section>
    </>
  )
}
