// The five principles from the team's in-progress guidebook,
// "Stewardship of AI" (navyw2.github.io/BYU-AI) — Stewardship is that
// guidebook's overarching title/frame, not a sixth numbered principle.
// Pause questions are quoted directly from the guidebook; definitions here
// are our own short summaries for use inside Kickstart specifically.

export const GUIDEBOOK_URL = 'https://navyw2.github.io/BYU-AI/'

export const PRINCIPLES = [
  {
    id: 'agency',
    title: 'Agency',
    pause: 'Am I handing my decisions over to AI?',
    definition: 'AI can inform a decision. It shouldn’t make the decision for you.',
  },
  {
    id: 'becoming',
    title: 'Becoming',
    pause: 'Who am I growing into with AI?',
    definition: 'Use AI to stretch and grow, not to skip the growing.',
  },
  {
    id: 'fellowship',
    title: 'Fellowship',
    pause: 'How does my AI use affect others?',
    definition: 'AI doesn’t replace real relationships — it should point you back to people, not away from them.',
  },
  {
    id: 'discernment',
    title: 'Discernment',
    pause: 'Can I trust what AI tells me?',
    definition: 'Back claims with sources, verify what matters, and flag your own uncertainty instead of guessing.',
  },
  {
    id: 'integrity',
    title: 'Integrity',
    pause: 'Am I the same, seen or unseen, with my AI use?',
    definition: 'Never use AI to cut corners or take credit for work you didn’t do.',
  },
]

export const principleById = (id) => PRINCIPLES.find((p) => p.id === id)
