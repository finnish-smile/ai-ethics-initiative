import { Link, useParams } from 'react-router-dom'
import { events, eventBySlug, parseDate, longDate, MON } from '../data/events.js'

export default function EventDetail() {
  const { slug } = useParams()
  const ev = eventBySlug(slug) || events[0]
  const d = parseDate(ev.date)

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <Link to="/events">Events</Link> <span>/</span>{' '}
            <span>{ev.title}</span>
          </nav>
          <p className="kicker">{ev.type}</p>
          <h1>{ev.title}</h1>
          <p>{ev.host ? `Hosted by ${ev.host}` : ''}</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap ev-layout">
          <div className="ev-detail" data-reveal>
            <Link className="back-link" to="/events">
              <span className="arr">&larr;</span> All events
            </Link>
            <h2 className="ev-detail__h">About this event</h2>
            <div className="prose">
              {(ev.desc || []).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="ev-invite">
              <h3>You&rsquo;re invited</h3>
              <p>{ev.invite}</p>
            </div>
          </div>

          <aside>
            <div className="aside-card ev-facts" data-reveal>
              <div className="ev-facts__cal">
                <span className="ev-facts__mon">{MON[d.getMonth()]}</span>
                <span className="ev-facts__day">{d.getDate()}</span>
              </div>
              <ul className="ev-facts__list">
                <li className="ev-facts__row">
                  <span className="ev-facts__k">Date</span>
                  <span className="ev-facts__v">{longDate(ev.date)}</span>
                </li>
                <li className="ev-facts__row">
                  <span className="ev-facts__k">Time</span>
                  <span className="ev-facts__v">{ev.time}</span>
                </li>
                <li className="ev-facts__row">
                  <span className="ev-facts__k">Location</span>
                  <span className="ev-facts__v">{ev.place}</span>
                </li>
                <li className="ev-facts__row">
                  <span className="ev-facts__k">Host</span>
                  <span className="ev-facts__v">{ev.host || '—'}</span>
                </li>
              </ul>
              <Link className="btn btn--accent" to="/news#newsletter">
                Add to your calendar
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
