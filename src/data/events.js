// Content data shared by the home hero carousel and the events pages.

export const spotlights = [
  {
    cat: 'Competition',
    title: 'Logo Design Competition',
    blurb:
      "Help design the AI Ethics Initiative's new logo. Read the guidelines and submit your design.",
    cta: 'Submit a design',
    href: '/logo-competition',
    ph: 'artwork · logo competition',
    tone: 'navy',
  },
  {
    cat: 'New Resource',
    title: 'Personal AI Constitution',
    blurb:
      "A simple framework for self-governing your own AI use — write down your principles, set your own limits, and hold yourself to using these tools ethically, every time.",
    cta: 'Read More',
    href: '/news',
    ph: 'cover · ai constitution',
    tone: 'navy',
  },
  {
    cat: 'Most Used',
    title: 'The AI Ethics Newsletter',
    blurb:
      'A free, weekly newsletter that aims to provide updates on AI regulation, cases of concern, and other topics relating to AI Ethics.',
    cta: 'Read More',
    href: '/news#newsletter',
    ph: 'photo · newsletter',
    tone: 'image',
  },
  {
    cat: 'Feedback',
    title: 'Student Survey',
    blurb:
      'Tell us about your experience! If you have any questions, concerns, or ideas for us, fill out this survey to be a part of the growing initiative for the ethical use of AI.',
    cta: 'Go to the survey',
    href: '/news',
    ph: 'screenshot · students',
    tone: 'navy',
  },
]

// Events (ISO date, sorted ascending). `slug` powers the event detail page
// (/events/<slug>). Only `date`, `title`, `type`, and `slug` are required;
// `time`, `place`, `host`, `desc` (array of paragraphs), and `invite` are
// optional and simply left out of the pages when missing.
export const events = [
  {
    date: '2026-10-01',
    title: 'AI Stewardship Competition',
    type: 'Competition',
    slug: 'ai-stewardship-competition',
  },
  {
    date: '2026-11-05',
    title: 'Case Competition',
    type: 'Competition',
    slug: 'case-competition',
  },
]

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MON_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
export const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const DOW_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function parseDate(iso) {
  const p = iso.split('-')
  return new Date(+p[0], +p[1] - 1, +p[2])
}

export function longDate(iso) {
  const d = parseDate(iso)
  return `${DOW_FULL[d.getDay()]}, ${MON_FULL[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function eventBySlug(slug) {
  return events.find((e) => e.slug === slug) || null
}
