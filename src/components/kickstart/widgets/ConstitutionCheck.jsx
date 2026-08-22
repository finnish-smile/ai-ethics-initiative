import { Link } from 'react-router-dom'
import { PRINCIPLES } from '../../../data/kickstart/principles.js'
import useConstitution from '../../../hooks/useConstitution.js'

export default function ConstitutionCheck() {
  const { entries } = useConstitution()
  const written = PRINCIPLES.filter((p) => (entries[p.id] || '').trim())

  if (written.length === 0) {
    return (
      <div className="ks-callout ks-callout--tip">
        <p className="ks-callout__title">No constitution found yet</p>
        <p>
          Looks like you haven’t written yours — or you’re on a different browser/device than
          when you did Module 2. It only takes a few minutes.
        </p>
        <Link className="link-more" to="/kickstart/ethics">
          Go write it now
          <span className="arrow">&rarr;</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="ks-constitution">
      <div className="ks-constitution__note">
        <strong>Here’s what you wrote in Module 2.</strong> Before you call your build done, check
        it against each line below — does what you actually built hold up?
      </div>
      {written.map((p) => (
        <div className="ks-constitution__row" key={p.id}>
          <label>
            <span className="ks-constitution__title">{p.title}</span>
            <span className="ks-constitution__pause">{p.pause}</span>
          </label>
          <p className="ks-constitution__entry">{entries[p.id]}</p>
        </div>
      ))}
    </div>
  )
}
