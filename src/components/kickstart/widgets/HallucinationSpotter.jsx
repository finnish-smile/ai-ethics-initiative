import { useState } from 'react'

const EXAMPLES = [
  {
    question: 'How many r’s are in the word "strawberry"?',
    aiAnswer: '2',
    correctAnswer: '3',
    explanation:
      'Older models answered this wrong for a while — not because they can’t count, but because they don’t see words as neatly spelled-out letters. They see chunks of text called tokens, and "strawberry" doesn’t always split into obviously countable pieces. The model was predicting a plausible-sounding answer, not actually counting.',
  },
  {
    question: 'Who wrote the Declaration of Independence, and can AI name the exact date it was signed?',
    aiAnswer: 'August 2, 1776',
    correctAnswer: 'July 4, 1776 (adopted) — most delegates signed August 2',
    explanation:
      'This one’s a classic mixed-up-dates hallucination: adoption and signing are different dates, and a model can blend them into a single confident, wrong-ish answer if you’re not specific about which one you’re asking for.',
  },
]

export default function HallucinationSpotter() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const example = EXAMPLES[index]

  const next = () => {
    setGuess(null)
    setIndex((i) => (i + 1) % EXAMPLES.length)
  }

  return (
    <div className="ks-widget ks-widget--spotter">
      <p className="ks-widget__prompt">{example.question}</p>
      <p className="ks-widget__ai-answer">AI says: &ldquo;{example.aiAnswer}&rdquo;</p>
      {guess === null ? (
        <div className="ks-widget__options">
          <button type="button" className="ks-widget__option" onClick={() => setGuess('right')}>
            Looks right to me
          </button>
          <button type="button" className="ks-widget__option" onClick={() => setGuess('wrong')}>
            I think that’s wrong
          </button>
        </div>
      ) : (
        <div className={`ks-widget__reveal ${guess === 'wrong' ? 'is-correct' : 'is-off'}`}>
          <p className="ks-widget__reveal-head">
            Actual answer: {example.correctAnswer}
            {guess === 'wrong' ? ' — nice catch.' : ' — that one slipped past.'}
          </p>
          <p>{example.explanation}</p>
          <button type="button" className="btn btn--ghost" onClick={next}>
            {index === EXAMPLES.length - 1 ? 'Start over' : 'Try another'}
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  )
}
