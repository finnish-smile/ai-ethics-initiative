import { Link } from 'react-router-dom'
import { coreLessons, optionalLessons } from '../data/kickstart.js'
import useKickstartProgress from '../hooks/useKickstartProgress.js'
import '../kickstart.css'

function LessonCard({ lesson, current }) {
  const { lessonProgress } = useKickstartProgress()
  const { completed, total } = lessonProgress(lesson)
  const done = completed === total
  const pct = Math.round((completed / total) * 100)

  return (
    <Link
      className={`ks-card ${current ? 'ks-card--current' : ''} ${done ? 'ks-card--done' : ''}`}
      to={`/kickstart/${lesson.id}`}
      data-reveal
    >
      <div className="ks-card__top">
        <span className="ks-card__num">{String(lesson.number).padStart(2, '0')}</span>
        {current && !done && <span className="ks-card__badge ks-card__badge--start">Start here</span>}
        {done && <span className="ks-card__badge ks-card__badge--done">Complete</span>}
        {!current && !done && <span className="ks-card__badge">Available</span>}
      </div>
      <p className="ks-card__meta">
        {lesson.kind === 'core' ? `Lesson ${lesson.number}` : 'Optional'}
        <strong>
          {lesson.steps.length} step{lesson.steps.length === 1 ? '' : 's'}
        </strong>
      </p>
      <h3>{lesson.title}</h3>
      <p>{lesson.description}</p>
      <div className="ks-card__progress">
        <div className="ks-card__progress-bar">
          <div className="ks-card__progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span>
          {completed}/{total}
        </span>
      </div>
      <span className="ks-card__cta">
        {completed > 0 && !done ? 'Continue lesson' : done ? 'Review lesson' : 'Open lesson'}
        <span className="arrow">&rarr;</span>
      </span>
    </Link>
  )
}

export default function Kickstart() {
  const { lessonProgress } = useKickstartProgress()
  const firstUnfinished = coreLessons.find((l) => {
    const { completed, total } = lessonProgress(l)
    return completed < total
  })

  return (
    <>
      <section className="ks-hero">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Kickstart</span>
          </nav>
          <p className="kicker">Your dashboard</p>
          <h1>Your lessons</h1>
          <p className="lead">
            A guided, hands-on introduction to AI — work through the lessons at your own pace, in
            any order.
          </p>
        </div>
      </section>

      <section className="section" data-screen-label="Core lessons">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Core lessons</h2>
            <span className="ks-section-label__tag">Unlocked</span>
          </div>
          <div className="ks-grid">
            {coreLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} current={lesson.id === firstUnfinished?.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" data-screen-label="Optional lessons">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Optional deep dives</h2>
          </div>
          <p style={{ color: 'var(--muted)', marginTop: -8, marginBottom: 22, maxWidth: '60ch' }}>
            Extra lessons you can take any time. No need to wait for the core lessons.
          </p>
          <div className="ks-grid ks-grid--optional">
            {optionalLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} current={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-screen-label="Next step">
        <div className="wrap">
          <div className="ks-cta-band" data-reveal>
            <div>
              <p className="kicker" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Ready for more?
              </p>
              <h3>Keep building after Kickstart</h3>
              <p>When you're ready to go beyond the basics, explore what else the Initiative offers.</p>
            </div>
            <Link className="btn btn--accent" to="/get-involved">
              Get involved<span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
