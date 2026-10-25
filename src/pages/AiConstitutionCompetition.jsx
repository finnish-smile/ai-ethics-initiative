import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../kickstart.css'
import '../showcase.css'
import '../ai-constitution-competition.css'

// Placeholder guidelines. Replace the bracketed text with the real
// specifications before the competition opens.
const GUIDELINES = [
  {
    tag: 'Purpose',
    title: 'Your personal AI constitution',
    text: 'Using the principles in our AI Stewardship handbook, write a set of rules for yourself to follow in your use of generative AI. [Placeholder: further detail on the goals of the competition.]',
  },
  {
    tag: 'Content',
    title: 'What your constitution should include',
    text: '[Placeholder: the aspects and principles every constitution should address.]',
  },
  {
    tag: 'Video',
    title: 'Video requirements',
    text: 'Submit a simple video of yourself explaining your constitution. [Placeholder: required length, contents, and recording guidance.]',
  },
  {
    tag: 'Format',
    title: 'Format & file types',
    text: 'You will put this constitution into your AI model of choice, so write it in an LLM-readable format. [Placeholder: formatting expectations and accepted file types.]',
  },
  {
    tag: 'Who',
    title: 'Eligibility',
    text: '[Placeholder: who may enter, whether teams are allowed, and how many entries each person may submit.]',
  },
  {
    tag: 'When',
    title: 'Deadline & judging',
    text: '[Placeholder: submission deadline, how and by whom entries will be judged, and when the winner will be announced.]',
  },
]

// Drives the slim header's "compress under the nav" effect: writes how far
// the visitor has scrolled through the first SQUEEZE_PX pixels (0 to 1) to
// the --lc-squeeze CSS variable on the header. CSS does the rest.
const SQUEEZE_PX = 80

function useHeaderSqueeze(ref) {
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const p = Math.min(Math.max(window.scrollY / SQUEEZE_PX, 0), 1)
      el.style.setProperty('--lc-squeeze', p.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

export default function AiConstitutionCompetition() {
  const headerRef = useRef(null)
  useHeaderSqueeze(headerRef)
  return (
    <>
      <header className="phead phead--paper phead--slim" ref={headerRef}>
        <div className="wrap">
          <h1>AI Constitution Competition</h1>
          <p>
            Using the principles laid out in our <Link to="/principles">AI Stewardship handbook</Link>, write a set of
            rules for yourself to follow in your use of generative AI.
          </p>
        </div>
      </header>

      <section className="section lc-guidelines" data-screen-label="Competition guidelines">
        <div className="wrap">
          <Link className="back-link" to="/get-involved">
            <span className="arr">&larr;</span> Back to Events
          </Link>
          <div className="lc-overview" data-reveal>
            <p>
              You will submit your completed constitution as well as a simple video of yourself explaining your
              constitution.
            </p>
            <p>
              In practice, you will be putting this constitution into your AI model of choice, so write your
              constitution in an LLM-readable format.
            </p>
          </div>
          <div className="ks-section-label">
            <h2>Competition guidelines</h2>
            <span className="ks-section-label__tag">Read before submitting</span>
          </div>
          <p className="lc-pending" data-reveal>
            Full specifications are coming soon. The details below are placeholders and will be updated.
          </p>
          <div className="sc-grid">
            {GUIDELINES.map((g) => (
              <div className="sc-card" key={g.title} data-reveal>
                <div className="sc-card__top">
                  <span className="sc-card__tag">{g.tag}</span>
                </div>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lc-submit" id="submit" data-screen-label="Submit a constitution">
        <div className="wrap lc-submit__grid">
          <div className="lc-submit__intro" data-reveal>
            <p className="kicker">Submission point</p>
            <h2>Submit your constitution</h2>
            <p>
              Entries are submitted on the Build Your Constitution page, where you upload your written constitution
              and your video together. Entries require a BYU email address.
            </p>
            <p>
              <Link className="btn btn--accent" to="/constitution#submit">
                Go to the submission form <span className="arrow">&rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
