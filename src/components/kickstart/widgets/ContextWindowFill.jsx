import { useState } from 'react'

const CAPACITY = 5

export default function ContextWindowFill() {
  // Both counters live in one state object and update together in a single
  // setState call — a setState updater must stay pure (no calling another
  // setter from inside it), or React's StrictMode double-invoking it in
  // dev double-counts the side effect.
  const [{ total, pushedOut }, setState] = useState({ total: 0, pushedOut: 0 })

  const visible = Math.min(total, CAPACITY)
  const slots = Array.from({ length: CAPACITY }, (_, i) => {
    const slotFromEnd = CAPACITY - i
    const messageNumber = total - slotFromEnd + 1
    return messageNumber > 0 ? messageNumber : null
  })

  const addMessage = () => {
    setState((s) => {
      const nextTotal = s.total + 1
      const nextPushedOut = nextTotal > CAPACITY ? s.pushedOut + 1 : s.pushedOut
      return { total: nextTotal, pushedOut: nextPushedOut }
    })
  }
  const reset = () => setState({ total: 0, pushedOut: 0 })

  return (
    <div className="ks-widget ks-widget--context">
      <p className="ks-widget__prompt">A conversation with a {CAPACITY}-message window</p>
      <div className="ks-context__window">
        {slots.map((n, i) => (
          <div key={i} className={`ks-context__slot ${n ? 'is-filled' : ''}`}>
            {n ? `Msg ${n}` : ''}
          </div>
        ))}
      </div>
      <div className="ks-context__meta">
        <span>{total} messages sent</span>
        <span>{visible} currently in the window</span>
        {pushedOut > 0 && <span>{pushedOut} pushed out (not "forgotten" — truncated)</span>}
      </div>
      <div className="ks-widget__options">
        <button type="button" className="btn btn--accent" onClick={addMessage}>
          Send a message
        </button>
        <button type="button" className="btn btn--ghost" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}
