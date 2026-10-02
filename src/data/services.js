/* Content of each service page (report point 1). Routing + <head> live in
   seo.js (SERVICE_SEO). Every service points to the Hs that deliver it, and
   its copy is drawn from those brands' own pages — nothing here should
   claim more than the brand pages do.

   - heroBrand: whose footage fills the hero (see media/HMedia.jsx).
   - brands:    Hs that deliver the service, in display order.
   - featured:  [brandId, projectId] pairs taken from BRAND_PAGES projects.
   - includes:  what the service covers; `brand` links each item to its H. */
export const SERVICE_PAGES = {
  influencer: {
    heroBrand: 'here',
    brands: ['here', 'holy'],
    featured: [['here', 'bvlgari'], ['here', 'jaecoo'], ['here', 'maja']],
    copy: {
      es: {
        name: 'Influencer marketing',
        headline: 'Creadores, convocatorias y talento para marcas en México',
        intro:
          'En H Group conectamos marcas con creadores de contenido y líderes de opinión a través de dos marcas especializadas: HERE diseña estrategias y convocatorias de creadores para lanzamientos, eventos y campañas, y HOLY representa talento y produce contenido UGC.',
        includes: [
          { brand: 'here', title: 'Estrategia de influencer marketing', text: 'Campañas con creadores de contenido alineados a los objetivos y la audiencia de cada marca.' },
          { brand: 'here', title: 'Convocatorias de creadores', text: 'Creadores y líderes de opinión en lanzamientos, aperturas y eventos de marca.' },
          { brand: 'here', title: 'Brand ambassadors', text: 'Creadores que representan a la marca de forma continua y auténtica.' },
          { brand: 'holy', title: 'Representación de talento', text: 'Construimos el posicionamiento de creadores y gestionamos sus colaboraciones con marcas afines a su audiencia.' },
          { brand: 'holy', title: 'Contenido UGC', text: 'Contenido creado por personas reales para redes sociales y campañas digitales, pensado para el formato de cada plataforma.' },
        ],
        roles: {
          here: 'Influencer marketing, convocatorias de creadores y líderes de opinión, RSVP y brand ambassadors.',
          holy: 'Representación de talento, contenido UGC y convocatorias para encontrar al talento ideal de cada proyecto.',
        },
      },
      en: {
        name: 'Influencer marketing',
        headline: 'Creators, outreach and talent for brands in Mexico',
        intro:
          'H Group connects brands with content creators and opinion leaders through two specialized brands: HERE designs creator strategies and outreach for launches, events and campaigns, and HOLY represents talent and produces UGC.',
        includes: [
          { brand: 'here', title: 'Influencer marketing strategy', text: "Campaigns with content creators aligned with each brand's goals and audience." },
          { brand: 'here', title: 'Influencer outreach', text: 'Creators and opinion leaders at brand launches, openings and events.' },
          { brand: 'here', title: 'Brand ambassadors', text: 'Creators who represent the brand on an ongoing, authentic basis.' },
          { brand: 'holy', title: 'Talent representation', text: "We build creators' positioning and manage their partnerships with brands that fit their audience." },
          { brand: 'holy', title: 'UGC', text: "Content made by real people for social media and digital campaigns, designed for each platform's format." },
        ],
        roles: {
          here: 'Influencer marketing, creator and opinion-leader outreach, RSVP and brand ambassadors.',
          holy: 'Talent representation, UGC and casting calls to find the right talent for every project.',
        },
      },
    },
  },
  pr: {
    heroBrand: 'hype',
    brands: ['hype'],
    featured: [],
    copy: {
      es: {
        name: 'Relaciones públicas',
        headline: 'Relaciones públicas que amplifican la voz de tu marca',
        intro:
          'HYPE, la marca de relaciones públicas de H Group, amplifica la voz de las marcas a través de más de 150 medios de comunicación.',
        includes: [],
        roles: {
          hype: 'Relaciones públicas con alcance en más de 150 medios de comunicación.',
        },
      },
      en: {
        name: 'Public relations',
        headline: "Public relations that amplify your brand's voice",
        intro:
          "HYPE, H Group's public relations brand, amplifies brand voices through 150+ media outlets.",
        includes: [],
        roles: {
          hype: 'Public relations with reach across 150+ media outlets.',
        },
      },
    },
  },
  experiential: {
    heroBrand: 'hook',
    brands: ['hook', 'home', 'hope'],
    featured: [['hook', 'lamborghini'], ['home', 'f1'], ['hook', 'nespresso']],
    copy: {
      es: {
        name: 'Marketing experiencial',
        headline: 'Eventos, lanzamientos, pop-ups y activaciones de marca',
        intro:
          'Llevamos a las marcas a donde está su audiencia con experiencias en vivo: HOOK conceptualiza, produce y ejecuta eventos y lanzamientos; HOME crea pop-ups, stands y test drives en centros comerciales y eventos; y HOPE activa marcas dentro de las universidades.',
        includes: [
          { brand: 'hook', title: 'Eventos y lanzamientos', text: 'Del concepto a la ejecución: venue, escenografía, iluminación, producción técnica, staff y experiencia VIP.' },
          { brand: 'home', title: 'Pop-ups y stands', text: 'Espacios de marca temáticos e interactivos en centros comerciales y eventos.' },
          { brand: 'home', title: 'Test drives', text: 'Experiencias de manejo en centros comerciales que acercan a las personas a la marca.' },
          { brand: 'hope', title: 'Activaciones en universidades', text: 'Experiencias de marca, conferencias y patrocinios dentro de los campus.' },
        ],
        roles: {
          hook: 'Productora de eventos: conceptualización, producción y ejecución de eventos y experiencias.',
          home: 'Pop-ups, stands y test drives en centros comerciales y eventos.',
          hope: 'Medios, activaciones, conferencias y patrocinios dentro de universidades.',
        },
      },
      en: {
        name: 'Experiential marketing',
        headline: 'Events, launches, pop-ups and brand activations',
        intro:
          'We take brands to where their audience is with live experiences: HOOK conceptualizes, produces and runs events and launches; HOME creates pop-ups, stands and test drives in shopping centers and events; and HOPE activates brands on university campuses.',
        includes: [
          { brand: 'hook', title: 'Events & launches', text: 'From concept to execution: venue, set design, lighting, technical production, staff and VIP experience.' },
          { brand: 'home', title: 'Pop-ups & stands', text: 'Themed, interactive brand spaces in shopping centers and events.' },
          { brand: 'home', title: 'Test drives', text: 'Driving experiences in shopping centers that bring people closer to the brand.' },
          { brand: 'hope', title: 'Campus activations', text: 'Brand experiences, talks and sponsorships on university campuses.' },
        ],
        roles: {
          hook: 'Event production: concept, production and execution of events and experiences.',
          home: 'Pop-ups, stands and test drives in shopping centers and events.',
          hope: 'Media, activations, talks and sponsorships at universities.',
        },
      },
    },
  },
  production: {
    heroBrand: 'halo',
    brands: ['halo', 'hook'],
    featured: [['halo', 'aston'], ['halo', 'lamborghini'], ['halo', 'yves']],
    copy: {
      es: {
        name: 'Producción',
        headline: 'Producción audiovisual y de eventos para marcas',
        intro:
          'Producimos piezas y experiencias de principio a fin: HALO cuenta historias a través de la producción y edición audiovisual, y HOOK produce eventos con escenografía, iluminación e instalación técnica.',
        includes: [
          { brand: 'halo', title: 'Branded content', text: 'Piezas audiovisuales que cuentan la historia de la marca.' },
          { brand: 'halo', title: 'Video para redes sociales', text: 'Contenido audiovisual pensado para el formato de cada plataforma.' },
          { brand: 'halo', title: 'Aftermovies', text: 'El resumen audiovisual de eventos y lanzamientos.' },
          { brand: 'halo', title: 'Animación, CGI y FOOH', text: 'Piezas animadas, gráficos 3D y fake out-of-home.' },
          { brand: 'hook', title: 'Producción de eventos', text: 'Diseño espacial, escenografía, iluminación, construcción y montaje, instalación técnica y pruebas finales.' },
        ],
        roles: {
          halo: 'Producción y edición audiovisual: branded content, redes sociales, videoclips, cine y series, animación y CGI.',
          hook: 'Conceptualización, producción y ejecución de eventos y experiencias.',
        },
      },
      en: {
        name: 'Production',
        headline: 'Video and event production for brands',
        intro:
          'We produce pieces and experiences end to end: HALO tells stories through video production and editing, and HOOK produces events with set design, lighting and technical installation.',
        includes: [
          { brand: 'halo', title: 'Branded content', text: "Video pieces that tell the brand's story." },
          { brand: 'halo', title: 'Social media video', text: "Video content designed for each platform's format." },
          { brand: 'halo', title: 'Aftermovies', text: 'The video recap of events and launches.' },
          { brand: 'halo', title: 'Animation, CGI & FOOH', text: 'Animated pieces, 3D graphics and fake out-of-home.' },
          { brand: 'hook', title: 'Event production', text: 'Spatial design, set design, lighting, construction and set-up, technical installation and final testing.' },
        ],
        roles: {
          halo: 'Video production and editing: branded content, social media, music videos, film and series, animation and CGI.',
          hook: 'Concept, production and execution of events and experiences.',
        },
      },
    },
  },
  content: {
    heroBrand: 'holy',
    brands: ['hack', 'holy', 'halo'],
    featured: [['hack', 'dkny'], ['hack', 'onesta'], ['halo', 'yves']],
    copy: {
      es: {
        name: 'Contenido',
        headline: 'Contenido para redes sociales, UGC y branded content',
        intro:
          'Creamos contenido que conecta con cada audiencia: HACK gestiona redes sociales y comunidades, HOLY produce contenido UGC con creadores reales y HALO produce branded content y video para redes.',
        includes: [
          { brand: 'hack', title: 'Gestión de redes sociales', text: 'Gestión integral de redes sociales, creación de contenido y estrategias de engagement.' },
          { brand: 'hack', title: 'Community management', text: 'Comunidades digitales comprometidas con la marca.' },
          { brand: 'holy', title: 'Contenido UGC', text: 'Contenido creado por personas reales, que genera confianza y conversión.' },
          { brand: 'halo', title: 'Branded content y video', text: 'Producción audiovisual para redes sociales y campañas.' },
          { brand: 'halo', title: 'Sesiones fotográficas', text: 'Fotografía para campañas, producto y redes sociales.' },
        ],
        roles: {
          hack: 'Social media, publicidad digital y desarrollo, con foco en conversión y brand awareness.',
          holy: 'Contenido UGC y representación de creadores y talento digital.',
          halo: 'Branded content, video para redes, sesiones fotográficas y animación.',
        },
      },
      en: {
        name: 'Content',
        headline: 'Social media content, UGC and branded content',
        intro:
          'We create content that connects with every audience: HACK manages social media and communities, HOLY produces UGC with real creators and HALO produces branded content and social video.',
        includes: [
          { brand: 'hack', title: 'Social media management', text: 'End-to-end social media management, content creation and engagement strategies.' },
          { brand: 'hack', title: 'Community management', text: 'Digital communities engaged with the brand.' },
          { brand: 'holy', title: 'UGC', text: 'Content made by real people that builds trust and drives conversion.' },
          { brand: 'halo', title: 'Branded content & video', text: 'Video production for social media and campaigns.' },
          { brand: 'halo', title: 'Photo shoots', text: 'Photography for campaigns, products and social media.' },
        ],
        roles: {
          hack: 'Social media, digital advertising and development, focused on conversion and brand awareness.',
          holy: 'UGC and representation of creators and digital talent.',
          halo: 'Branded content, social video, photo shoots and animation.',
        },
      },
    },
  },
  creative: {
    heroBrand: 'hits',
    brands: ['hits', 'hack'],
    featured: [['hits', 'moramora'], ['hits', 'zote'], ['hack', 'odlr']],
    copy: {
      es: {
        name: 'Estrategia creativa',
        headline: 'Branding, diseño y estrategia para marcas',
        intro:
          'Transformamos ideas en soluciones creativas y estratégicas: HITS, el estudio creativo de H Group, desarrolla branding, diseño y propuestas a la medida, y HACK diseña estrategias digitales enfocadas en conversión y brand awareness.',
        includes: [
          { brand: 'hits', title: 'Branding', text: 'Identidades de marca únicas y memorables.' },
          { brand: 'hits', title: 'Diseño', text: 'Soluciones visuales creativas para cada negocio.' },
          { brand: 'hits', title: 'Estrategia', text: 'Planes estratégicos para alcanzar los objetivos de la marca.' },
          { brand: 'hack', title: 'Estrategia digital', text: 'Estrategias en los mejores ecosistemas digitales, enfocadas en conversión y brand awareness.' },
          { brand: 'hack', title: 'Publicidad digital', text: 'Campañas digitales, optimización de ROI y análisis de métricas.' },
        ],
        roles: {
          hits: 'Estudio creativo: branding, diseño y estrategia a la medida para marcas líderes.',
          hack: 'Estrategia digital, social media y publicidad, con foco en conversión.',
        },
      },
      en: {
        name: 'Creative strategy',
        headline: 'Branding, design and strategy for brands',
        intro:
          "We turn ideas into creative, strategic solutions: HITS, H Group's creative studio, develops branding, design and tailor-made proposals, and HACK designs digital strategies focused on conversion and brand awareness.",
        includes: [
          { brand: 'hits', title: 'Branding', text: 'Unique, memorable brand identities.' },
          { brand: 'hits', title: 'Design', text: 'Creative visual solutions for every business.' },
          { brand: 'hits', title: 'Strategy', text: "Strategic plans to reach the brand's goals." },
          { brand: 'hack', title: 'Digital strategy', text: 'Strategies across the best digital ecosystems, focused on conversion and brand awareness.' },
          { brand: 'hack', title: 'Digital advertising', text: 'Digital campaigns, ROI optimization and performance analytics.' },
        ],
        roles: {
          hits: 'Creative studio: tailor-made branding, design and strategy for leading brands.',
          hack: 'Digital strategy, social media and advertising, focused on conversion.',
        },
      },
    },
  },
}

/* Services a given H takes part in, in service order (brand pages link
   back to them). */
export const servicesForBrand = (brandId) =>
  Object.keys(SERVICE_PAGES).filter((id) => SERVICE_PAGES[id].brands.includes(brandId))
