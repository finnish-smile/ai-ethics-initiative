import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { SHARE_EMAIL } from '../data/showcase.js'
import '../showcase.css'

// Formspree form that receives article suggestions for the News page. The
// team reviews them in the Formspree inbox and adds picks to data/news.js.
const FORMSPREE_FORM_ID = 'myeewqzq'

const EMPTY = { link: '', title: '', source: '' }

// Only the submit button sends the form. Enter in a single-line field would
// normally submit it, so that is switched off; Enter/Space on the focused
// button still works for keyboard users.
const blockEnterSubmit = (e) => {
  if (e.key === 'Enter' && e.target instanceof HTMLInputElement && !e.nativeEvent.isComposing) {
    e.preventDefault()
  }
}

export default function ArticleSuggestForm() {
  const [form, setForm] = useState(EMPTY)
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const startOver = () => {
    setForm(EMPTY)
    reset()
  }

  const formFailed = (state.errors?.getFormErrors().length ?? 0) > 0
  const subject = `Article suggestion: ${form.title.trim() || form.link.trim()}`

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
        <h3>Suggest an article</h3>
        <p className="sc-form__lead">
          Read something worth sharing? Send it to us so we can share it here!
        </p>
        <label>
          Article link
          {/* Plain text rather than type="url" so any link is accepted, with
              or without https://. The pattern only rejects a blank entry. */}
          <input
            name="link"
            required
            pattern=".*\S.*"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={form.link}
            onChange={set('link')}
            placeholder="Paste the link here"
          />
          <ValidationError field="link" prefix="Link" errors={state.errors} className="sc-form__error" />
        </label>
        <div className="sc-form__row">
          <label>
            Article title (optional)
            <input name="title" value={form.title} onChange={set('title')} />
            <ValidationError field="title" prefix="Title" errors={state.errors} className="sc-form__error" />
          </label>
          <label>
            Source (optional)
            <input name="source" value={form.source} onChange={set('source')} placeholder="e.g. The Atlantic" />
            <ValidationError field="source" prefix="Source" errors={state.errors} className="sc-form__error" />
          </label>
        </div>

        <input type="hidden" name="_subject" value={subject} />
        {/* Honeypot for spam bots; hidden from people. */}
        <input type="text" name="_gotcha" className="sc-form__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="sc-form__actions">
          <button type="submit" className="btn btn--accent" disabled={state.submitting}>
            {state.submitting ? 'Sending…' : 'Suggest article'}
            {!state.submitting && <span className="arrow">&rarr;</span>}
          </button>
          {formFailed && (
            <span className="sc-form__error" role="alert">
              Something went wrong sending your suggestion. Please try again, or email us at {SHARE_EMAIL}.
            </span>
          )}
        </div>
      </div>
      {state.succeeded && (
        <div className="sc-form__done" role="status">
          <h3>Thanks for the suggestion!</h3>
          <p className="sc-form__lead">We&rsquo;ll take a look and may share it here soon.</p>
          <div className="sc-form__actions">
            <button type="button" className="btn btn--ghost" onClick={startOver} autoFocus>
              Suggest another
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
