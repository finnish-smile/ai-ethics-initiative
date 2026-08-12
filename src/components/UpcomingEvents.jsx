import { Link } from 'react-router-dom'
import { events, parseDate, DOW, MON } from '../data/events.js'

export default function UpcomingEvents({ limit }) {
  const items = events.slice(0, limit || events.length)
  return (
    <ul className="up-list">
      {items.map((e) => {
        const d = parseDate(e.date)
        return (
          <li className="up-item" key={e.slug}>
            <Link to={`/events/${e.slug}`}>
              <span className="up-date">
                <span className="up-dow">{DOW[d.getDay()]}</span>
                <span className="up-day">{d.getDate()}</span>
                <span className="up-mon">{MON[d.getMonth()]}</span>
              </span>
              <span className="up-meta">
                <span className="up-title">{e.title}</span>
                <span className="up-sub">
                  {e.time} &middot; {e.place}
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
