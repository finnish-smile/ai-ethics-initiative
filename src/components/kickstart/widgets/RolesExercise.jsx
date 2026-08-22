import { useState } from 'react'

const ROLES = [
  {
    id: 'creator',
    title: 'Creator',
    blurb: 'Makes a first draft from scratch.',
    prompt:
      'Act as a Creator. Here’s what I’m working on: [paste your topic/assignment]. Draft a first version — don’t worry about polish, just get a real attempt on the page I can react to.',
  },
  {
    id: 'reviewer',
    title: 'Reviewer',
    blurb: 'Critiques what already exists.',
    prompt:
      'Act as a Reviewer. Here’s a draft I wrote: [paste your own draft]. Don’t rewrite it — tell me the three weakest parts and exactly why they’re weak.',
  },
  {
    id: 'thought-partner',
    title: 'Thought Partner',
    blurb: 'Pushes your thinking, doesn’t hand you answers.',
    prompt:
      'Act as a Thought Partner. I’m trying to think through [paste your topic]. Don’t give me your conclusion — ask me questions that help me figure out my own.',
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    blurb: 'Looks for the practical angle — cost, risk, tradeoffs.',
    prompt:
      'Act as a Business Analyst. Here’s what I’m considering: [paste your idea/plan]. What are the real tradeoffs, risks, or costs I might be missing?',
  },
]

export default function RolesExercise() {
  const [active, setActive] = useState(ROLES[0].id)
  const [notes, setNotes] = useState({})
  const role = ROLES.find((r) => r.id === active)

  return (
    <div className="ks-tabs">
      <div className="ks-tabs__nav" role="tablist" aria-label="Role">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={r.id === active}
            className={`ks-tabs__tab ${r.id === active ? 'is-active' : ''}`}
            onClick={() => setActive(r.id)}
          >
            {r.title}
          </button>
        ))}
      </div>
      <div className="ks-tabs__panel">
        <p className="ks-tabs__pause">{role.blurb}</p>
        <div className="ks-widget__ai-answer" style={{ display: 'block', fontFamily: 'var(--font-body)', marginBottom: 16 }}>
          {role.prompt}
        </div>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 10 }}>
          Paste the same piece of your own work into all four roles, in your actual AI tool, and
          jot down what changed:
        </p>
        <textarea
          className="ks-roles__notes"
          rows={3}
          placeholder={`What did the ${role.title} give you that the others didn't?`}
          value={notes[role.id] || ''}
          onChange={(e) => setNotes((prev) => ({ ...prev, [role.id]: e.target.value }))}
        />
      </div>
    </div>
  )
}
