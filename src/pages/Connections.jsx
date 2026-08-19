import { Link } from 'react-router-dom'

const PARTNERS = [
  {
    icon: (
      <path d="M4 5h7v15H6a2 2 0 0 1-2-2zM13 5h7v13a2 2 0 0 1-2 2h-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    ),
    name: 'University Library',
    desc: 'Research guides on AI tools, citation, and information literacy — plus workshop space and the recordings archive.',
    link: 'Visit the library guides',
  },
  {
    icon: (
      <>
        <path d="M5 4h14v16l-7-3-7 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
    name: 'The Writing Center',
    desc: 'Coaching on using AI as a thinking partner without outsourcing your voice — and how to disclose it in your writing.',
    link: 'Book a session',
  },
  {
    icon: (
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    ),
    name: 'Computer Science Dept.',
    desc: 'Faculty research on fairness, interpretability, and safety — and the technical backbone of our literacy programs.',
    link: 'See their research',
  },
  {
    icon: (
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    ),
    name: 'Center for Teaching & Learning',
    desc: 'Helps faculty design assignments and policies for an AI-aware classroom, using our syllabus toolkit.',
    link: 'Explore teaching resources',
  },
  {
    icon: (
      <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    ),
    name: 'Office of Research Integrity',
    desc: 'Guidance on responsible use of AI in scholarship, data handling, and publication — our institutional home.',
    link: 'Read the guidance',
  },
  {
    icon: (
      <>
        <circle cx="8" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 19a5 5 0 0 1 10 0M11 19a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
    name: 'Student Government & Clubs',
    desc: 'Student fellows and partner organizations who carry the conversation into dorms, labs, and study groups.',
    link: 'Get your group involved',
  },
]

export default function Connections() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Connections</span>
          </nav>
          <p className="kicker">Across campus</p>
          <h1>We don&rsquo;t do this alone.</h1>
          <p>
            Responsible AI touches every corner of the university. These are the partners we work
            with &mdash; and the doors that are open to you.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Campus partners</p>
              <h2>Centers, offices &amp; groups</h2>
              <p>Each brings a different lens to the same question: how do we use these tools well?</p>
            </div>
          </div>
          <div className="grid cols-2 reveal-stagger">
            {PARTNERS.map((p) => (
              <a className="partner" href="#" key={p.name} data-reveal>
                <div className="partner__mark">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    {p.icon}
                  </svg>
                </div>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <span className="partner__link">
                    <span className="uline">{p.link}</span>
                    <span className="arrow">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div
            className="callout"
            data-reveal
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
          >
            <div>
              <h3>Want to become a partner?</h3>
              <p>
                If your center, lab, or group is working on responsible AI, we&rsquo;d love to
                connect and amplify each other.
              </p>
            </div>
            <Link className="btn btn--accent" to="/about#contact">
              Start a conversation<span className="arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
