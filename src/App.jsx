import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Principles from './pages/Principles.jsx'
import GetInvolved from './pages/GetInvolved.jsx'
import EventDetail from './pages/EventDetail.jsx'
import News from './pages/News.jsx'
import Articles from './pages/Articles.jsx'
import Newsletter from './pages/Newsletter.jsx'
import NewsletterArchive from './pages/NewsletterArchive.jsx'
import Kickstart from './pages/Kickstart.jsx'
import KickstartModule from './pages/KickstartModule.jsx'
import Professors from './pages/Professors.jsx'
import Showcase from './pages/Showcase.jsx'
import LogoCompetition from './pages/LogoCompetition.jsx'

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
    // basename matches vite.config.js's `base` — on GitHub Pages the app
    // is served from /ai-ethics-initiative/, not the domain root, so
    // React Router needs to know to strip that prefix before matching
    // routes below (import.meta.env.BASE_URL is Vite's own copy of that
    // same `base` value, kept in sync automatically). Locally in dev,
    // BASE_URL is just "/", so this is a no-op there.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="principles" element={<Principles />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="news" element={<News />} />
          <Route path="articles" element={<Articles />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="newsletter-archive" element={<NewsletterArchive />} />
          <Route path="kickstart" element={<Kickstart />} />
          <Route path="professors" element={<Professors />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="logo-competition" element={<LogoCompetition />} />
          <Route path="kickstart/:moduleId" element={<KickstartModule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
