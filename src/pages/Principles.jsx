import { Navigate, useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom'
import StewardshipGuide from '../components/stewardship/StewardshipGuide.jsx'
import { viewForSlug } from '../data/stewardship.js'
import '../stewardship.css'

// The Principles page is the Stewardship of AI guidebook: /principles is its
// home view (title, introduction, the five cards) and each principle has its
// own address, /principles/<slug>. The guide is one component for all of
// these, so moving between them keeps its state and plays its transitions;
// see StewardshipGuide's "Site integration" section.
export default function Principles() {
  const { slug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const routeView = viewForSlug(slug)
  if (routeView === null) return <Navigate to="/principles" replace />

  return (
    <div className="stew">
      <StewardshipGuide
        routeView={routeView}
        locationKey={location.key}
        landing={location.state?.stewLanding}
        navigationType={navigationType}
        navigate={navigate}
      />
    </div>
  )
}
