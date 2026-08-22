import { useState } from 'react'

// Ordered most reversible → least reversible. Shuffled once for display so
// the "correct" order isn't just top-to-bottom.
const ACTIONS = [
  { id: 'draft', label: 'A draft the agent writes for you', rank: 0 },
  { id: 'files', label: 'Reorganizing files into folders', rank: 1 },
  { id: 'message', label: 'Sending a message or email', rank: 2 },
  { id: 'payment', label: 'Making a payment or deleting a file', rank: 3 },
]
const DISPLAY_ORDER = [ACTIONS[2], ACTIONS[0], ACTIONS[3], ACTIONS[1]]

export default function ReversibilitySort() {
  const [picked, setPicked] = useState([])
  const done = picked.length === ACTIONS.length

  const pick = (item) => {
    if (picked.includes(item.id)) return
    setPicked((prev) => [...prev, item.id])
  }

  const reset = () => setPicked([])

  const correctCount = picked.filter((id, i) => ACTIONS.find((a) => a.id === id).rank === i).length

  return (
    <div className="ks-widget ks-widget--sort">
      <p className="ks-widget__prompt">Click these in order, most reversible first:</p>
      <div className="ks-widget__quiz-options">
        {DISPLAY_ORDER.map((item) => {
          const pickedIndex = picked.indexOf(item.id)
          return (
            <button
              key={item.id}
              type="button"
              className={`ks-widget__quiz-opt ${pickedIndex > -1 ? 'is-off' : ''}`}
              onClick={() => pick(item)}
              disabled={pickedIndex > -1}
              style={{ textDecoration: 'none', opacity: pickedIndex > -1 ? 0.6 : 1 }}
            >
              {pickedIndex > -1 ? `${pickedIndex + 1}. ` : ''}
              {item.label}
            </button>
          )
        })}
      </div>
      {done && (
        <div className="ks-widget__reveal is-correct">
          <p className="ks-widget__reveal-head">
            {correctCount} of {ACTIONS.length} in the order we’d rank them.
          </p>
          <p>
            A draft costs nothing to throw away. Reorganized files can usually be moved back. A
            sent message is out in the world the moment it sends. A payment or a deleted file may
            not be recoverable at all — the less reversible the action, the more it deserves a
            real human look before it happens.
          </p>
          <button type="button" className="btn btn--ghost" onClick={reset}>
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
