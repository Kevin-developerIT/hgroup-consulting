// Build-time prerender: renders every route to static HTML so crawlers
// (Google, and AI crawlers that don't run JS) get the full content.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { runSeoChecks } from './seo-checks.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

// Every page and its URLs come from src/data/seo.js (PAGES), the same
// table the router uses, so a page can't be routed but not prerendered.
const { render, PAGES, LANGS, SITE_ORIGIN, seoFor, buildSchema, translations } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
const manifest = JSON.parse(
  await fs.readFile(path.join(distDir, '.vite', 'manifest.json'), 'utf8')
)

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in index.html`)
  return html.replace(pattern, replacement)
}

function setHead(html, meta) {
  const t = escapeHtml(meta.title)
  const d = escapeHtml(meta.description)
  const url = meta.canonical
  const attrs = [
    [/(<html lang=")[^"]*(")/, 'html lang', meta.htmlLang],
    [/(<meta name="description" content=")[^"]*(")/, 'meta description', d],
    [/(<link rel="canonical" href=")[^"]*(")/, 'canonical', url],
    [/(<meta property="og:url" content=")[^"]*(")/, 'og:url', url],
    [/(<meta property="og:locale" content=")[^"]*(")/, 'og:locale', meta.ogLocale],
    [/(<meta property="og:locale:alternate" content=")[^"]*(")/, 'og:locale:alternate', meta.ogLocaleAlternate],
    [/(<meta property="og:title" content=")[^"]*(")/, 'og:title', t],
    [/(<meta property="og:description" content=")[^"]*(")/, 'og:description', d],
    [/(<meta name="twitter:title" content=")[^"]*(")/, 'twitter:title', t],
    [/(<meta name="twitter:description" content=")[^"]*(")/, 'twitter:description', d],
    [/(<meta property="og:image" content=")[^"]*(")/, 'og:image', meta.ogImage],
    [/(<meta name="twitter:image" content=")[^"]*(")/, 'twitter:image', meta.ogImage],
  ]
  html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${t}</title>`, 'title')
  for (const [pattern, label, value] of attrs) {
    html = replaceOnce(html, pattern, (_, before, after) => before + value + after, label)
  }
  return html
}

// CSS + JS of a lazy route chunk and its shared imports. The main entry's
// assets are already linked from index.html, so they're skipped.
function routeAssets(key) {
  const css = new Set()
  const js = new Set()
  const seen = new Set()
  const walk = (k) => {
    if (seen.has(k)) return
    seen.add(k)
    const entry = manifest[k]
    if (!entry) throw new Error(`prerender: ${k} missing from the Vite manifest`)
    if (entry.isEntry) return
    js.add(entry.file)
    entry.css?.forEach((f) => css.add(f))
    entry.imports?.forEach(walk)
  }
  if (key) walk(key)
  const notInTemplate = (f) => !template.includes(`/${f}"`)
  return [
    ...[...css].filter(notInTemplate).map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
    ...[...js].filter(notInTemplate).map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
  ].join('\n    ')
}

const jsonLdFor = (route, page) =>
  `<script type="application/ld+json">${JSON.stringify(buildSchema(route, page)).replace(/</g, '\\u003c')}</script>`

