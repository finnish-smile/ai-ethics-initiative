import { useState } from 'react'

const OPTIONS = [
  {
    id: 'writing',
    label: 'Writing, research, or general questions',
    pick: 'Claude or ChatGPT',
    reasoning:
      'Both are strong all-around choices for writing and research. Claude tends to produce longer, more carefully-reasoned drafts; ChatGPT has the widest ecosystem of plugins and integrations. Either is a fine place to start.',
  },
  {
    id: 'coding',
    label: 'Coding or technical work',
    pick: 'Claude or ChatGPT',
    reasoning:
      'Both labs put real effort into coding specifically, and both plug into popular code editors. If your school or job already gives you access to one, start there instead of paying for a second one.',
  },
  {
    id: 'workspace',
    label: "I already live in Gmail, Docs, and Sheets",
    pick: 'Gemini',
    reasoning:
      'Gemini is built directly into Google Workspace, so it can read and write your actual docs, sheets, and email without you copy-pasting anything. If you’re already a Google-everything person, this is the path of least resistance.',
  },
  {
    id: 'unsure',
    label: 'Not sure yet — just want to explore',
    pick: 'ChatGPT',
    reasoning:
      'It’s the most widely used and most written-about, which makes troubleshooting and learning from other people’s tips easiest when you’re just getting oriented.',
  },
]

export default function ToolPicker() {
  const [pickedId, setPickedId] = useState(null)
  const picked = OPTIONS.find((o) => o.id === pickedId)

  return (
    <div className="ks-widget ks-widget--picker">
      <p className="ks-widget__prompt">What will you mostly use it for?</p>
      <div className="ks-widget__quiz-options">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`ks-widget__quiz-opt ${pickedId === o.id ? 'is-correct' : ''}`}
            onClick={() => setPickedId(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      {picked && (
        <div className="ks-widget__reveal is-correct">
          <p className="ks-widget__reveal-head">Start with: {picked.pick}</p>
          <p>{picked.reasoning}</p>
        </div>
      )}
    </div>
  )
}
