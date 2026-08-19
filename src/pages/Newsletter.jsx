import { useState } from 'react'
import { Link } from 'react-router-dom'
import { latestIssue, longDate } from '../data/news.js'

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const iss = latestIssue

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
            <Link to="/">Home</Link> <span>/</span> <Link to="/news">News</Link> <span>/</span>{' '}
            <span>Newsletter</span>
          </nav>
          <p className="kicker">The newsletter &middot; No. {iss.no}</p>
          <h1>{iss.title}</h1>
          <p>
            Issue No. {iss.no} &mdash; {longDate(iss.date)} &middot; {(iss.picks || []).length} articles
          </p>
        </div>
      </header>

      <section className="section" data-screen-label="Newsletter body">
        <div className="wrap feed-layout">
          <div className="feed-main">
            <Link className="back-link" to="/news">
              <span className="arr">&larr;</span> Back to News
            </Link>
            <div className="nl-read">
              <p className="nl-lead">{iss.intro}</p>
              <h2 className="nl-section-h">In this issue</h2>
              <ol className="nl-picks reveal-stagger">
                {(iss.picks || []).map((p, i) => (
                  <li className="nl-pick" key={p.title} data-reveal>
                    <span className="nl-pick__n">{i + 1}</span>
                    <div className="nl-pick__body">
                      <span className="nl-pick__src">{p.source}</span>
                      <h3 className="nl-pick__title">
                        <a href={p.href} target="_blank" rel="noopener noreferrer">
                          {p.title}
                          <span className="nl-pick__ext" aria-hidden="true">
                            &#8599;
                          </span>
                        </a>
                      </h3>
                      <p className="nl-pick__note">{p.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {iss.closing && (
                <div className="nl-closing">
                  <p>{iss.closing}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="feed-aside" aria-label="More from the newsletter">
            <div className="aside-card nl-teaser">
              <span className="issue-tag">The archive</span>
              <h3>Past issues</h3>
              <p>Every Friday digest since April &mdash; titles, dates, and summaries at a glance.</p>
              <Link className="link-more" to="/newsletter-archive">
                Browse the archive<span className="arrow">&rarr;</span>
              </Link>
            </div>
            <div className="aside-card">
              <h3>The full feed</h3>
              <p>Want more than the weekly picks? Search and filter every article we&rsquo;ve tagged.</p>
              <Link className="link-more" to="/articles">
                View all news<span className="arrow">&rarr;</span>
              </Link>
            </div>
            <div className="aside-card">
              <h3>Got a tip?</h3>
              <p>Reading coverage we should feature next week? Send it our way.</p>
              <Link className="link-more" to="/about#contact">
                Suggest a source<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="newsletter" id="subscribe" style={{ scrollMarginTop: 90 }} data-screen-label="Subscribe">
        <div className="wrap">
          <div className="nl-grid">
            <div className="nl-digest">
              <p className="kicker" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Don&rsquo;t miss the next one
              </p>
              <h2>Get the newsletter every week</h2>
              <p className="issue-summary">
                A short Friday email with the week&rsquo;s most important AI-ethics reading &mdash;
                and why it matters.
              </p>
            </div>
            <div className="nl-sub">
              <h3>Subscribe</h3>
              <p>One concise issue a week. No noise, unsubscribe anytime.</p>
              {subscribed ? (
                <p className="nl-ok">Thanks &mdash; you&rsquo;re on the list.</p>
              ) : (
                <>
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
                  </form>
                  <p className="nl-note">We use your email only for this newsletter.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
