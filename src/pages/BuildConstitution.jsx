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
  isLinkedInUrl,
  BYU_EMAIL_MESSAGE,
  LINKEDIN_MESSAGE,
} from '../lib/validation.js'
import { CONTACT_EMAIL, addLinkedIn, submitEntry } from '../lib/submissions.js'
import { SITE_URL } from '../lib/site.js'
import { CONSTITUTION_EXAMPLES } from '../data/constitutionExamples.js'
import '../showcase.css'
import '../ai-constitution-competition.css'
import '../build-constitution.css'

// Release flag: submissions stay off (disabled button, "Submissions open soon.")
// unless VITE_SUBMISSIONS_OPEN=true at build time. The Apps Script has its own
// switch (script property SUBMISSIONS_OPEN), which is the real lock.
export const SUBMISSIONS_OPEN = import.meta.env.VITE_SUBMISSIONS_OPEN === 'true'

const HARNESS_DEFINITION =
  'A harness is a set of rules and guidelines your AI works within. It shapes how the tool responds to you.'

// "harness" with a definition that appears on hover, keyboard focus, or tap.
function Harness({ children = 'harness' }) {
  return (
    <span className="bc-term" tabIndex={0}>
      {children}
      <span className="bc-term__tip" role="tooltip">
        {HARNESS_DEFINITION}
      </span>
    </span>
  )
}

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

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior']

// How-to video: putting your constitution into an AI tool's custom instructions.
// Empty shows a "coming soon" placeholder. To add the video, set this to either:
//   - a YouTube embed link, e.g. 'https://www.youtube.com/embed/VIDEO_ID'
//   - a file in public/constitution/, e.g. 'constitution/harness-how-to.mp4'
const HARNESS_VIDEO = ''

