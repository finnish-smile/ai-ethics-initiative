import { useState } from 'react'
import { useForm } from '@formspree/react'
import { SHARE_EMAIL } from '../data/showcase.js'

// Formspree form that collects newsletter signups. Formspree only stores the
// addresses; the newsletter itself is sent separately from that list.
const FORMSPREE_FORM_ID = 'mwlvbrqy'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// Only the Subscribe button sends the form. Enter in the email field would
// normally submit it, so that is switched off; Enter/Space on the focused
// button still works for keyboard users.
const blockEnterSubmit = (e) => {
  if (e.key === 'Enter' && e.target instanceof HTMLInputElement && !e.nativeEvent.isComposing) {
    e.preventDefault()
  }
}

// Newsletter signup box, used on both the News page and the Newsletter page.
// `source` records which page the signup came from.
export default function NewsletterSignup({ source }) {
  const [email, setEmail] = useState('')
  const [includeEvents, setIncludeEvents] = useState(true)
  const [emailError, setEmailError] = useState(false)
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID)

  const onSubmit = (e) => {
    e.preventDefault()
    if (state.submitting) return
    const address = email.trim()
    if (!EMAIL_RE.test(address)) {
      setEmailError(true)
      return
    }
    setEmailError(false)
    handleSubmit({
      email: address,
      include_event_schedule: includeEvents ? 'Yes' : 'No',
      signup_page: source,
      _subject: 'Newsletter signup',
      _gotcha: e.currentTarget.elements._gotcha.value,
    })
  }

  const badEmail = emailError || (state.errors?.getFieldErrors('email').length ?? 0) > 0
  const formFailed = (state.errors?.getFormErrors().length ?? 0) > 0

  // The <form> keeps the same className at all times (a changing className
  // would wipe classes the page's scroll effects add). After sending, the
  // fields stay in place but invisible so the box keeps its size, and the
  // thank-you line sits on top of them.
  return (
    <form
      className="nl-form"
      onSubmit={onSubmit}
      onKeyDown={blockEnterSubmit}
      data-sent={state.succeeded || undefined}
      noValidate
    >
      <div className="nl-form__body" inert={state.succeeded} aria-hidden={state.succeeded || undefined}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@byu.edu"
          aria-label="Email address"
          aria-invalid={badEmail || undefined}
          autoComplete="email"
          required
          style={badEmail ? { borderColor: '#A3082A' } : undefined}
        />
        <button className="btn btn--accent" type="submit" disabled={state.submitting}>
          {state.submitting ? 'Sending…' : 'Subscribe'}
        </button>
        <label className="nl-toggle">
          <input
            type="checkbox"
            checked={includeEvents}
            onChange={(e) => setIncludeEvents(e.target.checked)}
          />
          <span className="nl-toggle__track" aria-hidden="true">
            <span className="nl-toggle__thumb"></span>
          </span>
          <span className="nl-toggle__label">Include the weekly event schedule</span>
        </label>
        {/* Honeypot for spam bots; hidden from people. */}
        <input type="text" name="_gotcha" className="nl-form__hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        {formFailed && (
          <p className="nl-error" role="alert">
            Something went wrong signing you up. Please try again, or email us at {SHARE_EMAIL}.
          </p>
        )}
      </div>
      {state.succeeded && (
        <p className="nl-ok" role="status">
          Thanks &mdash; you&rsquo;re on the list.
        </p>
      )}
    </form>
  )
}
