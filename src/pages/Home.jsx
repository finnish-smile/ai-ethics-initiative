import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import UpcomingEvents from '../components/UpcomingEvents.jsx'
import '../home.css'

// Homepage — restored from the earlier Isaac's Draft layout (carousel +
// upcoming events, icon link bar, mission band, featured split, latest
// news, highlight cards), restyled onto the site's current BYU tokens.
// Section styles come from isaac-site.css / isaac-pages.css; home.css
// only holds the homepage-specific adjustments.
//
// Placeholder copy and the links to removed pages ("More about us",
// "Learn how it works" — both pointed at the old About page) are kept
// as-is on purpose; they'll be filled in / repointed later.

const TILES = [
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
    to: '/kickstart',
    label: 'Learn',
    sub: 'Coursework & materials',
    icon: (
      <>
        <path d="M5 18l19-9 19 9-19 9z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M13 22.5V32c0 3 5 6 11 6s11-3 11-6v-9.5" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M43 18v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    to: '/get-involved',
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
]

const NEWS = [
  {
    ph: 'photo · classroom',
    cat: 'Teaching',
    title: 'Six departments adopt the new syllabus toolkit',
    excerpt:
      'Instructors now have shared language for setting fair, transparent expectations around AI use.',
  },
  {
    ph: 'photo · research',
    cat: 'Research',
    title: 'Student researchers map AI use across 40 courses',
    excerpt: 'A first look at how generative tools are actually showing up in coursework this term.',
  },
  {
    ph: 'photo · panel',
    cat: 'Community',
    title: 'Recap: our spring panel on academic integrity',
    excerpt: 'Faculty and students traded hard questions about disclosure, fairness, and trust.',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO: carousel + condensed calendar */}
      <section className="hero home-hero" data-screen-label="Home hero">
        <div className="wrap hero-grid">
          <Carousel />
          <aside className="hero-aside" aria-label="Upcoming events">
            <div className="hero-aside__head">
              <h3>Upcoming</h3>
              <p className="kicker">Next few weeks</p>
            </div>
            <UpcomingEvents limit={4} />
            <div className="hero-aside__foot">
              <Link className="link-more" to="/get-involved">
                Full events calendar<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* SYMBOL LINK BAR — mirrors the main nav */}
      <nav className="symbar symbar--4" aria-label="Sections">
        <div className="wrap symbar__grid">
          {TILES.map((t) => (
            <Link className="symbar__item" to={t.to} key={t.to}>
              <svg className="symbar__icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                {t.icon}
              </svg>
              <span className="symbar__label">{t.label}</span>
              <span className="symbar__sub">{t.sub}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* MISSION */}
      <section className="mission" data-screen-label="Mission">
        <div className="wrap">
          <div className="mission__inner">
            <p className="kicker">Our mission</p>
            <p className="mission__statement">
              We develop Christlike leaders who treat artificial intelligence{' '}
              <em>as a stewardship</em> &mdash; harnessing it ethically for people, communities, and
              the world.
            </p>
            <div className="mission__actions">
              <Link className="btn btn--accent" to="/principles">
                Explore our guiding principles<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        <p className="mission__caption">George Inness, Peace and Plenty, 1865</p>
      </section>

      {/* FEATURED */}
      <section className="section" data-screen-label="Featured">
        <div className="wrap">
          <div className="feature-split" data-reveal>
            <div className="ph ph--navy">
              <span>cover · ai constitution competition</span>
            </div>
            <div className="feature-split__body">
              <p className="kicker">Featured</p>
              <h2>AI Constitution Competition</h2>
              <p className="lead">
                Using the principles in our AI Stewardship handbook, write your own rules for using
                generative AI, then submit your constitution and a short video explaining it.
              </p>
              <Link className="link-more" to="/constitution">
                Enter the competition<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="section section--tight home-news" data-screen-label="Latest news">
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
          <div className="grid cols-3" data-reveal>
            {NEWS.map((n) => (
              <Link className="card" to="/news" key={n.title}>
                <div className="card__media ph">
                  <span>{n.ph}</span>
                </div>
                <div className="card__body">
                  <span className="card__cat">{n.cat}</span>
                  <h3 className="card__title">{n.title}</h3>
                  <p className="card__excerpt">{n.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDARY FEATURE BLOCKS (room for the team to fill) */}
      <section className="section" data-screen-label="Highlights">
        <div className="wrap">
          <div className="grid cols-2" data-reveal>
            <Link className="card home-highlight" to="/principles">
              <div className="card__body">
                <p className="kicker">Start here</p>
                <h3 className="card__title">The Principles of Ethical AI Use</h3>
                <p className="card__excerpt">Tag-line for the principles</p>
                <span className="link-more">
                  <span className="uline">Read the Principles</span>
                  <span className="arrow">&rarr;</span>
                </span>
              </div>
            </Link>
            <Link className="card home-highlight" to="/newsletter">
              <div className="card__body">
                <p className="kicker">Stay in the loop</p>
                <h3 className="card__title">The AI Ethics Newsletter</h3>
                <p className="card__excerpt">Tag-line for the principles</p>
                <span className="link-more">
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
