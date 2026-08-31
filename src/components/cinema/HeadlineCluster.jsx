import HeadlineCard from './HeadlineCard.jsx'

// Scatter positions (top%, left%) around the pinned, centered statement —
// doom's are looser/more uneven (chaotic); hope's are closer to a mirrored
// left/right arrangement (ordered), per the build spec's "clarity vs.
// chaos" note. Index-matched to DOOM_HEADLINES / HOPE_HEADLINES.
const DOOM_POSITIONS = [
  { top: '14%', left: '9%' },
  { top: '10%', left: '91%' },
  { top: '50%', left: '3%' },
  { top: '90%', left: '20%' },
  { top: '86%', left: '84%' },
]

const HOPE_POSITIONS = [
  { top: '6%', left: '7%' },
  { top: '4%', left: '93%' },
  { top: '36%', left: '3%' },
  { top: '33%', left: '97%' },
  { top: '68%', left: '6%' },
  { top: '65%', left: '94%' },
  { top: '97%', left: '50%' },
]

// Scattered "newspaper clipping" cluster, positioned around the pinned
// statement in its own beat — cards land staggered (see HeadlineCard's
// per-index transitionDelay) once `revealed` flips true. `variant`
// controls both the visual tone (doom: more rotation/overlap = chaotic;
// hope: calmer/more aligned = ordered) and which fields each card reads
// (doom shows the real headline directly; hope shows a plain-language
// `display` line, with the real headline surfacing in the detail panel).
export default function HeadlineCluster({ items, variant, revealed }) {
  const positions = variant === 'doom' ? DOOM_POSITIONS : HOPE_POSITIONS
  return (
    <div className={`cinema-cluster cinema-cluster--${variant}`}>
      {items.map((item, i) => (
        <HeadlineCard
          key={item.source + (item.headline || item.display)}
          {...item}
          index={i}
          variant={variant}
          revealed={revealed}
          position={positions[i % positions.length]}
        />
      ))}
    </div>
  )
}
