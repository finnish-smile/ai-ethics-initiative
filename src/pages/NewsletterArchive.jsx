import { Link } from 'react-router-dom'
import { issues, longDate } from '../data/news.js'

export default function NewsletterArchive() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/news">News</Link> <span>/</span>{' '}
            <Link to="/newsletter">Newsletter</Link> <span>/</span> <span>Archive</span>
          </nav>
          <p className="kicker">The archive</p>
          <h1>Past issues of the newsletter</h1>
          <p>
            Every weekly digest, newest first. Each issue rounds up the AI-ethics coverage worth
            your time, with links to the original sources.
          </p>
        </div>
      </header>

      <section className="section" data-screen-label="Archive list">
        <div className="wrap">
          <div className="browse">
            <Link className="back-link" to="/news">
              <span className="arr">&larr;</span> Back to News
            </Link>
            <div className="arch-list">
              {issues.map((iss, idx) => {
                const current = idx === 0
                const count = iss.picks ? iss.picks.length : iss.count
                return (
                  <Link className="arch-item" to="/newsletter" key={iss.no} data-reveal>
                    <span className="arch-meta">
                      <span className="arch-no">
                        No. {iss.no}
                        {current && <span className="arch-badge">Current</span>}
                      </span>
                      <span className="arch-date">{longDate(iss.date)}</span>
                      <span className="arch-count">{count} links</span>
                    </span>
                    <span className="arch-body">
                      <h3>{iss.title}</h3>
                      <p className="arch-summary">{iss.summary}</p>
                    </span>
                    <span className="arch-go" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                )
              })}
            </div>
            <div className="page-actions" style={{ marginTop: 36 }}>
              <Link className="btn btn--ghost" to="/newsletter">
                Read the current issue<span className="arrow">&rarr;</span>
              </Link>
              <Link className="btn btn--ghost" to="/articles">
                Browse all articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
