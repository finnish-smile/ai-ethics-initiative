import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, latestIssue, longDate } from '../data/news.js'

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
  const [subscribed, setSubscribed] = useState(false)
  const [includeEvents, setIncludeEvents] = useState(true)
  const [emailError, setEmailError] = useState(false)

  const lead = articles[0]
  const side = articles.slice(1, 4)

  const onSubmit = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    setSubscribed(true)
  }

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>News</span>
          </nav>
          <p className="kicker">News &amp; newsletter</p>
          <h1>News Something-or-other</h1>
          <p>Tag-line for the news feed and newsletter</p>
        </div>
      </header>

      <section className="section" data-screen-label="Featured">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Latest</p>
              <h2>This week in AI ethics</h2>
            </div>
            <Link className="link-more" to="/articles">
              Browse all articles<span className="arrow">&rarr;</span>
            </Link>
          </div>
          <div className="news-layout">
            <article className="news-lead news-lead--nl">
              <div className="ph ph--nl">
                <span>cover &middot; newsletter</span>
                <span className="nl-flag">Newsletter</span>
              </div>
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
            </article>
            <div className="news-side-col">
              <div className="news-side">
                {side.map((a) => (
                  <article className="news-item" key={a.title}>
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
                <Link className="btn btn--primary" to="/articles">
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
            {subscribed ? (
              <p className="nl-ok">Thanks &mdash; you&rsquo;re on the list.</p>
            ) : (
              <form className="nl-form" onSubmit={onSubmit} noValidate>
                <input
                  type="email"
                  name="email"
                  placeholder="you@byu.edu"
                  aria-label="Email address"
                  required
                  style={emailError ? { borderColor: 'oklch(0.7 0.18 25)' } : undefined}
                />
                <button className="btn btn--accent" type="submit">
                  Subscribe
                </button>
                <label className="nl-toggle">
                  <input
                    type="checkbox"
                    checked={includeEvents}
                    onChange={(e) => setIncludeEvents(e.target.checked)}
                  />
                  <span className="nl-toggle__track" aria-hidden="true">
                    <span className="nl-toggle__thumb"></span>
                  </span>
                  <span className="nl-toggle__label">Include the weekly event schedule</span>
                </label>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
