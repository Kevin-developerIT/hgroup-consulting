export const SITE_ORIGIN = 'https://hgroup.consulting'
export const LANGS = ['es', 'en']
export const HREFLANG = { es: 'es-MX', en: 'en' }

/* Single source of truth for every URL on the site, in both languages.
   Spanish lives at the root and English under /en (existing URLs keep
   working). Read by the router, usePageMeta, the language toggle and the
   build-time prerender + sitemap. `module` is only used by the prerender
   to find each lazy route's CSS in the Vite manifest. */
const PAGES_BASE = [
  {
    id: 'home',
    paths: { es: '/', en: '/en' },
    module: null,
    seo: {
      es: {
        title: 'H Group | Agencia Creativa, PR & Influencer Marketing México',
        description:
          'H Group conecta marcas con audiencias a través de PR, influencer marketing, experiencias, producción y estrategia creativa en México y LATAM.',
      },
      en: {
        title: 'H Group | Creative Agency, PR & Influencer Marketing in Mexico',
        description:
          'H Group connects brands with audiences through PR, influencer marketing, experiences, production and creative strategy in Mexico and LATAM.',
      },
    },
  },
  {
    id: 'work',
    paths: { es: '/work-with-us', en: '/en/work-with-us' },
    module: 'src/components/WorkWithUs.jsx',
    seo: {
      es: {
        title: 'Trabaja con nosotros | H Group',
        description:
          'H Group es una holding de 11 marcas especializadas en PR, influencer marketing, eventos, producción y estrategia digital, con presencia en los 32 estados de México.',
      },
      en: {
        title: 'Work with us | H Group',
        description:
          'Meet H Group: a holding of 11 brands specialized in PR, influencer marketing, events, production, content and digital strategy, present in all 32 states of Mexico.',
      },
    },
  },
  {
    id: 'join',
    paths: { es: '/join-us', en: '/en/join-us' },
    module: 'src/components/JoinUs.jsx',
    seo: {
      es: {
        title: 'Únete a H Group | Vacantes',
        description:
          'Forma parte del equipo de H Group. Consulta nuestras vacantes o envíanos tu CV para sumarte a una holding creativa con 11 marcas especializadas.',
      },
      en: {
        title: 'Join H Group | Careers',
        description:
          'Be part of the H Group team. Check our openings or send us your CV to join a creative holding with 11 specialized brands.',
      },
    },
  },
  {
    id: 'hundred',
    paths: { es: '/100-voices', en: '/en/100-voices' },
    module: 'src/components/HundredVoices.jsx',
    seo: {
      es: {
        title: 'Cien Voces | H Group',
        description:
          'Cien Voces es la serie de conferencias y libro de H Group con testimonios de los líderes empresariales y visionarios más influyentes de México.',
      },
      en: {
        title: 'Cien Voces | H Group',
        description:
          "Cien Voces is H Group's conference series and book with testimonies from Mexico's most influential business leaders and visionaries.",
      },
    },
  },
  {
    id: 'contact',
    paths: { es: '/contact', en: '/en/contact' },
    module: 'src/components/Contact.jsx',
    seo: {
      es: {
        title: 'Contacto | H Group',
        description:
          'Cuéntanos sobre tu marca, tus objetivos o tu próxima campaña de PR, influencer marketing, experiencias o producción. Leemos cada mensaje.',
      },
      en: {
        title: 'Contact | H Group',
        description:
          'Tell us about your brand, your goals or your next PR, influencer marketing, experiential or production campaign. We read every message.',
      },
    },
  },
  {
    id: 'privacy',
    paths: { es: '/privacy-policy', en: '/en/privacy-policy' },
    module: 'src/components/Privacy.jsx',
    // The legal text only exists in Spanish: the English URL shows it with
    // an English notice, canonicalizes to the Spanish page, and is left out
    // of hreflang and the sitemap so it never competes with the original.
    canonicalLang: 'es',
    seo: {
      es: {
        title: 'Política de Privacidad | H Group',
        description:
          'Cómo MYT Marketing Comunicación (H Group) recopila, utiliza y protege los datos personales obtenidos en su sitio web, formularios y campañas digitales.',
      },
      en: {
        title: 'Privacy Policy | H Group',
        description:
          'How MYT Marketing Comunicación (H Group) collects, uses and protects personal data from its website, forms and digital campaigns.',
      },
    },
  },
]

