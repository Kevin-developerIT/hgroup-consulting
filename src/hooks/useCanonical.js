import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_ORIGIN = 'https://hgroup.consulting'

/* Keeps <link rel="canonical"> and <meta property="og:url"> in sync
   with the current SPA route. Google (post-2020) executes JS while
   crawling, so it picks up the updated tag on every route.
   Also updates document.title from the optional argument. */
export function useCanonical(title) {
  const { pathname } = useLocation()

  useEffect(() => {
    const url = SITE_ORIGIN + (pathname === '/' ? '/' : pathname)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', url)

    const ogUrl = document.head.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', url)

    if (title) document.title = title
  }, [pathname, title])
}
