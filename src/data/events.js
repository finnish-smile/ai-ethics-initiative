// Content data shared by the home hero carousel and the events pages.

export const spotlights = [
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
    cat: 'Fall Launch',
    title: 'Fall Grand Opening',
    blurb: "We'll be doing something somewhere at some point in time.",
    cta: 'Read More',
    href: '/events',
    ph: 'photo · fall launch',
    tone: 'image',
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
// (/events/<slug>). `desc` is an array of paragraphs; `invite` is the
// invitation line.
export const events = [
  {
    date: '2026-06-09',
    time: '12:00 PM',
    title: 'Lunch & Learn: Disclosing AI in Your Coursework',
    type: 'Workshop',
    place: 'Hartley Hall 240',
    host: 'AI in Business Association',
    slug: 'lunch-learn-disclosing-ai',
    desc: [
      'Bring your lunch and learn how to talk about AI use in your assignments with confidence. We’ll walk through what “disclosure” actually means, when it’s expected, and how to phrase it for essays, code, and group projects.',
      "You'll leave with a one-page template you can adapt for any class, plus answers to the questions students ask most.",
    ],
    invite:
      "Open to all students — no preparation or RSVP required. Just show up with your lunch and your questions.",
  },
  {
    date: '2026-06-12',
    time: '3:30 PM',
    title: 'Faculty Panel: Generative AI & Academic Integrity',
    type: 'Panel',
    place: 'Lewis Auditorium',
    host: 'Office of the Provost',
    slug: 'faculty-panel-academic-integrity',
    desc: [
      'Four faculty members from across the university discuss how generative AI is reshaping academic integrity — and how their courses are adapting. Expect candid takes, disagreement, and practical policy ideas.',
      'A moderated audience Q&A follows the panel.',
    ],
    invite: 'Faculty, staff, and students are all welcome. Come with your hardest questions for the panel.',
  },
  {
    date: '2026-06-18',
    time: '5:00 PM',
    title: 'Student Forum: Bias, Fairness & You',
    type: 'Forum',
    place: 'Commons, West Hall',
    host: 'Students for Ethical Tech',
    slug: 'student-forum-bias-fairness',
    desc: [
      'A student-led conversation about where AI bias shows up in everyday tools — from search to hiring to grading — and what fairness should mean for the people on the other side of the output.',
      'Small-group discussion, then a shared debrief. No expertise required.',
    ],
    invite: "All students welcome. Bring an example of AI bias you've run into — we'll discuss real cases.",
  },
  {
    date: '2026-06-24',
    time: '10:00 AM',
    title: 'Workshop: Prompting with Privacy in Mind',
    type: 'Workshop',
    place: 'Library, Room 12',
    host: 'Cybersecurity Club',
    slug: 'workshop-prompting-privacy',
    desc: [
      "A hands-on session on using AI tools without leaking personal or confidential data. We'll cover what gets logged, which settings to change, and how to strip sensitive details before you paste.",
      'Bring a laptop to follow along with the exercises.',
    ],
    invite: 'Open to everyone. Laptops encouraged but not required — you can pair up.',
  },
  {
    date: '2026-07-01',
    time: '4:00 PM',
    title: 'Guest Lecture: The Ethics of Autonomous Systems',
    type: 'Lecture',
    place: 'Lewis Auditorium',
    host: 'Department of Philosophy',
    slug: 'guest-lecture-autonomous-systems',
    desc: [
      'A visiting scholar explores the moral questions raised by systems that act on their own — from self-driving cars to automated decision-making — and who bears responsibility when they fail.',
      'A reception with light refreshments follows the lecture.',
    ],
    invite: 'Free and open to the public. Arrive early for a good seat — this one fills up.',
  },
  {
    date: '2026-07-09',
    time: '12:00 PM',
    title: 'Reading Group: Automating Inequality',
    type: 'Reading Group',
    place: 'Hartley Hall 240',
    host: 'Data Science Society',
    slug: 'reading-group-automating-inequality',
    desc: [
      'A discussion of Virginia Eubanks’ “Automating Inequality” and what it tells us about how automated systems affect the most vulnerable. We’ll focus on the first three chapters.',
      "Haven't finished the reading? Come anyway — the conversation stands on its own.",
    ],
    invite: 'All readers welcome. Copies of the chapters are available on request — just reach out.',
  },
  {
    date: '2026-07-15',
    time: '9:00 AM',
    title: 'Symposium: Algorithmic Accountability in Higher Ed',
    type: 'Club',
    place: 'Conference Center',
    host: 'AI Ethics Initiative',
    slug: 'symposium-algorithmic-accountability',
    desc: [
      'A half-day symposium bringing together students, faculty, and staff to examine how algorithms are used in admissions, advising, and grading — and what accountability should look like.',
      'Includes keynote talks, breakout sessions, and a closing roundtable.',
    ],
    invite: 'Open to the whole campus community. Drop in for a single session or stay for the day.',
  },
  {
    date: '2026-07-22',
    time: '3:30 PM',
    title: 'Office Hours: Bring Your AI Policy Questions',
    type: 'Drop-in',
    place: 'Hartley Hall 240',
    host: 'AI Ethics Initiative',
    slug: 'office-hours-ai-policy',
    desc: [
      'Informal drop-in time with the Initiative team. Bring any question about AI use, disclosure, course policy, or the principles — we’ll talk it through with you.',
      'No appointment needed; stay as long or as little as you like.',
    ],
    invite: 'Everyone welcome, any question. Come solo or bring your study group.',
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