/* One entry per H that has its own page on hgroup.consulting. The page
   content lives in src/data/brands.js; this is only routing + <head>.
   `draft: true` = content still pending: the page works and is linked,
   but ships with noindex and stays out of the sitemap. Remove the flag
   once its services, projects and texts are in. */
const BRAND_SEO = {
  hero: {
    draft: true,
    es: {
      title: 'HERO | Fundación de impacto social — H Group',
      description:
        'HERO, fundación de impacto social de H Group, conecta a empresas con más de 144 fundaciones a través de estrategias creativas.',
    },
    en: {
      title: 'HERO | Social impact foundation — H Group',
      description:
        "HERO, H Group's social impact foundation, connects companies with 144+ foundations through creative strategies.",
    },
  },
  hack: {
    es: {
      title: 'HACK | Social media, publicidad digital y desarrollo — H Group',
      description:
        'HACK, marca de H Group, gestiona redes sociales, publicidad digital y desarrollo con foco en conversión, para marcas como DKNY y Oscar de la Renta.',
    },
    en: {
      title: 'HACK | Social media, digital ads & development — H Group',
      description:
        'HACK, an H Group brand, runs social media, digital advertising and development focused on conversion, for brands like DKNY and Oscar de la Renta.',
    },
  },
  halo: {
    es: {
      title: 'HALO | Producción audiovisual y branded content — H Group',
      description:
        'HALO, marca de H Group, produce branded content, video para redes, aftermovies, animación y CGI para marcas como Aston Martin, Lamborghini y Yves Rocher.',
    },
    en: {
      title: 'HALO | Video production & branded content — H Group',
      description:
        'HALO, an H Group brand, produces branded content, social video, aftermovies, animation and CGI for brands like Aston Martin, Lamborghini and Yves Rocher.',
    },
  },
  here: {
    es: {
      title: 'HERE | Influencer marketing y convocatorias — H Group',
      description:
        'HERE, marca de H Group, hace influencer marketing y convoca creadores y líderes de opinión para lanzamientos y eventos de marcas como BVLGARI y JAECOO.',
    },
    en: {
      title: 'HERE | Influencer marketing & creator outreach — H Group',
      description:
        'HERE, an H Group brand, runs influencer marketing and brings creators and opinion leaders to launches and events for brands like BVLGARI and JAECOO.',
    },
  },
  hits: {
    es: {
      title: 'HITS | Estudio creativo: branding, diseño y estrategia — H Group',
      description:
        'HITS, estudio creativo de H Group, transforma ideas en branding, diseño y estrategia a la medida para marcas como Zote y Mora Mora.',
    },
    en: {
      title: 'HITS | Creative studio: branding, design & strategy — H Group',
      description:
        "HITS, H Group's creative studio, turns ideas into tailor-made branding, design and strategy for brands like Zote and Mora Mora.",
    },
  },
  home: {
    es: {
      title: 'HOME | Pop-ups, stands y test drives — H Group',
      description:
        'HOME, marca de H Group, crea experiencias BTL en centros comerciales y eventos: pop-ups, stands y test drives para Formula 1, Kylie Cosmetics, Nissan y Volvo.',
    },
    en: {
      title: 'HOME | Pop-ups, stands & test drives — H Group',
      description:
        'HOME, an H Group brand, creates BTL experiences in shopping centers and events: pop-ups, stands and test drives for Formula 1, Kylie Cosmetics, Nissan and Volvo.',
    },
  },
  hope: {
    es: {
      title: 'HOPE | Medios y activaciones en universidades — H Group',
      description:
        'HOPE, marca de H Group, conecta marcas con estudiantes mediante medios, activaciones, conferencias y patrocinios en universidades de todo México.',
    },
    en: {
      title: 'HOPE | University media & activations — H Group',
      description:
        'HOPE, an H Group brand, connects brands with students through media, activations, talks and sponsorships at universities across Mexico.',
    },
  },
  hunt: {
    es: {
      title: 'HUNT | Medios OOH y estrategia de medios — H Group',
      description:
        'HUNT, marca de H Group, planea y optimiza campañas en medios OOH: espectaculares, pantallas, aeropuertos, metro y más de 100,000 oportunidades de visibilidad.',
    },
    en: {
      title: 'HUNT | OOH media & media strategy — H Group',
      description:
        'HUNT, an H Group brand, plans and optimizes OOH campaigns: billboards, screens, airports, subway and 100,000+ brand visibility opportunities.',
    },
  },
  hype: {
    draft: true,
    es: {
      title: 'HYPE | Relaciones públicas en 150+ medios — H Group',
      description:
        'HYPE, marca de relaciones públicas de H Group, amplifica la voz de las marcas a través de más de 150 medios de comunicación.',
    },
    en: {
      title: 'HYPE | Public relations across 150+ media — H Group',
      description:
        "HYPE, H Group's public relations brand, amplifies brand voices through 150+ media outlets.",
    },
  },
  hook: {
    es: {
      title: 'HOOK | Productora de eventos y lanzamientos — H Group',
      description:
        'HOOK, productora de eventos de H Group, conceptualiza, produce y ejecuta eventos y lanzamientos para marcas como Lamborghini, Honor y Nespresso.',
    },
    en: {
      title: 'HOOK | Event production & brand launches — H Group',
      description:
        "HOOK, H Group's event production company, conceptualizes, produces and runs events and launches for brands like Lamborghini, Honor and Nespresso.",
    },
  },
  holy: {
    es: {
      title: 'HOLY | Representación de talento, UGC y convocatorias — H Group',
      description:
        'HOLY, vertical de H Group, conecta marcas con creadores mediante representación de talento, UGC y convocatorias que generan contenido auténtico y resultados.',
    },
    en: {
      title: 'HOLY | Talent representation, UGC & casting calls — H Group',
      description:
        'HOLY, an H Group vertical, connects brands with creators through talent representation, UGC and casting calls that deliver authentic content and business results.',
    },
  },
}

