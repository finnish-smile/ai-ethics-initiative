import { useLayoutEffect, useRef, useState } from 'react'

const FONT = '"Newsreader", serif'
const FONT_SIZE = 20
const GAP = 8

function ease(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function tween(from, to, start, end, t) {
  if (t <= start) return from
  if (t >= end) return to
  return from + (to - from) * ease((t - start) / (end - start))
}

export default function ScrollLogo({ progress = 0 }) {
  const p = Math.max(0, Math.min(1, progress))
  const refs = { byu: useRef(), marriott: useRef(), and: useRef(), amp: useRef() }
  const [w, setW] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      const widths = {}
      Object.entries(refs).forEach(([k, r]) => {
        if (r.current) widths[k] = r.current.offsetWidth
      })
      setW(widths)
    }
    measure()
    // The initial measurement can run before the Newsreader webfont has
    // finished loading, baking in narrower fallback-font widths that clip
    // the real (wider) glyphs once the font swaps in. Re-measure once fonts
    // are actually ready.
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const wordStyle = {
    fontFamily: FONT,
    fontWeight: 700,
    fontStyle: 'italic',
    fontSize: FONT_SIZE,
    color: '#111111',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  }

  const measureBlock = (
    <div style={{ position: 'absolute', visibility: 'hidden', top: -9999, left: -9999, ...wordStyle }}>
      <span ref={refs.byu}>BYU</span>
      <span ref={refs.marriott}>Marriott</span>
      <span ref={refs.and}>and</span>
      <span ref={refs.amp}>&amp;</span>
    </div>
  )

  if (!w) {
    return (
      <div style={{ position: 'relative' }}>
        {measureBlock}
        <span style={wordStyle}>BYU Marriott AI and Ethics Initiative</span>
      </div>
    )
  }

  const removable = (key, text, start, end) => {
    const prog = tween(1, 0, start, end, p)
    return (
      <span
        key={key}
        style={{
          ...wordStyle,
          display: 'inline-block',
          overflow: 'hidden',
          width: w[key] * prog,
          opacity: prog,
          marginRight: GAP * prog,
        }}
      >
        {text}
      </span>
    )
  }

  const sp = tween(0, 1, 0.35, 0.85, p)
  const swapWidth = w.and + (w.amp - w.and) * sp

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline' }}>
      {measureBlock}
      {removable('byu', 'BYU', 0, 0.5)}
      {removable('marriott', 'Marriott', 0.12, 0.62)}
      <span style={{ ...wordStyle, display: 'inline-block', marginRight: GAP }}>AI</span>
      <span style={{ position: 'relative', display: 'inline-block', width: swapWidth, marginRight: GAP }}>
        <span style={{ ...wordStyle, opacity: 1 - sp }}>and</span>
        <span style={{ ...wordStyle, position: 'absolute', left: 0, top: 0, opacity: sp }}>&amp;</span>
      </span>
      <span style={{ ...wordStyle, display: 'inline-block', marginRight: GAP }}>Ethics</span>
      <span style={{ ...wordStyle, display: 'inline-block' }}>Initiative</span>
    </div>
  )
}
