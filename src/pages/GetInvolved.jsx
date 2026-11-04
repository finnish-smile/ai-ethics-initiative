import Carousel from '../components/Carousel.jsx'
import EventsCalendar from '../components/EventsCalendar.jsx'
import EventSuggestForm from '../components/EventSuggestForm.jsx'
import '../get-involved.css'

export default function GetInvolved() {
  return (
    <>
      <header className="phead phead--painting">
        {/* Anchored to the top, so the women's heads stay in view on wide screens
            (where the painting is cropped top and bottom). Seurat painted a
            dotted border around the canvas: the 5% zoom from the top edge plus the
            small upward nudge keep it out of view at every width. */}
        <img
          className="phead__painting"
          src={`${import.meta.env.BASE_URL}images/grande-jatte-seurat.jpg`}
          alt="Georges Seurat, A Sunday on La Grande Jatte, a painting of people relaxing together on a sunny riverbank park"
          style={{ objectPosition: '50% calc(-1.2vw - 8px)', transform: 'scale(1.05)', transformOrigin: '50% 0%' }}
        />
        <div className="wrap">
          <h1>Events and Activities</h1>
          <p>Check in on upcoming events, workshops, and competitions.</p>
        </div>
        <p className="phead__caption">Georges Seurat, A Sunday on La Grande Jatte, 1884–86</p>
      </header>

      <div className="gi-panel">
        <section className="hero" data-screen-label="Spotlights">
          <div className="wrap">
            <Carousel />
          </div>
        </section>

        <section className="section" data-screen-label="Calendar">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">Upcoming</p>
                <h2>Events calendar</h2>
              </div>
            </div>
            <EventsCalendar />
            <EventSuggestForm />
          </div>
        </section>
      </div>
    </>
  )
}
