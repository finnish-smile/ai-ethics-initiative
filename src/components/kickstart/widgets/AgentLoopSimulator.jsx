import { useState } from 'react'

const STAGES = [
  {
    id: 'think',
    label: 'Think',
    detail: 'The model reasons about the goal: "I need this week’s top 3 AI ethics stories, summarized."',
  },
  {
    id: 'act',
    label: 'Act',
    detail: 'It writes an action — e.g. "search the web for AI ethics news from this week" — and hands it to the surrounding software.',
  },
  {
    id: 'observe',
    label: 'Observe',
    detail: 'The software actually runs that search and pastes the results back into the model’s context window.',
  },
  {
    id: 'repeat',
    label: 'Repeat',
    detail: 'The model looks at what came back and decides: done, or loop again — maybe reading one article in full before summarizing.',
  },
]

export default function AgentLoopSimulator() {
  const [index, setIndex] = useState(0)
  const [loops, setLoops] = useState(0)
  const stage = STAGES[index]

  const next = () => {
    if (index === STAGES.length - 1) {
      setLoops((l) => l + 1)
      setIndex(0)
    } else {
      setIndex((i) => i + 1)
    }
  }

  return (
    <div className="ks-widget ks-widget--loop">
      <div className="ks-loop__stages">
        {STAGES.map((s, i) => (
          <div key={s.id} className={`ks-loop__stage ${i === index ? 'is-active' : ''} ${i < index ? 'is-done' : ''}`}>
            {s.label}
          </div>
        ))}
      </div>
      <div className="ks-widget__reveal is-correct" style={{ marginTop: 18 }}>
        <p className="ks-widget__reveal-head">{stage.label}</p>
        <p>{stage.detail}</p>
      </div>
      <div className="ks-widget__options">
        <button type="button" className="btn btn--accent" onClick={next}>
          {index === STAGES.length - 1 ? 'Loop again' : 'Next step'}
          <span className="arrow">&rarr;</span>
        </button>
        {loops > 0 && <span className="ks-checklist__count">Looped {loops}x</span>}
      </div>
    </div>
  )
}
