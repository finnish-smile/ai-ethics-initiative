import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRINCIPLES } from '../data/kickstart/principles.js'
import '../showcase.css'
import '../logo-competition.css'
import '../build-constitution.css'

// DRAFT OUTLINE. Rubric weights and the submission destination are still
// to be decided, so the submit button stays disabled until they are.
// Note: Formspree (used by the logo competition) caps uploads well below
// typical video sizes, so video needs a different destination.
const SUBMISSIONS_OPEN = false

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

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

// What each article of a student's constitution should address. Draft
// wording, to be refined together with the rubric.
const ARTICLE_PROMPTS = {
  agency: 'Which decisions will you always keep for yourself, and where may AI only advise?',
  becoming: 'Which skills are you here to build, and how will you keep AI from doing that growing for you?',
  fellowship: 'How will your AI use point you toward people — classmates, mentors, family — rather than away?',
  discernment: 'How will you check what AI tells you before you trust it, repeat it, or submit it?',
  integrity: 'When and how will you disclose AI help, and what lines will you not cross even unseen?',
}

// Draft rubric: one combined criterion for the five articles plus the cross-cutting ones.
// Points other than the articles row are placeholders until the rubric is finalized.
const RUBRIC = [
  {
    criterion: 'The five articles',
    lookFor: `One article for each principle (${PRINCIPLES.map((p) => p.title).join(', ')}), each answering the question set out for it above.`,
    points: 40,
  },
  {
    criterion: 'Usable as a harness',
    lookFor:
      'Written as clear, specific rules you could paste into an AI tool’s custom instructions and it would change how the tool behaves.',
    points: '—',
  },
  {
    criterion: 'Personal & specific',
    lookFor: 'Grounded in your own courses, goals, and habits — not generic statements anyone could sign.',
    points: '—',
  },
  {
    criterion: 'Video explanation',
    lookFor: '30–120 seconds on why you wrote your constitution and how you built it.',
    points: '—',
  },
]

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate student']

const DOC_MAX_MB = 10
const DOC_EXT = ['pdf', 'docx', 'doc', 'txt', 'md']
const DOC_ACCEPT = '.pdf,.docx,.doc,.txt,.md'

const VIDEO_MAX_MB = 300
const VIDEO_EXT = ['mp4', 'mov', 'webm', 'm4v']
const VIDEO_ACCEPT = 'video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm,.m4v'
const VIDEO_MIN_S = 30
const VIDEO_MAX_S = 120

const ext = (name) => name.split('.').pop().toLowerCase()

function formatSize(bytes) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function checkDoc(file) {
  if (!DOC_EXT.includes(ext(file.name))) return 'Please upload a PDF, Word document, or plain-text file.'
  if (file.size > DOC_MAX_MB * 1024 * 1024) return `That file is larger than ${DOC_MAX_MB} MB.`
  if (file.size === 0) return 'That file appears to be empty.'
  return null
}

// Reads the video's duration from its metadata so length is checked
// before upload, not after.
function readDuration(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const v = document.createElement('video')
    v.preload = 'metadata'
    v.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve(v.duration)
    }
    v.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    v.src = url
  })
}

async function checkVideo(file) {
  if (!VIDEO_EXT.includes(ext(file.name))) return 'Please upload an MP4, MOV, or WebM video.'
  if (file.size > VIDEO_MAX_MB * 1024 * 1024) return `That video is larger than ${VIDEO_MAX_MB} MB.`
  const seconds = await readDuration(file)
  if (seconds == null) return null // browser can't read this format; length is checked on review instead
  if (seconds < VIDEO_MIN_S || seconds > VIDEO_MAX_S) {
    return `Your video is ${Math.round(seconds)} seconds. It needs to be between ${VIDEO_MIN_S} and ${VIDEO_MAX_S} seconds.`
  }
  return null
}

function DropZone({ id, label, prompt, help, accept, file, error, onPick, extra }) {
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
      <label className={`lc-drop${error ? ' lc-drop--error' : ''}${file ? ' lc-drop--ready' : ''}`}>
        <input
          ref={input}
          className="lc-drop__input"
          type="file"
          accept={accept}
          onChange={onChange}
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

function SubmissionForm() {
  const [form, setForm] = useState({ name: '', email: '', major: '', year: '' })
  const [doc, setDoc] = useState(null)
  const [docError, setDocError] = useState('')
  const [video, setVideo] = useState(null)
  const [videoError, setVideoError] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const pickDoc = async (file) => {
    const err = file ? checkDoc(file) : null
    setDocError(err || '')
    setDoc(err ? null : file)
    return !err
  }
  const pickVideo = async (file) => {
    const err = file ? await checkVideo(file) : null
    setVideoError(err || '')
    setVideo(err ? null : file)
    return !err
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Destination not connected yet (see SUBMISSIONS_OPEN).
  }

  return (
    <form className="sc-form lc-form" onSubmit={onSubmit}>
      <div className="sc-form__row">
        <label>
          Your name
          <input required value={form.name} onChange={set('name')} autoComplete="name" />
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
          />
        </label>
      </div>
      <div className="sc-form__row">
        <label>
          Major
          <input required value={form.major} onChange={set('major')} placeholder="e.g. Marketing" />
        </label>
        <label>
          Year in school
          <select required value={form.year} onChange={set('year')}>
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
      />

      <div className="sc-form__actions">
        <button type="submit" className="btn btn--accent" disabled={!SUBMISSIONS_OPEN}>
          Submit my constitution <span className="arrow">&rarr;</span>
        </button>
        {!SUBMISSIONS_OPEN && <span className="bc-closed">Submissions open soon.</span>}
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
            <a className="btn btn--primary" href="#articles">
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
                  <p>A 30–120 second video on why you wrote your constitution and how you built it.</p>
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

      {/* The five articles */}
      <section className="section bc-articles" id="articles" data-screen-label="The five articles">
        <div className="wrap">
          <div className="bc-section-head" data-reveal>
            <p className="kicker">Guidelines</p>
            <h2>Five articles, five principles</h2>
            <p>
              Your constitution is built on the five guiding principles of the{' '}
              <Link to="/principles">Stewardship of AI</Link>. Write one article for each.
            </p>
          </div>
          <ol className="bc-article-list reveal-stagger">
            {PRINCIPLES.map((p, i) => (
              <li className="bc-article" key={p.id} data-reveal>
                <span className="bc-article__num">Article {ROMAN[i]}</span>
                <h3>{p.title}</h3>
                <p className="bc-article__pause">“{p.pause}”</p>
                <p className="bc-article__def">{p.definition}</p>
                <p className="bc-article__ask">
                  <span>Your article should answer:</span> {ARTICLE_PROMPTS[p.id]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rubric */}
      <section className="section bc-rubric" id="rubric" data-screen-label="Rubric">
        <div className="wrap">
          <div className="bc-section-head" data-reveal>
            <p className="kicker">Rubric</p>
            <h2>What a strong constitution includes</h2>
            <p className="lc-pending">Draft rubric — criteria and point values are still being finalized.</p>
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
              <li>Fill in your name and email.</li>
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
