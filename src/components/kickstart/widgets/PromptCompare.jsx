import { useState } from 'react'

export default function PromptCompare({ weak, strong, note }) {
  const [view, setView] = useState('weak')
  const shown = view === 'weak' ? weak : strong

  return (
    <div className="ks-widget ks-widget--compare">
      <div className="ks-widget__options">
        <button
          type="button"
          className={`ks-widget__option ${view === 'weak' ? 'is-picked' : ''}`}
          onClick={() => setView('weak')}
        >
          Weak prompt
        </button>
        <button
          type="button"
          className={`ks-widget__option ${view === 'strong' ? 'is-picked' : ''}`}
          onClick={() => setView('strong')}
        >
          Strong prompt
        </button>
      </div>
      <p className="ks-widget__ai-answer" style={{ display: 'block', fontFamily: 'var(--font-body)' }}>
        &ldquo;{shown}&rdquo;
      </p>
      {view === 'strong' && (
        <div className="ks-widget__reveal is-correct">
          <p>{note}</p>
        </div>
      )}
    </div>
  )
}
