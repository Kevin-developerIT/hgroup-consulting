import { holdingsLogos } from '../assets/logos'
import { translations } from '../contexts/translations'
import { BRAND_PAGES } from './brands'
import { CASES } from './cases'
import { COMPANY } from './company'
import { SERVICE_PAGES } from './services'
import { holdingLinks } from './holdings'
import { BRAND_PAGE_IDS, SITE_ORIGIN, canonicalFor, localizePath, seoFor } from './seo'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`
const CONTACT_EMAIL = COMPANY.email

// Language-neutral id for an H that has its own page, shared by the
// ES and EN versions so both describe the same entity.
const brandId = (id) => `${SITE_ORIGIN}/marcas/${id}#brand`

function organization() {
  const descriptions = Object.fromEntries(
    translations.es.expertise.map((e) => [e.name, e.description])
  )

  const brands = holdingsLogos.map((h) => ({
    '@type': 'Organization',
    ...(BRAND_PAGE_IDS.includes(h.id) && { '@id': brandId(h.id) }),
    name: h.name,
    ...(holdingLinks[h.id] && { url: holdingLinks[h.id] }),
    ...(descriptions[h.name] && { description: descriptions[h.name] }),
  }))

  const { address, geo, phone, social } = COMPANY

  // Organization + ProfessionalService (a LocalBusiness type): one entity
  // for the holding and its office, as report point 6 asks.
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: COMPANY.name,
    alternateName: 'HGROUP',
    legalName: COMPANY.legalName,
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/Hlogo_negro.png`,
    },
    image: `${SITE_ORIGIN}/og/default-es.jpg`,
    description: seoFor('/').description,
    email: CONTACT_EMAIL,
    telephone: phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.neighborhood}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude },
    hasMap: COMPANY.mapUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: phone.e164,
      email: CONTACT_EMAIL,
      url: `${SITE_ORIGIN}/contact`,
      areaServed: 'MX',
      availableLanguage: ['es', 'en'],
    },
    areaServed: [
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'Estados Unidos' },
      { '@type': 'Country', name: 'Canadá' },
      { '@type': 'Place', name: 'Latinoamérica' },
    ],
    knowsAbout: [
      'Relaciones públicas',
      'Influencer marketing',
      'Marketing experiencial',
      'Producción audiovisual',
      'Estrategia creativa',
      'Marketing digital',
      'Representación de talento',
    ],
    sameAs: [social.instagram, social.linkedin],
    subOrganization: brands,
  }
}

/* Extra nodes for an H page: the brand itself, one Service per listed
   service, and a two-step breadcrumb (H Group home → brand). */
function brandNodes(id, meta) {
  const brand = BRAND_PAGES[id]
  const copy = brand.copy[meta.lang]
  const home = meta.lang === 'es' ? 'Inicio' : 'Home'

  return {
    about: { '@id': brandId(id) },
    breadcrumbId: `${meta.canonical}#breadcrumb`,
    nodes: [
      {
        '@type': 'Organization',
        '@id': brandId(id),
        name: brand.name,
        url: brand.externalUrl,
        description: copy.intro,
        slogan: copy.tagline,
        parentOrganization: { '@id': ORG_ID },
      },
      ...(copy.services ?? []).map((service, i) => ({
        '@type': 'Service',
        '@id': `${meta.canonical}#service-${i + 1}`,
        name: `${service.title} — ${brand.name}`,
        serviceType: service.title,
        description: service.text,
        provider: { '@id': brandId(id) },
        areaServed: { '@type': 'Country', name: 'México' },
        url: meta.canonical,
      })),
      {
        '@type': 'BreadcrumbList',
        '@id': `${meta.canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: home,
            item: canonicalFor(localizePath('/', meta.lang)),
          },
          { '@type': 'ListItem', position: 2, name: brand.name, item: meta.canonical },
        ],
      },
    ],
  }
}

/* Extra nodes for a service page: the Service itself (provided by H Group
   and the Hs behind it, with what it includes as an offer catalog) and a
   two-step breadcrumb (H Group home → service). */
function serviceNodes(id, meta) {
  const service = SERVICE_PAGES[id]
  const copy = service.copy[meta.lang]
  const home = meta.lang === 'es' ? 'Inicio' : 'Home'
  const serviceNodeId = `${meta.canonical}#service`

  return {
    about: { '@id': serviceNodeId },
    breadcrumbId: `${meta.canonical}#breadcrumb`,
    nodes: [
      {
        '@type': 'Service',
        '@id': serviceNodeId,
        name: copy.name,
        serviceType: copy.name,
        description: copy.intro,
        provider: [{ '@id': ORG_ID }, ...service.brands.map((b) => ({ '@id': brandId(b) }))],
        areaServed: { '@type': 'Country', name: 'México' },
        url: meta.canonical,
        ...(copy.includes.length > 0 && {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: copy.name,
            itemListElement: copy.includes.map((item) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: item.title, description: item.text },
            })),
          },
        }),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${meta.canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: home,
            item: canonicalFor(localizePath('/', meta.lang)),
          },
          { '@type': 'ListItem', position: 2, name: copy.name, item: meta.canonical },
        ],
      },
    ],
  }
}

