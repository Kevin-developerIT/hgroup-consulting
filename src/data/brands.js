import homeF1 from '../assets/marcas/home/f1.jpg'
import homeKylie from '../assets/marcas/home/kylie.jpg'
import homeNissan from '../assets/marcas/home/nissan.jpg'
import homeVolvo from '../assets/marcas/home/volvo.jpg'
import homeF1Logo from '../assets/marcas/home/f1-logo.png'
import homeKylieLogo from '../assets/marcas/home/kylie-logo.png'
import homeNissanLogo from '../assets/marcas/home/nissan-logo.png'
import homeVolvoLogo from '../assets/marcas/home/volvo-logo.png'
import homeCollabs from '../assets/marcas/home/colaboraciones.png'
import { holdingLinks } from './holdings'

// HOLY gallery: NN.jpg (1200px, opened in the lightbox) + NN-thumb.jpg
// (700px, shown in the grid). Keyed by file number.
const holyFull = import.meta.glob('../assets/marcas/holy/[0-9][0-9].jpg', { eager: true, import: 'default' })
const holyThumb = import.meta.glob('../assets/marcas/holy/*-thumb.jpg', { eager: true, import: 'default' })
const holyPhoto = (n) => {
  const id = String(n).padStart(2, '0')
  return {
    full: holyFull[`../assets/marcas/holy/${id}.jpg`],
    thumb: holyThumb[`../assets/marcas/holy/${id}-thumb.jpg`],
  }
}

/* One entry per photo, in display order. `caption` = brand shown on
   the tile (omitted when no brand is identifiable); alt is bilingual.
   `story: true` = creator's Instagram story screenshot (UGC strip). */
const HOLY_GALLERY = [
  { n: 1, w: 1200, h: 799, caption: "'47", alt: { es: "Apertura de tienda '47 con creadores e invitados", en: "'47 store opening with creators and guests" } },
  { n: 2, w: 900, h: 1200, caption: 'Dreame × El Palacio de Hierro', alt: { es: 'Presentación de Dreame en el festival de belleza de El Palacio de Hierro', en: "Dreame presentation at El Palacio de Hierro's beauty festival" } },
  { n: 3, w: 900, h: 1200, caption: 'Brownie', alt: { es: 'Evento en tienda Brownie', en: 'Event at a Brownie store' } },
  { n: 4, w: 900, h: 1200, caption: 'Lacoste', alt: { es: 'Creador en activación futbolera en tienda Lacoste', en: 'Creator at a football activation in a Lacoste store' } },
  { n: 5, w: 1200, h: 900, caption: 'Tinder', alt: { es: 'Activación de Tinder «Todo vuelve a empezar con un swipe»', en: 'Tinder activation “Everything starts again with a swipe”' } },
  { n: 6, w: 900, h: 1200, caption: 'Ruffles', alt: { es: 'Creador en activación de Ruffles con la bandera de México', en: 'Creator at a Ruffles activation with the Mexican flag' } },
  { n: 7, w: 900, h: 1200, alt: { es: 'Creador en el estadio con la playera de la Selección Mexicana', en: 'Creator at the stadium wearing the Mexico national team jersey' } },
  { n: 8, w: 799, h: 1200, caption: 'BOSS', alt: { es: 'Apertura de tienda BOSS', en: 'BOSS store opening' } },
  { n: 9, w: 552, h: 1200, story: true, caption: 'Dreame', alt: { es: 'Historia de Instagram de @nicolepompa con la secadora Dreame', en: "@nicolepompa's Instagram story featuring the Dreame hair dryer" } },
  { n: 10, w: 552, h: 1200, story: true, caption: "'47 × MLB", alt: { es: "Historia de @paumolinag en la MLB World Tour Mexico City Series, invitada por '47", en: "@paumolinag's story at the MLB World Tour Mexico City Series, invited by '47" } },
  { n: 11, w: 552, h: 1200, story: true, caption: 'Dreame', alt: { es: 'Historia de @nicolepompa con Dreame en el festival de belleza de El Palacio de Hierro', en: "@nicolepompa's story with Dreame at El Palacio de Hierro's beauty festival" } },
  { n: 12, w: 552, h: 1200, story: true, caption: 'NIVEA MEN', alt: { es: 'Historia de @chavvero con el kit NIVEA MEN × Real Madrid', en: "@chavvero's story featuring the NIVEA MEN × Real Madrid kit" } },
  { n: 13, w: 552, h: 1200, story: true, caption: 'Dreame', alt: { es: 'Historia de @nicolepompa en la masterclass de Dreame', en: "@nicolepompa's story at the Dreame masterclass" } },
  { n: 14, w: 800, h: 1200, caption: 'Vans', alt: { es: 'Creadores en evento de Vans', en: 'Creators at a Vans event' } },
  { n: 15, w: 900, h: 1200, alt: { es: 'Creadores en una activación de marca', en: 'Creators at a brand activation' } },
].map(({ n, ...photo }) => ({ id: n, ...holyPhoto(n), ...photo }))

