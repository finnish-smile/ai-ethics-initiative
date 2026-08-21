import { Link } from 'react-router-dom'
import { modulesForDashboard } from '../data/kickstart/index.js'
import useKickstartProgress from '../hooks/useKickstartProgress.js'
import '../kickstart.css'

function ModuleCard({ mod, current }) {
  const { lessonProgress } = useKickstartProgress()
  const built = mod.isBuilt
  const { completed, total } = built ? lessonProgress(mod) : { completed: 0, total: 0 }
  const done = built && total > 0 && completed === total
  const pct = built && total > 0 ? Math.round((completed / total) * 100) : 0

  const card = (
    <>
      <div className="ks-card__top">
        <span className="ks-card__num">{String(mod.number).padStart(2, '0')}</span>
        {built && current && !done && <span className="ks-card__badge ks-card__badge--start">Start here</span>}
        {built && done && <span className="ks-card__badge ks-card__badge--done">Complete</span>}
        {built && !current && !done && <span className="ks-card__badge">Available</span>}
        {!built && <span className="ks-card__badge">Coming soon</span>}
      </div>
      <p className="ks-card__meta">
        Module {mod.number} &middot; ~{mod.minutes} min
        {mod.needsAccount && <span className="ks-card__meta-note"> · you’ll need an AI account for this one</span>}
      </p>
      <h3>{mod.title}</h3>
      <p>{mod.description}</p>
      {built && (
        <div className="ks-card__progress">
          <div className="ks-card__progress-bar">
            <div className="ks-card__progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span>
            {completed}/{total}
          </span>
        </div>
      )}
      {built && (
        <span className="ks-card__cta">
          {completed > 0 && !done ? 'Continue module' : done ? 'Review module' : 'Start module'}
          <span className="arrow">&rarr;</span>
        </span>
      )}
    </>
  )

  if (!built) {
    return <div className="ks-card ks-card--disabled">{card}</div>
  }
  return (
    <Link className={`ks-card ${current ? 'ks-card--current' : ''} ${done ? 'ks-card--done' : ''}`} to={`/kickstart/${mod.id}`} data-reveal>
      {card}
    </Link>
  )
}

export default function Kickstart() {
  const modules = modulesForDashboard()
  const { lessonProgress } = useKickstartProgress()
  const firstUnfinished = modules.find((m) => {
    if (!m.isBuilt) return false
    const { completed, total } = lessonProgress(m)
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
            A guided, hands-on introduction to AI — five modules, work through them at your own pace.
          </p>
          <p className="ks-hero__note">
            Modules 1 &amp; 2 need no account or sign-up — just this page. Module 3 is where you&rsquo;ll
            create an AI account, if you don&rsquo;t have one already.
          </p>
        </div>
      </section>

      <section className="section" data-screen-label="Modules">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Modules</h2>
            <span className="ks-section-label__tag">In order, at your pace</span>
          </div>
          <div className="ks-grid">
            {modules.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} current={mod.id === firstUnfinished?.id} />
            ))}
          </div>
          <p className="ks-storage-note">
            Your progress (and, later, your personal AI constitution) is saved only in this browser, on
            this device — there’s no account system behind this course. Nothing is sent anywhere or shared
            with the Initiative. Clearing your browser data will clear it too, so if you want to keep a copy
            somewhere safer, look for the export option once you get there.
          </p>
        </div>
      </section>
    </>
  )
}
