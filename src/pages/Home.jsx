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
  // One-shot — cards wait until the statement's own word-by-word reveal
  // has actually finished (not just "started scrolling into the pin") so
  // they only ever fly in once the words are sitting still, pinned in the
  // middle of the screen — not partway through a scroll. See the effect
  // below that arms these from beat2InView/hopeInView.
  const [doomCardsRevealed, setDoomCardsRevealed] = useState(false)
  const [hopeCardsRevealed, setHopeCardsRevealed] = useState(false)
  // Continuous, not one-shot — ramps 1 → 0 as each pin's bottom edge
  // approaches the bottom of the viewport, so the cards fade out on their
  // own before the next beat's text/color takes over, rather than just
  // scrolling out of frame still fully visible. See the fadeOutFor()
  // helper in the scroll handler below.
  const [doomCardsFade, setDoomCardsFade] = useState(1)
  const [hopeCardsFade, setHopeCardsFade] = useState(1)

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

      // Cards' own fade-out — 1 while the pin's bottom edge is still well
      // below the viewport (plenty of this beat left to scroll through),
      // ramping down to 0 over the last stretch as that edge approaches
      // the bottom of the screen, i.e. as the pin is about to end.
      const FADE_OUT_DISTANCE = 600
      const fadeOutFor = (rect) =>
        Math.min(1, Math.max(0, (rect.bottom - window.innerHeight) / FADE_OUT_DISTANCE))

      if (beat2Ref.current) setDoomCardsFade(fadeOutFor(beat2Ref.current.getBoundingClientRect()))
      if (hopeRef.current) setHopeCardsFade(fadeOutFor(hopeRef.current.getBoundingClientRect()))

      // Re-arm on every scroll event while the beat is in view — so the
      // 1s timer only ever actually elapses once scrolling has paused,
      // giving the pinned words a real beat alone before cards fly in.
      // This alone isn't enough on a real phone, though: inertial/momentum
      // scrolling after a flick keeps firing native scroll events for
      // seconds on its own, which would keep re-arming this and could
      // delay the reveal far longer than intended — see the separate
      // fallback timers below, which fire on a flat delay from first
      // entering view regardless of continued scrolling, so the cards are
      // guaranteed to show up within a bounded time either way.
      if (beat2InView) {
        clearTimeout(doomIdleTimer.current)
        doomIdleTimer.current = setTimeout(() => setDoomCardsRevealed(true), 1000)
      }
      if (hopeInView) {
        clearTimeout(hopeIdleTimer.current)
        hopeIdleTimer.current = setTimeout(() => setHopeCardsRevealed(true), 1000)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(doomIdleTimer.current)
      clearTimeout(hopeIdleTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat2InView, hopeInView])

  // Cards fly in only once scrolling has actually stopped inside the pin —
  // not just "the pin became 20% visible," which a fast scroll (a mobile
  // flick easily covers 1000px+ in under a second) blows straight past
  // while still moving, making a plain fixed delay after that moment show
  // the cards mid-scroll instead of after the words are pinned and sitting
  // still. Every scroll event re-arms these timers (see the scroll handler
  // above) while its beat is in view, so they only ever fire once the user
  // has paused — one-shot, same as before: doesn't un-reveal on scroll-up.
  const doomIdleTimer = useRef(null)
  const hopeIdleTimer = useRef(null)

  // Fallback safety net for the idle timers above — inertial/momentum
  // scrolling (a real phone keeps generating native scroll events for a
  // second or more after your finger lifts) can keep re-arming an idle
  // timer indefinitely, so a debounce alone isn't a reliable guarantee on
  // touch devices. This fires on a flat delay from the moment each beat
  // first comes into view, no matter how long scrolling continues —
  // whichever of the two reveals first wins (setState is a no-op once
  // already true), so the idle timer above still gets first crack at the
  // nicer "settled" timing when scrolling genuinely does stop in time.
  useEffect(() => {
    if (!beat2InView) return
    const id = setTimeout(() => setDoomCardsRevealed(true), 2200)
    return () => clearTimeout(id)
  }, [beat2InView])

  useEffect(() => {
    if (!hopeInView) return
    const id = setTimeout(() => setHopeCardsRevealed(true), 2200)
    return () => clearTimeout(id)
  }, [hopeInView])

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
            diverge again. */}
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
                className="cinema-lead"
              />
              <HeadlineCluster
                items={DOOM_HEADLINES}
                variant="doom"
                revealed={doomCardsRevealed}
                fadeOut={doomCardsFade}
              />
            </div>
          </div>
        </div>

        {/* Beat 3 — starts out still showing Beat 2's black (its own base
            background), then the cream overlay fades in over it as you
            scroll into this pin — same nested-overlay technique, so
            black→cream is a real gradual crossfade too. */}
        <div className="cinema-pin cinema-pin--hope" ref={hopeRef}>
          <div
            className="cinema-bridge cinema-bridge--to-cream"
            style={{ opacity: hopeFadeOpacity }}
            aria-hidden="true"
          />
          <div className="cinema-sticky">
            <div className="cinema-stage">
              <CinemaWords
                text="But we believe AI can help people flourish in unprecedented ways —"
                revealed={hopeInView}
                className="cinema-statement"
              />
              <HeadlineCluster
                items={HOPE_HEADLINES}
                variant="hope"
                revealed={hopeCardsRevealed}
                fadeOut={hopeCardsFade}
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
