export const SITE_ORIGIN = 'https://hgroup.consulting'

/* Title + meta description per route. Read by the build-time prerender
   (static <head>) and by usePageMeta (client-side navigation), so both
   always agree. Every route in the sitemap must have an entry here. */
export const ROUTES_SEO = {
  '/': {
    title: 'H Group | Agencia Creativa, PR & Influencer Marketing México',
    description:
      'H Group conecta marcas con audiencias a través de PR, influencer marketing, experiencias, producción y estrategia creativa en México y LATAM.',
  },
  '/work-with-us': {
    title: 'Trabaja con nosotros | H Group',
    description:
      'Conoce H Group: una holding con 11 marcas especializadas en PR, influencer marketing, eventos, producción, contenido y estrategia digital, con presencia en los 32 estados de México.',
  },
  '/join-us': {
    title: 'Únete a H Group | Vacantes',
    description:
      'Forma parte del equipo de H Group. Consulta nuestras vacantes o envíanos tu CV para sumarte a una holding creativa con 11 marcas especializadas.',
  },
  '/100-voices': {
    title: 'Cien Voces | H Group',
    description:
      'Cien Voces es la serie de conferencias y libro de H Group con testimonios de los líderes empresariales y visionarios más influyentes de México.',
  },
  '/contact': {
    title: 'Contacto | H Group',
    description:
      'Cuéntanos sobre tu marca, tus objetivos o tu próxima campaña de PR, influencer marketing, experiencias o producción. Leemos cada mensaje.',
  },
  '/privacy-policy': {
    title: 'Política de Privacidad | H Group',
    description:
      'Cómo MYT Marketing Comunicación (H Group) recopila, utiliza y protege los datos personales obtenidos en su sitio web, formularios y campañas digitales.',
  },
}

export const canonicalFor = (pathname) =>
  SITE_ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/+$/, ''))
