import { useEffect, useRef, useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { SHOWCASE, SHARE_EMAIL } from '../data/showcase.js'
import '../showcase.css'

const VISIBLE_COUNT = 2
const EMPTY = { title: '', tool: '', how: '', name: '' }

// Formspree form that receives Ethical AI Showcase ideas. The team reviews
// them in the Formspree inbox and adds approved ideas to data/showcase.js.
const FORMSPREE_FORM_ID = 'mppwybak'

// Only the submit button sends the form. Enter in a single-line field would
// normally submit it, so that is switched off; Enter in a textarea still adds
// a new line, and Enter/Space on the focused button still works for keyboard users.
const blockEnterSubmit = (e) => {
  if (e.key === 'Enter' && e.target instanceof HTMLInputElement && !e.nativeEvent.isComposing) {
    e.preventDefault()
  }
}

function SubmitForm() {
  const [form, setForm] = useState(EMPTY)
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const startOver = () => {
    setForm(EMPTY)
    reset()
  }

  const formFailed = (state.errors?.getFormErrors().length ?? 0) > 0

  // The <form> element always stays mounted and its className never changes:
  // the scroll-reveal observer adds .is-revealed to it directly, and a new
  // className from React would wipe that and leave the box faded out. The
  // sent state is marked with data-sent instead.
  return (
    <form
      className="sc-form"
      onSubmit={handleSubmit}
      onKeyDown={blockEnterSubmit}
      data-sent={state.succeeded || undefined}
      data-reveal
    >
      {/* Fields stay in place (hidden) after sending so the box keeps its full
          size at any screen width; the thank-you note sits on top of them. */}
      <div className="sc-form__body" inert={state.succeeded} aria-hidden={state.succeeded || undefined}>
        <h3>Share your own idea</h3>
        <p className="sc-form__lead">
          Do you use AI in a way that supports learning instead of replacing it? Tell us how.
        </p>
        <div className="sc-form__row">
          <label>
            Title
            <input
              name="title"
              required
              value={form.title}
              onChange={set('title')}
              placeholder="e.g. Foreign Language Practice"
            />
            <ValidationError field="title" prefix="Title" errors={state.errors} className="sc-form__error" />
          </label>
          <label>
            AI tool
            <input name="ai_tool" required value={form.tool} onChange={set('tool')} placeholder="e.g. ChatGPT" />
            <ValidationError field="ai_tool" prefix="AI tool" errors={state.errors} className="sc-form__error" />
          </label>
        </div>
        <label>
          How does it work?
          <textarea
            name="how_it_works"
            required
            rows={4}
            value={form.how}
            onChange={set('how')}
            placeholder="Explain the steps so someone else could try it."
          />
          <ValidationError field="how_it_works" prefix="This" errors={state.errors} className="sc-form__error" />
        </label>
        <label>
          Your name (optional)
          <input name="name" value={form.name} onChange={set('name')} autoComplete="name" />
          <ValidationError field="name" prefix="Name" errors={state.errors} className="sc-form__error" />
        </label>

        <input type="hidden" name="_subject" value={`Showcase idea: ${form.title}`} />
        {/* Honeypot for spam bots; hidden from people. */}
        <input type="text" name="_gotcha" className="sc-form__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="sc-form__actions">
          <button type="submit" className="btn btn--accent" disabled={state.submitting}>
            {state.submitting ? 'Sending…' : 'Submit idea'}
            {!state.submitting && <span className="arrow">&rarr;</span>}
          </button>
          {formFailed && (
            <span className="sc-form__error" role="alert">
              Something went wrong sending your idea. Please try again, or email us at {SHARE_EMAIL}.
            </span>
          )}
        </div>
      </div>
      {state.succeeded && (
          <div className="sc-form__done" role="status">
            <h3>Thanks for sharing your idea!</h3>
            <p className="sc-form__lead">
              We got it. The team reviews every submission before adding it to the showcase.
            </p>
            <div className="sc-form__actions">
              <button type="button" className="btn btn--ghost" onClick={startOver} autoFocus>
                Share another idea
              </button>
            </div>
          </div>
      )}
    </form>
  )
}

export function ShowcaseCard({ item, onOpen, reveal = true }) {
  const open = () => onOpen(item)
  return (
    <div
      className="sc-card sc-card--clickable"
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — view details and prompts`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      {...(reveal ? { 'data-reveal': true } : {})}
    >
      <div className="sc-card__top">
        <span className="sc-card__tag">{item.category}</span>
        <span className="sc-card__tool">{item.tool}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.how}</p>
      <span className="sc-card__cta">
        See prompts<span className="arrow">&rarr;</span>
      </span>
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button type="button" className="sc-copy" onClick={copy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export function ShowcaseDialog({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sc-modal" onClick={onClose}>
      <div
        className="sc-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sc-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="sc-modal__close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="sc-card__top">
          <span className="sc-card__tag">{item.category}</span>
          <span className="sc-card__tool">{item.toolPrefix ?? 'Best with '}{item.tool}</span>
        </div>
        <h3 id="sc-modal-title">{item.title}</h3>
        <p className="sc-modal__how">{item.how}</p>

        <h4>How it works</h4>
        <p>{item.why}</p>

        {item.steps && (
          <>
            <h4>How to run it</h4>
            <ol className="sc-steps">
              {item.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          </>
        )}

        {item.notes && (
          <>
            <h4>Things to keep in mind</h4>
            <ul className="sc-steps">
              {item.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}

        <h4>{item.promptsHeading ?? 'Prompts to copy'}</h4>
        <p className="sc-modal__hint">
          {item.promptsHint ?? (
            <>
              Paste these into {item.tool}, in order, and replace anything in [brackets] with your own
              details. Each one assigns a role, gives specifics, says what to do, shows an example, and
              breaks the task into steps &mdash; worth borrowing for your own prompts.
            </>
          )}
        </p>
        <ol className="sc-prompts">
          {item.prompts.map((pr) => (
            <li key={pr.label} className="sc-prompt">
              <div className="sc-prompt__head">
                <span>{pr.label}</span>
                <CopyButton text={pr.text} />
              </div>
              <pre>{pr.text}</pre>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function ShowcaseSection() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const shown = SHOWCASE.slice(0, VISIBLE_COUNT)
  const more = SHOWCASE.slice(VISIBLE_COUNT)

  return (
    <>
      <div className="sc-grid">
        {shown.map((item) => (
          <ShowcaseCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>
      <div className="sc-actions">
        {more.length > 0 && (
          <button
            type="button"
            className="sc-more"
            aria-expanded={open}
            aria-controls="sc-more-list"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Show less' : 'Show more'}
            <span className={`sc-more__chev ${open ? 'is-open' : ''}`} aria-hidden="true">&#9662;</span>
          </button>
        )}
      </div>
      {more.length > 0 && open && (
        <div className="sc-grid sc-grid--more" id="sc-more-list">
          {more.map((item) => (
            <ShowcaseCard key={item.id} item={item} onOpen={setSelected} reveal={false} />
          ))}
        </div>
      )}
      <SubmitForm />
      {selected && <ShowcaseDialog item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
