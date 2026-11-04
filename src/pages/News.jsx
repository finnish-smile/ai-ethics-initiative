import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, featured, longDate } from '../data/news.js'
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

// Side column beside the featured card: when the two sit side by side, list
// as many articles (in archive order) as fit while the column — including the
// "View all news" button — stays at or under 110% of the featured card's
// height. When the column drops below the card (phones, narrow windows), list
// exactly three.
const SIDE_MAX_RATIO = 1.1
const SIDE_STACKED_COUNT = 3
const SIDE_MAX_CANDIDATES = 12 // more than could ever fit beside the card

function useSideArticleCount(leadRef, listRef, actionsRef) {
  const [count, setCount] = useState(SIDE_STACKED_COUNT)
  // While measuring, every candidate is rendered so each one's height can be
  // read; the final count is applied before the browser paints.
  const [measuring, setMeasuring] = useState(true)

  useEffect(() => {
    const remeasure = () => setMeasuring(true)
    window.addEventListener('resize', remeasure)
    document.fonts?.ready.then(remeasure)
    return () => window.removeEventListener('resize', remeasure)
  }, [])

  useLayoutEffect(() => {
    if (!measuring) return
    const lead = leadRef.current
    const list = listRef.current
    const actions = actionsRef.current
    let next = SIDE_STACKED_COUNT
    if (lead && list && actions) {
      // Layout sizes (offset*), not on-screen boxes: the fade-in animation
      // shifts and shrinks items until they're revealed, which would skew the
      // fit. The grid also stretches the card to the row's height, so its own
      // height is read with the stretch switched off.
      lead.style.alignSelf = 'start'
      const leadHeight = lead.offsetHeight
      lead.style.alignSelf = ''
      // Side by side when the column starts to the right of the card.
      const stacked = list.getBoundingClientRect().left < lead.getBoundingClientRect().right
      if (!stacked) {
        const tail = parseFloat(getComputedStyle(actions).marginTop) + actions.offsetHeight
        const limit = leadHeight * SIDE_MAX_RATIO
        next = 0
        for (const item of list.children) {
          if (item.offsetTop + item.offsetHeight - list.offsetTop + tail > limit) break
          next += 1
        }
      }
    }
    setCount(next)
    setMeasuring(false)
  }, [measuring, leadRef, listRef, actionsRef])

  return measuring ? SIDE_MAX_CANDIDATES : count
}

export default function News() {
  const leadRef = useRef(null)
  const listRef = useRef(null)
  const actionsRef = useRef(null)
  const side = articles.slice(0, useSideArticleCount(leadRef, listRef, actionsRef))
  const lead = articles.find((a) => a.href === featured.href)

  // The site's scroll-reveal only picks up items present when the page first
  // renders. Articles added to the column later (after a resize) are shown
  // straight away instead of staying faded out.
  const revealScanDone = useRef(false)
  const seenItems = useRef(new WeakSet())
  useEffect(() => {
    revealScanDone.current = true
  }, [])
  const revealIfLate = (el) => {
    if (!el || seenItems.current.has(el)) return
    seenItems.current.add(el)
    if (revealScanDone.current) el.classList.add('is-revealed')
  }

  return (
    <>
      <header className="phead phead--painting">
        {/* Keep the heads and newspaper in frame; lift the dark interior a little. */}
        <img
          className="phead__painting"
          src={`${import.meta.env.BASE_URL}images/village-politicians-leibl.jpg`}
          alt="Wilhelm Leibl, The Village Politicians, a painting of five village men on a bench leaning in to read a newspaper together"
          style={{ objectPosition: '50% 25%', filter: 'brightness(1.12)' }}
        />
        <div className="wrap">
          <p className="kicker">News</p>
          <h1>The Inchworm Dispatch</h1>
          <p>Recent top stories in AI and ethics.</p>
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
            <article className="news-lead news-lead--nl" ref={leadRef} data-reveal>
              <div className="ph ph--nl news-lead__cover">
                <img
                  className="news-lead__img"
                  src={`${import.meta.env.BASE_URL}${featured.image}`}
                  alt={featured.imageAlt}
                />
                <span className="nl-flag">Featured</span>
                <p className="news-lead__credit">{featured.imageCredit}</p>
              </div>
              <div className="news-lead__body">
                <p className="nl-eyebrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Featured article
                </p>
                <span className="nl-date">
                  {featured.source} &middot; {longDate(featured.date)}
                </span>
                <h2>{lead.title}</h2>
                <p className="lead">{featured.summary}</p>
                <div className="nl-lead-actions">
                  <a className="btn btn--accent" href={featured.href} target="_blank" rel="noopener noreferrer">
                    Read the article<span className="arrow">&rarr;</span>
                  </a>
                </div>
              </div>
            </article>
            <div className="news-side-col">
              <div className="news-side reveal-stagger" ref={listRef}>
                {side.map((a) => (
                  <article className="news-item" key={a.href} ref={revealIfLate} data-reveal>
                    {(a.topics.length > 0 || a.isNew) && <TagList topics={a.topics} isNew={a.isNew} />}
                    <h3>
                      <a href={a.href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        {a.title}
                      </a>
                    </h3>
                    {a.excerpt && <p>{a.excerpt}</p>}
                    <span className="news-item__meta">
                      {a.source}
                      {a.date && <> &middot; {longDate(a.date)}</>}
                    </span>
                  </article>
                ))}
              </div>
              <div className="page-actions" ref={actionsRef} style={{ marginTop: 28 }}>
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

      <section className="section section--tight news-suggest" id="suggest" style={{ scrollMarginTop: 84 }} data-screen-label="Suggest an article">
        <div className="wrap">
          <ArticleSuggestForm />
        </div>
      </section>
    </>
  )
}
