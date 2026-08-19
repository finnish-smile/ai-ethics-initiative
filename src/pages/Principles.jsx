import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const PRINCIPLES = [
  { id: 'p1', num: '01', title: 'Stewardship', tag: 'Brief description / tag-line about stewardship' },
  { id: 'p2', num: '02', title: 'Agency', tag: 'Brief description / tag-line about agency' },
  { id: 'p3', num: '03', title: 'Becoming', tag: 'Brief description / tag-line about becoming' },
  { id: 'p4', num: '04', title: 'Fellowship', tag: 'Brief description / tag-line about fellowship' },
  { id: 'p5', num: '05', title: 'Discernment', tag: 'Brief description / tag-line about discernment' },
  { id: 'p6', num: '06', title: 'Integrity', tag: 'Brief description / tag-line about integrity' },
]

function StudentIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4 2 9l10 5 10-5-10-5z" />
      <path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" />
    </svg>
  )
}
function ProfessorIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5S18.5 16.4 18.5 20" />
    </svg>
  )
}

const STUDENT_FAQ = [
  { q: 'First Question', a: 'How the principles above apply to the question.', label: 'PROMPT IDEA', note: 'Give a specific prompt that could be used in this situation.' },
  { q: 'Second Question', a: 'How the principles above apply to the question.', label: 'IN PRACTICE', note: 'What to do instead of relying on AI (for example)' },
  { q: 'Third Question', a: 'How the principles above apply to the question.', label: 'PROMPT IDEA', note: 'Give a specific prompt that could be used in this situation' },
]
const FACULTY_FAQ = [
  { q: 'Question 1', a: 'How the principles above apply to the question', label: 'In practice', note: 'What you can actually do in this situation' },
  { q: 'Question 2', a: 'How the principles above apply to the question', label: 'Prompt idea', note: 'Give a specific prompt that could be used in this situation' },
  { q: 'Question 3', a: 'How the principles above apply to the question', label: 'In practice', note: 'What you can actually do in this situation' },
]

function Principle({ p, open, onToggle }) {
  return (
    <div className="principle" id={p.id}>
      <div className="principle__num">{p.num}</div>
      <div className="principle__body">
        <h3>{p.title}</h3>
        <p>{p.tag}</p>
        <div
          className="principle__more"
          style={{
            display: 'grid',
            gridTemplateRows: open ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.42s cubic-bezier(.4,0,.2,1)',
            maxHeight: 'none',
            overflow: 'hidden',
          }}
        >
          <div style={{ minHeight: 0 }}>
            <div className="principle__more-inner">
              <p>Full description with scriptures, quotes, etc.</p>
              <div className="apply-grid">
                <div className="apply-col">
                  <p className="apply-head">
                    <StudentIcon />
                    For students
                  </p>
                  <ul>
                    <li>Practical Application 1</li>
                    <li>Practical Application 2</li>
                  </ul>
                </div>
                <div className="apply-col">
                  <p className="apply-head">
                    <ProfessorIcon />
                    For professors
                  </p>
                  <ul>
                    <li>Practical Application 1</li>
                    <li>Practical Application 2</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="principle__toggle"
          type="button"
          aria-expanded={open}
          onClick={onToggle}
        >
          <span className="pt-label">{open ? 'Show less' : 'Read more'}</span>
          <svg className="pt-chev" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Principles() {
  const [openId, setOpenId] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (PRINCIPLES.some((p) => p.id === hash)) {
      setOpenId(hash)
      const el = document.getElementById(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash])

  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Principles</span>
          </nav>
          <p className="kicker">(EXAMPLE TEXT) A FRAMEWORK FOR OUR COMMUNITY</p>
          <h1>FTSOSSSOAI</h1>
          <p>Purpose of the principles</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(28px,5vw,64px)', alignItems: 'start' }}>
          <nav className="toc" aria-label="On this page">
            <h4>The principles</h4>
            <ul>
              {PRINCIPLES.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenId(p.id)
                      document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      history.replaceState(null, '', `#${p.id}`)
                    }}
                  >
                    {p.num.replace(/^0/, '')}. {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal>
            {PRINCIPLES.map((p) => (
              <Principle
                key={p.id}
                p={p}
                open={openId === p.id}
                onToggle={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section qa"
        id="faq-students"
        style={{ background: '#fff', borderTop: '1px solid var(--line)' }}
        data-screen-label="Q&A — students"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Common questions</p>
              <h2>For students</h2>
            </div>
            <p className="qa-intro">
              * These are general principles for AI use and do not supersede University or course
              policies. Be sure to reference your course policy when making decisions about how to
              use AI in your coursework.
            </p>
          </div>
          <div className="qa-list reveal-stagger">
            {STUDENT_FAQ.map((f) => (
              <div className="qa-item" key={f.q} data-reveal>
                <h3 className="qa-q">{f.q}</h3>
                <p className="qa-a">{f.a}</p>
                <div className="qa-case">
                  <span className="qa-case__label">{f.label}</span>
                  <p>{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section qa"
        id="faq-faculty"
        style={{ borderTop: '1px solid var(--line)' }}
        data-screen-label="Q&A — faculty"
      >
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Common questions</p>
              <h2>For faculty</h2>
            </div>
            <p className="qa-intro">
              * These are general principles for AI use and do not supersede University policies
              and recommendations. Always align course policies with University policies.
            </p>
          </div>
          <div className="qa-list reveal-stagger">
            {FACULTY_FAQ.map((f) => (
              <div className="qa-item" key={f.q} data-reveal>
                <h3 className="qa-q">{f.q}</h3>
                <p className="qa-a">{f.a}</p>
                <div className="qa-case">
                  <span className="qa-case__label">{f.label}</span>
                  <p>{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission" style={{ background: 'var(--navy)' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(48px,6vw,80px)' }}>
          <div
            className="mission__inner"
            data-reveal
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', maxWidth: 'none' }}
          >
            <p className="mission__statement" style={{ fontSize: 'clamp(22px,3vw,32px)', margin: 0, maxWidth: '30ch' }}>
              Have a case these principles don&rsquo;t quite cover?
            </p>
            <Link className="btn btn--accent" to="/about#contact">
              Talk it through with us<span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
