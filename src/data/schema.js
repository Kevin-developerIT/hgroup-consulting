import { holdingsLogos } from '../assets/logos'
import { translations } from '../contexts/translations'
import { holdingLinks } from './holdings'
import { SITE_ORIGIN, seoFor } from './seo'

const ORG_ID = `${SITE_ORIGIN}/#organization`
const CONTACT_EMAIL = 'kevin.martinez@hgroup.consulting'

/* schema.org graph (Organization + WebSite) injected into every
   prerendered page. Each H is listed as a subOrganization so search
   engines and AI crawlers can connect the brands to H Group. */
export function buildSchema() {
  const descriptions = Object.fromEntries(
    translations.es.expertise.map((e) => [e.name, e.description])
  )

  const brands = holdingsLogos.map((h) => ({
    '@type': 'Organization',
    name: h.name,
    ...(holdingLinks[h.id] && { url: holdingLinks[h.id] }),
    ...(descriptions[h.name] && { description: descriptions[h.name] }),
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: 'H Group',
        inLanguage: ['es-MX', 'en'],
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}
