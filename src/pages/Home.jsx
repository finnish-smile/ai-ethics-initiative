import { useEffect, useRef, useState } from 'react'
import ExploreNav from '../components/ExploreNav.jsx'
import HeadlineCluster from '../components/cinema/HeadlineCluster.jsx'
import CinemaWords from '../components/cinema/CinemaWords.jsx'
import { DOOM_HEADLINES, HOPE_HEADLINES } from '../data/cinema-headlines.js'
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
  // --- Cinematic sequence reveal state (all IntersectionObserver-driven,
  // not scroll-position math, per the build spec) -----------------------
  //
  // The three background-color overlays below (painting → brown → black →
  // cream) are driven straight off these same "in view" booleans, not a
  // continuous scroll calculation — each overlay is invisible (opacity: 0)
  // until its beat actually scrolls into view, then flips to opacity: 1
  // once and stays there; the 3s CSS transition (see mission-home.css /
  // cinema-sequence.css) is what turns that single flip into a slow fade,
  // rather than it snapping in the instant you reach that section.
  const [beat1Ref, beat1InView] = useInView({ threshold: 0.4 })
  const [beat2Ref, beat2InView] = useInView({ threshold: 0.2 })
  const [hopeRef, hopeInView] = useInView({ threshold: 0.15 })
  const [joinRef, joinInView] = useInView({ threshold: 0.5 })

  // useInView's booleans above are one-way (they fire once and never go
  // back to false), which is right for the text/card reveals but wrong for
  // these color overlays on their own: without something to also undo it,
  // scrolling back UP past a beat left its overlay stuck fully opaque
  // forever, covering "Welcome" (and earlier beats) in brown/black/cream
  // even once you'd scrolled back above them. These three track whether
  // each beat's pin is currently at or below the viewport — true while
  // you're at/past it, false again once you've scrolled back above it —
  // so each overlay's opacity can go back to 0 on the way back up too.
  const [beat1PinReached, setBeat1PinReached] = useState(false)
  const [beat2PinReached, setBeat2PinReached] = useState(false)
  const [hopePinReached, setHopePinReached] = useState(false)

  const youPinRef = useRef(null)
  const [youIntroRef, youIntroInView] = useInView({ threshold: 0.5 })
  const isolateTriggerRef = useRef(null)
  const ctaTriggerRef = useRef(null)
  const [isolateYou, setIsolateYou] = useState(false)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    const el = isolateTriggerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setIsolateYou(entry.isIntersecting), {
      threshold: 0,
      rootMargin: '-50% 0px -50% 0px', // fires as the anchor crosses the vertical center of the viewport
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = ctaTriggerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setShowCTA(entry.isIntersecting), {
      threshold: 0,
      rootMargin: '-50% 0px -50% 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHeroScale(1 + Math.min(1, y / GROW_DISTANCE) * MAX_GROW)
      setCueOpacity(Math.max(0, 1 - y / 120))

      // Just a boundary check (is this pin's top at or above the bottom of
      // the viewport yet?) — not the kind of hand-computed fade math that
      // caused problems before, since it isn't driving any animated value
      // itself, only whether each overlay is allowed to show at all.
      if (beat1Ref.current) {
        setBeat1PinReached(beat1Ref.current.getBoundingClientRect().top <= window.innerHeight)
      }
      if (beat2Ref.current) {
        setBeat2PinReached(beat2Ref.current.getBoundingClientRect().top <= window.innerHeight)
      }
      if (hopeRef.current) {
        setHopePinReached(hopeRef.current.getBoundingClientRect().top <= window.innerHeight)
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
        <div
          className="cinema-bridge cinema-bridge--to-black"
          style={{ opacity: beat2InView && beat2PinReached ? 1 : 0 }}
          aria-hidden="true"
        />
        <div
          className="cinema-bridge cinema-bridge--to-cream"
          style={{ opacity: hopeInView && hopePinReached ? 1 : 0 }}
          aria-hidden="true"
        />
        {/* Beat 1 — reuses .mission--hero's own painting background (fixed,
            same image/position), so scrolling from "Welcome" into this pin
            reads as one continuous, unmoving backdrop rather than a cut.
            The brown overlay then fades in on top of it once this section
            is actually in view — "starts as painting, then fades to
            brown," not brown from the moment you leave Welcome. */}
        <div className="cinema-pin cinema-pin--1 mission--hero" ref={beat1Ref}>
          <div
            className="mission__fade-overlay"
            style={{ opacity: beat1InView && beat1PinReached ? 1 : 0 }}
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

        {/* Beat 2 — pinned lead line, doom cards popping in scattered
            around it (full-bleed black background). */}
        <div className="cinema-pin cinema-pin--doom" ref={beat2Ref}>
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="And we're sure you've seen the headlines..."
                revealed={beat2InView}
                className="cinema-lead"
              />
              <HeadlineCluster items={DOOM_HEADLINES} variant="doom" revealed={beat2InView} />
            </div>
          </div>
        </div>

        {/* Beat 3 — pinned pivot line, hope cards popping in scattered
            around it (full-bleed cream background). */}
        <div className="cinema-pin cinema-pin--hope" ref={hopeRef}>
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="But we believe AI can help people flourish in unprecedented ways —"
                revealed={hopeInView}
                className="cinema-statement"
              />
              <HeadlineCluster items={HOPE_HEADLINES} variant="hope" revealed={hopeInView} />
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
                  Depending on how people like{' '}
                </span>
                <span
                  className="cinema-highlight"
                  style={{ opacity: youIntroInView && !showCTA ? 1 : 0, transition: 'opacity 0.9s ease' }}
                >
                  you
                </span>
                <span className="cinema-you-trail" style={{ opacity: youIntroInView && !isolateYou ? 1 : 0 }}>
                  {' '}
                  choose to build and use these tools.
                </span>
              </p>
              <div className={`cinema-you-cta ${showCTA ? 'revealed' : ''}`}>
                <p className="cinema-statement">
                  <span className="cinema-highlight">You</span> can make a difference.
                </p>
              </div>
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
