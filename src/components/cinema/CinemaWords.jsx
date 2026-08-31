// Word-by-word reveal for the cinematic sequence's big statement lines.
// Each word is its own fade/rise element with a small stagger; spaces are
// kept as plain text nodes between the word spans (not inside them) so the
// browser's own whitespace handling can't quietly trim them the way it
// does with whitespace sitting at the edge of an inline-block.
export default function CinemaWords({ text, revealed, className = '', wordClassName = '' }) {
  const words = text.split(' ')
  return (
    <p className={className}>
      {words.flatMap((word, i) => {
        const span = (
          <span
            key={i}
            className={`cinema-word ${wordClassName} ${revealed ? 'revealed' : ''}`}
            style={{ transitionDelay: revealed ? `${i * 0.045}s` : '0s' }}
          >
            {word}
          </span>
        )
        return i === 0 ? [span] : [' ', span]
      })}
    </p>
  )
}
