import { useState } from 'react'
import { PRINCIPLES } from '../../../data/kickstart/principles.js'
import useConstitution from '../../../hooks/useConstitution.js'

function formatConstitution(entries) {
  const lines = ['My Personal AI Constitution', '']
  PRINCIPLES.forEach((p) => {
    const text = (entries[p.id] || '').trim()
    if (text) lines.push(`${p.title} — ${text}`, '')
  })
  return lines.join('\n').trim()
}

export default function ConstitutionBuilder() {
  const { entries, setEntry } = useConstitution()
  const [copied, setCopied] = useState(false)
  const filledCount = PRINCIPLES.filter((p) => (entries[p.id] || '').trim()).length

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatConstitution(entries))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — the download button still works.
    }
  }

  const handleDownload = () => {
    const blob = new Blob([formatConstitution(entries)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'my-personal-ai-constitution.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="ks-constitution">
      <div className="ks-constitution__note">
        <strong>Saved only in this browser, on this device.</strong> There’s no account behind
        this — nothing is sent to the Initiative or anywhere else. That also means clearing your
        browser data will erase it, so use Copy or Download below once you’re happy with it.
      </div>

      {PRINCIPLES.map((p) => (
        <div className="ks-constitution__row" key={p.id}>
          <label htmlFor={`constitution-${p.id}`}>
            <span className="ks-constitution__title">{p.title}</span>
            <span className="ks-constitution__pause">{p.pause}</span>
          </label>
          <textarea
            id={`constitution-${p.id}`}
            rows={2}
            placeholder={`I will…  (e.g. "${
              {
                agency: 'I will decide, not delegate — AI informs my choices, it doesn’t make them.',
                becoming: 'I will do the parts of an assignment that are meant to help me grow, myself.',
                fellowship: 'I will bring hard questions to people I trust, not just to a chatbot.',
                discernment: 'I will verify anything AI tells me before I repeat it as fact.',
                integrity: 'I will disclose AI assistance on graded work, every time.',
              }[p.id]
            }")`}
            value={entries[p.id] || ''}
            onChange={(e) => setEntry(p.id, e.target.value)}
          />
        </div>
      ))}

      <div className="ks-constitution__actions">
        <span className="ks-constitution__count">
          {filledCount}/{PRINCIPLES.length} written
        </span>
        <button type="button" className="btn btn--ghost" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button type="button" className="btn btn--accent" onClick={handleDownload}>
          Download as text
          <span className="arrow">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
