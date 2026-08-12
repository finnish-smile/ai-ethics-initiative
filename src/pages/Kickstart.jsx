import { Link } from 'react-router-dom'

export default function Kickstart() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Kickstart</span>
          </nav>
          <p className="kicker">Coming soon</p>
          <h1>Kickstart</h1>
          <p>A guided introduction to AI, and building something with it.</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: '70ch' }}>
            This page is a structural placeholder for the Kickstart program. Planned direction: a
            Leland-style, multi-lesson course (sidebar navigation, per-lesson progress, &ldquo;X of
            Y complete&rdquo;) that gives a basic understanding of AI and walks through building
            something with it. Progress should persist in the browser (localStorage) across
            visits.
          </p>
        </div>
      </section>
    </>
  )
}