export const BRAND_PAGE_IDS = Object.keys(BRAND_SEO)

/* One page per service line (report point 1), each linking to the Hs
   that deliver it. Content lives in src/data/services.js. Spanish slugs
   at the root match how people search in Mexico; English under /en. */
const SERVICE_SEO = {
  influencer: {
    paths: { es: '/influencer-marketing', en: '/en/influencer-marketing' },
    es: {
      title: 'Agencia de Influencer Marketing en México | H Group',
      description:
        'Influencer marketing en México: estrategias con creadores, convocatorias para lanzamientos y eventos, representación de talento y contenido UGC con HERE y HOLY.',
    },
    en: {
      title: 'Influencer Marketing Agency in Mexico | H Group',
      description:
        'Influencer marketing in Mexico: creator strategies, influencer outreach for launches and events, talent representation and UGC with HERE and HOLY.',
    },
  },
  pr: {
    // Until HYPE's material arrives (same as its brand page).
    draft: true,
    paths: { es: '/relaciones-publicas', en: '/en/public-relations' },
    es: {
      title: 'Agencia de Relaciones Públicas en México | H Group',
      description:
        'Relaciones públicas en México con HYPE, la marca de PR de H Group, que amplifica la voz de las marcas a través de más de 150 medios de comunicación.',
    },
    en: {
      title: 'Public Relations Agency in Mexico | H Group',
      description:
        "Public relations in Mexico with HYPE, H Group's PR brand, amplifying brand voices through 150+ media outlets.",
    },
  },
  experiential: {
    paths: { es: '/marketing-experiencial', en: '/en/experiential-marketing' },
    es: {
      title: 'Marketing Experiencial y Eventos en México | H Group',
      description:
        'Marketing experiencial en México: eventos y lanzamientos con HOOK, pop-ups, stands y test drives con HOME, y activaciones en universidades con HOPE.',
    },
    en: {
      title: 'Experiential Marketing & Events in Mexico | H Group',
      description:
        'Experiential marketing in Mexico: events and launches with HOOK, pop-ups, stands and test drives with HOME, and campus activations with HOPE.',
    },
  },
  production: {
    paths: { es: '/produccion', en: '/en/production' },
    es: {
      title: 'Producción Audiovisual y de Eventos en México | H Group',
      description:
        'Producción audiovisual con HALO —branded content, video para redes, aftermovies, animación y CGI— y producción de eventos con HOOK, de H Group.',
    },
    en: {
      title: 'Video & Event Production in Mexico | H Group',
      description:
        'Video production with HALO — branded content, social video, aftermovies, animation and CGI — and event production with HOOK, from H Group.',
    },
  },
  content: {
    paths: { es: '/contenido', en: '/en/content' },
    es: {
      title: 'Contenido para Redes Sociales, UGC y Branded Content | H Group',
      description:
        'Contenido para marcas: gestión de redes sociales con HACK, contenido UGC con creadores reales con HOLY, y branded content y video con HALO.',
    },
    en: {
      title: 'Social Media Content, UGC & Branded Content | H Group',
      description:
        'Content for brands: social media management with HACK, UGC with real creators with HOLY, and branded content and video with HALO.',
    },
  },
  creative: {
    paths: { es: '/estrategia-creativa', en: '/en/creative-strategy' },
    es: {
      title: 'Estrategia Creativa, Branding y Diseño | H Group',
      description:
        'Estrategia creativa para marcas: branding, diseño y propuestas a la medida con HITS, y estrategia y publicidad digital enfocadas en conversión con HACK.',
    },
    en: {
      title: 'Creative Strategy, Branding & Design | H Group',
      description:
        'Creative strategy for brands: branding, design and tailor-made proposals with HITS, plus digital strategy and advertising focused on conversion with HACK.',
    },
  },
}

