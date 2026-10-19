import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../kickstart.css'
import '../showcase.css'
import '../ai-constitution-competition.css'

// Submissions currently go to Formspree (no backend of our own).
// TODO: Formspree is a temporary stand-in. Video files can exceed its upload
// limits, so swap FORMSPREE_URL (and the fetch in onSubmit) for the new
// upload service once it is chosen.
const FORMSPREE_URL = 'https://formspree.io/f/xrpbkgbn'

// Only @byu.edu addresses are accepted.
const BYU_EMAIL = /^[^\s@]+@byu\.edu$/i
const BYU_EMAIL_PATTERN = '[^\\s@]+@[Bb][Yy][Uu]\\.[Ee][Dd][Uu]'

// Video upload: MP4, MOV, or WebM, up to MAX_MB. Every file is checked three
// ways before it is sent: extension, the browser-reported MIME type (when
// the browser reports one), and the file's first bytes (its "magic number"),
// so a renamed ZIP or other file is rejected.
const MAX_MB = 100
const MAX_BYTES = MAX_MB * 1024 * 1024
const ALLOWED_EXT = ['mp4', 'mov', 'webm']
const ALLOWED_MIME = ['video/mp4', 'video/quicktime', 'video/webm']
const ACCEPT_ATTR = '.mp4,.mov,.webm,video/mp4,video/quicktime,video/webm'
// Top-level atom names a valid MP4/MOV file can start with.
const ISO_ATOMS = ['ftyp', 'moov', 'mdat', 'wide', 'free', 'skip', 'pnot']

async function checkVideoFile(file) {
  if (!file) return 'Please choose a video file to upload.'
  const ext = file.name.split('.').pop().toLowerCase()
  if (!ALLOWED_EXT.includes(ext) || (file.type && !ALLOWED_MIME.includes(file.type))) {
    return 'Only MP4, MOV, or WebM videos can be submitted. ZIP files and other file types are not accepted.'
  }
  if (file.size > MAX_BYTES) return `That video is larger than ${MAX_MB} MB. Please upload a shorter or smaller version.`
  if (file.size === 0) return 'That file appears to be empty.'

  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  const atom = String.fromCharCode(head[4], head[5], head[6], head[7])
  const isIso = ISO_ATOMS.includes(atom)
  const isWebm = head[0] === 0x1a && head[1] === 0x45 && head[2] === 0xdf && head[3] === 0xa3
  const valid = ext === 'webm' ? isWebm : isIso
  if (!valid) {
    return 'That file is not a valid MP4, MOV, or WebM video. Please export your video in one of those formats and try again.'
  }
  return null
}

function formatSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

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

const EMPTY = { name: '', email: '', constitution: '', aiUse: '' }

function SubmissionForm() {
  const [form, setForm] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const fileInput = useRef(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const clearFile = () => {
    setFile(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  const checkEmail = (value) =>
    BYU_EMAIL.test(value.trim()) ? '' : 'Please use your BYU email address (ending in @byu.edu).'

  const onFileChange = async (e) => {
    const chosen = e.target.files && e.target.files[0]
    if (!chosen) {
      setFile(null)
      return
    }
    const err = await checkVideoFile(chosen)
    if (err) {
      setFileError(err)
      clearFile()
      return
    }
    setFileError('')
    setFile(chosen)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const eErr = checkEmail(form.email)
    setEmailError(eErr)
    // Re-check at submit time in case the input was tampered with.
    const fErr = await checkVideoFile(file)
    if (fErr) setFileError(fErr)
    if (eErr || fErr) return

    const email = form.email.trim()
    const data = new FormData()
    data.append('name', form.name)
    data.append('email', email)
    data.append('constitution', form.constitution)
    data.append('ai_use', form.aiUse)
    data.append('video', file, file.name)
    data.append('_subject', `AI Constitution entry: ${email}`)
    data.append('_replyto', email)
    data.append('_gotcha', e.target.elements._gotcha.value)

    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      setStatus('sent')
      setForm(EMPTY)
      clearFile()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="lc-done" role="status">
        <h3>Thanks, your constitution is in.</h3>
        <p>We received your entry and will be in touch by email if we have any questions.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
          Submit another entry
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form className="sc-form lc-form" onSubmit={onSubmit}>
      <div className="sc-form__row">
        <label>
          Your name
          <input name="name" required value={form.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          BYU email
          <input
            type="email"
            name="email"
            required
            pattern={BYU_EMAIL_PATTERN}
            title="Use your BYU email address (ending in @byu.edu)."
            value={form.email}
            onChange={(e) => {
              set('email')(e)
              if (emailError) setEmailError(checkEmail(e.target.value))
            }}
            onBlur={() => form.email && setEmailError(checkEmail(form.email))}
            placeholder="you@byu.edu"
            autoComplete="email"
            aria-invalid={emailError ? 'true' : undefined}
          />
        </label>
      </div>
      {emailError && (
        <p className="lc-error" role="alert">
          {emailError}
        </p>
      )}
      <label>
        Your constitution
        <textarea
          name="constitution"
          className="lc-constitution"
          required
          rows={14}
          value={form.constitution}
          onChange={set('constitution')}
          placeholder="Paste your full constitution here, written in a format an AI model can read."
        />
      </label>
      <label>
        AI used in creating your constitution
        <textarea
          name="ai_use"
          required
          rows={4}
          value={form.aiUse}
          onChange={set('aiUse')}
          placeholder="Describe any AI tools you used and how you used them. If you used none, write “None.”"
        />
      </label>

      <div className="lc-file">
        <span className="lc-file__label" id="lc-file-label">
          Video explanation
        </span>
        <label className={`lc-drop${fileError ? ' lc-drop--error' : ''}${file ? ' lc-drop--ready' : ''}`}>
          <input
            ref={fileInput}
            className="lc-drop__input"
            type="file"
            name="video"
            accept={ACCEPT_ATTR}
            onChange={onFileChange}
            aria-labelledby="lc-file-label"
            aria-describedby="lc-file-help"
          />
          {file ? (
            <span className="lc-drop__text">
              <strong>{file.name}</strong>
              <span>{formatSize(file.size)} &middot; click to choose a different file</span>
            </span>
          ) : (
            <span className="lc-drop__text">
              <strong>Choose an MP4, MOV, or WebM video</strong>
              <span>Click to browse your files</span>
            </span>
          )}
        </label>
        <p className="lc-file__help" id="lc-file-help">
          MP4, MOV, or WebM only, up to {MAX_MB} MB. ZIP files and other file types are not accepted.
        </p>
        {fileError && (
          <p className="lc-error" role="alert">
            {fileError}
          </p>
        )}
      </div>

      {/* Honeypot for spam bots; hidden from people. */}
      <input type="text" name="_gotcha" className="lc-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="sc-form__actions">
        <button type="submit" className="btn btn--accent" disabled={sending}>
          {sending ? 'Sending…' : 'Submit entry'}
          {!sending && <span className="arrow">&rarr;</span>}
        </button>
        {status === 'error' && (
          <span className="lc-error" role="alert">
            Something went wrong sending your entry. Please try again in a moment.
          </span>
        )}
      </div>
    </form>
  )
}

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
            <p>Make sure your entry follows the guidelines above. Entries require a BYU email address.</p>
            <ol className="lc-steps">
              <li>Fill in your name and BYU email.</li>
              <li>Paste your full constitution into the text box.</li>
              <li>Describe any AI you used in creating it.</li>
              <li>Attach your video explanation and press Submit.</li>
            </ol>
          </div>
          <SubmissionForm />
        </div>
      </section>
    </>
  )
}
