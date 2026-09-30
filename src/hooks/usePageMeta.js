import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { langFromPath, seoFor } from '../data/seo'
import { translations } from '../contexts/translations'

const setAttr = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Unknown URLs (the 404 page) and draft brand pages stay out of the index.
const setNoindex = (on) => {
  let tag = document.head.querySelector('meta[name="robots"]')
  if (on && !tag) {
    tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex'
    document.head.appendChild(tag)
  } else if (!on && tag) {
    tag.remove()
  }
}

/* The prerendered HTML already ships the right <head> for each URL.
   This keeps it in sync when the user navigates client-side. */
export function usePageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = seoFor(pathname)
    if (!meta) {
      setNoindex(true)
      document.title = translations[langFromPath(pathname)].notFound.metaTitle
      return
    }
    setNoindex(meta.noindex)

    document.documentElement.lang = meta.htmlLang
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    setAttr('link[rel="canonical"]', 'href', meta.canonical)
    setAttr('meta[property="og:url"]', 'content', meta.canonical)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:image"]', 'content', meta.ogImage)
    setAttr('meta[property="og:locale"]', 'content', meta.ogLocale)
    setAttr('meta[property="og:locale:alternate"]', 'content', meta.ogLocaleAlternate)
    setAttr('meta[name="twitter:title"]', 'content', meta.title)
    setAttr('meta[name="twitter:description"]', 'content', meta.description)
    setAttr('meta[name="twitter:image"]', 'content', meta.ogImage)

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
