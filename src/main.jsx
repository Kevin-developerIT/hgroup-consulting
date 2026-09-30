import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { loadGtm } from './lib/analytics'
import './assets/fonts/fonts.css'
import './index.css'

const normalize = (p) => (p === '/' ? '/' : p.replace(/\/+$/, ''))

loadGtm()

const container = document.getElementById('root')
const tree = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/* Hydrate only when the prerendered HTML is for this exact URL. In dev
   (empty #root) or when a host rewrite serves another page's HTML,
   render from scratch instead of hydrating a mismatched tree. */
const prerenderedPath = container.dataset.prerendered
if (prerenderedPath && normalize(prerenderedPath) === normalize(window.location.pathname)) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
