import homeF1 from '../assets/marcas/home/f1.jpg'
import homeKylie from '../assets/marcas/home/kylie.jpg'
import homeNissan from '../assets/marcas/home/nissan.jpg'
import homeVolvo from '../assets/marcas/home/volvo.jpg'
import homeF1Logo from '../assets/marcas/home/f1-logo.png'
import homeKylieLogo from '../assets/marcas/home/kylie-logo.png'
import homeNissanLogo from '../assets/marcas/home/nissan-logo.png'
import homeVolvoLogo from '../assets/marcas/home/volvo-logo.png'
import homeCollabs from '../assets/marcas/home/colaboraciones.png'
import hackDkny from '../assets/marcas/hack/dkny.jpg'
import hackOdlr from '../assets/marcas/hack/oscar-de-la-renta.jpg'
import hackOnesta from '../assets/marcas/hack/onesta.jpg'
import hackDknyLogo from '../assets/marcas/hack/dkny-logo.png'
import hackOdlrLogo from '../assets/marcas/hack/oscar-de-la-renta-logo.png'
import hackOnestaLogo from '../assets/marcas/hack/onesta-logo.png'
import hackPlatforms from '../assets/marcas/hack/plataformas.png'
import haloAston from '../assets/marcas/halo/aston-martin.jpg'
import haloLambo from '../assets/marcas/halo/lamborghini.jpg'
import haloYves from '../assets/marcas/halo/yves-rocher.jpg'
import hitsMoraMora from '../assets/marcas/hits/mora-mora.jpg'
import hitsZote from '../assets/marcas/hits/zote.jpg'
import hitsMoraMoraLogo from '../assets/marcas/hits/mora-mora-logo.png'
import hitsZoteLogo from '../assets/marcas/hits/zote-logo.png'
import hookHonor from '../assets/marcas/hook/honor.jpg'
import hookLambo from '../assets/marcas/hook/lamborghini.jpg'
import hookNespresso from '../assets/marcas/hook/nespresso.jpg'
import hookHonorLogo from '../assets/marcas/hook/honor-logo.png'
import hookLamboLogo from '../assets/marcas/hook/lamborghini-logo.png'
import hookNespressoLogo from '../assets/marcas/hook/nespresso-logo.png'
import hopeUniversities from '../assets/marcas/hope/universidades.png'
import huntVolvo from '../assets/marcas/hunt/volvo.jpg'
import huntZeekr from '../assets/marcas/hunt/zeekr.jpg'
import huntVolvoLogo from '../assets/marcas/hunt/volvo-logo.png'
import { holdingLinks } from './holdings'

// Brand galleries (HOLY, HOPE): <brand>/NN.jpg (1200px, opened in the
// lightbox) + NN-thumb.jpg (700px, shown in the grid). Keyed by number.
const galleryFull = import.meta.glob('../assets/marcas/*/[0-9][0-9].jpg', { eager: true, import: 'default' })
const galleryThumb = import.meta.glob('../assets/marcas/*/[0-9][0-9]-thumb.jpg', { eager: true, import: 'default' })
const galleryPhoto = (brand, n) => {
  const id = String(n).padStart(2, '0')
  return {
    full: galleryFull[`../assets/marcas/${brand}/${id}.jpg`],
    thumb: galleryThumb[`../assets/marcas/${brand}/${id}-thumb.jpg`],
  }
}

// Client logo walls: <brand>/logos/<slug>.png, trimmed and black.
// Width/height feed the equal-area sizing in BrandPage.
const logoFiles = import.meta.glob('../assets/marcas/*/logos/*.png', { eager: true, import: 'default' })
const logoFile = (brand, slug) => logoFiles[`../assets/marcas/${brand}/logos/${slug}.png`]
const logoWall = (brand, logos) =>
  logos.map(([slug, name, width, height]) => ({ name, src: logoFile(brand, slug), width, height }))

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
].map(({ n, ...photo }) => ({ id: n, ...galleryPhoto('holy', n), ...photo }))

/* HOPE: brand media and activations on university campuses. Captions =
   the advertiser; the campus is named in the alt when it's identifiable. */
