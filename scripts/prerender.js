// Build-time prerender: renders every route to static HTML so crawlers
// (Google, and AI crawlers that don't run JS) get the full content.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, ROUTES_SEO, canonicalFor, buildSchema } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

// Module each route renders, used to find its CSS/JS in the Vite
// manifest. Keep in sync with <Routes> in src/App.jsx.
const ROUTE_MODULES = {
  '/': null,
  '/work-with-us': 'src/components/WorkWithUs.jsx',
  '/join-us': 'src/components/JoinUs.jsx',
  '/100-voices': 'src/components/HundredVoices.jsx',
  '/contact': 'src/components/Contact.jsx',
  '/privacy-policy': 'src/components/Privacy.jsx',
}

const seoRoutes = Object.keys(ROUTES_SEO).sort().join()
if (seoRoutes !== Object.keys(ROUTE_MODULES).sort().join()) {
  throw new Error('prerender: ROUTE_MODULES and ROUTES_SEO list different routes')
}

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

function setHead(html, { title, description }, url) {
  const t = escapeHtml(title)
  const d = escapeHtml(description)
  const attrs = [
    [/(<meta name="description" content=")[^"]*(")/, 'meta description', d],
    [/(<link rel="canonical" href=")[^"]*(")/, 'canonical', url],
    [/(<meta property="og:url" content=")[^"]*(")/, 'og:url', url],
    [/(<meta property="og:title" content=")[^"]*(")/, 'og:title', t],
    [/(<meta property="og:description" content=")[^"]*(")/, 'og:description', d],
    [/(<meta name="twitter:title" content=")[^"]*(")/, 'twitter:title', t],
    [/(<meta name="twitter:description" content=")[^"]*(")/, 'twitter:description', d],
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

const jsonLd = `<script type="application/ld+json">${JSON.stringify(buildSchema()).replace(/</g, '\\u003c')}</script>`

for (const [route, moduleKey] of Object.entries(ROUTE_MODULES)) {
  const rendered = await render(route)

  // With no <html>/<head> in the tree, React emits resource hints such as
  // <link rel="preload" as="image"> at the top of the output. Their place
  // is <head>, and keeping them out of #root keeps hydration clean.
  const hints = rendered.match(/^(?:<link [^>]*\/>)+/)?.[0] ?? ''
  const appHtml = rendered.slice(hints.length)

  const h1Count = (appHtml.match(/<h1[\s>]/g) || []).length
  if (h1Count !== 1) throw new Error(`prerender: ${route} has ${h1Count} <h1>, expected exactly 1`)

  let html = setHead(template, ROUTES_SEO[route], canonicalFor(route))
  const assets = routeAssets(moduleKey)
  const headExtras = [hints.replace(/\/></g, '/>\n    <'), assets, jsonLd].filter(Boolean).join('\n    ')
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
  console.log(`prerendered ${route.padEnd(16)} → ${outFiles.map((f) => path.relative(distDir, f)).join(', ')} (${(html.length / 1024).toFixed(1)} kB)`)
}

// The manifest and SSR bundle are build intermediates — don't deploy them.
await fs.rm(path.join(distDir, '.vite'), { recursive: true, force: true })
await fs.rm(ssrDir, { recursive: true, force: true })
