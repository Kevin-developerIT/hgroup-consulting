import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { langFromPath } from '../data/seo'
import { startClickTracking, track } from '../lib/analytics'

/* Page views for the SPA + the global click listener. Call once in App,
   after usePageMeta so document.title is already the new page's. */
export function useAnalytics() {
  const { pathname } = useLocation()

  useEffect(() => startClickTracking(), [])

  useEffect(() => {
    track('virtual_page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      language: langFromPath(pathname),
    })
  }, [pathname])
}