const HOPE_GALLERY = [
  { n: 1, w: 1200, h: 900, caption: 'Samsung', alt: { es: 'Pantalla de Samsung en la plaza de la Universidad La Salle', en: "Samsung screen at Universidad La Salle's plaza" } },
  { n: 2, w: 1200, h: 674, caption: 'BYD', alt: { es: 'Estudiantes frente a una pantalla de BYD en el campus', en: 'Students walking past a BYD screen on campus' } },
  { n: 3, w: 1200, h: 674, caption: "McDonald's", alt: { es: "Pantalla de McDonald's en la entrada de la UVM", en: "McDonald's screen at a UVM entrance" } },
  { n: 4, w: 1200, h: 675, caption: 'Disney+', alt: { es: 'Activación de Disney+ en un campus universitario', en: 'Disney+ activation on a university campus' } },
  { n: 5, w: 675, h: 1200, caption: 'Disney+', alt: { es: 'Estudiante en la activación de Disney+', en: 'Student at the Disney+ activation' } },
  { n: 6, w: 800, h: 700, caption: 'Cinépolis', alt: { es: 'Conferencia de Cinépolis en un auditorio de la UVM', en: 'Cinépolis talk in a UVM auditorium' } },
  { n: 7, w: 900, h: 1200, caption: 'Samsung', alt: { es: 'Pantalla de Samsung en el campus de la IBERO', en: 'Samsung screen on the IBERO campus' } },
  { n: 8, w: 1200, h: 675, caption: 'Telcel', alt: { es: 'Pantalla de Telcel en la cafetería de un campus', en: 'Telcel screen in a campus cafeteria' } },
  { n: 9, w: 1200, h: 674, caption: 'Spotify', alt: { es: 'Pantallas de Spotify en un campus universitario', en: 'Spotify screens on a university campus' } },
  { n: 10, w: 1200, h: 675, caption: 'Samsung', alt: { es: 'Pantalla de Samsung en los jardines de un campus', en: 'Samsung screen in a campus garden' } },
  { n: 11, w: 400, h: 700, caption: 'OMODA', alt: { es: 'Activación de OMODA con un arco iluminado', en: 'OMODA activation with an illuminated arch' } },
  { n: 12, w: 625, h: 489, caption: 'MINI', alt: { es: 'Pantalla de MINI John Cooper Works en la UAG', en: 'MINI John Cooper Works screen at UAG' } },
].map(({ n, ...photo }) => ({ id: n, ...galleryPhoto('hope', n), ...photo }))

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
    projects: [
      { id: 'dkny', name: 'DKNY', image: hackDkny, logo: hackDknyLogo, width: 500, height: 700 },
      { id: 'odlr', name: 'Oscar de la Renta', image: hackOdlr, logo: hackOdlrLogo, width: 500, height: 700 },
      { id: 'onesta', name: 'Onesta', image: hackOnesta, logo: hackOnestaLogo, width: 400, height: 500 },
    ],
    collaborations: { label: 'platforms', image: hackPlatforms, width: 1598, height: 488 },
    copy: {
      es: {
        tagline: 'Social media · Publicidad · Desarrollo',
        headline: 'Estrategias digitales que amplifican tu marca y generan conversión',
        intro:
          'HACK es la marca de estrategia digital de H Group: amplificamos y gestionamos estrategias en los mejores ecosistemas digitales, con foco en conversión y brand awareness.',
        services: [
          {
            title: 'Redes sociales',
            text: 'Gestión integral de redes sociales, creación de contenido y estrategias de engagement.',
          },
          {
            title: 'Publicidad digital',
            text: 'Campañas publicitarias digitales, optimización de ROI y análisis de métricas.',
          },
          {
            title: 'Desarrollo',
            text: 'Desarrollo de plataformas digitales, aplicaciones y soluciones tecnológicas.',
          },
        ],
        projects: {
          dkny: 'Gestión integral de redes sociales para DKNY, con contenido que refleja el espíritu urbano y moderno de Nueva York.',
          odlr: 'Estrategia digital de lujo para Oscar de la Renta, comunicando la elegancia y sofisticación de la marca.',
          onesta: 'Community management y contenido digital para Onesta, construyendo una comunidad comprometida con la marca.',
        },
        collaborationsAlt:
          'Plataformas con las que trabaja HACK: Netflix, Amazon, HBO, arkeero, Mailchimp, Meta, TikTok, Dropbox, X, Google Ads, YouTube, Samsung Ads, Disney+, Spotify Advertising, Taboola, Outbrain, Adform, Criteo, ViX, Teads, Hisense y Pinterest.',
      },
      en: {
        tagline: 'Social media · Advertising · Development',
        headline: 'Digital strategies that amplify your brand and drive conversion',
        intro:
          "HACK is H Group's digital strategy brand: we amplify and manage strategies across the best digital ecosystems, focused on conversion and brand awareness.",
        services: [
          {
            title: 'Social media',
            text: 'End-to-end social media management, content creation and engagement strategies.',
          },
          {
            title: 'Digital advertising',
            text: 'Digital ad campaigns, ROI optimization and performance analytics.',
          },
          {
            title: 'Development',
            text: 'Development of digital platforms, apps and technology solutions.',
          },
        ],
        projects: {
          dkny: "End-to-end social media management for DKNY, with content that reflects New York's modern, urban spirit.",
          odlr: "Luxury digital strategy for Oscar de la Renta, conveying the brand's elegance and sophistication.",
          onesta: 'Community management and digital content for Onesta, building a community engaged with the brand.',
        },
        collaborationsAlt:
          'Platforms HACK works with: Netflix, Amazon, HBO, arkeero, Mailchimp, Meta, TikTok, Dropbox, X, Google Ads, YouTube, Samsung Ads, Disney+, Spotify Advertising, Taboola, Outbrain, Adform, Criteo, ViX, Teads, Hisense and Pinterest.',
      },
    },
  },
  halo: {
    name: 'HALO',
    externalUrl: holdingLinks.halo,
    projects: [
      { id: 'aston', name: 'Aston Martin', image: haloAston, logo: logoFile('halo', 'aston-martin'), width: 400, height: 700 },
      { id: 'lamborghini', name: 'Lamborghini', image: haloLambo, logo: logoFile('halo', 'lamborghini'), width: 500, height: 700 },
      { id: 'yves', name: 'Yves Rocher', image: haloYves, logo: logoFile('halo', 'yves-rocher'), width: 400, height: 800 },
    ],
    collaborations: {
      logos: logoWall('halo', [
        ['omoda', 'OMODA', 360, 47],
        ['zeekr', 'Zeekr', 360, 88],
        ['lamborghini', 'Lamborghini', 106, 120],
        ['aston-martin', 'Aston Martin', 302, 120],
        ['kavak', 'Kavak', 360, 95],
        ['high-life', 'High Life', 360, 80],
        ['steve-madden', 'Steve Madden', 360, 55],
        ['yves-rocher', 'Yves Rocher', 360, 70],
        ['ford', 'Ford', 333, 120],
        ['mg', 'MG', 120, 120],
        ['don-julio', 'Don Julio', 178, 120],
        ['cybex', 'Cybex', 360, 107],
        ['dodge', 'Dodge', 360, 41],
        ['commando', 'Commando', 360, 106],
      ]),
    },
    copy: {
      es: {
        tagline: 'Video content',
        headline: 'Contamos historias a través de la producción y edición audiovisual',
        intro:
          'HALO es la marca de contenido de H Group: contamos historias a través de la producción y edición audiovisual, del branded content y las redes sociales a las series, la animación y el CGI.',
        // Titles only: HALO's site lists its services without descriptions.
        services: [
          { title: 'Branded content' },
          { title: 'Sesiones fotográficas' },
          { title: 'Contenido para redes sociales' },
          { title: 'Aftermovies' },
          { title: 'Videoclips' },
          { title: 'Cine y series' },
          { title: 'Testimoniales' },
          { title: 'Animación' },
          { title: 'CGI y FOOH' },
        ],
        projects: {
          aston: 'Contenido audiovisual exclusivo para el lanzamiento de los modelos de lujo de Aston Martin, capturando la esencia británica y la elegancia atemporal de la marca.',
          lamborghini: 'Contenido audiovisual de ultra lujo para Lamborghini, capturando la exclusividad, el diseño italiano y la experiencia única de conducir sus superdeportivos.',
          yves: 'Producción de contenido natural y fresco para Yves Rocher, comunicando los valores de belleza botánica y sustentabilidad de la marca francesa.',
        },
      },
      en: {
        tagline: 'Video content',
        headline: 'We tell stories through video production and editing',
        intro:
          "HALO is H Group's content brand: we tell stories through video production and editing — from branded content and social media to series, animation and CGI.",
        services: [
          { title: 'Branded content' },
          { title: 'Photo shoots' },
          { title: 'Social media content' },
          { title: 'Aftermovies' },
          { title: 'Music videos' },
          { title: 'Film & TV series' },
          { title: 'Testimonials' },
          { title: 'Animation' },
          { title: 'CGI & FOOH' },
        ],
        projects: {
          aston: "Exclusive video content for the launch of Aston Martin's luxury models, capturing the brand's British essence and timeless elegance.",
          lamborghini: 'Ultra-luxury video content for Lamborghini, capturing the exclusivity, Italian design and unique experience of driving its supercars.',
          yves: "Fresh, natural content production for Yves Rocher, conveying the French brand's values of botanical beauty and sustainability.",
        },
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
    projects: [
      { id: 'moramora', name: 'Mora Mora', image: hitsMoraMora, logo: hitsMoraMoraLogo, width: 400, height: 700 },
      { id: 'zote', name: 'Zote', image: hitsZote, logo: hitsZoteLogo, width: 400, height: 600 },
    ],
    copy: {
      es: {
        tagline: 'Diseño, creatividad e innovación',
        headline: 'Transformamos ideas en soluciones creativas y estratégicas',
        intro:
          'HITS es el estudio creativo de H Group: transformamos ideas en soluciones creativas y estratégicas, con propuestas a la medida para marcas líderes.',
        services: [
          { title: 'Branding', text: 'Creamos identidades de marca únicas y memorables.' },
          { title: 'Diseño', text: 'Soluciones visuales creativas para tu negocio.' },
          { title: 'Estrategia', text: 'Planes estratégicos para alcanzar tus objetivos.' },
        ],
        projects: {
          moramora: 'Proyecto creativo integral para Mora Mora: una identidad visual única y contenido de alta calidad que refleja la esencia de la marca.',
          zote: 'Campaña visual completa para Zote, capturando la autenticidad y tradición de la marca con un enfoque moderno y fresco.',
        },
      },
      en: {
        tagline: 'Design, creativity and innovation',
        headline: 'We turn ideas into creative, strategic solutions',
        intro:
          "HITS is H Group's creative studio: we turn ideas into creative, strategic solutions, with tailor-made proposals for leading brands.",
        services: [
          { title: 'Branding', text: 'We create unique, memorable brand identities.' },
          { title: 'Design', text: 'Creative visual solutions for your business.' },
          { title: 'Strategy', text: 'Strategic plans to reach your goals.' },
        ],
        projects: {
          moramora: "A full creative project for Mora Mora: a unique visual identity and high-quality content that reflects the brand's essence.",
          zote: "A complete visual campaign for Zote, capturing the brand's authenticity and heritage with a fresh, modern approach.",
        },
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
    gallery: HOPE_GALLERY,
    collaborations: { label: 'universities', image: hopeUniversities, width: 1520, height: 502 },
    copy: {
      es: {
        tagline: 'Universidades',
        headline: 'Medios, activaciones y patrocinios dentro de universidades',
        intro:
          'HOPE es la marca de H Group que conecta marcas con universidades: gestionamos medios y activaciones dentro de los campus para llegar a miles de estudiantes a través de nuestra red de plataformas universitarias.',
        services: [
          {
            title: 'Activaciones',
            text: 'Diseñamos y ejecutamos activaciones de marca que generan impacto real en el campus: experiencias inmersivas que conectan directamente con los estudiantes y generan recordación de marca.',
          },
          {
            title: 'Conferencias',
            text: 'Organizamos eventos y charlas con líderes de la industria para inspirar y educar a la comunidad estudiantil, con contenido relevante para su desarrollo profesional.',
          },
          {
            title: 'Medios',
            text: 'Desarrollamos estrategias de comunicación multicanal adaptadas al ecosistema universitario: pantallas en campus, medios universitarios y digitales, y redes sociales.',
          },
          {
            title: 'Patrocinios',
            text: 'Identificamos y gestionamos oportunidades de patrocinio en eventos y programas universitarios clave, con visibilidad estratégica en el campus.',
          },
        ],
        collaborationsAlt:
          'Universidades de la red de HOPE: UNAM, UAM, IPN, UACM, UPN, BUAP, Universidad Veracruzana, Universidad de Guadalajara, UANL, UDLAP, Anáhuac México, IBERO, La Salle México, Universidad Panamericana, UVM, ITAM, Tecnológico de Monterrey, Centro, Universidad del Claustro de Sor Juana, El Colegio de México, Universidad de la Comunicación, ITESO, Universidad de Monterrey, UAG, UNITEC, Imagen Pública, ULA, CIDE, UCAD, Tecmilenio y UNILA, entre otras.',
      },
      en: {
        tagline: 'Universities',
        headline: 'Media, activations and sponsorships on university campuses',
        intro:
          'HOPE is the H Group brand that connects brands with universities: we manage media and activations on campus to reach thousands of students through our network of university platforms.',
        services: [
          {
            title: 'Activations',
            text: 'We design and run brand activations that make a real impact on campus: immersive experiences that connect directly with students and build brand recall.',
          },
          {
            title: 'Talks & conferences',
            text: 'We organize events and talks with industry leaders to inspire and educate student communities, with content relevant to their professional growth.',
          },
          {
            title: 'Media',
            text: 'Multichannel communication strategies built for the university ecosystem: on-campus screens, university and digital media, and social networks.',
          },
          {
            title: 'Sponsorships',
            text: 'We identify and manage sponsorship opportunities in key university events and programs, with strategic visibility on campus.',
          },
        ],
        collaborationsAlt:
          "Universities in HOPE's network: UNAM, UAM, IPN, UACM, UPN, BUAP, Universidad Veracruzana, Universidad de Guadalajara, UANL, UDLAP, Anáhuac México, IBERO, La Salle México, Universidad Panamericana, UVM, ITAM, Tecnológico de Monterrey, Centro, Universidad del Claustro de Sor Juana, El Colegio de México, Universidad de la Comunicación, ITESO, Universidad de Monterrey, UAG, UNITEC, Imagen Pública, ULA, CIDE, UCAD, Tecmilenio and UNILA, among others.",
      },
    },
  },
  hunt: {
    name: 'HUNT',
    externalUrl: holdingLinks.hunt,
    projects: [
      { id: 'volvo', name: 'Volvo', image: huntVolvo, logo: huntVolvoLogo, width: 1088, height: 1080 },
      { id: 'zeekr', name: 'Zeekr', image: huntZeekr, width: 400, height: 800 },
    ],
    copy: {
      es: {
        tagline: 'Experiencia de medios',
        headline: 'Distribución y optimización de presupuestos publicitarios en medios OOH',
        intro:
          'HUNT es la marca de estrategia de medios de H Group: nos dedicamos a la distribución y optimización de presupuestos publicitarios en medios OOH, con más de 100,000 oportunidades de visibilidad de marca.',
        services: [
          {
            title: 'Estrategia y optimización',
            text: 'Distribuimos y optimizamos el presupuesto publicitario entre los formatos y ubicaciones con mayor impacto para cada campaña.',
          },
          {
            title: 'Ejecución',
            text: 'Coordinamos la implementación de cada campaña en medios, de la contratación de espacios a su exhibición.',
          },
          {
            title: 'Creatividad y diseño',
            text: 'Adaptamos las piezas creativas a cada formato para que el mensaje funcione en cada pantalla, muro o espectacular.',
          },
        ],
        formats: [
          'Espectaculares', 'Muros', 'Pantallas digitales', 'Kioscos', 'Relojes digitales', 'Ecobici',
          'Videomapping', 'Aeropuertos', 'Metro', 'Centros comerciales', 'Clubes de golf', 'OXXO',
          'Supermercados', 'Farmacias', 'Camiones', 'Parabuses y columnas', 'Sitios de taxi', 'Biobox',
          'Casetas multifuncionales', 'Casetas digitales', 'TV', 'Radio', 'Programática', 'Streaming',
        ],
        projects: {
          volvo: 'Campaña integral de medios OOH para Volvo, maximizando el impacto de marca en puntos estratégicos de la ciudad.',
          zeekr: 'Pantallas en aeropuerto, tótems digitales y espectaculares para Zeekr y Lynk & Co.',
        },
      },
      en: {
        tagline: 'Media experience',
        headline: 'Planning and optimizing advertising budgets across OOH media',
        intro:
          "HUNT is H Group's media strategy brand: we plan and optimize advertising budgets across out-of-home media, with 100,000+ brand visibility opportunities.",
        services: [
          {
            title: 'Strategy & optimization',
            text: 'We allocate and optimize the advertising budget across the formats and locations with the most impact for each campaign.',
          },
          {
            title: 'Execution',
            text: "We coordinate each campaign's rollout across media, from booking the spaces to getting them live.",
          },
          {
            title: 'Creative & design',
            text: 'We adapt creative assets to every format so the message works on each screen, wall or billboard.',
          },
        ],
        formats: [
          'Billboards', 'Wallscapes', 'Digital screens', 'Kiosks', 'Digital clocks', 'Ecobici stations',
          'Video mapping', 'Airports', 'Subway', 'Shopping malls', 'Golf clubs', 'OXXO stores',
          'Supermarkets', 'Pharmacies', 'Buses', 'Bus shelters & columns', 'Taxi stands', 'Biobox',
          'Multifunction booths', 'Digital booths', 'TV', 'Radio', 'Programmatic', 'Streaming',
        ],
        projects: {
          volvo: 'A full OOH media campaign for Volvo, maximizing brand impact at strategic points across the city.',
          zeekr: 'Airport screens, digital totems and billboards for Zeekr and Lynk & Co.',
        },
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
    projects: [
      { id: 'honor', name: 'Honor', image: hookHonor, logo: hookHonorLogo, width: 800, height: 700 },
      { id: 'lamborghini', name: 'Lamborghini', image: hookLambo, logo: hookLamboLogo, width: 600, height: 400 },
      { id: 'nespresso', name: 'Nespresso', image: hookNespresso, logo: hookNespressoLogo, width: 400, height: 700 },
    ],
    collaborations: {
      logos: logoWall('hook', [
        ['honor', 'Honor', 360, 68],
        ['lamborghini', 'Lamborghini', 106, 120],
        ['malayerba', 'Malayerba', 107, 120],
        ['yves-rocher', 'Yves Rocher', 360, 70],
        ['omoda', 'OMODA', 360, 47],
        ['aston-martin', 'Aston Martin', 302, 120],
        ['oppo', 'OPPO', 360, 86],
        ['boggi-milano', 'Boggi Milano', 360, 117],
        ['aerie', 'Aerie', 289, 120],
        ['porsche', 'Porsche', 360, 20],
      ]),
    },
    copy: {
      es: {
        tagline: 'Productora de eventos',
        headline: 'Conceptualización, producción y ejecución de eventos y experiencias',
        intro:
          'HOOK es la productora de eventos de H Group: nos dedicamos a la conceptualización, producción y ejecución de eventos y experiencias, porque cada evento cuenta una historia única.',
        method: [
          {
            title: 'Concepto',
            text: 'Transformamos tu visión en una experiencia única: brief creativo, investigación de marca, desarrollo conceptual y storytelling del evento.',
          },
          {
            title: 'Estrategia',
            text: 'Diseñamos cada detalle: selección de venue, timeline del evento, gestión de presupuesto y coordinación de proveedores.',
          },
          {
            title: 'Diseño',
            text: 'Creamos atmósferas que cautivan los sentidos: diseño espacial, escenografía, iluminación ambiental y experiencia sensorial.',
          },
          {
            title: 'Producción',
            text: 'Materializamos cada elemento con precisión: construcción y montaje, instalación técnica, decoración y pruebas finales.',
          },
          {
            title: 'Ejecución',
            text: 'Orquestamos cada instante: coordinación integral, gestión de staff, experiencia VIP y documentación.',
          },
        ],
        projects: {
          honor: 'Experiencia exclusiva de lanzamiento de producto para Honor.',
          lamborghini: 'Evento de presentación del Lamborghini Urus SE con una experiencia inmersiva.',
          nespresso: 'Experiencia inmersiva de café premium para Nespresso.',
        },
      },
      en: {
        tagline: 'Event production',
        headline: 'Concept, production and execution of events and experiences',
        intro:
          "HOOK is H Group's event production company: we conceptualize, produce and execute events and experiences, because every event tells a unique story.",
        method: [
          {
            title: 'Concept',
            text: 'We turn your vision into a unique experience: creative brief, brand research, concept development and event storytelling.',
          },
          {
            title: 'Strategy',
            text: 'We plan every detail: venue selection, event timeline, budget management and supplier coordination.',
          },
          {
            title: 'Design',
            text: 'We create atmospheres that captivate the senses: spatial design, set design, ambient lighting and sensory experience.',
          },
          {
            title: 'Production',
            text: 'We build every element with precision: construction and set-up, technical installation, decor and final testing.',
          },
          {
            title: 'Execution',
            text: 'We orchestrate every moment: end-to-end coordination, staff management, VIP experience and documentation.',
          },
        ],
        projects: {
          honor: 'An exclusive product launch experience for Honor.',
          lamborghini: 'Launch event for the Lamborghini Urus SE with an immersive experience.',
          nespresso: 'An immersive premium coffee experience for Nespresso.',
        },
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
