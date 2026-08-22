import { useState } from 'react'

export default function Checklist({ items }) {
  const [checked, setChecked] = useState(() => items.map(() => false))
  const done = checked.filter(Boolean).length

  const toggle = (i) => {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  return (
    <div className="ks-checklist">
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          className={`ks-checklist__item ${checked[i] ? 'is-done' : ''}`}
          onClick={() => toggle(i)}
        >
          <span className="ks-checklist__box">{checked[i] ? '✓' : ''}</span>
          <span>{item}</span>
        </button>
      ))}
      <p className="ks-checklist__count">
        {done}/{items.length} done
      </p>
    </div>
  )
}
