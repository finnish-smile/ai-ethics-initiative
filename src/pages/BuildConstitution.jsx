import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRINCIPLES } from '../data/kickstart/principles.js'
import {
  DOC_ACCEPT,
  DOC_MAX_MB,
  VIDEO_ACCEPT,
  VIDEO_MAX_MB,
  VIDEO_MAX_S,
  VIDEO_MIN_S,
  checkDoc,
  checkVideo,
  formatDuration,
  formatSize,
  isByuEmail,
  BYU_EMAIL_MESSAGE,
} from '../lib/validation.js'
import { CONTACT_EMAIL, submitEntry } from '../lib/submissions.js'
import '../showcase.css'
import '../ai-constitution-competition.css'
import '../build-constitution.css'

// Release flag: submissions stay off (disabled button, "Submissions open soon.")
// unless VITE_SUBMISSIONS_OPEN=true at build time. The Apps Script has its own
// switch (script property SUBMISSIONS_OPEN), which is the real lock.
export const SUBMISSIONS_OPEN = import.meta.env.VITE_SUBMISSIONS_OPEN === 'true'

// The three cards along the bottom of the first screen.
const WHAT_WHY_HOW = [
  {
    title: 'What',
    text: 'A short personal constitution, one article per guiding principle, that sets the rules for how you will and won’t use AI.',
  },
  {
    title: 'Why',
    text: 'Deciding your values before you open the chat window keeps you, not the tool, in charge of your learning, choices, and integrity.',
  },
  {
    title: 'How',
    text: 'Write your five articles, use them as a harness in your AI tools’ custom instructions, and explain your choices in a 30–120 second video.',
  },
]

// Rubric, 100 points total.
const RUBRIC = [
  {
    criterion: 'Usable as a harness',
    lookFor:
      'Written as clear, specific rules you could paste into an AI tool’s custom instructions and it would change how the tool behaves.',
    points: 10,
  },
  {
    criterion: 'Structure & format',
    lookFor:
      'Clearly organized and easy to read, in a format others could pick up and apply to their own AI use.',
    points: 10,
  },
  {
    criterion: 'Personal input',
    lookFor: 'Grounded in your own courses, goals, and habits — not generic statements anyone could sign.',
    points: 10,
  },
  {
    criterion: 'The five principles',
    lookFor: `How you implemented each of the five principles (${PRINCIPLES.map((p) => p.title).join(', ')}) in your constitution.`,
    points: 40,
  },
  {
    criterion: 'Video: What, why, and how?',
    lookFor:
      'A 30–120 second video on what your constitution says, why you wrote it, and how you built it, including how you used AI to create it.',
    points: 30,
  },
]

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate student']

