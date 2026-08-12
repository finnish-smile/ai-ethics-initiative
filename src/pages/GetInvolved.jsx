import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import UpcomingEvents from '../components/UpcomingEvents.jsx'

const SYMBAR = [
  {
    to: '/about',
    label: 'About',
    sub: 'What is the Initiative?',
    icon: (
      <>
        <path d="M10 12a3 3 0 0 1 3-3h9a3 3 0 0 1 2 1 3 3 0 0 1 2-1h9a3 3 0 0 1 3 3v22a2 2 0 0 1-2 2h-9a3 3 0 0 0-3 2 3 3 0 0 0-3-2h-9a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M24 11v25" stroke="currentColor" strokeWidth="2.2" />
      </>
    ),
  },
  {
    to: '/principles',
    label: 'Principles',
    sub: 'Ethical AI use',
    icon: (
      <>
        <path d="M24 6l14 6v10c0 9-6 15-14 18-8-3-14-9-14-18V12z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M18 24l4.5 4.5L31 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    to: '/events',
    label: 'Events',
    sub: 'Calendar',
    icon: (
      <>
        <rect x="8" y="11" width="32" height="29" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <path d="M8 19h32M16 7v8M32 7v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="17" cy="27" r="1.8" fill="currentColor" />
        <circle cx="24" cy="27" r="1.8" fill="currentColor" />
        <circle cx="31" cy="27" r="1.8" fill="currentColor" />
      </>
    ),
  },
  {
    to: '/news',
    label: 'News',
    sub: 'Updates & Newsletters',
    icon: (
      <>
        <path d="M8 12h24v26H11a3 3 0 0 1-3-3z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M32 17h6v18a3 3 0 0 1-6 0z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M13 18h14M13 24h14M13 30h9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    to: '/connections',
    label: 'Connections',
    sub: 'On campus',
    icon: (
      <>
        <circle cx="24" cy="11" r="5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="11" cy="35" r="5" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="37" cy="35" r="5" stroke="currentColor" strokeWidth="2.2" />
        <path d="M24 16v9m0 0l-9 7m9-7l9 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
]

const NEWS_CARDS = [
  { cat: 'Teaching', title: 'Six departments adopt the new syllabus toolkit', excerpt: 'Instructors now have shared language for setting fair, transparent expectations around AI use.', ph: 'photo · classroom' },
  { cat: 'Research', title: 'Student researchers map AI use across 40 courses', excerpt: 'A first look at how generative tools are actually showing up in coursework this term.', ph: 'photo · research' },
  { cat: 'Community', title: 'Recap: our spring panel on academic integrity', excerpt: 'Faculty and students traded hard questions about disclosure, fairness, and trust.', ph: 'photo · panel' },
]

export default function GetInvolved() {
  return (
    <>
      <section className="hero" data-screen-label="Home hero">
        <div className="wrap hero-grid">
          <Carousel />
          <aside className="hero-aside" aria-label="Upcoming events">
            <div className="hero-aside__head">
              <h3>Upcoming</h3>
              <p className="kicker">Next few weeks</p>
            </div>
            <UpcomingEvents limit={4} />
            <div className="hero-aside__foot">
              <Link className="link-more" to="/events">
                Full events calendar<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <nav className="symbar" aria-label="Sections">
        <div className="wrap symbar__grid">
          {SYMBAR.map((s) => (
            <Link className="symbar__item" to={s.to} key={s.to}>
              <svg className="symbar__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                {s.icon}
              </svg>
              <span className="symbar__label">{s.label}</span>
              <span className="symbar__sub">{s.sub}</span>
            </Link>
          ))}
        </div>
      </nav>

      <section className="section" data-screen-label="Featured">
        <div className="wrap">
          <div className="feature-split">
            <div className="ph">
              <span>photo · students &amp; faculty</span>
            </div>
            <div className="feature-split__body">
              <p className="kicker">Featured</p>
              <h2>Something Cool That Should be Featured</h2>
              <p className="lead">
                We made this really cool thing for students, and we want to show it off. Check it
                out!
              </p>
              <Link className="link-more" to="/about">
                Learn how it works<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--tight"
        style={{ background: '#fff', borderBlock: '1px solid var(--line)' }}
        data-screen-label="Latest news"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Latest</p>
              <h2>News &amp; announcements</h2>
            </div>
            <Link className="link-more" to="/news">
              All news<span className="arrow">&rarr;</span>
            </Link>
          </div>
          <div className="grid cols-3">
            {NEWS_CARDS.map((c) => (
              <Link className="card" to="/news" key={c.title}>
                <div className="card__media ph">
                  <span>{c.ph}</span>
                </div>
                <div className="card__body">
                  <span className="card__cat">{c.cat}</span>
                  <h3 className="card__title">{c.title}</h3>
                  <p className="card__excerpt">{c.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-screen-label="Highlights">
        <div className="wrap">
          <div className="grid cols-2">
            <Link className="card" to="/principles" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              <div className="card__body" style={{ padding: 32 }}>
                <p className="kicker">Start here</p>
                <h3 className="card__title" style={{ fontSize: 26 }}>
                  The Principles of Ethical AI Use
                </h3>
                <p className="card__excerpt" style={{ fontSize: 16 }}>
                  Tag-line for the principles
                </p>
                <span className="link-more" style={{ marginTop: 18 }}>
                  <span className="uline">Read the Principles</span>
                  <span className="arrow">&rarr;</span>
                </span>
              </div>
            </Link>
            <Link className="card" to="/news#newsletter" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
              <div className="card__body" style={{ padding: 32 }}>
                <p className="kicker">Stay in the loop</p>
                <h3 className="card__title" style={{ fontSize: 26 }}>
                  The AI Ethics Newsletter
                </h3>
                <p className="card__excerpt" style={{ fontSize: 16 }}>
                  Tag-line for the principles
                </p>
                <span className="link-more" style={{ marginTop: 18 }}>
                  <span className="uline">Subscribe now</span>
                  <span className="arrow">&rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
