import './App.css'

const principles = [
  {
    title: 'Human oversight',
    text: 'AI systems should support human judgment, not replace accountability. Meaningful oversight stays in place at every stage of deployment.',
  },
  {
    title: 'Transparency',
    text: 'People affected by an AI system deserve to know it is in use, understand how it shapes decisions, and have a way to ask questions about it.',
  },
  {
    title: 'Fairness',
    text: 'Systems should be tested for disparate impact across groups, and teams should be accountable for correcting bias when it is found.',
  },
  {
    title: 'Privacy',
    text: 'Data collection should be minimal, purposeful, and consensual. People retain the right to know what is collected about them and why.',
  },
  {
    title: 'Safety',
    text: 'Systems should be rigorously tested before deployment, with clear limits on autonomous action and a plan for what happens when they fail.',
  },
  {
    title: 'Accountability',
    text: 'When an AI system causes harm, there must be a clear, reachable party responsible for remedy — not a diffusion of blame across a supply chain.',
  },
]

const resources = [
  {
    title: 'Ethics review checklist',
    text: 'A practical checklist for teams evaluating a new AI system before launch.',
  },
  {
    title: 'Case studies',
    text: 'Real-world examples of AI ethics successes and failures, with lessons learned.',
  },
  {
    title: 'Policy briefs',
    text: 'Short, plain-language summaries of emerging AI regulation and what it means in practice.',
  },
]

function App() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            AI Ethics Initiative
          </a>
          <nav>
            <a href="#mission">Mission</a>
            <a href="#principles">Principles</a>
            <a href="#resources">Resources</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <p className="eyebrow">Building AI that earns trust</p>
          <h1>Technology should be accountable to the people it affects.</h1>
          <p className="lede">
            The AI Ethics Initiative brings together researchers, practitioners, and
            policymakers to develop practical standards for responsible AI —
            and to hold systems to them.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#principles">
              Read our principles
            </a>
            <a className="button" href="#contact">
              Get involved
            </a>
          </div>
        </section>

        <section id="mission" className="mission">
          <h2>Our mission</h2>
          <p>
            AI systems are being deployed faster than our ability to evaluate their
            consequences. We work to close that gap — publishing practical
            guidance, reviewing systems before they launch, and advocating for
            policy that keeps people, not just performance metrics, at the
            center of AI development.
          </p>
        </section>

        <section id="principles" className="principles">
          <h2>Our principles</h2>
          <div className="grid">
            {principles.map((p) => (
              <div className="card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className="resources">
          <h2>Resources</h2>
          <div className="grid">
            {resources.map((r) => (
              <div className="card" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>Get involved</h2>
          <p>
            Whether you're a researcher, engineer, or policymaker, there's a place
            for you in this work.
          </p>
          <a className="button primary" href="mailto:hello@aiethicsinitiative.org">
            Contact us
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AI Ethics Initiative</p>
      </footer>
    </>
  )
}

export default App
