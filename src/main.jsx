import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './isaac-site.css'
import './isaac-pages.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