/* Extra nodes for a case study: a CreativeWork made by H Group and the
   H that led it, for the client, plus a breadcrumb home → brand → case. */
function caseNodes(id, meta) {
  const item = CASES[id]
  const copy = item.copy[meta.lang]
  const brand = BRAND_PAGES[item.brand]
  const home = meta.lang === 'es' ? 'Inicio' : 'Home'
  const workId = `${meta.canonical}#work`
  const image = item.gallery[0]?.full

  return {
    about: { '@id': workId },
    breadcrumbId: `${meta.canonical}#breadcrumb`,
    nodes: [
      {
        '@type': 'CreativeWork',
        '@id': workId,
        name: `${item.client} — ${copy.title}`,
        headline: copy.title,
        description: copy.summary,
        inLanguage: meta.htmlLang,
        url: meta.canonical,
        creator: [{ '@id': ORG_ID }, { '@id': brandId(item.brand) }],
        sourceOrganization: { '@id': brandId(item.brand) },
        about: { '@type': 'Organization', name: item.client },
        ...(image && { image: image.startsWith('http') ? image : `${SITE_ORIGIN}${image}` }),
        ...(item.year && { dateCreated: String(item.year) }),
        ...(item.services.length > 0 && {
          genre: item.services.map((s) => SERVICE_PAGES[s].copy[meta.lang].name),
        }),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${meta.canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: home, item: canonicalFor(localizePath('/', meta.lang)) },
          {
            '@type': 'ListItem',
            position: 2,
            name: brand.name,
            item: canonicalFor(localizePath(`/marcas/${item.brand}`, meta.lang)),
          },
          { '@type': 'ListItem', position: 3, name: item.client, item: meta.canonical },
        ],
      },
    ],
  }
}

/* schema.org graph for one prerendered URL: Organization + WebSite on
   every page, a WebPage for the URL, and brand or service nodes (with a
   breadcrumb) on H and service pages. `page` is the PAGES entry. */
export function buildSchema(route, page = {}) {
  const meta = seoFor(route)
  const brand = page.brandId
    ? brandNodes(page.brandId, meta)
    : page.serviceId
      ? serviceNodes(page.serviceId, meta)
      : page.caseId
        ? caseNodes(page.caseId, meta)
        : null

  const webPage = {
    '@type': 'WebPage',
    '@id': `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: meta.htmlLang,
    isPartOf: { '@id': WEBSITE_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: meta.ogImage },
    about: brand ? brand.about : { '@id': ORG_ID },
    ...(brand && { breadcrumb: { '@id': brand.breadcrumbId } }),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_ORIGIN}/`,
        name: 'H Group',
        inLanguage: ['es-MX', 'en'],
        publisher: { '@id': ORG_ID },
      },
      webPage,
      ...(brand ? brand.nodes : []),
    ],
  }
}
