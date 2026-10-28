// Content data shared by the home hero carousel and the events pages.

// Home + Events slideshow. Each slide shows the painting from the page it
// links to (smaller copies in public/images/slideshow/ so the homepage loads
// fast — the pages themselves keep the full-size originals). No painting
// credit here: the destination page already credits it. `focus` is the CSS
// object-position used to crop the painting into the slide's image box.
export const spotlights = [
  {
    cat: 'Competition',
    title: 'AI Constitution Competition',
    blurb:
      "Every nation’s founders wrote down what they believed before they had to act on it. Now it’s your turn: write your own constitution for how you’ll use AI.",
    cta: 'Enter the competition',
    href: '/constitution',
    img: 'images/slideshow/school-of-athens.jpg',
    alt: 'Raphael, The School of Athens',
    focus: '50% 50%',
  },
  {
    cat: 'The Guidebook',
    title: 'The Stewardship of AI',
    blurb:
      'Who are you growing into with AI? Explore five principles for using these tools as a steward, not a servant.',
    cta: 'Explore the principles',
    href: '/principles',
    img: 'images/slideshow/lackawanna-valley.jpg',
    alt: 'George Inness, The Lackawanna Valley',
    focus: '50% 50%',
  },
  {
    cat: 'News',
    title: 'The Inchworm Dispatch',
    blurb:
      'The week’s AI ethics news, gathered in one place. Catch up in a few minutes, or get it in your inbox every Friday.',
    cta: 'Read this week’s news',
    href: '/news',
    img: 'images/slideshow/village-politicians.jpg',
    alt: 'Wilhelm Leibl, The Village Politicians',
    focus: '50% 30%',
  },
]

// Events (ISO date, sorted ascending). `slug` powers the event detail page
// (/events/<slug>). Only `date`, `title`, `type`, and `slug` are required;
// `time`, `place`, `host`, `desc` (array of paragraphs), and `invite` are
// optional and simply left out of the pages when missing. An optional `href`
// sends the event's links to a dedicated page instead of /events/<slug>.
export const events = [
  {
    date: '2026-10-01',
    title: 'AI Constitution Competition',
    type: 'Competition',
    slug: 'ai-constitution-competition',
    href: '/constitution',
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
