import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoFor } from '../data/seo'

const setAttr = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/* The prerendered HTML already ships the right <head> for each URL.
   This keeps it in sync when the user navigates client-side. */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = seoFor(pathname)
    if (!meta) return

    document.documentElement.lang = meta.htmlLang
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('link[rel="canonical"]', 'href', meta.canonical)
    setAttr('meta[property="og:url"]', 'content', meta.canonical)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:locale"]', 'content', meta.ogLocale)
    setAttr('meta[property="og:locale:alternate"]', 'content', meta.ogLocaleAlternate)
    setAttr('meta[name="twitter:title"]', 'content', meta.title)
    setAttr('meta[name="twitter:description"]', 'content', meta.description)

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
    for (const { hreflang, href } of meta.alternates) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      document.head.appendChild(link)
    }
  }, [pathname])
}
