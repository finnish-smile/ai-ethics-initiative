import Carousel from '../components/Carousel.jsx'
import EventsCalendar from '../components/EventsCalendar.jsx'
import EventSuggestForm from '../components/EventSuggestForm.jsx'
import '../get-involved.css'

export default function GetInvolved() {
  return (
    <>
      <header className="phead phead--painting">
        {/* Zoomed 5% to crop off the dotted border Seurat painted around the canvas. */}
        <img
          className="phead__painting"
          src={`${import.meta.env.BASE_URL}images/grande-jatte-seurat.jpg`}
          alt="Georges Seurat, A Sunday on La Grande Jatte, a painting of people relaxing together on a sunny riverbank park"
          style={{ objectPosition: '50% 50%', transform: 'scale(1.05)', transformOrigin: '50% 50%' }}
        />
        <div className="wrap">
          <h1>Events and Activities</h1>
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
