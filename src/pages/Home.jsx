import { useEffect, useRef, useState } from 'react'
import ExploreNav from '../components/ExploreNav.jsx'
import CinemaWords from '../components/cinema/CinemaWords.jsx'
import useInView from '../hooks/useInView.js'
import '../mission-home.css'
import '../cinema-sequence.css'

const SHAKE_REVERSALS = 5
const SHAKE_WINDOW_MS = 1000
const WORM_DURATION_MS = 2500

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
  const [heroScale, setHeroScale] = useState(1)
  const [cueOpacity, setCueOpacity] = useState(1)
  const [welcomeWord] = useState(
    () => WELCOME_WORDS[Math.floor(Math.random() * WELCOME_WORDS.length)],
  )
  // --- Cinematic sequence reveal state -----------------------------------
  //
  // Text/card reveals stay IntersectionObserver-driven (one-shot booleans,
  // per the build spec). The three background-color overlays (painting →
  // brown → black → cream), though, are deliberately scroll-scrubbed —
  // each one's opacity is a direct function of how far its beat's pin has
  // scrolled through the viewport, computed alongside heroScale/cueOpacity
  // in the scroll handler below, so the color genuinely tracks your scroll
  // position (and reverses cleanly on the way back up) instead of playing
  // a fixed-length animation once triggered.
  const [beat1Ref, beat1InView] = useInView({ threshold: 0.4 })
  const [beat2Ref, beat2InView] = useInView({ threshold: 0.2 })
  // Higher than doom's — hope's text is dark ink (for its eventual cream
  // background), so it shouldn't reveal too early in the black→cream
  // crossfade, while the background is still mostly dark.
  const [hopeRef, hopeInView] = useInView({ threshold: 0.35 })
  const [joinRef, joinInView] = useInView({ threshold: 0.5 })

  const [beat1FadeOpacity, setBeat1FadeOpacity] = useState(0)
  const [beat2FadeOpacity, setBeat2FadeOpacity] = useState(0)
  const [hopeFadeOpacity, setHopeFadeOpacity] = useState(0)

  const youPinRef = useRef(null)
  const [youIntroRef, youIntroInView] = useInView({ threshold: 0.5 })
  const isolateTriggerRef = useRef(null)
  const ctaTriggerRef = useRef(null)
  const [isolateYou, setIsolateYou] = useState(false)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHeroScale(1 + Math.min(1, y / GROW_DISTANCE) * MAX_GROW)
      setCueOpacity(Math.max(0, 1 - y / 120))

      // Each overlay's opacity ramps 0 → 1 as its beat's pin scrolls up
      // through roughly the next viewport-and-a-half — pure scroll-scrub,
      // no timers — then holds at 1 for the rest of that pin's height.
      // Forcing it back to 0 once the pin's bottom has passed the top of
      // the screen (rect.bottom <= 0) is what makes it reverse cleanly on
      // the way back up, and keeps it from lingering into later sections:
      // each overlay is position: fixed and nested inside its own beat's
      // pin (so it can fade in over that beat's own background) rather
      // than a plain top-level sibling, so without this bound it would
      // otherwise stay fully opaque forever once first triggered.
      const FADE_DISTANCE = window.innerHeight * 1.8
      const fadeFor = (rect) =>
        rect.bottom > 0
          ? Math.min(1, Math.max(0, (window.innerHeight - rect.top) / FADE_DISTANCE))
          : 0

      if (beat1Ref.current) setBeat1FadeOpacity(fadeFor(beat1Ref.current.getBoundingClientRect()))
      if (beat2Ref.current) setBeat2FadeOpacity(fadeFor(beat2Ref.current.getBoundingClientRect()))
      if (hopeRef.current) setHopeFadeOpacity(fadeFor(hopeRef.current.getBoundingClientRect()))

      // Which side of the viewport's vertical center each anchor is on —
      // stays true for as long as you're scrolled past it (reversing
      // cleanly on the way back up), unlike an IntersectionObserver with a
      // rootMargin squeezed to that same center line: against a 1px-tall
      // anchor, isIntersecting is only ever true for the single scroll
      // frame actually crossing that line, then flips back to false the
      // moment you scroll past it — which was the actual bug here (the
      // isolate/CTA moments never stayed, just flickered on the way past).
      if (isolateTriggerRef.current) {
        setIsolateYou(isolateTriggerRef.current.getBoundingClientRect().top <= window.innerHeight / 2)
      }
      if (ctaTriggerRef.current) {
        setShowCTA(ctaTriggerRef.current.getBoundingClientRect().top <= window.innerHeight / 2)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wormRef = useRef(null)
  useEffect(() => {
    const el = wormRef.current
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

  return (
    <>
      <section className="mission mission--hero" data-screen-label="Mission">
        {/* No fade here — "Welcome" always stays the plain painting, no
            overlay at all. The brown fade now happens in Beat 1's own
            section below, which starts out showing this same painting
            (via the shared .mission--hero background rules) before fading
            to brown once you've scrolled into it. */}
        <div className="wrap">
          <div className="mission__inner worm-cursor" ref={wormRef}>
            <div className="mission__intro">
              <h2 className="mission__welcome" style={{ transform: `scale(${heroScale})` }}>
                Welcome
              </h2>
              <p className="mission__welcome-sub">We are {welcomeWord} you&apos;re here!</p>
              <div className="scroll-cue mission__scroll-cue" style={{ opacity: cueOpacity }}>
                Scroll
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cinema-sequence" data-screen-label="Cinematic sequence">
        {/* Beat 1 — reuses .mission--hero's own painting background (fixed,
            same image/position), so scrolling from "Welcome" into this pin
            reads as one continuous, unmoving backdrop rather than a cut.
            The black overlay then fades in on top of it once this section
            is actually in view — "starts as painting, then fades to
            black," not black from the moment you leave Welcome. */}
        <div className="cinema-pin cinema-pin--1 mission--hero" ref={beat1Ref}>
          <div
            className="mission__fade-overlay"
            style={{ opacity: beat1FadeOpacity }}
            aria-hidden="true"
          />
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="AI is the fastest-spreading technology in human history."
                revealed={beat1InView}
                className="cinema-statement"
              />
            </div>
          </div>
        </div>

        {/* Beat 2 — Beat 1 has already faded all the way to black by the
            time this pin is reached, so this pin's own base background is
            already black too (see cinema-sequence.css) and this bridge is
            effectively a no-op hold at black — kept for structural
            consistency with Beat 3 and in case the two blacks ever need to
            diverge again. Same pin/sticky/reveal mechanic as Beat 1 —
            no headline cards, just the pinned line of text. */}
        <div className="cinema-pin cinema-pin--doom" ref={beat2Ref}>
          <div
            className="cinema-bridge cinema-bridge--to-black"
            style={{ opacity: beat2FadeOpacity }}
            aria-hidden="true"
          />
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="A lot of people have thoughts on where this is headed."
                revealed={beat2InView}
                className="cinema-statement"
              />
            </div>
          </div>
        </div>

        {/* Beat 3 — starts out still showing Beat 2's black (its own base
            background), then the cream overlay fades in over it as you
            scroll into this pin — same nested-overlay technique, so
            black→cream is a real gradual crossfade too. Same pin/sticky/
            reveal mechanic as Beat 1 — no headline cards. */}
        <div className="cinema-pin cinema-pin--hope" ref={hopeRef}>
          <div
            className="cinema-bridge cinema-bridge--to-cream"
            style={{ opacity: hopeFadeOpacity }}
            aria-hidden="true"
          />
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="We believe AI can help people flourish in unprecedented ways."
                revealed={hopeInView}
                className="cinema-statement"
              />
            </div>
          </div>
        </div>

        {/* Beats 4 & 5 — the responsibility pivot, "you" held alone, then
            the CTA. Held on screen via position: sticky (declarative CSS,
            not scroll math); the isolate/CTA moments are still triggered
            by IntersectionObserver watching two anchor points inside this
            pinned range. */}
        <div className="cinema-you-pin" ref={youPinRef}>
          <div className="cinema-you-sticky">
            <div className="cinema-you-stage" ref={youIntroRef}>
              <p className="cinema-statement">
                <span
                  className="cinema-you-lead"
                  style={{ opacity: youIntroInView && !isolateYou ? 1 : 0 }}
                >
                  It all depends on how people like
                  <br />
                </span>
                <span
                  className="cinema-highlight"
                  style={{ opacity: youIntroInView ? 1 : 0, transition: 'opacity 0.9s ease' }}
                >
                  you
                </span>
                <span className="cinema-you-trail" style={{ opacity: youIntroInView && !isolateYou ? 1 : 0 }}>
                  {' '}
                  choose to build and use these tools.
                </span>
                {/* "you" stays put (see the highlight span above, which no
                    longer fades out for this) and this fades in on its own
                    line right below it — one text box, a real line break,
                    rather than a whole separate sentence appearing
                    elsewhere or a second box position-matched against the
                    first. The gap scales with this text's own font-size
                    (normal line-height behavior) — same as every other
                    line break in this sequence, not pinned to a fixed
                    pixel distance. */}
                <br />
                <span
                  className="cinema-you-cta-trail"
                  style={{ opacity: showCTA ? 1 : 0, transition: 'opacity 0.9s ease' }}
                >
                  can make a difference.
                </span>
              </p>
            </div>
          </div>
          <div className="cinema-you-trigger" ref={isolateTriggerRef} style={{ top: '42%' }} />
          <div className="cinema-you-trigger" ref={ctaTriggerRef} style={{ top: '78%' }} />
        </div>

        {/* Beat 6 — transition into the mission statement, which per the
            build spec lands in a distinct, settled, non-animated state
            ("static, confident, full-stop") rather than the scroll-driven
            reveal the rest of this sequence uses. */}
        <div ref={joinRef}>
          <CinemaWords text="Join us as we strive to..." revealed={joinInView} className="cinema-join" />
        </div>

        {/* Static — no scroll-triggered reveal here. Per the build spec,
            the sequence should feel "landed" by this point: full-stop,
            settled, always fully visible rather than animating in. */}
        <div className="cinema-mission">
          <p className="cinema-statement">
            Our mission is to develop Christlike leaders who treat artificial intelligence as a{' '}
            <a href="#" className="cinema-highlight-link">
              stewardship
            </a>{' '}
            — harnessing it ethically for people, communities, and the world.
          </p>
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
