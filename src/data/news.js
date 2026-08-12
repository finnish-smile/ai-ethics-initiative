// News feed + newsletter content data, shared by the news overview, the
// full article browser, the newsletter page, and the newsletter archive.

export const TOPICS = [
  'Safety & Alignment',
  'Education & Academia',
  'Bias & Fairness',
  'Regulation & Policy',
  'Privacy & Data',
  'Misinformation',
  'Labor & Economy',
  'Healthcare',
  'Copyright & IP',
  'Transparency',
  'Governance',
  'Environment',
]

export const MOST_USED = [
  'Safety & Alignment',
  'Education & Academia',
  'Bias & Fairness',
  'Regulation & Policy',
  'Privacy & Data',
  'Misinformation',
]

// Aggregated articles (scraped + tagged), newest first.
export const articles = [
  { date: '2026-06-08', source: 'Stanford HAI', isNew: true, href: '#',
    topics: ['Safety & Alignment'],
    title: 'New benchmark probes whether frontier models will refuse unsafe requests',
    excerpt: 'A 2,000-prompt suite tests how reliably the latest systems decline harmful instructions — and where guardrails still slip.' },
  { date: '2026-06-07', source: 'MIT Technology Review', isNew: true, href: '#',
    topics: ['Education & Academia'],
    title: 'Universities pilot shared standards for disclosing AI in coursework',
    excerpt: 'A consortium of fourteen schools is testing common language so students and faculty mean the same thing by "AI-assisted."' },
  { date: '2026-06-06', source: 'Reuters', isNew: true, href: '#',
    topics: ['Regulation & Policy', 'Transparency'],
    title: 'EU finalizes guidance on general-purpose AI transparency obligations',
    excerpt: 'Providers will need to publish training-data summaries and document known risks under rules taking effect this year.' },
  { date: '2026-06-05', source: 'Nature', isNew: true, href: '#',
    topics: ['Bias & Fairness', 'Labor & Economy'],
    title: 'Audit finds hiring tools still penalize non-native English speakers',
    excerpt: 'Resume-screening models scored identical qualifications lower when phrasing diverged from a narrow linguistic norm.' },
  { date: '2026-06-04', source: 'The Verge', href: '#',
    topics: ['Privacy & Data', 'Transparency'],
    title: 'Chatbots are logging more than users assume, study finds',
    excerpt: 'Researchers traced how conversational data is retained, reused for training, and shared with third parties by default.' },
  { date: '2026-06-03', source: 'AP News', href: '#',
    topics: ['Misinformation'],
    title: 'Fact-checkers brace for AI-generated clips ahead of fall elections',
    excerpt: 'Newsrooms are rebuilding verification workflows as synthetic audio and video grow cheaper and more convincing.' },
  { date: '2026-06-02', source: 'Brookings', href: '#',
    topics: ['Regulation & Policy', 'Education & Academia'],
    title: 'Policy brief: who is liable when an AI tutor gives wrong advice?',
    excerpt: 'As automated tutoring spreads through classrooms, scholars map the gaps between vendors, schools, and instructors.' },
  { date: '2026-05-30', source: 'Wired', href: '#',
    topics: ['Safety & Alignment'],
    title: 'Inside the red teams stress-testing the next wave of models',
    excerpt: 'A look at the contractors paid to break frontier systems before the public does — and what keeps slipping past them.' },
  { date: '2026-05-29', source: 'The Markup', href: '#',
    topics: ['Education & Academia', 'Bias & Fairness'],
    title: 'Schools switch off AI detectors after false cheating accusations',
    excerpt: 'Districts report that detection tools disproportionately flagged multilingual students for work they wrote themselves.' },
  { date: '2026-05-28', source: 'Financial Times', href: '#',
    topics: ['Privacy & Data', 'Regulation & Policy', 'Copyright & IP'],
    title: 'Regulators question the data brokers feeding model training sets',
    excerpt: 'Investigators want to know how personal records end up in scraped corpora — and whether consent ever applied.' },
  { date: '2026-05-27', source: 'Science', href: '#',
    topics: ['Misinformation'],
    title: 'Researchers map how synthetic media spreads through social networks',
    excerpt: 'A large study tracks the share patterns that let AI-generated falsehoods outrun corrections.' },
  { date: '2026-05-26', source: 'IEEE Spectrum', href: '#',
    topics: ['Safety & Alignment'],
    title: 'Alignment researchers debate the limits of interpretability',
    excerpt: 'Can we trust a model we cannot fully explain? Two camps stake out very different answers.' },
  { date: '2026-05-24', source: 'NPR', href: '#',
    topics: ['Education & Academia', 'Bias & Fairness'],
    title: 'Students say automated grading feels like a black box',
    excerpt: 'Without explanations or appeals, learners describe losing trust in scores they cannot question.' },
  { date: '2026-05-22', source: 'Politico', href: '#',
    topics: ['Regulation & Policy', 'Governance'],
    title: 'State lawmakers introduce a wave of algorithmic-transparency bills',
    excerpt: 'More than a dozen statehouses are weighing disclosure rules for automated decisions in hiring, housing, and lending.' },
]

