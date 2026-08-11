const principles = [1, 2, 3, 4].map((n) => ({
  title: `Placeholder Principle ${n}`,
  description:
    'One-sentence placeholder description of this principle — replace with final copy.',
}))

export default function Principles() {
  return (
    <div className="page-wide">
      <h1>Our Principles</h1>
      <p className="body-text muted">
        This page is a structural placeholder. The principles below are placeholders standing in
        for the real content.
      </p>

      <div className="card-grid">
        {principles.map((p) => (
          <div className="principle-card" key={p.title}>
            <div className="eyebrow">Placeholder</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
