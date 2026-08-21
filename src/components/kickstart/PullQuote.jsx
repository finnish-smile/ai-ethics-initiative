export default function PullQuote({ text, attribution }) {
  return (
    <blockquote className="ks-quote">
      <p>&ldquo;{text}&rdquo;</p>
      {attribution && <cite>&mdash; {attribution}</cite>}
    </blockquote>
  )
}
