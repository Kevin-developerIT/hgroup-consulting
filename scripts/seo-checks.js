// SEO checklist (report point 12), run by prerender.js on the final HTML
// of every page. Errors fail the build; warnings are printed only.
import fs from 'node:fs'
import path from 'node:path'

const TITLE_MAX = 65 // Google truncates around 60–65 characters
const DESCRIPTION_MAX = 165

const first = (html, re) => html.match(re)?.[1]
const all = (html, re) => [...html.matchAll(re)]
const bodyOf = (html) => html.slice(html.indexOf('<div id="root"'))
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')

function inspect(html) {
  const body = bodyOf(html)
  let jsonLd = null
  const rawLd = first(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (rawLd) {
    try {
      jsonLd = JSON.parse(rawLd)
    } catch {
      jsonLd = 'invalid'
    }
  }
  return {
    lang: first(html, /<html lang="([^"]*)"/),
    title: decode(first(html, /<title>([^<]*)<\/title>/) ?? ''),
    titleCount: all(html, /<title>/g).length,
    description: decode(first(html, /<meta name="description" content="([^"]*)"/) ?? ''),
    canonical: first(html, /<link rel="canonical" href="([^"]*)"/),
    ogUrl: first(html, /<meta property="og:url" content="([^"]*)"/),
    ogImage: first(html, /<meta property="og:image" content="([^"]*)"/),
    robots: first(html, /<meta name="robots" content="([^"]*)"/),
    alternates: all(html, /<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g).map((m) => ({ hreflang: m[1], href: m[2] })),
    headings: all(body, /<h([1-6])[\s>]/g).map((m) => Number(m[1])),
    imgsWithoutAlt: all(body, /<img\b[^>]*>/g).filter((m) => !/\salt="/.test(m[0])).length,
    links: all(body, /<a\b([^>]*)>/g)
      .map((m) => ({ attrs: m[1], href: first(m[1], /\shref="([^"]*)"/) }))
      .filter((l) => l.href),
    jsonLd,
  }
}

/**
 * pages: [{ route, lang, html, indexable, expected: { canonical, htmlLang, alternates } }]
 * extra: { notFoundHtml, sitemapXml, distDir, siteOrigin }
 */
export function runSeoChecks(pages, { notFoundHtml, sitemapXml, distDir, siteOrigin }) {
  const errors = []
  const warnings = []
  const err = (route, msg) => errors.push(`${route}: ${msg}`)
  const warn = (route, msg) => warnings.push(`${route}: ${msg}`)

  const byUrl = new Map()
  const data = pages.map((p) => {
    const info = inspect(p.html)
    byUrl.set(siteOrigin + (p.route === '/' ? '/' : p.route), { ...p, info })
    return { ...p, info }
  })
  const knownPaths = new Set(pages.map((p) => p.route))

  for (const { route, lang, indexable, expected, info } of data) {
    // Title & description
    if (info.titleCount !== 1 || !info.title) err(route, 'falta <title> o hay más de uno')
    if (!info.description) err(route, 'falta meta description')
    if (info.title.length > TITLE_MAX) warn(route, `title de ${info.title.length} caracteres (se recorta después de ~${TITLE_MAX})`)
    if (info.description.length > DESCRIPTION_MAX) warn(route, `description de ${info.description.length} caracteres (se recorta después de ~${DESCRIPTION_MAX})`)

    // Language, canonical, OG
    if (info.lang !== expected.htmlLang) err(route, `<html lang="${info.lang}">, se esperaba "${expected.htmlLang}"`)
    if (info.canonical !== expected.canonical) err(route, `canonical ${info.canonical}, se esperaba ${expected.canonical}`)
    if (info.ogUrl !== expected.canonical) err(route, `og:url ${info.ogUrl} no coincide con el canonical`)
    if (!info.ogImage?.startsWith(siteOrigin)) {
      err(route, `og:image fuera del sitio: ${info.ogImage}`)
    } else if (!fs.existsSync(path.join(distDir, info.ogImage.slice(siteOrigin.length)))) {
      err(route, `og:image no existe en el build: ${info.ogImage}`)
    }
    if (indexable && info.robots?.includes('noindex')) err(route, 'página indexable con noindex')
    if (expected.noindex && !info.robots?.includes('noindex')) err(route, 'borrador sin noindex')

    // Headings: one H1, no skipped levels (h2 → h4)
    const h1s = info.headings.filter((h) => h === 1).length
    if (h1s !== 1) err(route, `${h1s} <h1>, se esperaba 1`)
    info.headings.forEach((level, i) => {
      if (i > 0 && level > info.headings[i - 1] + 1) err(route, `salto de encabezado h${info.headings[i - 1]} → h${level}`)
    })

    // Images
    if (info.imgsWithoutAlt) err(route, `${info.imgsWithoutAlt} <img> sin atributo alt`)

    // Internal links: must exist and stay in the page's language
    // (the language toggle, marked with hrefLang, is the one exception).
    for (const { href, attrs } of info.links) {
      if (!href.startsWith('/') || href.startsWith('//')) continue
      const pathOnly = href.split(/[?#]/)[0] || '/'
      if (!knownPaths.has(pathOnly)) {
        err(route, `link interno roto: ${href}`)
        continue
      }
      const target = data.find((p) => p.route === pathOnly)
      if (target && target.lang !== lang && !/hrefLang=/i.test(attrs)) {
        err(route, `link a ${href} cambia de idioma (${lang} → ${target.lang})`)
      }
    }

    // hreflang: expected set, pointing to built pages that link back
    const got = info.alternates.map((a) => `${a.hreflang} ${a.href}`).sort().join(' | ')
    const want = expected.alternates.map((a) => `${a.hreflang} ${a.href}`).sort().join(' | ')
    if (got !== want) err(route, `hreflang no coincide: [${got}] vs [${want}]`)
    for (const alt of info.alternates) {
      const other = byUrl.get(alt.href)
      if (!other) {
        err(route, `hreflang apunta a una página que no existe: ${alt.href}`)
      } else if (!other.info.alternates.some((a) => a.href === expected.canonical)) {
        err(route, `hreflang no es recíproco con ${alt.href}`)
      }
    }

    // Structured data
    if (!info.jsonLd) err(route, 'falta JSON-LD')
    else if (info.jsonLd === 'invalid') err(route, 'JSON-LD inválido')
    else {
      const types = (info.jsonLd['@graph'] || []).map((n) => n['@type'])
      if (!types.includes('Organization')) err(route, 'JSON-LD sin Organization')
      const webPage = (info.jsonLd['@graph'] || []).find((n) => n['@type'] === 'WebPage')
      if (!webPage) err(route, 'JSON-LD sin WebPage')
      else if (webPage.url !== expected.canonical) err(route, `WebPage.url ${webPage.url} no coincide con el canonical`)
    }
  }

  // Unique titles / descriptions per language (indexable pages only)
  for (const field of ['title', 'description']) {
    const seen = new Map()
    for (const { route, lang, indexable, info } of data) {
      if (!indexable) continue
      const key = `${lang}::${info[field]}`
      if (seen.has(key)) err(route, `${field} duplicado con ${seen.get(key)}`)
      else seen.set(key, route)
    }
  }

  // Sitemap = exactly the indexable pages
  const locs = new Set(all(sitemapXml, /<loc>([^<]*)<\/loc>/g).map((m) => m[1]))
  const indexableUrls = new Set(data.filter((p) => p.indexable).map((p) => p.expected.canonical))
  for (const url of indexableUrls) if (!locs.has(url)) err('sitemap', `falta ${url}`)
  for (const url of locs) if (!indexableUrls.has(url)) err('sitemap', `sobra ${url} (no es una página indexable)`)

  // 404 page
  const nf = inspect(notFoundHtml)
  if (!nf.robots?.includes('noindex')) err('404.html', 'sin noindex')
  if (nf.canonical) err('404.html', 'no debe tener canonical')

  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)], checked: data.length }
}
