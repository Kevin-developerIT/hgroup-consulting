import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTES_SEO, canonicalFor } from '../data/seo'

const setAttr = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/* The prerendered HTML already ships the right <head> for each route.
   This keeps it in sync when the user navigates client-side. */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const meta = ROUTES_SEO[key]
    if (!meta) return

    const url = canonicalFor(key)
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[name="twitter:title"]', 'content', meta.title)
    setAttr('meta[name="twitter:description"]', 'content', meta.description)
  }, [pathname])
}
