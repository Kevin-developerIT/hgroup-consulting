import { holdingsLogos } from '../assets/logos'
import { translations } from '../contexts/translations'
import { BRAND_PAGES } from './brands'
import { holdingLinks } from './holdings'
import { BRAND_PAGE_IDS, SITE_ORIGIN, canonicalFor, localizePath, seoFor } from './seo'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const WEBSITE_ID = `${SITE_ORIGIN}/#website`
const CONTACT_EMAIL = 'kevin.martinez@hgroup.consulting'

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

  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'H Group',
    alternateName: 'HGROUP',
    legalName: 'MYT Marketing Comunicación',
    url: `${SITE_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/Hlogo_negro.png`,
    },
    description: seoFor('/').description,
    email: CONTACT_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT_EMAIL,
      url: `${SITE_ORIGIN}/contact`,
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
    sameAs: [
      'https://www.instagram.com/hgroupp_/',
      'https://www.linkedin.com/company/herohgroup/',
    ],
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

/* schema.org graph for one prerendered URL: Organization + WebSite on
   every page, a WebPage for the URL, and brand/service/breadcrumb nodes
   on H pages. `brandPageId` is the H id when the URL is a brand page. */
export function buildSchema(route, brandPageId) {
  const meta = seoFor(route)
  const brand = brandPageId ? brandNodes(brandPageId, meta) : null

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
