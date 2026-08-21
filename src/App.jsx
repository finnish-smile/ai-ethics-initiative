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
import KickstartLesson from './pages/KickstartLesson.jsx'

function App() {
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
          <Route path="kickstart/:lessonId" element={<KickstartLesson />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