const alternateLinks = (meta) =>
  meta.alternates
    .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`)
    .join('\n    ')

const sitemapUrls = []
const builtPages = []
let notFoundHtml = ''

for (const page of PAGES) {
  for (const lang of LANGS) {
    const route = page.paths[lang]
    const meta = seoFor(route)
    const rendered = await render(route)

    // With no <html>/<head> in the tree, React emits resource hints such as
    // <link rel="preload" as="image"> at the top of the output. Their place
    // is <head>, and keeping them out of #root keeps hydration clean.
    const hints = rendered.match(/^(?:<link [^>]*\/>)+/)?.[0] ?? ''
    const appHtml = rendered.slice(hints.length)

    const h1Count = (appHtml.match(/<h1[\s>]/g) || []).length
    if (h1Count !== 1) throw new Error(`prerender: ${route} has ${h1Count} <h1>, expected exactly 1`)

    let html = setHead(template, meta)
    const headExtras = [
      meta.noindex && '<meta name="robots" content="noindex">',
      hints.replace(/\/></g, '/>\n    <'),
      routeAssets(page.module),
      alternateLinks(meta),
      jsonLdFor(route, page),
    ].filter(Boolean).join('\n    ')
    html = replaceOnce(html, /\n\s*<\/head>/, () => `\n    ${headExtras}\n  </head>`, '</head>')
    html = replaceOnce(
      html,
      /<div id="root"><\/div>/,
      () => `<div id="root" data-prerendered="${route}">${appHtml}</div>`,
      '#root'
    )

    // Static hosts resolve "/contact" differently — some look for
    // contact.html, others contact/index.html — so write both. The
    // canonical tag keeps search engines on the extensionless URL.
    const outFiles = route === '/'
      ? [path.join(distDir, 'index.html')]
      : [path.join(distDir, `${route.slice(1)}.html`), path.join(distDir, route.slice(1), 'index.html')]
    for (const outFile of outFiles) {
      await fs.mkdir(path.dirname(outFile), { recursive: true })
      await fs.writeFile(outFile, html)
    }
    console.log(`prerendered ${route.padEnd(22)} → ${outFiles.map((f) => path.relative(distDir, f)).join(', ')} (${(html.length / 1024).toFixed(1)} kB)`)

    // Pages that canonicalize elsewhere (e.g. /en/privacy-policy) and
    // draft brand pages stay out.
    const indexable = !meta.noindex && meta.canonical === SITE_ORIGIN + (route === '/' ? '/' : route)
    if (indexable) sitemapUrls.push(meta)
    builtPages.push({
      route,
      lang,
      html,
      indexable,
      expected: { canonical: meta.canonical, htmlLang: meta.htmlLang, alternates: meta.alternates, noindex: meta.noindex },
    })
  }
}

const drafts = PAGES.filter((p) => p.draft).map((p) => p.paths.es)
if (drafts.length) console.log(`borradores (noindex, fuera del sitemap): ${drafts.join(', ')}`)

// 404.html — hosts serve it for URLs that don't exist. Rendered in
// Spanish (the app re-renders in English for /en/... URLs); noindex and
// no canonical so a broken URL never enters the index.
{
  const rendered = await render('/__not-found__')
  const hints = rendered.match(/^(?:<link [^>]*\/>)+/)?.[0] ?? ''
  const appHtml = rendered.slice(hints.length)
  if ((appHtml.match(/<h1[\s>]/g) || []).length !== 1) throw new Error('prerender: 404 needs exactly 1 <h1>')

  const nf = translations.es.notFound
  let html = replaceOnce(template, /<title>[^<]*<\/title>/, () => `<title>${escapeHtml(nf.metaTitle)}</title>`, 'title')
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*(")/, (_, a, b) => a + escapeHtml(nf.text) + b, 'meta description')
  html = replaceOnce(html, /\n\s*<link rel="canonical"[^>]*>/, () => '', 'canonical')
  html = replaceOnce(html, /\n\s*<meta property="og:url"[^>]*>/, () => '', 'og:url')
  const headExtras = [
    '<meta name="robots" content="noindex">',
    hints.replace(/\/></g, '/>\n    <'),
    routeAssets('src/components/NotFound.jsx'),
  ].filter(Boolean).join('\n    ')
  html = replaceOnce(html, /\n\s*<\/head>/, () => `\n    ${headExtras}\n  </head>`, '</head>')
  html = replaceOnce(html, /<div id="root"><\/div>/, () => `<div id="root" data-prerendered="/404">${appHtml}</div>`, '#root')
  await fs.writeFile(path.join(distDir, '404.html'), html)
  notFoundHtml = html
  console.log(`prerendered ${'(404)'.padEnd(22)} → 404.html (${(html.length / 1024).toFixed(1)} kB)`)
}

// sitemap.xml generated from the same table, with hreflang alternates.
const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapUrls.map((meta) => [
    '  <url>',
    `    <loc>${meta.canonical}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    ...meta.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`),
    '  </url>',
  ].join('\n')),
  '</urlset>',
  '',
].join('\n')
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap)
console.log(`sitemap.xml: ${sitemapUrls.length} URLs`)

// SEO checklist on the final HTML of every page (report point 12).
const seo = runSeoChecks(builtPages, { notFoundHtml, sitemapXml: sitemap, distDir, siteOrigin: SITE_ORIGIN })
for (const w of seo.warnings) console.warn(`  ⚠ ${w}`)
if (seo.errors.length) {
  for (const e of seo.errors) console.error(`  ✗ ${e}`)
  throw new Error(`SEO checklist: ${seo.errors.length} error(es) en ${seo.checked} páginas`)
}
console.log(`SEO checklist: ${seo.checked} páginas + 404 + sitemap OK${seo.warnings.length ? ` (${seo.warnings.length} avisos)` : ''}`)

// The manifest and SSR bundle are build intermediates — don't deploy them.
await fs.rm(path.join(distDir, '.vite'), { recursive: true, force: true })
await fs.rm(ssrDir, { recursive: true, force: true })
