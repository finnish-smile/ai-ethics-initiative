import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { SHARE_EMAIL } from '../data/showcase.js'
import '../showcase.css'

// Formspree form that receives campus event tips. The team reviews them in
// the Formspree inbox and adds real events to data/events.js.
const FORMSPREE_FORM_ID = 'xkjgqyny'

const EMPTY = { what: '', date: '', where: '', details: '', name: '' }

// Only the submit button sends the form. Enter in a single-line field would
// normally submit it, so that is switched off; Enter in a textarea still adds
// a new line, and Enter/Space on the focused button still works for keyboard users.
const blockEnterSubmit = (e) => {
  if (e.key === 'Enter' && e.target instanceof HTMLInputElement && !e.nativeEvent.isComposing) {
    e.preventDefault()
  }
}

export default function EventSuggestForm() {
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
        <h3>Know about something happening on campus?</h3>
        <p className="sc-form__lead">
          Let us know! Tell us what you heard and we&rsquo;ll add it to the calendar.
        </p>
        <label>
          What&rsquo;s happening?
          <input
            name="event"
            required
            value={form.what}
            onChange={set('what')}
            placeholder="e.g. Guest lecture on AI in healthcare"
          />
          <ValidationError field="event" prefix="This" errors={state.errors} className="sc-form__error" />
        </label>
        <div className="sc-form__row">
          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={set('date')} />
            <ValidationError field="date" prefix="Date" errors={state.errors} className="sc-form__error" />
          </label>
          <label>
            Time and place
            <input
              name="time_and_place"
              value={form.where}
              onChange={set('where')}
              placeholder="e.g. 5 PM, Kimball Tower"
            />
            <ValidationError field="time_and_place" prefix="This" errors={state.errors} className="sc-form__error" />
          </label>
        </div>
        <label>
          More details or a link (optional)
          <textarea name="details" rows={3} value={form.details} onChange={set('details')} />
          <ValidationError field="details" prefix="This" errors={state.errors} className="sc-form__error" />
        </label>
        <label>
          Your name (optional)
          <input name="name" value={form.name} onChange={set('name')} autoComplete="name" />
          <ValidationError field="name" prefix="Name" errors={state.errors} className="sc-form__error" />
        </label>

        <input type="hidden" name="_subject" value={`Campus event tip: ${form.what}`} />
        {/* Honeypot for spam bots; hidden from people. */}
        <input type="text" name="_gotcha" className="sc-form__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="sc-form__actions">
          <button type="submit" className="btn btn--accent" disabled={state.submitting}>
            {state.submitting ? 'Sending…' : 'Send it in'}
            {!state.submitting && <span className="arrow">&rarr;</span>}
          </button>
          {formFailed && (
            <span className="sc-form__error" role="alert">
              Something went wrong sending your tip. Please try again, or email us at {SHARE_EMAIL}.
            </span>
          )}
        </div>
      </div>
      {state.succeeded && (
          <div className="sc-form__done" role="status">
            <h3>Thanks for the tip!</h3>
            <p className="sc-form__lead">
              We got it and will add it to the calendar once we&rsquo;ve checked the details.
            </p>
            <div className="sc-form__actions">
              <button type="button" className="btn btn--ghost" onClick={startOver} autoFocus>
                Send another tip
              </button>
            </div>
          </div>
      )}
    </form>
  )
}
