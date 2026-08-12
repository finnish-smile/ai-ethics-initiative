import { useState } from 'react'
import { Link } from 'react-router-dom'

const TEAM = [
  { name: 'Paige Roberts', role: 'Role · Department/Major' },
  { name: 'Navy Wright', role: 'Role · Department/Major' },
  { name: 'Isaac Olsson', role: 'Role · Department/Major' },
  { name: 'Supporting Faculty', role: 'Role · Department/Major' },
]

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    const email = 'ai-ethics@byu.edu'
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.top = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      ta.setSelectionRange(0, email.length)
      try {
        document.execCommand('copy')
      } catch {
        // ignore — clipboard access unavailable
      }
      document.body.removeChild(ta)
    }
    setCopied(true)
  }

  return (
    <button
      className={`btn btn--accent${copied ? ' btn--copied' : ''}`}
      type="button"
      onClick={handleClick}
      disabled={copied}
    >
      {copied ? 'Copied!' : 'Copy our email'}
    </button>
  )
}

export default function About() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </nav>
          <p className="kicker">About the Initiative</p>
          <h1>Shaping Wise and Accountable Stewards of AI, Rooted in Christ.</h1>
          <p>
            Doctrine and Covenants 136:27 &mdash; &ldquo;Thou shalt be diligent in preserving what
            thou hast, that thou mayest be a wise steward; for it is the free gift of the Lord thy
            God, and thou art his steward.&rdquo;
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="intro-2col">
            <div>
              <p className="kicker">Why we exist</p>
              <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', marginTop: 10 }}>Short version.</h2>
            </div>
            <div className="prose" style={{ maxWidth: 'none' }}>
              <p>Paragraph 1 of why we exist.</p>
              <p>Paragraph 2 of why we exist.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', borderBlock: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What we do</p>
              <h2>Three ways we show up</h2>
            </div>
          </div>
          <div className="grid cols-3">
            <Link className="card" to="/principles">
              <div className="card__body">
                <span className="card__cat">GUIDANCE</span>
                <h3 className="card__title">Principles &amp; Practical Tools</h3>
                <p className="card__excerpt">
                  Vital and insightful questions to consider when deciding how to use AI morally,
                  paired with tools to help put those convictions into practice.
                </p>
              </div>
            </Link>
            <Link className="card" to="/news">
              <div className="card__body">
                <span className="card__cat">INFORMATION</span>
                <h3 className="card__title">News &amp; Newsletter</h3>
                <p className="card__excerpt">
                  Current and relevant information on the biggest questions today in the realm of
                  AI Ethics.
                </p>
              </div>
            </Link>
            <Link className="card" to="/connections">
              <div className="card__body">
                <span className="card__cat">CONNECTION</span>
                <h3 className="card__title">Campus-Wide Engagement</h3>
                <p className="card__excerpt">
                  Organizations across BYU invested in helping AI move forward ethically, which we
                  work to bring together and make accessible for students.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The team</p>
              <h2>People behind the Initiative</h2>
              <p>Something about us.</p>
            </div>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="member" key={m.name}>
                <div className="member__photo ph">
                  <span>portrait</span>
                </div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission" id="contact" style={{ background: 'var(--navy)' }}>
        <div className="wrap" style={{ paddingBlock: 'clamp(48px,6vw,80px)' }}>
          <div
            className="mission__inner"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', maxWidth: 'none' }}
          >
            <p className="mission__statement" style={{ fontSize: 'clamp(22px,3vw,32px)', margin: 0, maxWidth: '30ch' }}>
              Chat with us! Schedule a meeting, ask a question, or just say hi!
            </p>
            <CopyEmailButton />
          </div>
        </div>
      </section>
    </>
  )
}
