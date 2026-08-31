import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Principles from './pages/Principles.jsx'
import GetInvolved from './pages/GetInvolved.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import News from './pages/News.jsx'
import Articles from './pages/Articles.jsx'
import Newsletter from './pages/Newsletter.jsx'
import NewsletterArchive from './pages/NewsletterArchive.jsx'
import Connections from './pages/Connections.jsx'
import Kickstart from './pages/Kickstart.jsx'
import KickstartModule from './pages/KickstartModule.jsx'

function App() {
  useEffect(() => {
    // Wait a frame so the browser actually paints body's opacity: 0 first —
    // adding the class synchronously here (before that first paint) would
    // let the browser collapse straight to opacity: 1 with no visible
    // transition. Runs once on true page load, not on client-side route
    // changes, since App only mounts once for the life of the SPA.
    const id = requestAnimationFrame(() => {
      document.body.classList.add('is-loaded')
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="principles" element={<Principles />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Articles />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter-archive" element={<NewsletterArchive />} />
          <Route path="connections" element={<Connections />} />
          <Route path="kickstart" element={<Kickstart />} />
          <Route path="kickstart/:moduleId" element={<KickstartModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
