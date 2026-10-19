import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { events, parseDate, DOW, MON_FULL } from '../data/events.js'

// Filter chips come from the types actually present in the data, and are
// hidden when there's only one type to choose between.
const TYPES = [
  { label: 'All', value: 'all' },
  ...[...new Set(events.map((e) => e.type))].map((t) => ({ label: t, value: t })),
]

// The full filterable, month-grouped events list — shared between the
// Events page itself and anywhere else (e.g. Get Involved) that wants the
// real calendar rather than just a short "upcoming" preview (see
// UpcomingEvents.jsx for that shorter list).
export default function EventsCalendar() {
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
    <div>
      {TYPES.length > 2 && (
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
      )}

      {groups.map((g) => (
        <section className="ev-month" key={g.label}>
          <h3 className="ev-month__h">{g.label}</h3>
          {g.items.map((e) => {
            const d = parseDate(e.date)
            return (
              <Link className="ev-row" to={e.href || `/events/${e.slug}`} key={e.slug}>
                <span className="ev-date">
                  <span className="ev-day">{d.getDate()}</span>
                  <span className="ev-dow">{DOW[d.getDay()]}</span>
                </span>
                <span className="ev-main">
                  <span className="ev-type">{e.type}</span>
                  <span className="ev-title">{e.title}</span>
                  {[e.time, e.place, e.host].filter(Boolean).length > 0 && (
                    <span className="ev-info">{[e.time, e.place, e.host].filter(Boolean).join(' · ')}</span>
                  )}
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
  )
}