/* Content of each H's page. Copy comes from the brand's own site;
   everything visible is bilingual. Routing + <head> live in seo.js
   (BRAND_SEO) — add the id there too when a new brand page is added.
   `wide: true` = landscape photo shown full width instead of beside
   its text.

   Every section except the hero, intro and CTA is optional: a page shows
   services, projects (or a gallery) and collaborations only once they
   exist here. The brands marked `draft` in seo.js only carry the copy the
   site already had for them (the accordion one-liner) until their own
   folders are added. */
export const BRAND_PAGES = {
  hero: {
    name: 'HERO',
    externalUrl: holdingLinks.hero,
    copy: {
      es: {
        tagline: 'Impacto social',
        headline: 'Impacto social que conecta empresas con más de 144 fundaciones',
        intro:
          'HERO es la fundación de impacto social de H Group: conecta a las empresas con más de 144 fundaciones a través de estrategias creativas.',
      },
      en: {
        tagline: 'Social impact',
        headline: 'Social impact connecting companies with 144+ foundations',
        intro:
          "HERO is H Group's social impact foundation, connecting companies with 144+ foundations through creative strategies.",
      },
    },
  },
  hack: {
    name: 'HACK',
    externalUrl: holdingLinks.hack,
    copy: {
      es: {
        tagline: 'Estrategia digital',
        headline: 'Estrategias digitales enfocadas en conversión y brand awareness',
        intro:
          'HACK es la marca de estrategia digital de H Group: diseña estrategias enfocadas en conversión y brand awareness.',
      },
      en: {
        tagline: 'Digital strategy',
        headline: 'Digital strategies focused on conversion and brand awareness',
        intro:
          "HACK is H Group's digital strategy brand, designing strategies focused on conversion and brand awareness.",
      },
    },
  },
  halo: {
    name: 'HALO',
    externalUrl: holdingLinks.halo,
    copy: {
      es: {
        tagline: 'Contenido y producción',
        headline: 'Contenido creativo y producción de video de alta calidad',
        intro:
          'HALO es la marca de contenido de H Group: crea contenido creativo y producción de video de alta calidad para marcas.',
      },
      en: {
        tagline: 'Content & production',
        headline: 'Creative content and high-quality video production',
        intro:
          "HALO is H Group's content brand, creating creative content and high-quality video production for brands.",
      },
    },
  },
  here: {
    name: 'HERE',
    externalUrl: holdingLinks.here,
    copy: {
      es: {
        tagline: 'Influencer marketing',
        headline: 'Marketing de influencia con una comunidad de más de 730 creadores',
        intro:
          'HERE es la marca de marketing de influencia de H Group: gestiona una comunidad vibrante de más de 730 creadores digitales.',
      },
      en: {
        tagline: 'Influencer marketing',
        headline: 'Influencer marketing with a community of 730+ creators',
        intro:
          "HERE is H Group's influencer marketing brand, managing a vibrant community of 730+ digital creators.",
      },
    },
  },
  hits: {
    name: 'HITS',
    externalUrl: holdingLinks.hits,
    copy: {
      es: {
        tagline: 'Estudio creativo',
        headline: 'Propuestas creativas a la medida para marcas líderes',
        intro:
          'HITS es el estudio creativo de H Group: desarrolla propuestas a la medida para marcas líderes.',
      },
      en: {
        tagline: 'Creative studio',
        headline: 'Tailor-made creative proposals for leading brands',
        intro:
          "HITS is H Group's creative studio, developing tailor-made proposals for leading brands.",
      },
    },
  },
  home: {
    name: 'HOME',
    externalUrl: holdingLinks.home,
    projects: [
      { id: 'f1', name: 'Formula 1', image: homeF1, logo: homeF1Logo, width: 600, height: 700 },
      { id: 'kylie', name: 'Kylie Cosmetics', image: homeKylie, logo: homeKylieLogo, width: 500, height: 700 },
      { id: 'nissan', name: 'Nissan', image: homeNissan, logo: homeNissanLogo, width: 400, height: 700 },
      { id: 'volvo', name: 'Volvo', image: homeVolvo, logo: homeVolvoLogo, width: 1500, height: 700, wide: true },
    ],
    collaborations: { image: homeCollabs, width: 1366, height: 348 },
    copy: {
      es: {
        tagline: 'Pop-Ups & Stands',
        headline: 'Pop-ups, stands y test drives en centros comerciales y eventos',
        intro:
          'Ideamos y ejecutamos experiencias BTL en centros comerciales y eventos: pop-ups, stands y test drives que llevan a las marcas a donde está su audiencia.',
        services: [
          {
            title: 'Pop Ups',
            text: 'Diseñamos y producimos pop-ups y stands de marca en centros comerciales y eventos: espacios temáticos e interactivos como los que hemos creado para Formula 1 y Kylie Cosmetics.',
          },
          {
            title: 'Test Drive',
            text: 'Organizamos test drives experienciales en centros comerciales, con espacios que acercan a las personas a la marca y a la emoción de conducir, como los que hemos realizado para Nissan y Volvo.',
          },
        ],
        projects: {
          f1: 'Experiencias inmersivas de Formula 1 con simuladores de carreras, activaciones de marca y pop-ups temáticos en centros comerciales y eventos.',
          kylie: 'Pop-ups exclusivos y stands interactivos para Kylie Cosmetics, creando experiencias de belleza únicas y personalizadas.',
          nissan: 'Test drives experienciales y stands innovadores para Nissan, conectando con los clientes a través de la tecnología y la emoción de conducir.',
          volvo: 'Espacios premium y test drives exclusivos para Volvo, comunicando seguridad, sustentabilidad y diseño escandinavo.',
        },
        collaborationsAlt:
          'Marcas con las que ha colaborado HOME: Volvo, BOSS, Nissan, Nespresso, Volkswagen, OPPO, Casa Don Ramón, Lancôme, Formula 1, NYX Professional Makeup, Chanel, Mugler, Porsche, GAC Motor, Kylie Cosmetics, Victorinox, Kia, Zeekr, Jaecoo, Maserati y Chirey.',
      },
      en: {
        tagline: 'Pop-Ups & Stands',
        headline: 'Pop-ups, stands and test drives in shopping centers and events',
        intro:
          'We design and produce BTL experiences in shopping centers and events: pop-ups, stands and test drives that take brands to where their audience is.',
        services: [
          {
            title: 'Pop Ups',
            text: 'We design and build branded pop-ups and stands in shopping centers and events: themed, interactive spaces like the ones we created for Formula 1 and Kylie Cosmetics.',
          },
          {
            title: 'Test Drive',
            text: 'We run experiential test drives in shopping centers, with spaces that bring people closer to the brand and the thrill of driving, like the ones we produced for Nissan and Volvo.',
          },
        ],
        projects: {
          f1: 'Immersive Formula 1 experiences with race simulators, brand activations and themed pop-ups in shopping centers and events.',
          kylie: 'Exclusive pop-ups and interactive stands for Kylie Cosmetics, creating unique, personalized beauty experiences.',
          nissan: 'Experiential test drives and innovative stands for Nissan, connecting with customers through technology and the thrill of driving.',
          volvo: 'Premium spaces and exclusive test drives for Volvo, communicating safety, sustainability and Scandinavian design.',
        },
        collaborationsAlt:
          'Brands HOME has worked with: Volvo, BOSS, Nissan, Nespresso, Volkswagen, OPPO, Casa Don Ramón, Lancôme, Formula 1, NYX Professional Makeup, Chanel, Mugler, Porsche, GAC Motor, Kylie Cosmetics, Victorinox, Kia, Zeekr, Jaecoo, Maserati and Chirey.',
      },
    },
  },
  hope: {
    name: 'HOPE',
    externalUrl: holdingLinks.hope,
    copy: {
      es: {
        tagline: 'Innovación educativa',
        headline: 'Innovación educativa que conecta marcas con más de 200 universidades',
        intro:
          'HOPE es la marca de innovación educativa de H Group: conecta a las marcas con más de 200 universidades.',
      },
      en: {
        tagline: 'Educational innovation',
        headline: 'Educational innovation connecting brands with 200+ universities',
        intro:
          "HOPE is H Group's educational innovation brand, connecting brands with 200+ universities.",
      },
    },
  },
  hunt: {
    name: 'HUNT',
    externalUrl: holdingLinks.hunt,
    copy: {
      es: {
        tagline: 'Estrategia de medios',
        headline: 'Estrategia de medios con más de 100,000 oportunidades de visibilidad',
        intro:
          'HUNT es la marca de estrategia de medios de H Group: ofrece más de 100,000 oportunidades de visibilidad de marca.',
      },
      en: {
        tagline: 'Media strategy',
        headline: 'Media strategy with 100,000+ brand visibility opportunities',
        intro:
          "HUNT is H Group's media strategy brand, offering 100,000+ brand visibility opportunities.",
      },
    },
  },
  hype: {
    name: 'HYPE',
    externalUrl: holdingLinks.hype,
    copy: {
      es: {
        tagline: 'Relaciones públicas',
        headline: 'Relaciones públicas que amplifican tu marca en más de 150 medios',
        intro:
          'HYPE es la marca de relaciones públicas de H Group: amplifica la voz de las marcas a través de más de 150 medios de comunicación.',
      },
      en: {
        tagline: 'Public relations',
        headline: 'Public relations that amplify your brand across 150+ media outlets',
        intro:
          "HYPE is H Group's public relations brand, amplifying brand voices through 150+ media outlets.",
      },
    },
  },
  hook: {
    name: 'HOOK',
    externalUrl: holdingLinks.hook,
    copy: {
      es: {
        tagline: 'Eventos y activaciones',
        headline: 'Gestión de eventos y activaciones de marca',
        intro:
          'HOOK es la marca de eventos de H Group: gestiona eventos y activaciones de marca.',
      },
      en: {
        tagline: 'Events & activations',
        headline: 'Event management and brand activations',
        intro:
          "HOOK is H Group's events brand, managing events and brand activations.",
      },
    },
  },
  holy: {
    name: 'HOLY',
    externalUrl: holdingLinks.holy,
    gallery: HOLY_GALLERY,
    copy: {
      es: {
        tagline: 'Talento · UGC · Convocatorias',
        headline: 'Representación de talento, UGC y convocatorias para marcas',
        intro:
          'Holy es la vertical de H Group especializada en representación de talento, UGC y convocatorias, conectando marcas con creadores mediante estrategias, campañas y proyectos que generan contenido auténtico, relevancia cultural y resultados de negocio.',
        services: [
          {
            title: 'Representación de talento',
            text: 'Representamos a creadores y talento digital: construimos su posicionamiento, gestionamos sus colaboraciones y los conectamos con marcas afines a su audiencia.',
          },
          {
            title: 'UGC',
            text: 'Producimos contenido creado por personas reales para redes sociales y campañas digitales: piezas auténticas, pensadas para el formato de cada plataforma, que generan confianza y conversión.',
          },
          {
            title: 'Convocatorias',
            text: 'Diseñamos y operamos convocatorias para encontrar al talento ideal de cada proyecto: definimos el perfil, lanzamos la convocatoria, seleccionamos a los candidatos y coordinamos su participación con la marca.',
          },
        ],
      },
      en: {
        tagline: 'Talent · UGC · Casting calls',
        headline: 'Talent representation, UGC and casting calls for brands',
        intro:
          "Holy is H Group's vertical specialized in talent representation, UGC and casting calls, connecting brands with creators through strategies, campaigns and projects that deliver authentic content, cultural relevance and business results.",
        services: [
          {
            title: 'Talent representation',
            text: 'We represent creators and digital talent: we build their positioning, manage their brand partnerships and connect them with brands that fit their audience.',
          },
          {
            title: 'UGC',
            text: "We produce content created by real people for social media and digital campaigns: authentic pieces designed for each platform's format that build trust and drive conversion.",
          },
          {
            title: 'Casting calls',
            text: 'We design and run casting calls to find the right talent for each project: we define the profile, launch the call, shortlist candidates and coordinate their participation with the brand.',
          },
        ],
      },
    },
  },
}
