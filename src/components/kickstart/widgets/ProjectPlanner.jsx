import { useState } from 'react'

const PROMPTS = [
  { id: 'who', label: 'Who is this for?', placeholder: 'A specific person — your roommate, your mom, a friend...' },
  { id: 'need', label: 'What do they actually need?', placeholder: 'Not "AI stuff" — the real, specific problem.' },
  { id: 'build', label: 'What will you build them?', placeholder: 'A study guide, a meal plan, a cover-letter draft...' },
]

export default function ProjectPlanner() {
  const [answers, setAnswers] = useState({})

  return (
    <div className="ks-constitution">
      {PROMPTS.map((p) => (
        <div className="ks-constitution__row" key={p.id}>
          <label htmlFor={`plan-${p.id}`}>
            <span className="ks-constitution__title">{p.label}</span>
          </label>
          <textarea
            id={`plan-${p.id}`}
            rows={2}
            placeholder={p.placeholder}
            value={answers[p.id] || ''}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [p.id]: e.target.value }))}
          />
        </div>
      ))}
    </div>
  )
}
