import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export { PAGES, LANGS, SITE_ORIGIN, seoFor } from './data/seo'
export { buildSchema } from './data/schema'

/* prerenderToNodeStream waits for every lazy route chunk to resolve,
   so the output contains the full page, not the Suspense fallback. */
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}