// Newsletter issues (newest first; [0] is the current issue).
export const issues = [
  {
    no: 24, date: '2026-06-05', title: 'The disclosure question',
    summary: 'Campuses converge on a shared vocabulary for AI use — even as detection tools fall out of favor and a fresh brief sharpens the liability question.',
    intro: 'This week the story was disclosure: not whether students use AI, but how clearly everyone agrees to say so. A consortium of schools moved toward shared language, detection vendors lost more ground, and a new brief asked who answers when an AI tutor is wrong. Here is what we read, and why it matters for how we teach.',
    picks: [
      { title: 'Universities pilot shared standards for disclosing AI in coursework', source: 'MIT Technology Review', href: '#',
        note: 'Fourteen institutions are testing common phrasing so "AI-assisted" means the same thing in a writing seminar and a programming lab. The draft is refreshingly short — three tiers, plain language.' },
      { title: 'Policy brief: who is liable when an AI tutor gives wrong advice?', source: 'Brookings', href: '#',
        note: 'As automated tutoring spreads, the brief maps the gaps between vendor, institution, and instructor — and argues that disclosure alone will not settle responsibility.' },
      { title: 'Schools switch off AI detectors after false cheating accusations', source: 'The Markup', href: '#',
        note: 'Several districts pulled detection tools after they disproportionately flagged multilingual students. A reminder that the cost of a false positive lands unevenly.' },
      { title: 'New benchmark probes whether frontier models will refuse unsafe requests', source: 'Stanford HAI', href: '#',
        note: 'Not strictly an education story, but the refusal data matters for any classroom deploying these tools: guardrails still slip in predictable places.' },
      { title: 'From the Initiative: a one-page guide to disclosing AI use', source: 'AI Ethics Initiative', href: '#',
        note: 'Our own quick reference — when disclosure is expected and how to phrase it for essays, code, and research. Free to adapt for your syllabus.' },
    ],
    closing: 'If your department is drafting disclosure language this term, we would love to compare notes. Reply to this email or reach us at ai-ethics@byu.edu.',
  },
  { no: 23, date: '2026-05-29', title: 'Red teams and guardrails', count: 5,
    summary: 'Inside the groups paid to break frontier models before the public does — and the alignment debate over what interpretability can and cannot promise.' },
  { no: 22, date: '2026-05-22', title: 'Who owns the training data?', count: 6,
    summary: 'Regulators turn their attention to the data brokers feeding model training sets, and the consent questions nobody answered on the way in.' },
  { no: 21, date: '2026-05-15', title: 'Bias in the hiring stack', count: 5,
    summary: 'An audit finds resume screeners still penalize non-native speakers — and what a fairer evaluation pipeline would actually require.' },
  { no: 20, date: '2026-05-08', title: 'Election season, synthetic media', count: 4,
    summary: 'Fact-checkers rebuild verification workflows as AI-generated audio and video grow cheaper ahead of the fall votes.' },
  { no: 19, date: '2026-05-01', title: 'Privacy by default', count: 5,
    summary: 'Chatbots log more than users assume. We look at retention, reuse, and the handful of settings worth changing today.' },
  { no: 18, date: '2026-04-24', title: 'Grading in a black box', count: 6,
    summary: 'Students describe losing trust in automated scores they cannot question — and what transparent grading could look like.' },
]

export const latestIssue = issues[0]

export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MON_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function parseDate(iso) {
  const p = iso.split('-')
  return new Date(+p[0], +p[1] - 1, +p[2])
}

export function shortDate(iso) {
  const d = parseDate(iso)
  return `${MON[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function longDate(iso) {
  const d = parseDate(iso)
  return `${MON_FULL[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}
