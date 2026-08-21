import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { moduleById } from '../data/kickstart/index.js'
import useKickstartProgress from '../hooks/useKickstartProgress.js'
import StepContent from '../components/kickstart/StepContent.jsx'
import '../kickstart.css'
import '../kickstart-widgets.css'

export default function KickstartModule() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const mod = moduleById(moduleId)
  const { isStepDone, markStepDone, lessonProgress } = useKickstartProgress()

  // Resume where the reader left off: steps complete in order, so the
  // count of completed steps doubles as the index of the next one — unless
  // every step is already done, in which case land on the last one.
  const doneCount = mod ? mod.steps.filter((s) => isStepDone(mod.id, s.id)).length : 0
  const [stepIndex, setStepIndex] = useState(() => {
    if (!mod) return 0
    return doneCount >= mod.steps.length ? mod.steps.length - 1 : doneCount
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  if (!mod) {
    return (
      <section className="section">
        <div className="wrap">
          <p className="kicker">Not found</p>
          <h1>We couldn&rsquo;t find that module</h1>
          <Link className="btn btn--ghost" to="/kickstart">
            Back to Kickstart
          </Link>
        </div>
      </section>
    )
  }

  const step = mod.steps[stepIndex]
  const { completed, total } = lessonProgress(mod)
  const pct = Math.round((completed / total) * 100)
  const isLast = stepIndex === mod.steps.length - 1

  const goTo = (idx) => setStepIndex(Math.min(Math.max(idx, 0), mod.steps.length - 1))

  const handleNext = () => {
    markStepDone(mod.id, step.id)
    if (isLast) {
      navigate('/kickstart')
      return
    }
    goTo(stepIndex + 1)
  }

  return (
    <div className="ksl">
      <div className="ksl__topbar">
        <div className="ksl__topbar-name">
          <Link to="/kickstart" aria-label="Back to Kickstart dashboard">
            &larr;
          </Link>
          <span>Kickstart</span>
        </div>
        <div className="ksl__topbar-progress">
          <span>
            {completed} of {total} complete
          </span>
          <div className="ksl__topbar-bar">
            <div className="ksl__topbar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <aside className="ksl__sidebar" aria-label="Module steps">
        <div className="ksl__sidebar-head">
          <p className="kicker">
            Module {mod.number} &middot; Kickstart
          </p>
          <h1>{mod.title}</h1>
        </div>
        {mod.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`ksl__step ${i === stepIndex ? 'is-active' : ''} ${
              isStepDone(mod.id, s.id) ? 'is-done' : ''
            }`}
            onClick={() => goTo(i)}
          >
            <span className="ksl__step-num">{isStepDone(mod.id, s.id) ? '✓' : i + 1}</span>
            <span className="ksl__step-label">{s.label}</span>
          </button>
        ))}
      </aside>

      <main className="ksl__main">
        <p className="kicker">
          Module {mod.number} &middot; Step {stepIndex + 1}
        </p>
        <h2>{step.title}</h2>
        <StepContent blocks={step.blocks} />
      </main>

      <div className="ksl__nav">
        <button type="button" className="btn btn--ghost" onClick={() => goTo(stepIndex - 1)} disabled={stepIndex === 0}>
          &larr; Back
        </button>
        <span className="ksl__nav-count">
          {stepIndex + 1} / {mod.steps.length}
        </span>
        <button type="button" className="btn btn--accent" onClick={handleNext}>
          {isLast ? 'Finish' : `Next: ${mod.steps[stepIndex + 1].label}`}
          <span className="arrow">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