export const SERVICE_PAGE_IDS = Object.keys(SERVICE_SEO)

/* Case studies (report point 2): /casos/<slug>, EN /en/cases/<slug>.
   Content lives in src/data/cases.js. A draft case is noindex, out of the
   sitemap and not linked from anywhere until its challenge, solution and
   results are in — remove `draft` to publish it. */
const CASE_SEO = {
  'lamborghini-urus-se': {
    draft: true,
    og: 'hook',
    es: {
      title: 'Lamborghini Urus SE: evento de lanzamiento | Caso HOOK',
      description:
        'Caso de éxito de HOOK, de H Group: evento de presentación del Lamborghini Urus SE con una experiencia inmersiva.',
    },
    en: {
      title: 'Lamborghini Urus SE launch event | HOOK case study',
      description:
        'HOOK case study, from H Group: launch event for the Lamborghini Urus SE with an immersive experience.',
    },
  },
  'bvlgari-cancun': {
    draft: true,
    og: 'here',
    es: {
      title: 'BVLGARI Cancún: convocatoria de influencers | Caso HERE',
      description:
        'Caso de éxito de HERE, de H Group: convocatoria de influencers de lujo para la apertura de la boutique BVLGARI en La Isla Cancún.',
    },
    en: {
      title: 'BVLGARI Cancún: influencer outreach | HERE case study',
      description:
        'HERE case study, from H Group: luxury influencer outreach for the opening of the BVLGARI boutique at La Isla Cancún.',
    },
  },
  'aston-martin': {
    draft: true,
    og: 'halo',
    es: {
      title: 'Aston Martin: contenido audiovisual de lujo | Caso HALO',
      description:
        'Caso de éxito de HALO, de H Group: contenido audiovisual exclusivo para el lanzamiento de los modelos de lujo de Aston Martin.',
    },
    en: {
      title: 'Aston Martin: luxury video content | HALO case study',
      description:
        "HALO case study, from H Group: exclusive video content for the launch of Aston Martin's luxury models.",
    },
  },
  'volvo-ooh': {
    draft: true,
    og: 'hunt',
    es: {
      title: 'Volvo: campaña de medios OOH | Caso HUNT',
      description:
        'Caso de éxito de HUNT, de H Group: campaña integral de medios OOH para Volvo en puntos estratégicos de la ciudad.',
    },
    en: {
      title: 'Volvo: OOH media campaign | HUNT case study',
      description:
        'HUNT case study, from H Group: a full OOH media campaign for Volvo at strategic points across the city.',
    },
  },
}

