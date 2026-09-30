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
    draft: true,
    es: {
      title: 'HACK | Estrategia digital y conversión — H Group',
      description:
        'HACK, marca de H Group, crea estrategias digitales enfocadas en conversión y brand awareness para marcas en México.',
    },
    en: {
      title: 'HACK | Digital strategy & conversion — H Group',
      description:
        'HACK, an H Group brand, builds digital strategies focused on conversion and brand awareness for brands in Mexico.',
    },
  },
  halo: {
    draft: true,
    es: {
      title: 'HALO | Contenido creativo y producción de video — H Group',
      description:
        'HALO, marca de H Group, crea contenido creativo y producción de video de alta calidad para marcas en México.',
    },
    en: {
      title: 'HALO | Creative content & video production — H Group',
      description:
        'HALO, an H Group brand, creates creative content and high-quality video production for brands in Mexico.',
    },
  },
  here: {
    draft: true,
    es: {
      title: 'HERE | Influencer marketing con 730+ creadores — H Group',
      description:
        'HERE, marca de H Group, hace marketing de influencia con una comunidad de más de 730 creadores digitales en México.',
    },
    en: {
      title: 'HERE | Influencer marketing with 730+ creators — H Group',
      description:
        'HERE, an H Group brand, runs influencer marketing with a community of 730+ digital creators in Mexico.',
    },
  },
  hits: {
    draft: true,
    es: {
      title: 'HITS | Estudio creativo para marcas — H Group',
      description:
        'HITS, estudio creativo de H Group, desarrolla propuestas creativas a la medida para marcas líderes.',
    },
    en: {
      title: 'HITS | Creative studio for brands — H Group',
      description:
        "HITS, H Group's creative studio, develops tailor-made creative proposals for leading brands.",
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
    draft: true,
    es: {
      title: 'HOPE | Innovación educativa con 200+ universidades — H Group',
      description:
        'HOPE, marca de H Group, impulsa la innovación educativa conectando marcas con más de 200 universidades en México.',
    },
    en: {
      title: 'HOPE | Educational innovation with 200+ universities — H Group',
      description:
        'HOPE, an H Group brand, drives educational innovation by connecting brands with 200+ universities in Mexico.',
    },
  },
  hunt: {
    draft: true,
    es: {
      title: 'HUNT | Estrategia de medios — H Group',
      description:
        'HUNT, marca de H Group, diseña estrategias de medios con más de 100,000 oportunidades de visibilidad de marca.',
    },
    en: {
      title: 'HUNT | Media strategy — H Group',
      description:
        'HUNT, an H Group brand, designs media strategies with 100,000+ brand visibility opportunities.',
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
    draft: true,
    es: {
      title: 'HOOK | Eventos y activaciones de marca — H Group',
      description:
        'HOOK, marca de H Group, gestiona eventos y activaciones de marca en México.',
    },
    en: {
      title: 'HOOK | Events & brand activations — H Group',
      description:
        'HOOK, an H Group brand, manages events and brand activations in Mexico.',
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

export const PAGES = [
  ...PAGES_BASE,
  ...BRAND_PAGE_IDS.map((id) => ({
    id: `brand:${id}`,
    brandId: id,
    paths: { es: `/marcas/${id}`, en: `/en/brands/${id}` },
    module: 'src/components/BrandPage.jsx',
    og: id,
    draft: Boolean(BRAND_SEO[id].draft),
    seo: BRAND_SEO[id],
  })),
]

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
