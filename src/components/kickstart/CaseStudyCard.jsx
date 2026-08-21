import { useState } from 'react'

export default function CaseStudyCard({ kicker, title, scenario, prompt }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="ks-case">
      <p className="ks-case__kicker">{kicker}</p>
      <h3 className="ks-case__title">{title}</h3>
      <p className="ks-case__scenario">{scenario}</p>
      {open ? (
        <div className="ks-case__discuss">
          <p className="ks-case__discuss-label">Discuss</p>
          <p>{prompt}</p>
        </div>
      ) : (
        <button type="button" className="btn btn--ghost" onClick={() => setOpen(true)}>
          What should we ask about this?
          <span className="arrow">&rarr;</span>
        </button>
      )}
    </div>
  )
}
