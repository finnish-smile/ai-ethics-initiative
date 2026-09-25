import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../kickstart.css'
import '../showcase.css'
import '../logo-competition.css'

// Submissions go straight to Formspree (no backend of our own).
const FORMSPREE_URL = 'https://formspree.io/f/xrpbkgbn'

// Only PNG and JPEG are accepted. Every file is checked three ways before it
// is sent: extension, the browser-reported MIME type, and the file's first
// bytes (its "magic number"), so a renamed ZIP or other file is rejected.
const MAX_MB = 10
const MAX_BYTES = MAX_MB * 1024 * 1024
const ALLOWED_EXT = ['png', 'jpg', 'jpeg']
const ALLOWED_MIME = ['image/png', 'image/jpeg']
const ACCEPT_ATTR = '.png,.jpg,.jpeg,image/png,image/jpeg'

async function checkLogoFile(file) {
  if (!file) return 'Please choose a logo file to upload.'
  const ext = file.name.split('.').pop().toLowerCase()
  if (!ALLOWED_EXT.includes(ext) || !ALLOWED_MIME.includes(file.type)) {
    return 'Only PNG or JPG images can be submitted. ZIP files and other file types are not accepted.'
  }
  if (file.size > MAX_BYTES) return `That file is larger than ${MAX_MB} MB. Please upload a smaller version.`
  if (file.size === 0) return 'That file appears to be empty.'

  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer())
  const isPng =
    head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47 &&
    head[4] === 0x0d && head[5] === 0x0a && head[6] === 0x1a && head[7] === 0x0a
  const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff
  if (!isPng && !isJpeg) {
    return 'That file is not a valid PNG or JPG image. Please export your logo as a PNG or JPG and try again.'
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
    tag: 'Concept',
    title: 'Theme & purpose',
    text: '[Placeholder: describe what the logo should represent and the ideas it should communicate about the AI Ethics Initiative.]',
  },
  {
    tag: 'Format',
    title: 'Dimensions & files',
    text: '[Placeholder: required size and aspect ratio, minimum resolution, and whether a transparent background is needed.] Submissions must be PNG or JPG, up to 10 MB.',
  },
  {
    tag: 'Style',
    title: 'Colors & typography',
    text: '[Placeholder: required or suggested color palette, font guidance, and how the logo should look in one color or on dark backgrounds.]',
  },
  {
    tag: 'Who',
    title: 'Eligibility',
    text: '[Placeholder: who may enter, whether teams are allowed, and how many designs each person may submit.]',
  },
  {
    tag: 'Integrity',
    title: 'Originality & AI use',
    text: '[Placeholder: rules on original work, use of AI image tools, and disclosure of any tools used in the design.]',
  },
  {
    tag: 'When',
    title: 'Deadline & judging',
    text: '[Placeholder: submission deadline, how and by whom entries will be judged, and when the winner will be announced.]',
  },
]

const EMPTY = { name: '', email: '', title: '', description: '' }

function SubmissionForm() {
  const [form, setForm] = useState(EMPTY)
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const fileInput = useRef(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const clearFile = () => {
    setFile(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  const onFileChange = async (e) => {
    const chosen = e.target.files && e.target.files[0]
    if (!chosen) {
      setFile(null)
      return
    }
    const err = await checkLogoFile(chosen)
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
    // Re-check at submit time in case the input was tampered with.
    const err = await checkLogoFile(file)
    if (err) {
      setFileError(err)
      return
    }

    const data = new FormData()
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('logo_title', form.title)
    data.append('description', form.description)
    data.append('logo', file, file.name)
    data.append('_subject', `Logo competition entry: ${form.title}`)
    data.append('_replyto', form.email)
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
        <h3>Thanks, your logo is in.</h3>
        <p>We received your submission and will be in touch by email if we have any questions.</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
          Submit another design
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
          Email
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="you@byu.edu"
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        Logo title
        <input name="title" required value={form.title} onChange={set('title')} placeholder="Give your design a name" />
      </label>
      <label>
        About your design
        <textarea
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={set('description')}
          placeholder="What does your logo represent, and what choices did you make?"
        />
      </label>

      <div className="lc-file">
        <span className="lc-file__label" id="lc-file-label">
          Logo file
        </span>
        <label className={`lc-drop${fileError ? ' lc-drop--error' : ''}${file ? ' lc-drop--ready' : ''}`}>
          <input
            ref={fileInput}
            className="lc-drop__input"
            type="file"
            name="logo"
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
              <strong>Choose a PNG or JPG</strong>
              <span>Click to browse your files</span>
            </span>
          )}
        </label>
        <p className="lc-file__help" id="lc-file-help">
          PNG or JPG only, up to {MAX_MB} MB. ZIP files and other file types are not accepted.
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
          {sending ? 'Sending…' : 'Submit logo'}
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

export default function LogoCompetition() {
  const headerRef = useRef(null)
  useHeaderSqueeze(headerRef)
  return (
    <>
      <header className="phead phead--paper phead--slim" ref={headerRef}>
        <div className="wrap">
          <h1>Logo Design Competition</h1>
          <p>Read the guidelines, then submit your design below.</p>
        </div>
      </header>

      <section className="section lc-guidelines" data-screen-label="Logo guidelines">
        <div className="wrap">
          <Link className="back-link" to="/get-involved">
            <span className="arr">&larr;</span> Back to Events
          </Link>
          <div className="ks-section-label">
            <h2>Design guidelines</h2>
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

      <section className="lc-submit" id="submit" data-screen-label="Submit a logo">
        <div className="wrap lc-submit__grid">
          <div className="lc-submit__intro" data-reveal>
            <p className="kicker">Submission point</p>
            <h2>Submit your logo</h2>
            <p>
              Upload one design per submission as a PNG or JPG. Make sure it follows the guidelines above.
            </p>
            <ol className="lc-steps">
              <li>Fill in your name and email.</li>
              <li>Give your design a title and a short description.</li>
              <li>Attach your logo file and press Submit.</li>
            </ol>
          </div>
          <SubmissionForm />
        </div>
      </section>
    </>
  )
}
