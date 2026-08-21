import { useState } from 'react'
import { PRINCIPLES } from '../../data/kickstart/principles.js'
import { GONG_QUOTES, GONG_VIDEO_URL } from '../../data/kickstart/quotes.js'
import PullQuote from './PullQuote.jsx'

export default function PrincipleTabs() {
  const [active, setActive] = useState(PRINCIPLES[0].id)
  const principle = PRINCIPLES.find((p) => p.id === active)
  const quotes = GONG_QUOTES[active] || []

  return (
    <div className="ks-tabs">
      <div className="ks-tabs__nav" role="tablist" aria-label="Principle">
        {PRINCIPLES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === active}
            className={`ks-tabs__tab ${p.id === active ? 'is-active' : ''}`}
            onClick={() => setActive(p.id)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="ks-tabs__panel">
        <p className="ks-tabs__pause">&ldquo;{principle.pause}&rdquo;</p>
        {quotes.map((q, i) => (
          <PullQuote key={i} text={q.text} attribution="Elder Gerrit W. Gong" />
        ))}
        <a className="link-more" href={GONG_VIDEO_URL} target="_blank" rel="noopener noreferrer">
          Watch the full address
          <span className="arrow">&rarr;</span>
        </a>
      </div>
    </div>
  )
}
