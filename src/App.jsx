import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Principles from './pages/Principles.jsx'
import Contact from './pages/Contact.jsx'
import GetInvolved from './pages/GetInvolved.jsx'
import Events from './pages/Events.jsx'
import Kickstart from './pages/Kickstart.jsx'
import Newsfeed from './pages/Newsfeed.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="principles" element={<Principles />} />
          <Route path="contact" element={<Contact />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="events" element={<Events />} />
          <Route path="kickstart" element={<Kickstart />} />
          <Route path="newsfeed" element={<Newsfeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
