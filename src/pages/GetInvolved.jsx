import Carousel from '../components/Carousel.jsx'
import EventsCalendar from '../components/EventsCalendar.jsx'
import EventSuggestForm from '../components/EventSuggestForm.jsx'
import '../get-involved.css'

export default function GetInvolved() {
  return (
    <>
      <header className="phead phead--paper">
        <div className="wrap">
          <h1>Events and Activities</h1>
        </div>
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
