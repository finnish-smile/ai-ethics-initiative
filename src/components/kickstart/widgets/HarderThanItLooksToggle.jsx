import { useState } from 'react'

const PAIRS = [
  {
    a: 'Beating the world chess champion',
    b: 'Picking a coffee cup up off a cluttered table',
    harder: 'b',
    explanation:
      'A computer beat the world chess champion in 1997. Reliable, general-purpose robotic grasping is still an open problem today. Clear rules are easy; the messy physical world is hard.',
  },
  {
    a: 'Recognizing a face in a photo',
    b: 'Folding a pile of laundry',
    harder: 'b',
    explanation:
      'Face recognition is a solved, everyday feature now. Folding laundry requires handling soft, unpredictable material with real dexterity — still a research problem for robots.',
  },
  {
    a: 'Writing a passable poem',
    b: 'Tying a shoelace, one-handed, on the first try',
    harder: 'b',
    explanation:
      'Language generation plays to an AI’s strengths — pattern-matching on huge amounts of text. Fine motor control in the physical world does not.',
  },
]

export default function HarderThanItLooksToggle() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const pair = PAIRS[index]
  const correct = guess === pair.harder

  const next = () => {
    setGuess(null)
    setIndex((i) => (i + 1) % PAIRS.length)
  }

  return (
    <div className="ks-widget ks-widget--toggle">
      <p className="ks-widget__prompt">Which is harder for AI to do well?</p>
      <div className="ks-widget__options">
        <button
          type="button"
          className={`ks-widget__option ${guess === 'a' ? 'is-picked' : ''}`}
          onClick={() => setGuess('a')}
          disabled={guess !== null}
        >
          {pair.a}
        </button>
        <span className="ks-widget__vs">vs.</span>
        <button
          type="button"
          className={`ks-widget__option ${guess === 'b' ? 'is-picked' : ''}`}
          onClick={() => setGuess('b')}
          disabled={guess !== null}
        >
          {pair.b}
        </button>
      </div>

      {guess && (
        <div className={`ks-widget__reveal ${correct ? 'is-correct' : 'is-off'}`}>
          <p className="ks-widget__reveal-head">
            {correct ? 'You called it.' : 'Surprising, right?'}{' '}
            {pair.harder === 'a' ? pair.a : pair.b} is the harder one.
          </p>
          <p>{pair.explanation}</p>
          <button type="button" className="btn btn--ghost" onClick={next}>
            {index === PAIRS.length - 1 ? 'Start over' : 'Next pair'}
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  )
}
