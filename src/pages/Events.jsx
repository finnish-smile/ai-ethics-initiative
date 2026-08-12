import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { events, parseDate, DOW, MON_FULL } from '../data/events.js'

const TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Clubs', value: 'Club' },
  { label: 'Workshops', value: 'Workshop' },
  { label: 'Panels', value: 'Panel' },
  { label: 'Forums', value: 'Forum' },
  { label: 'Lectures', value: 'Lecture' },
]

export default function Events() {
  const [type, setType] = useState('all')

  const groups = useMemo(() => {
    const map = new Map()
    events
      .filter((e) => type === 'all' || e.type === type)
      .forEach((e) => {
        const d = parseDate(e.date)
        const key = `${d.getFullYear()}-${d.getMonth()}`
        if (!map.has(key)) map.set(key, { label: `${MON_FULL[d.getMonth()]} ${d.getFullYear()}`, items: [] })
        map.get(key).items.push(e)
      })
    return [...map.values()]
  }, [type])

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Events</span>
          </nav>
          <p className="kicker">Events calendar</p>
          <h1>Clubs, workshops, and forums</h1>
          <p>
            All events in the coming weeks, hosted by us or our affiliates. All events are free
            and open to the campus community unless noted.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap ev-layout">
          <div>
            <div className="filter-chips" style={{ marginBottom: 28 }}>
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  aria-pressed={type === t.value}
                  onClick={() => setType(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {groups.map((g) => (
              <section className="ev-month" key={g.label}>
                <h3 className="ev-month__h">{g.label}</h3>
                {g.items.map((e) => {
                  const d = parseDate(e.date)
                  return (
                    <Link className="ev-row" to={`/events/${e.slug}`} key={e.slug}>
                      <span className="ev-date">
                        <span className="ev-day">{d.getDate()}</span>
                        <span className="ev-dow">{DOW[d.getDay()]}</span>
                      </span>
                      <span className="ev-main">
                        <span className="ev-type">{e.type}</span>
                        <span className="ev-title">{e.title}</span>
                        <span className="ev-info">
                          {e.time} &middot; {e.place}
                          {e.host ? ` · ${e.host}` : ''}
                        </span>
                      </span>
                      <span className="ev-go" aria-hidden="true">
                        &rarr;
                      </span>
                    </Link>
                  )
                })}
              </section>
            ))}
            {groups.length === 0 && (
              <p style={{ color: 'var(--muted)', padding: '24px 0' }}>
                No events of this type are currently scheduled.
              </p>
            )}
          </div>

          <aside>
            <div className="aside-card">
              <h3>Never miss an event</h3>
              <p>
                Get the week's schedule in your inbox. See all the coming events to stay on top of
                AI Ethics.
              </p>
              <Link className="btn btn--accent" to="/news#newsletter" style={{ width: '100%', justifyContent: 'center' }}>
                Join the mailing list
              </Link>
            </div>
            <div className="aside-card">
              <h3>Partner with us</h3>
              <p>Hosting an event connected to AI Ethics? Let us know so we can spread the word!</p>
              <Link className="link-more" to="/about#contact">
                Get in touch<span className="arrow">&rarr;</span>
              </Link>
            </div>
            <div className="aside-card">
              <h3>Get involved</h3>
              <p>Interested in joining a club? See who we work with and connect with them!</p>
              <Link className="link-more" to="/connections">
                See our partners<span className="arrow">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
