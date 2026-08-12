import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, TOPICS, parseDate, MON } from '../data/news.js'

export default function Articles() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [showAllTags, setShowAllTags] = useState(false)

  const toggleTag = (t) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return articles.filter((a) => {
      const topicOk = selected.size === 0 || a.topics.some((t) => selected.has(t))
      const searchOk =
        !q ||
        `${a.title} ${a.source} ${a.excerpt} ${a.topics.join(' ')}`.toLowerCase().includes(q)
      return topicOk && searchOk
    })
  }, [search, selected])

  const visibleTags = showAllTags ? TOPICS : TOPICS.slice(0, 6)

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/news">News</Link> <span>/</span>{' '}
            <span>All articles</span>
          </nav>
          <p className="kicker">(EXAMPLE TEXT) The feed</p>
          <h1>AI Ethics News</h1>
          <p>News feed tag-line</p>
        </div>
      </header>

      <section className="section" data-screen-label="Article browser">
        <div className="wrap">
          <div className="browse">
            <Link className="back-link" to="/news">
              <span className="arr">&larr;</span> Back to News
            </Link>

            <div className="browse-bar">
              <label className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Search articles, sources, topics…"
                  aria-label="Search articles"
                  autoComplete="off"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <p className="browse-count" style={{ padding: 0 }}>
                <strong>{filtered.length}</strong> of {articles.length} article
                {articles.length === 1 ? '' : 's'}
              </p>
            </div>

            <div className="filter-row">
              <div className="filter-chips topic-bar" role="group" aria-label="Filter articles by topic">
                <button
                  type="button"
                  className="chip-all"
                  aria-pressed={selected.size === 0}
                  onClick={() => setSelected(new Set())}
                >
                  All topics
                </button>
                {visibleTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={selected.has(t)}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {TOPICS.length > 6 && (
                <button
                  type="button"
                  className="more-tags"
                  aria-expanded={showAllTags}
                  onClick={() => setShowAllTags((v) => !v)}
                >
                  <span className="more-tags__label">{showAllTags ? 'Fewer tags' : 'More tags'}</span>
                  <svg className="more-tags__chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>

            <div className="feed-list">
              {filtered.map((a) => {
                const d = parseDate(a.date)
                return (
                  <a
                    className="feed-row"
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={a.title}
                  >
                    <span className="feed-date">
                      <span className="feed-mon">{MON[d.getMonth()]}</span>
                      <span className="feed-day">{d.getDate()}</span>
                    </span>
                    <span className="feed-main">
                      <span className="feed-tags">
                        {a.topics.map((t) => (
                          <span className="topic-tag" key={t}>
                            {t}
                          </span>
                        ))}
                        {a.isNew && <span className="feed-new">New</span>}
                      </span>
                      <span className="feed-title">{a.title}</span>
                      <span className="feed-excerpt">{a.excerpt}</span>
                      <span className="feed-source">
                        {a.source}
                        <span className="feed-ext" aria-hidden="true">
                          &#8599;
                        </span>
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
            {filtered.length === 0 && (
              <p className="feed-empty">No articles match. Try a different keyword or topic.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
