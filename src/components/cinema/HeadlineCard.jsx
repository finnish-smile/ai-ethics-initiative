import { useState } from 'react'

// A single headline "clipping" in the doom or hope cluster. The card itself
// toggles its detail panel open on tap/click (works with no hover on
// mobile) and on keyboard focus (CSS :focus-within) — the actual outbound
// link only lives inside that revealed detail panel, as a real <a> with the
// headline as its accessible name, so screen readers and keyboard users
// always reach a normal, distinctly-labeled link rather than "click here."
//
// When a real, verified URL isn't available yet (see the TODOs in
// data/cinema-headlines.js), the detail panel shows a "Source link coming
// soon" note instead of ever linking to a guessed/placeholder URL.
export default function HeadlineCard({
  source,
  headline,
  display,
  byline,
  url,
  index = 0,
  variant = 'doom',
  revealed,
  position,
}) {
  const [open, setOpen] = useState(false)

  // Doom cards get more rotation/scatter (feels chaotic); hope cards are
  // calmer and closer to aligned (feels ordered) — a small fixed sequence
  // per index so it's stable across renders rather than random each time.
  const doomRotations = [-5, 4, -3, 6, -4]
  const hopeRotations = [-2, 1, -1.5, 2, -1, 1.5, -2]
  const rotation = variant === 'doom' ? doomRotations[index % 5] : hopeRotations[index % 7]

  const accessibleName = headline || display
  const hasSource = Boolean(url)

  return (
    <div
      className={`cinema-card cinema-card--${variant} ${revealed ? 'revealed' : ''} ${open ? 'is-open' : ''}`}
      style={{
        '--cinema-rotate': `${rotation}deg`,
        '--cinema-top': position?.top,
        '--cinema-left': position?.left,
        transitionDelay: revealed ? `${index * 0.2}s` : '0s',
      }}
      // Purely a visual/tap toggle for mobile (no hover) — keyboard users
      // get the same reveal for free via :focus-within in CSS, and the
      // real link below is independently reachable by Tab regardless.
      onClick={() => setOpen((o) => !o)}
    >
      <p className="cinema-card__source">{source}</p>
      {/* The dotted underline (see .cinema-card__headline in CSS) is the
          always-visible affordance signaling this is interactive — no
          separate icon needed. */}
      <p className="cinema-card__headline">{display || headline}</p>

      <div className="cinema-card__detail">
        {byline && <span className="cinema-card__byline">{byline}</span>}
        {hasSource ? (
          <a
            className="cinema-card__cta"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {accessibleName} <span aria-hidden="true">— read the source →</span>
          </a>
        ) : (
          <span className="cinema-card__cta cinema-card__cta--pending">Source link coming soon</span>
        )}
      </div>
    </div>
  )
}
