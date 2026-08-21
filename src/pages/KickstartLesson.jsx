import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { lessonById } from '../data/kickstart.js'
import useKickstartProgress from '../hooks/useKickstartProgress.js'
import '../kickstart.css'

export default function KickstartLesson() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const lesson = lessonById(lessonId)
  const { isStepDone, markStepDone, lessonProgress } = useKickstartProgress()

  // Resume where the reader left off: steps complete in order, so the
  // count of completed steps doubles as the index of the next one — unless
  // every step is already done, in which case land on the last one.
  const doneCount = lesson ? lesson.steps.filter((s) => isStepDone(lesson.id, s.id)).length : 0
  const [stepIndex, setStepIndex] = useState(() => {
    if (!lesson) return 0
    return doneCount >= lesson.steps.length ? lesson.steps.length - 1 : doneCount
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId])

  if (!lesson) {
    return (
      <section className="section">
        <div className="wrap">
          <p className="kicker">Not found</p>
          <h1>We couldn&rsquo;t find that lesson</h1>
          <Link className="btn btn--ghost" to="/kickstart">
            Back to Kickstart
          </Link>
        </div>
      </section>
    )
  }

  const step = lesson.steps[stepIndex]
  const { completed, total } = lessonProgress(lesson)
  const pct = Math.round((completed / total) * 100)
  const isLast = stepIndex === lesson.steps.length - 1

  const goTo = (idx) => setStepIndex(Math.min(Math.max(idx, 0), lesson.steps.length - 1))

  const handleNext = () => {
    markStepDone(lesson.id, step.id)
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

      <aside className="ksl__sidebar" aria-label="Lesson steps">
        <div className="ksl__sidebar-head">
          <p className="kicker">Kickstart</p>
          <h1>{lesson.title}</h1>
        </div>
        {lesson.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`ksl__step ${i === stepIndex ? 'is-active' : ''} ${
              isStepDone(lesson.id, s.id) ? 'is-done' : ''
            }`}
            onClick={() => goTo(i)}
          >
            <span className="ksl__step-num">
              {isStepDone(lesson.id, s.id) ? '✓' : i + 1}
            </span>
            <span className="ksl__step-label">{s.label}</span>
          </button>
        ))}
      </aside>

      <main className="ksl__main">
        <p className="kicker">
          Lesson {lesson.number} &middot; Step {stepIndex + 1}
        </p>
        <h2>{step.title}</h2>
        {step.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </main>

      <div className="ksl__nav">
        <button type="button" className="btn btn--ghost" onClick={() => goTo(stepIndex - 1)} disabled={stepIndex === 0}>
          &larr; Back
        </button>
        <span className="ksl__nav-count">
          {stepIndex + 1} / {lesson.steps.length}
        </span>
        <button type="button" className="btn btn--accent" onClick={handleNext}>
          {isLast ? 'Finish' : `Next: ${lesson.steps[stepIndex + 1].label}`}
          <span className="arrow">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
