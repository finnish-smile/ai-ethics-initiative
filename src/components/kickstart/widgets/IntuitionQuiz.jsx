import { useState } from 'react'

const QUIZZES = {
  'module-1': [
    {
      q: 'What two properties actually define something as "AI," rather than just regular software?',
      options: ['Speed and memory size', 'Autonomy and adaptivity', 'A chat interface', 'Being made by a tech company'],
      correct: 1,
      explanation: 'Autonomy (acting without step-by-step guidance) and adaptivity (improving from new information) — not consciousness, not a chat window.',
    },
    {
      q: 'When a chatbot answers your question, what is it actually doing?',
      options: [
        'Searching a database for the correct answer',
        'Predicting the most likely next word, repeatedly',
        'Asking another AI to fact-check itself',
        'Running a fixed decision tree',
      ],
      correct: 1,
      explanation: 'Prediction, not lookup — which is exactly why it can sound confident while being wrong.',
    },
    {
      q: 'A model states something false in a calm, fluent, confident tone. What’s this called?',
      options: ['A glitch', 'A hallucination', 'A firmware bug', 'Overfitting'],
      correct: 1,
      explanation: 'Hallucination — plausibility isn’t the same thing as truth.',
    },
  ],
}

export default function IntuitionQuiz({ quizId }) {
  const questions = QUIZZES[quizId] || []
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!questions.length) return null
  const question = questions[index]

  const pick = (i) => {
    if (picked !== null) return
    setPicked(i)
    if (i === question.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (index === questions.length - 1) {
      setDone(true)
      return
    }
    setPicked(null)
    setIndex((i) => i + 1)
  }

  if (done) {
    return (
      <div className="ks-widget ks-widget--quiz">
        <p className="ks-widget__reveal-head">
          {score} of {questions.length} — {score === questions.length ? 'nice work.' : 'worth a second pass.'}
        </p>
      </div>
    )
  }

  return (
    <div className="ks-widget ks-widget--quiz">
      <p className="ks-widget__prompt">{question.q}</p>
      <div className="ks-widget__quiz-options">
        {question.options.map((opt, i) => {
          const state =
            picked === null ? '' : i === question.correct ? 'is-correct' : i === picked ? 'is-off' : ''
          return (
            <button key={opt} type="button" className={`ks-widget__quiz-opt ${state}`} onClick={() => pick(i)}>
              {opt}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="ks-widget__reveal is-correct">
          <p>{question.explanation}</p>
          <button type="button" className="btn btn--ghost" onClick={next}>
            {index === questions.length - 1 ? 'See score' : 'Next question'}
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      )}
    </div>
  )
}
