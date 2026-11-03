import Carousel from '../components/Carousel.jsx'
import EventsCalendar from '../components/EventsCalendar.jsx'
import EventSuggestForm from '../components/EventSuggestForm.jsx'
import '../get-involved.css'

export default function GetInvolved() {
  return (
    <>
      <header className="phead phead--painting">
        {/* Framed on the lanterns and trees at the top of the painting, with
            the crowd below — calmer behind the title than the busy full scene. */}
        <img
          className="phead__painting"
          src={`${import.meta.env.BASE_URL}images/bal-du-moulin-renoir.jpg`}
          alt="Pierre-Auguste Renoir, Bal du moulin de la Galette, a painting of a crowd dancing and talking at an open-air dance hall under the trees"
          style={{ objectPosition: '50% 0%', transform: 'scale(1.25)', transformOrigin: '45% 0%' }}
        />
        <div className="wrap">
          <h1>Events and Activities</h1>
        </div>
        <p className="phead__caption">Pierre-Auguste Renoir, Bal du moulin de la Galette, 1876</p>
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
