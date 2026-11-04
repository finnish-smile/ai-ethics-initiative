import ShowcaseSection from '../components/ShowcaseSection.jsx'
import { LEARN_RESOURCES } from '../data/learnResources.js'
import '../kickstart.css'
import '../showcase.css'

export default function Kickstart() {
  return (
    <>
      {/* Painting hero, echoing the Lackawanna Valley opening on Principles:
          the painting fills the band, the title sits over a dark fade at the
          bottom, and the credit line hugs the bottom-left corner. */}
      <section className="ks-hero ks-hero--painting">
        <img
          className="ks-hero__painting"
          src={`${import.meta.env.BASE_URL}images/country-school-homer.jpg`}
          alt="Winslow Homer, The Country School, a painting of a teacher reading in a sunlit one-room schoolhouse while children study on benches"
        />
        <div className="wrap">
          <h1>Learn</h1>
          <p className="lead">
            Courses, guides, and tools built by experts to help you use and understand AI better.
          </p>
        </div>
        <p className="ks-hero__caption">Winslow Homer, The Country School, 1871</p>
      </section>

      <section className="section" data-screen-label="Coursework">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Coursework &amp; materials</h2>
            <span className="ks-section-label__tag">Built by professors and practitioners</span>
          </div>
          <div className="sc-grid">
            {LEARN_RESOURCES.map((r) => (
              <a
                className="sc-card sc-card--clickable"
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                <div className="sc-card__top">
                  <span className="sc-card__tag">{r.type}</span>
                </div>
                <h3>{r.title}</h3>
                <p className="sc-card__by">By {r.by}</p>
                <p>{r.description}</p>
                <span className="sc-card__cta">
                  {r.cta}
                  <span className="arrow">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-screen-label="Showcase">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Ethical AI Showcase</h2>
            <span className="ks-section-label__tag">Ideas from the community</span>
          </div>
          <ShowcaseSection />
        </div>
      </section>
    </>
  )
}