export const CASE_PAGE_IDS = Object.keys(CASE_SEO)

export const PAGES = [
  ...PAGES_BASE,
  ...SERVICE_PAGE_IDS.map((id) => ({
    id: `service:${id}`,
    serviceId: id,
    paths: SERVICE_SEO[id].paths,
    module: 'src/components/ServicePage.jsx',
    og: `service-${id}`,
    draft: Boolean(SERVICE_SEO[id].draft),
    seo: SERVICE_SEO[id],
  })),
  ...BRAND_PAGE_IDS.map((id) => ({
    id: `brand:${id}`,
    brandId: id,
    paths: { es: `/marcas/${id}`, en: `/en/brands/${id}` },
    module: 'src/components/BrandPage.jsx',
    og: id,
    draft: Boolean(BRAND_SEO[id].draft),
    seo: BRAND_SEO[id],
  })),
  ...CASE_PAGE_IDS.map((id) => ({
    id: `case:${id}`,
    caseId: id,
    paths: { es: `/casos/${id}`, en: `/en/cases/${id}` },
    module: 'src/components/CasePage.jsx',
    og: CASE_SEO[id].og,
    draft: Boolean(CASE_SEO[id].draft),
    seo: CASE_SEO[id],
  })),
]

/* Spanish path of a service page — what LocaleLink expects. */
export const servicePath = (id) => SERVICE_SEO[id].paths.es

export const casePath = (id) => `/casos/${id}`
export const isPublishedCase = (id) => Boolean(CASE_SEO[id]) && !CASE_SEO[id].draft

/* Social preview images live in public/og/<name>-<lang>.jpg (1200×630).
   Pages without their own `og` use default-<lang>.jpg. */
const ogImageFor = (page, lang) => `${SITE_ORIGIN}/og/${page.og ?? 'default'}-${lang}.jpg`

export const normalizePath = (p) => (p === '/' ? '/' : p.replace(/\/+$/, '') || '/')

export const langFromPath = (pathname) => {
  const p = normalizePath(pathname)
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'es'
}

const findPage = (pathname) => {
  const p = normalizePath(pathname)
  for (const page of PAGES) {
    for (const lang of LANGS) {
      if (page.paths[lang] === p) return { page, lang }
    }
  }
  return null
}

/* Spanish path in, current-language path out: '/contact' → '/en/contact',
   '/marcas/home' → '/en/brands/home'. Keeps any #hash or ?query. */
export function localizePath(to, lang) {
  if (lang === 'es' || typeof to !== 'string' || !to.startsWith('/')) return to
  const [, path, suffix] = to.match(/^([^?#]*)(.*)$/)
  const match = findPage(path)
  const localized = match ? match.page.paths.en : path === '/' ? '/en' : `/en${path}`
  return localized + suffix
}

export function alternatePath(pathname) {
  const match = findPage(pathname)
  if (!match) return langFromPath(pathname) === 'en' ? '/' : '/en'
  return match.page.paths[match.lang === 'es' ? 'en' : 'es']
}

export const canonicalFor = (path) => SITE_ORIGIN + normalizePath(path)

/* Everything the <head> needs for a URL: title, description, canonical,
   language, hreflang alternates and whether it's kept out of the index
   (draft brand pages). Null for unknown paths. */
export function seoFor(pathname) {
  const match = findPage(pathname)
  if (!match) return null
  const { page, lang } = match
  const hasAlternates = !page.canonicalLang
  return {
    lang,
    noindex: Boolean(page.draft),
    htmlLang: HREFLANG[lang],
    ogLocale: lang === 'es' ? 'es_MX' : 'en_US',
    ogLocaleAlternate: lang === 'es' ? 'en_US' : 'es_MX',
    ...page.seo[lang],
    ogImage: ogImageFor(page, lang),
    canonical: canonicalFor(page.paths[page.canonicalLang ?? lang]),
    alternates: hasAlternates
      ? [
          ...LANGS.map((l) => ({ hreflang: HREFLANG[l], href: canonicalFor(page.paths[l]) })),
          { hreflang: 'x-default', href: canonicalFor(page.paths.es) },
        ]
      : [],
  }
}
