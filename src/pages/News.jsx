import { Link } from 'react-router-dom'
import { articles, latestIssue, longDate } from '../data/news.js'
import NewsletterSignup from '../components/NewsletterSignup.jsx'

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
          <p className="kicker">News &amp; newsletter</p>
          <h1>News Something-or-other</h1>
          <p>Tag-line for the news feed and newsletter</p>
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
                <span>cover &middot; newsletter</span>
                <span className="nl-flag">Newsletter</span>
              </div>
              <div className="news-lead__body">
                <p className="nl-eyebrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  The Inchworm Newsletter
                </p>
                <span className="nl-date">
                  Issue No. {latestIssue.no} &middot; {longDate(latestIssue.date)}
                </span>
                <h2>{latestIssue.title}</h2>
                <p className="lead">{latestIssue.summary}</p>
                <div className="nl-lead-actions">
                  <Link className="btn btn--accent" to="/newsletter">
                    Continue reading<span className="arrow">&rarr;</span>
                  </Link>
                  <Link className="link-more" to="/newsletter-archive">
                    View past issues<span className="arrow">&rarr;</span>
                  </Link>
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
                The Inchworm Newsletter
              </p>
              <h2>Get it in your inbox every week</h2>
              <p>One short email with the week&rsquo;s reading. No noise &mdash; unsubscribe anytime.</p>
            </div>
            <NewsletterSignup source="News page" />
          </div>
        </div>
      </section>
    </>
  )
}
