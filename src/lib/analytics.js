import { holdingLinks } from '../data/holdings'
import { BRAND_PAGE_IDS, SERVICE_PAGE_IDS, langFromPath, localizePath, servicePath } from '../data/seo'

/* Measurement layer (report point 9). Everything goes to window.dataLayer;
   Google Tag Manager loads only when VITE_GTM_ID is set at build time, so
   until the IDs exist this is inert.

   Events pushed:
     virtual_page_view   every route (initial load + client navigation)
     generate_lead       contact form sent successfully
     whatsapp_click      any wa.me / WhatsApp link or [data-track] button
     email_click         mailto: links
     phone_click         tel: links
     map_click           link to the office on Google Maps
     brand_site_click    outbound link to an H's own site  {brand}
     social_click        Instagram / LinkedIn / …           {network}
     cta_click           internal link to Contact, an H page or a service page
                         {cta, brand?, service?} */

const GTM_ID = import.meta.env.VITE_GTM_ID

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

export function loadGtm() {
  if (!GTM_ID || typeof window === 'undefined' || window.__gtmLoaded) return
  window.__gtmLoaded = true
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`
  document.head.appendChild(script)
}

const bareHost = (url) => url.hostname.replace(/^www\./, '')

const BRAND_BY_HOST = Object.fromEntries(
  Object.entries(holdingLinks).map(([id, url]) => [bareHost(new URL(url)), id])
)

const SOCIAL = ['instagram.com', 'linkedin.com', 'facebook.com', 'tiktok.com', 'youtube.com', 'x.com', 'twitter.com']

const CONTACT_PATHS = new Set([localizePath('/contact', 'es'), localizePath('/contact', 'en')])
const BRAND_PATHS = Object.fromEntries(
  BRAND_PAGE_IDS.flatMap((id) => [
    [localizePath(`/marcas/${id}`, 'es'), id],
    [localizePath(`/marcas/${id}`, 'en'), id],
  ])
)
const SERVICE_PATHS = Object.fromEntries(
  SERVICE_PAGE_IDS.flatMap((id) => [
    [servicePath(id), id],
    [localizePath(servicePath(id), 'en'), id],
  ])
)

/* Maps a clicked element to an event, or null if it isn't one we track.
   Elements can opt in explicitly with data-track="<event>". */
function classify(el) {
  if (el.dataset.track) return { event: el.dataset.track }

  const href = el.getAttribute('href') || ''
  if (href.startsWith('mailto:')) return { event: 'email_click' }
  if (href.startsWith('tel:')) return { event: 'phone_click' }

  let url
  try {
    url = new URL(href, window.location.origin)
  } catch {
    return null
  }

  if (url.origin === window.location.origin) {
    if (CONTACT_PATHS.has(url.pathname)) return { event: 'cta_click', cta: 'contact' }
    const brand = BRAND_PATHS[url.pathname]
    if (brand) return { event: 'cta_click', cta: 'brand_page', brand }
    const service = SERVICE_PATHS[url.pathname]
    if (service) return { event: 'cta_click', cta: 'service_page', service }
    return null
  }

  const host = bareHost(url)
  if (host === 'wa.me' || host.endsWith('whatsapp.com')) return { event: 'whatsapp_click' }
  if (host === 'maps.app.goo.gl' || (host.endsWith('google.com') && url.pathname.startsWith('/maps'))) {
    return { event: 'map_click' }
  }
  if (BRAND_BY_HOST[host]) return { event: 'brand_site_click', brand: BRAND_BY_HOST[host] }
  const network = SOCIAL.find((s) => host === s || host.endsWith(`.${s}`))
  if (network) return { event: 'social_click', network: network.split('.')[0] }
  return null
}

/* One capture-phase listener for the whole app, so every existing and
   future link is measured without touching each component. */
export function startClickTracking() {
  const onClick = (e) => {
    const el = e.target.closest?.('a[href], [data-track]')
    if (!el) return
    const hit = classify(el)
    if (!hit) return
    const { event, ...extra } = hit
    track(event, {
      ...extra,
      link_url: el.getAttribute('href') ?? el.dataset.trackUrl ?? undefined,
      link_text: (el.textContent || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100),
      page_path: window.location.pathname,
      language: langFromPath(window.location.pathname),
    })
  }
  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