function DropZone({ id, label, prompt, help, accept, file, error, onPick, extra, locked }) {
  const input = useRef(null)
  const onChange = async (e) => {
    const chosen = e.target.files && e.target.files[0]
    const ok = await onPick(chosen || null)
    if (!ok && input.current) input.current.value = ''
  }
  return (
    <div className="lc-file">
      <span className="lc-file__label" id={`${id}-label`}>
        {label}
      </span>
      <label
        className={`lc-drop${error ? ' lc-drop--error' : ''}${file ? ' lc-drop--ready' : ''}${locked ? ' lc-drop--locked' : ''}`}
      >
        <input
          ref={input}
          className="lc-drop__input"
          type="file"
          accept={accept}
          onChange={onChange}
          disabled={locked || undefined}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-help`}
        />
        {file ? (
          <span className="lc-drop__text">
            <strong>{file.name}</strong>
            <span>
              {formatSize(file.size)}
              {extra} &middot; click to choose a different file
            </span>
          </span>
        ) : (
          <span className="lc-drop__text">
            <strong>{prompt}</strong>
            <span>Click to browse your files</span>
          </span>
        )}
      </label>
      <p className="lc-file__help" id={`${id}-help`}>
        {help}
      </p>
      {error && (
        <p className="lc-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Shown under the button once submissions are open, as "Due <this>.".
// Hidden while empty; fill in when the student deadline is set.
const STUDENT_DEADLINE = ''

const FAILED_MESSAGE = 'Something went wrong sending your entry. Please try again in a moment.'

function formatReceived(date) {
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function Confirmation({ sent }) {
  return (
    <div className="sc-form lc-form bc-done" role="status">
      <span className="bc-done__mark">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="kicker">Received &middot; {formatReceived(sent.receivedAt)}</p>
      <h3>Thanks, your constitution is in.</h3>
      <ul className="bc-files">
        <li>
          <b>{sent.doc.name}</b>
          <span>{formatSize(sent.doc.size)}</span>
        </li>
        <li>
          <b>{sent.video.name}</b>
          <span>
            {formatSize(sent.video.size)}
            {sent.videoSeconds ? ` · ${formatDuration(sent.videoSeconds)}` : ''}
          </span>
        </li>
      </ul>
      <p>
        We sent a receipt to <strong>{sent.email}</strong>. Keep it as your record.
      </p>
      <p>
        Need to change something? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </div>
  )
}

function SubmissionForm() {
  const [form, setForm] = useState({ name: '', email: '', major: '', year: '' })
  const [emailError, setEmailError] = useState('')
  const [doc, setDoc] = useState(null)
  const [docError, setDocError] = useState('')
  const [video, setVideo] = useState(null)
  const [videoError, setVideoError] = useState('')
  const [videoSeconds, setVideoSeconds] = useState(null)
  // idle | sending | failed | limit | done
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState({ sent: 0, total: 0 })
  const [sent, setSent] = useState(null)
  const sending = status === 'sending'

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (k === 'email') {
      setEmailError('')
      if (status === 'limit') setStatus('idle')
    }
  }

  // Ask before leaving mid-upload.
  useEffect(() => {
    if (!sending) return undefined
    const warn = (e) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [sending])

  const pickDoc = async (file) => {
    const err = file ? checkDoc(file) : null
    setDocError(err || '')
    setDoc(err ? null : file)
    return !err
  }
  const pickVideo = async (file) => {
    const { error, seconds } = file ? await checkVideo(file) : { error: null, seconds: null }
    setVideoError(error || '')
    setVideo(error ? null : file)
    setVideoSeconds(error ? null : seconds)
    return !error
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!SUBMISSIONS_OPEN || sending) return
    let ok = true
    if (!isByuEmail(form.email)) {
      setEmailError(BYU_EMAIL_MESSAGE)
      ok = false
    }
    if (!doc) {
      setDocError(docError || 'Please attach your written constitution.')
      ok = false
    }
    if (!video) {
      setVideoError(videoError || 'Please attach your video.')
      ok = false
    }
    if (!ok) return

    setStatus('sending')
    setProgress({ sent: 0, total: doc.size + video.size })
    try {
      const { receivedAt } = await submitEntry({
        fields: form,
        doc,
        video,
        onProgress: (s, total) => setProgress({ sent: s, total }),
      })
      setSent({ receivedAt, doc, video, videoSeconds, email: form.email.trim() })
      setStatus('done')
    } catch (err) {
      setStatus(err.code === 'limit' ? 'limit' : 'failed')
    }
  }

  if (status === 'done') return <Confirmation sent={sent} />

  const pct = progress.total ? Math.round((progress.sent / progress.total) * 100) : 0
  const mb = (bytes) => bytes / 1024 / 1024

  return (
    <form className="sc-form lc-form" onSubmit={onSubmit}>
      <div className="sc-form__row">
        <label>
          Your name
          <input required value={form.name} onChange={set('name')} autoComplete="name" disabled={sending || undefined} />
        </label>
        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="you@byu.edu"
            autoComplete="email"
            className={emailError ? 'lc-input--error' : undefined}
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? 'bc-email-error' : undefined}
            disabled={sending || undefined}
          />
          {emailError && (
            <span className="lc-error" id="bc-email-error" role="alert">
              {emailError}
            </span>
          )}
        </label>
      </div>
      <div className="sc-form__row">
        <label>
          Major
          <input
            required
            value={form.major}
            onChange={set('major')}
            placeholder="e.g. Marketing"
            disabled={sending || undefined}
          />
        </label>
        <label>
          Year in school
          <select required value={form.year} onChange={set('year')} disabled={sending || undefined}>
            <option value="" disabled>
              Choose one
            </option>
            {YEARS.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>

      <DropZone
        id="bc-doc"
        label="Your written constitution"
        prompt="Upload your constitution"
        help={`PDF, Word, or plain text, up to ${DOC_MAX_MB} MB.`}
        accept={DOC_ACCEPT}
        file={doc}
        error={docError}
        onPick={pickDoc}
        locked={sending}
      />
      <DropZone
        id="bc-video"
        label="Your video explanation"
        prompt="Upload your 30–120 second video"
        help={`MP4, MOV, or WebM, ${VIDEO_MIN_S}–${VIDEO_MAX_S} seconds, up to ${VIDEO_MAX_MB} MB.`}
        accept={VIDEO_ACCEPT}
        file={video}
        error={videoError}
        onPick={pickVideo}
        extra={videoSeconds ? ` · ${formatDuration(videoSeconds)}` : null}
        locked={sending}
      />

      {sending && (
        <div className="bc-progress" role="status" aria-live="polite">
          <div className="bc-progress__top">
            <span>Sending your entry…</span>
            <span>
              {Math.round(mb(progress.sent))} of {mb(progress.total).toFixed(1)} MB &middot; {pct}%
            </span>
          </div>
          <div className="bc-bar">
            <i style={{ width: `${pct}%` }} />
          </div>
          <p>Keep this tab open until it finishes. Large videos can take a few minutes.</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="bc-alert" role="alert">
          <p className="sc-form__error">{FAILED_MESSAGE}</p>
        </div>
      )}
      {status === 'limit' && (
        <div className="bc-alert" role="alert">
          <p className="sc-form__error">
            You&rsquo;ve already submitted twice. To make a change, reach out to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      )}

      <div className="sc-form__actions">
        <button
          type="submit"
          className="btn btn--accent"
          disabled={!SUBMISSIONS_OPEN || sending || status === 'limit'}
        >
          {sending ? 'Sending…' : status === 'failed' ? 'Try again' : 'Submit my constitution'}{' '}
          <span className="arrow">&rarr;</span>
        </button>
        {!SUBMISSIONS_OPEN && <span className="bc-closed">Submissions open soon.</span>}
        {SUBMISSIONS_OPEN && !sending && STUDENT_DEADLINE && (
          <span className="bc-closed">Due {STUDENT_DEADLINE}.</span>
        )}
      </div>
    </form>
  )
}

export default function BuildConstitution() {
  return (
    <div className="bc">
      {/* Hero */}
      <header className="bc-hero" data-screen-label="Build your constitution">
        {/* Faded painting behind the hero text; decorative, so hidden from
            screen readers (credited in the caption below). */}
        <div
          className="bc-hero__bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}constitution/school-of-athens.jpg)` }}
        />
        <div className="wrap bc-hero__main">
          <div className="bc-hero__text">
            <p className="kicker">The Constitution Assignment</p>
            <h1>Build your personal AI constitution</h1>
            <p className="bc-preamble">
              “We, the students, in order to think more clearly, learn more deeply, and use these tools as
              stewards rather than servants…”
            </p>
            <p className="bc-hero__lede">
              Write the rules you want your AI to follow — and that you want to follow when you use it.
            </p>
          </div>
          <div className="bc-hero__actions">
            <a className="btn btn--primary" href="#rubric">
              Read the guidelines <span className="arrow">&rarr;</span>
            </a>
            <a className="btn btn--ghost" href="#submit">
              Submit your work
            </a>
          </div>
        </div>
        <ul className="wrap bc-wwh">
          {WHAT_WHY_HOW.map((c) => (
            <li key={c.title}>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <p className="wrap bc-hero__credit">Background: Raphael, The School of Athens, 1509–1511</p>
      </header>

      {/* Introduction */}
      <section className="section bc-intro" data-screen-label="The assignment">
        <div className="wrap bc-intro__grid">
          <div data-reveal>
            <p className="kicker">The assignment</p>
            <h2>A founding document for how you use AI</h2>
          </div>
          <div className="bc-intro__body" data-reveal>
            <p>
              Every nation’s founders wrote down what they believed before they had to act on it. You’re invited
              to do the same for AI: draft a short personal constitution that states how you will — and won’t —
              use AI in your learning, work, and life.
            </p>
            <p>
              Your constitution doubles as a <strong>harness</strong>. Paste it into the custom instructions of the
              AI tools you use, and it shapes how they respond to you: when to push back, when to ask you to do the
              thinking, when to cite sources.
            </p>
            <div className="bc-deliverables">
              <div className="bc-deliverable">
                <span className="bc-deliverable__num">1</span>
                <div>
                  <h3>Written constitution</h3>
                  <p>One article for each of the five guiding principles, written as rules you can follow and an AI can apply.</p>
                </div>
              </div>
              <div className="bc-deliverable">
                <span className="bc-deliverable__num">2</span>
                <div>
                  <h3>Video explanation</h3>
                  <p>A 30–120 second video on why you wrote your constitution and how you built it, including how you used AI.</p>
                </div>
              </div>
            </div>
            <p className="bc-tip">
              Need a starting point? Draft your articles in the{' '}
              <Link to="/kickstart/ethics">Constitution Builder in Learn, Module 2</Link>, then download and refine
              them.
            </p>
          </div>
        </div>
      </section>

      {/* Rubric */}
      <section className="section bc-rubric" id="rubric" data-screen-label="Rubric">
        <div className="wrap">
          <div className="bc-section-head" data-reveal>
            <p className="kicker">Rubric</p>
            <h2>What a strong constitution includes</h2>
            <p>
              Your constitution is built on the five guiding principles of the Stewardship of AI.{' '}
              <Link to="/principles">Read the Stewardship of AI principles &rarr;</Link>
            </p>
          </div>
          <div className="bc-table-wrap" data-reveal>
            <table className="bc-table">
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">What we look for</th>
                  <th scope="col" className="bc-table__pts">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {RUBRIC.map((r) => (
                  <tr key={r.criterion}>
                    <th scope="row">{r.criterion}</th>
                    <td>{r.lookFor}</td>
                    <td className="bc-table__pts">{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Submit */}
      <section className="lc-submit" id="submit" data-screen-label="Submit">
        <div className="wrap lc-submit__grid">
          <div className="lc-submit__intro" data-reveal>
            <p className="kicker">Submission</p>
            <h2>Submit your constitution</h2>
            <p>Upload your written constitution and your video explanation together.</p>
            <ol className="lc-steps">
              <li>Fill in your details.</li>
              <li>Attach your written constitution.</li>
              <li>Attach your 30–120 second video.</li>
            </ol>
          </div>
          <SubmissionForm />
        </div>
      </section>
    </div>
  )
}
