import { Link } from 'react-router-dom'
import { articles, longDate } from '../data/news.js'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import ArticleSuggestForm from '../components/ArticleSuggestForm.jsx'

function TagList({ topics, isNew }) {
  return (
    <span className="feed-tags">
      {topics.map((t) => (
        <span className="topic-tag" key={t}>
          {t}
        </span>
      ))}
      {isNew && <span className="feed-new">New</span>}
    </span>
  )
}

export default function News() {

  const lead = articles[0]
  const side = articles.slice(1, 4)

  return (
    <>
      <header className="phead phead--painting">
        <img
          className="phead__painting"
          src={`${import.meta.env.BASE_URL}images/village-politicians-leibl.jpg`}
          alt="Wilhelm Leibl, The Village Politicians, a painting of five village men on a bench leaning in to read a newspaper together"
        />
        <div className="wrap">
          <p className="kicker">News</p>
          <h1>The Inchworm Dispatch</h1>
          <p>The week&rsquo;s AI ethics news, gathered in one place.</p>
        </div>
        <p className="phead__caption">Wilhelm Leibl, The Village Politicians, 1877</p>
      </header>

      <section className="section" data-screen-label="Featured">
        <div className="wrap">
          <div className="section-head news-head">
            <div>
              <p className="kicker">Latest</p>
              <h2>This week in AI ethics</h2>
            </div>
            <Link className="link-more" to="/articles">
              Browse all articles<span className="arrow">&rarr;</span>
            </Link>
          </div>
          <div className="news-layout">
            <article className="news-lead news-lead--nl" data-reveal>
              <div className="ph ph--nl">
                <span>cover &middot; featured article</span>
                <span className="nl-flag">Featured</span>
              </div>
              <div className="news-lead__body">
                <p className="nl-eyebrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Featured article
                </p>
                <span className="nl-date">Source &middot; Date</span>
                <h2>Featured article headline</h2>
                <p className="lead">
                  A short summary of the featured article will go here: a sentence or two on what it covers and
                  why it matters this week.
                </p>
                <div className="nl-lead-actions">
                  {/* Placeholder: point this at the featured article once it exists. */}
                  <a className="btn btn--accent" href="#">
                    Read the article<span className="arrow">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
            <div className="news-side-col">
              <div className="news-side reveal-stagger">
                {side.map((a) => (
                  <article className="news-item" key={a.title} data-reveal>
                    <TagList topics={a.topics} isNew={a.isNew} />
                    <h3>
                      <a href={a.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        {a.title}
                      </a>
                    </h3>
                    <p>{a.excerpt}</p>
                    <span className="news-item__meta">
                      {a.source} &middot; {longDate(a.date)}
                    </span>
                  </article>
                ))}
              </div>
              <div className="page-actions" style={{ marginTop: 28 }}>
                <Link className="btn btn--accent" to="/articles">
                  View all news<span className="arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter" id="newsletter" style={{ scrollMarginTop: 84 }} data-screen-label="Subscribe">
        <div className="wrap">
          <div className="nl-banner">
            <div className="nl-banner__text">
              <p className="kicker" style={{ color: 'rgba(255,255,255,0.65)' }}>
                The Inchworm Dispatch
              </p>
              <h2>Get the Dispatch in your inbox</h2>
              <p>The week&rsquo;s AI ethics news in one short email. No noise &mdash; unsubscribe anytime.</p>
            </div>
            <NewsletterSignup source="News page" />
          </div>
        </div>
      </section>

      <section className="section" id="suggest" style={{ scrollMarginTop: 84 }} data-screen-label="Suggest an article">
        <div className="wrap">
          <ArticleSuggestForm />
        </div>
      </section>
    </>
  )
}
