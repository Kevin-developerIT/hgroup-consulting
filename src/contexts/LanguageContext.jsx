import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      workWithUs: 'WORK WITH US',
      joinUs: 'JOIN US',
      followUs: 'FOLLOW US',
      hundredVoices: 'CIEN VOCES',
      viewWorkBy: 'VIEW WORK BY',
      allWork: 'All Work',
      filtersActive: 'Filters Active',
      clearAll: 'Clear All',
      byH: 'By H',
      byCompany: 'By Company',
      noResults: 'No projects found',
      tryAdjusting: 'Try adjusting your filters or',
      clearFilters: 'clear all filters'
    },
    presentation: {
      title: '',
      tagline: ''
    },
    workWithUs: {
      text1: 'We are HGROUP, a holding company with 11 specialized brands in different market niches. With a young and passionate vision, we connect the impossible through innovative strategies and measurable results.',
      text2: 'We bring together years of strategic experience with next-generation talent to deliver creative solutions that transform brands. From social impact with HERO to digital strategies with HACK, each of our divisions works in synergy to maximize your brand\'s impact.',
      text3: 'Our portfolio spans collaborations with Sony Music, Xiaomi, Estée Lauder, ALSEA, Zurich, Volkswagen, Maserati, Rolls-Royce, and many more. We operate in 32 states across Mexico and have presence in major cities in the USA, Canada, and Latin America.',
      text4: 'Every day, with passion and dedication, we continue growing, innovating, and connecting brands with extraordinary experiences. This is HGROUP!',
      contact: 'CONTACT',
      ourHs: 'OUR H\'S',
      viewMore: 'VIEW MORE',
      whatsapp: 'CHAT ON WHATSAPP'
    },
    joinUs: {
      text1: 'We are a team of young dreamers with the passion to make the impossible a reality. At HGROUP, we believe there\'s more than one way to achieve success, and we cultivate diverse perspectives that drive innovation.',
      text2: 'Join our team and be part of the transformation. Click here to see our current opportunities, or send your CV to carla.rosales@hgroup.consulting',
      allLocations: 'ALL LOCATIONS',
      mexicoCity: 'MEXICO CITY',
      applyLinkedin: 'APPLY ON LINKEDIN',
      openings: [
        {
          title: 'NO POSITIONS AVAILABLE',
          location: '',
          description: `Soon...`,
          applyLink: 'https://www.linkedin.com/company/herohgroup'
        }
      ]
    },
    expertise: [
      { name: 'HERO', description: 'Social impact foundation connecting companies with 144+ foundations through creative strategies' },
      { name: 'HYPE', description: 'Public relations amplifying brand voices through 150+ media outlets' },
      { name: 'HERE', description: 'Influencer marketing managing a vibrant community of 730+ digital creators' },
      { name: 'HUGE', description: 'Property management and retail design with 300+ properties portfolio' },
      { name: 'HUNT', description: 'Media strategy offering 100,000+ brand visibility opportunities' },
      { name: 'HOME', description: 'Automotive brand positioning across 170+ shopping centers' },
      { name: 'HOPE', description: 'Educational innovation connecting brands with 200+ universities' },
      { name: 'HALO', description: 'Creative content and high-quality video production' },
      { name: 'HACK', description: 'Digital strategies focused on conversion and brand awareness' },
      { name: 'HITS', description: 'Creative studio developing custom proposals for leading brands' },
      { name: 'HOOK', description: 'Event management and activations.' }
    ],
    hundredVoices: {
  subtitle: 'The definitive collection of insights from Mexico\'s most influential business leaders and visionaries.',
  quote: '"Each voice in this collection represents a unique journey of transformation, innovation, and leadership that shapes the future of Mexican business."',
  description1: '100 Voces is an exclusive corporate conference series by HGROUP where we interview and gather testimonies from Mexico\'s most distinguished entrepreneurs, innovators, and thought leaders. This carefully curated initiative captures the essence of Mexican leadership and entrepreneurial spirit.',
  description2: 'Through intimate conversations and profound reflections, we provide unprecedented access to the minds that are shaping Mexico\'s economic and cultural landscape. From established industry titans to disruptive innovators, 100 Voces presents a comprehensive portrait of contemporary Mexican excellence.',
  editionsTitle: 'EDITIONS',
  editions: [
    {
      title: 'Multicategory Edition',
      description: 'A diverse collection featuring chefs, entrepreneurs, athletes, and cultural icons.',
      featured: 'Checo Pérez • Alejandro Fernández • Rafa Márquez'
    },
    {
      title: 'Business Edition',
      description: 'Exclusive interviews with Mexico\'s most influential business leaders.',
      featured: 'Carlos Slim • Agustín Coppel • Daniel Servitje'
    }
  ],
  bookDetails: 'BOOK DETAILS',
  format: 'Format',
  formatValue: 'Hardcover Edition',
  pages: 'Pages',
  language: 'Language',
  languageValue: 'Spanish',
  inquiries: 'For inquiries and information',
  requestInfo: 'Request Information'
}

  },
  es: {
    nav: {
      workWithUs: 'TRABAJA CON NOSOTROS',
      joinUs: 'ÚNETE',
      hundredVoices: 'CIEN VOCES',
      followUs: 'SÍGUENOS',
      viewWorkBy: 'VER TRABAJO POR',
      allWork: 'Todo el trabajo',
      filtersActive: 'Filtros activos',
      clearAll: 'Limpiar todo',
      byH: 'Por H',
      byCompany: 'Por Empresa',
      noResults: 'No se encontraron proyectos',
      tryAdjusting: 'Intenta ajustar tus filtros o',
      clearFilters: 'limpiar todos los filtros'
    },
    presentation: {
      title: '',
      tagline: ''
    },
    workWithUs: {
      text1: 'Somos HGROUP, una holding con 11 marcas especializadas en distintos nichos de mercado. Con una visión joven y apasionada, conectamos lo imposible a través de estrategias innovadoras y resultados medibles.',
      text2: 'Reunimos años de experiencia estratégica con talento de próxima generación para entregar soluciones creativas que transforman marcas. Desde el impacto social con HERO hasta las estrategias digitales con HACK, cada una de nuestras divisiones trabaja en sinergia para maximizar el impacto de tu marca.',
      text3: 'Nuestro portafolio incluye colaboraciones con Sony Music, Xiaomi, Estée Lauder, ALSEA, Zurich, Volkswagen, Maserati, Rolls-Royce, y muchos más. Operamos en 32 estados de la República Mexicana y tenemos presencia en las principales ciudades de Estados Unidos, Canadá y Latinoamérica.',
      text4: 'Cada día, con pasión y dedicación, seguimos creciendo, innovando y conectando marcas con experiencias extraordinarias. ¡Esto es HGROUP!',
      contact: 'CONTACTO',
      ourHs: 'NUESTRAS H\'S',
      viewMore: 'VER MÁS',
      whatsapp: 'CHAT EN WHATSAPP'
    },
    joinUs: {
      text1: 'Somos un equipo de jóvenes soñadores con la pasión de hacer realidad lo imposible. En HGROUP creemos que hay más de una forma de lograr el éxito, y cultivamos perspectivas diversas que impulsan la innovación.',
      text2: 'Únete a nuestro equipo y sé parte de la transformación. Haz clic aquí para ver nuestras oportunidades actuales, o envía tu CV a careers@hgroup.com',
      allLocations: 'TODAS LAS UBICACIONES',
      mexicoCity: 'CDMX',
      applyLinkedin: 'APLICAR EN LINKEDIN',
      openings: [
        {
          title: 'NO HAY VACANTES DISPONIBLES',
          location: '',
          description: `Pronto...`,
          applyLink: 'https://www.linkedin.com/company/herohgroup'
        }
      ]
    },
    expertise: [
      { name: 'HERO', description: 'Fundación de impacto social conectando empresas con 144+ fundaciones a través de estrategias creativas' },
      { name: 'HYPE', description: 'Relaciones públicas amplificando voces de marca a través de 150+ medios de comunicación' },
      { name: 'HERE', description: 'Marketing de influencia gestionando una comunidad vibrante de 730+ creadores digitales' },
      { name: 'HUGE', description: 'Gestión inmobiliaria y diseño retail con portafolio de 300+ propiedades' },
      { name: 'HUNT', description: 'Estrategia de medios ofreciendo 100,000+ oportunidades de visibilidad de marca' },
      { name: 'HOME', description: 'Posicionamiento de marcas automotrices en 170+ centros comerciales' },
      { name: 'HOPE', description: 'Innovación educativa conectando marcas con 200+ universidades' },
      { name: 'HALO', description: 'Contenido creativo y producción de video de alta calidad' },
      { name: 'HACK', description: 'Estrategias digitales enfocadas en conversión y brand awareness' },
      { name: 'HITS', description: 'Estudio creativo desarrollando propuestas a la medida para marcas líderes' },
       { name: 'HOOK', description: 'Gestión de eventos y activaciones.' }
    ],
    hundredVoices: {
  subtitle: 'La colección definitiva de perspectivas de los líderes empresariales y visionarios más influyentes de México.',
  quote: '"Cada voz en esta colección representa un viaje único de transformación, innovación y liderazgo que da forma al futuro de los negocios mexicanos."',
  description1: '100 Voces es una serie exclusiva de conferencias corporativas de HGROUP donde entrevistamos y recopilamos testimonios de los empresarios, innovadores y líderes de opinión más distinguidos de México. Esta iniciativa cuidadosamente curada captura la esencia del liderazgo y espíritu empresarial mexicano.',
  description2: 'A través de conversaciones íntimas y reflexiones profundas, brindamos acceso sin precedentes a las mentes que están dando forma al panorama económico y cultural de México. Desde titanes establecidos de la industria hasta innovadores disruptivos, 100 Voces presenta un retrato integral de la excelencia mexicana contemporánea.',
  editionsTitle: 'EDICIONES',
  editions: [
    {
      title: 'Edición Multicategoría',
      description: 'Una colección diversa con chefs, empresarios, deportistas e íconos culturales.',
      featured: 'Checo Pérez • Alejandro Fernández • Rafa Márquez'
    },
    {
      title: 'Edición Empresarial',
      description: 'Entrevistas exclusivas con los líderes empresariales más influyentes de México.',
      featured: 'Carlos Slim • Agustín Coppel • Daniel Servitje'
    }
  ],
  bookDetails: 'DETALLES DEL LIBRO',
  format: 'Formato',
  formatValue: 'Edición de Tapa Dura',
  pages: 'Páginas',
  language: 'Idioma',
  languageValue: 'Español',
  inquiries: 'Para consultas e información',
  requestInfo: 'Solicitar Información'
}
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};