function HarnessVideo() {
  if (!HARNESS_VIDEO) {
    return (
      <div className="bc-video bc-video--empty">
        <span className="bc-video__play" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
          </svg>
        </span>
        <p>Video coming soon</p>
      </div>
    )
  }
  const isFile = /\.(mp4|webm|mov|m4v)$/i.test(HARNESS_VIDEO)
  return (
    <div className="bc-video">
      {isFile ? (
        <video controls preload="metadata" src={`${import.meta.env.BASE_URL}${HARNESS_VIDEO}`} />
      ) : (
        <iframe
          src={HARNESS_VIDEO}
          title="How to add your constitution to your AI tool"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  )
}

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
        {sent.linkedin && (
          <li>
            <b>LinkedIn post</b>
            <span>Linked</span>
          </li>
        )}
      </ul>
      {!sent.linkedin && (
        <p>Once your LinkedIn post is up, add its link with the “Add your LinkedIn post” form on this page.</p>
      )}
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
  const [form, setForm] = useState({ name: '', email: '', major: '', year: '', linkedin: '' })
  const [emailError, setEmailError] = useState('')
  const [linkedinError, setLinkedinError] = useState('')
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
    if (k === 'linkedin') setLinkedinError('')
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
    if (form.linkedin.trim() && !isLinkedInUrl(form.linkedin)) {
      setLinkedinError(LINKEDIN_MESSAGE)
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
        fields: { ...form, linkedin: form.linkedin.trim() },
        doc,
        video,
        onProgress: (s, total) => setProgress({ sent: s, total }),
      })
      setSent({ receivedAt, doc, video, videoSeconds, email: form.email.trim(), linkedin: form.linkedin.trim() })
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
            aria-describedby={emailError ? 'bc-email-error' : 'bc-email-hint'}
            disabled={sending || undefined}
          />
          {/* Usability test, Oct 26: a classmate typed a non-BYU email first; the
              placeholder disappears once you type, so the rule stays visible here. */}
          {!emailError && (
            <span className="bc-hint" id="bc-email-hint">
              Use your @byu.edu email address.
            </span>
          )}
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

      <label className="bc-field">
        <span>
          LinkedIn post link <span className="bc-optional">(optional)</span>
        </span>
        <input
          type="url"
          value={form.linkedin}
          onChange={set('linkedin')}
          placeholder="https://www.linkedin.com/posts/…"
          className={linkedinError ? 'lc-input--error' : undefined}
          aria-invalid={linkedinError ? true : undefined}
          aria-describedby={linkedinError ? 'bc-linkedin-error' : 'bc-linkedin-hint'}
          disabled={sending || undefined}
        />
        {!linkedinError && (
          <span className="bc-hint" id="bc-linkedin-hint">
            Haven’t posted yet? Submit now and add the link later.
          </span>
        )}
        {linkedinError && (
          <span className="lc-error" id="bc-linkedin-error" role="alert">
            {linkedinError}
          </span>
        )}
      </label>

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

// One example constitution as a dropdown. Blank lines split paragraphs;
// lines starting with "## " are headings.
function Example({ example, n }) {
  const { author, detail, body, file } = example
  const blocks = body.trim() ? body.trim().split(/\n\s*\n/) : []
  return (
    <details className="bc-example">
      <summary>
        <span className="bc-example__num">{n}</span>
        <span className="bc-example__title">
          <strong>Example {n}</strong>
          {author && (
            <span>
              {author}
              {detail && ` · ${detail}`}
            </span>
          )}
        </span>
        <span className="bc-example__chev" aria-hidden="true" />
      </summary>
      <div className="bc-example__body">
        {blocks.length === 0 && !file && <p className="bc-example__empty">Example coming soon.</p>}
        {blocks.map((b, i) =>
          b.startsWith('## ') ? <h4 key={i}>{b.slice(3)}</h4> : <p key={i}>{b}</p>
        )}
        {file && (
          <a className="bc-example__file" href={`${import.meta.env.BASE_URL}${file}`} download>
            Download this constitution
          </a>
        )}
      </div>
    </details>
  )
}

// For students who already submitted: attaches a LinkedIn post link to their
// latest entry, matched by their BYU email.
function LinkedInLater() {
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  // idle | sending | done
  const [status, setStatus] = useState('idle')
  const sending = status === 'sending'

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!SUBMISSIONS_OPEN || sending) return
    if (!isByuEmail(email)) return setError(BYU_EMAIL_MESSAGE)
    if (!isLinkedInUrl(url)) return setError(LINKEDIN_MESSAGE)
    setError('')
    setStatus('sending')
    try {
      await addLinkedIn({ email, url })
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      setError(err.code === 'notfound' || err.code === 'invalid' ? err.message : FAILED_MESSAGE)
    }
  }

  if (status === 'done') {
    return (
      <div className="bc-later" role="status">
        <h3>LinkedIn post added</h3>
        <p>
          It’s now linked to your submission. We sent a note to <strong>{email.trim()}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form className="bc-later" onSubmit={onSubmit}>
      <h3>Already submitted? Add your LinkedIn post</h3>
      <p>Use the same BYU email you submitted with, and we’ll attach the link to your entry.</p>
      <label>
        BYU email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@byu.edu"
          autoComplete="email"
          disabled={sending || undefined}
        />
      </label>
      <label>
        LinkedIn post link
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.linkedin.com/posts/…"
          disabled={sending || undefined}
        />
      </label>
      {error && (
        <p className="lc-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--ghost" disabled={!SUBMISSIONS_OPEN || sending}>
        {sending ? 'Adding…' : 'Add my LinkedIn post'}
      </button>
    </form>
  )
}

export default function BuildConstitution() {
  // Links like /constitution#submit: jump to the section after the layout's
  // scroll-to-top on navigation has run.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return undefined
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0)
    return () => clearTimeout(t)
  }, [])
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
        <p className="wrap bc-hero__credit">Background: Raphael, The School of Athens, 1509–1511</p>
      </header>

      {/* Introduction */}
      <section className="section bc-intro" data-screen-label="The assignment">
        <div className="wrap bc-intro__grid">
          <div data-reveal>
            <p className="kicker">The assignment</p>
            <h2>Creating a personal set of guidelines for your AI to use</h2>
          </div>
          <div className="bc-intro__body" data-reveal>
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
              <div className="bc-deliverable bc-deliverable--wide">
                <span className="bc-deliverable__num">3</span>
                <div>
                  <h3>LinkedIn post</h3>
                  <p>Show your network what you built.</p>
                  <ol className="bc-mini-steps">
                    <li>Make a LinkedIn post.</li>
                    <li>Share your constitution and how you’re using it with AI.</li>
                    <li>
                      Include a link to our website: <a href={SITE_URL}>{SITE_URL.replace(/^https:\/\//, '')}</a>
                    </li>
                  </ol>
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
                    <th scope="row">
                      {r.criterion === 'Usable as a harness' ? (
                        <>
                          Usable as a <Harness />
                        </>
                      ) : (
                        r.criterion
                      )}
                    </th>
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
              <li>Paste your LinkedIn post link (optional now, you can add it later).</li>
            </ol>
          </div>
          <SubmissionForm />
          {/* Under steps 1-4 on wide screens; after the form on phones. */}
          <div className="bc-later-slot">
            <LinkedInLater />
          </div>
        </div>

        {/* Examples (left) and how-to video (right), same size as the box above */}
        <div className="wrap bc-extras">
          <div className="bc-later bc-extra" id="examples" data-screen-label="Examples">
            <h3>Don’t know where to start?</h3>
            <p>Here are 3 unique student AI constitution examples.</p>
            <div className="bc-example-list">
              {CONSTITUTION_EXAMPLES.map((ex, i) => (
                <Example key={i} example={ex} n={i + 1} />
              ))}
            </div>
          </div>
          <div className="bc-later bc-extra" id="how-to" data-screen-label="How to use it">
            <h3>Put your constitution to work</h3>
            <p>Watch how to paste your constitution into your AI tool’s custom instructions so it shapes every conversation.</p>
            <HarnessVideo />
          </div>
        </div>
      </section>
    </div>
  )
}
