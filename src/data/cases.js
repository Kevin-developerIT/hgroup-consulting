import { CASE_PAGE_IDS, isPublishedCase } from './seo'

/* Case studies (report point 2). Routing + <head> live in seo.js
   (CASE_SEO); a case stays a draft until the team fills `challenge`,
   `solution` and `results` — the page shows what's missing meanwhile.

   - brand:    the H that led the project (its footage fills the hero).
   - project:  id of the matching project in BRAND_PAGES[brand].projects,
               so the brand and service pages can link here once published.
   - services: service page ids (data/services.js) the case belongs to.
   - year:     optional.
   - gallery:  casos/<slug>/NN.jpg (+ NN-thumb.jpg), same format as the
               brand galleries.
   - cover:    gallery photo number shown in the hero (coverFocus = CSS
               object-position when the subject isn't centred).
   - results:  { metrics: [{ value, label }], text } — both optional. */

const galleryFull = import.meta.glob('../assets/casos/*/[0-9][0-9].jpg', { eager: true, import: 'default' })
const galleryThumb = import.meta.glob('../assets/casos/*/[0-9][0-9]-thumb.jpg', { eager: true, import: 'default' })
const gallery = (slug, photos) =>
  photos.map(({ n, ...photo }) => {
    const id = String(n).padStart(2, '0')
    return {
      id: n,
      full: galleryFull[`../assets/casos/${slug}/${id}.jpg`],
      thumb: galleryThumb[`../assets/casos/${slug}/${id}-thumb.jpg`],
      ...photo,
    }
  })

const PENDING = { challenge: null, solution: null, results: null }

export const CASES = {
  'lamborghini-urus-se': {
    brand: 'hook',
    project: 'lamborghini',
    client: 'Lamborghini',
    cover: 1,
    services: ['experiential', 'production'],
    year: null,
    gallery: gallery('lamborghini-urus-se', [
      { n: 1, w: 600, h: 400, alt: { es: 'Presentación del Urus SE en el escenario ante invitados que graban con sus teléfonos', en: 'Urus SE reveal on stage as guests film on their phones' } },
      { n: 2, w: 500, h: 400, alt: { es: 'Invitados frente al escenario del lanzamiento del Urus SE', en: 'Guests in front of the Urus SE launch stage' } },
      { n: 3, w: 600, h: 500, alt: { es: 'Invitado frente a un Lamborghini Huracán azul', en: 'Guest in front of a blue Lamborghini Huracán' } },
      { n: 4, w: 500, h: 500, alt: { es: 'Invitada al volante de un Lamborghini', en: 'Guest behind the wheel of a Lamborghini' } },
      { n: 5, w: 400, h: 400, alt: { es: 'Escudo de Lamborghini iluminado sobre un muro de piedra', en: 'Illuminated Lamborghini shield on a stone wall' } },
    ]),
    copy: {
      es: {
        title: 'Presentación del Lamborghini Urus SE',
        summary: 'Evento de presentación del Lamborghini Urus SE con una experiencia inmersiva, a cargo de HOOK.',
        ...PENDING,
      },
      en: {
        title: 'Lamborghini Urus SE launch',
        summary: 'Launch event for the Lamborghini Urus SE with an immersive experience, by HOOK.',
        ...PENDING,
      },
    },
  },
  'bvlgari-cancun': {
    brand: 'here',
    project: 'bvlgari',
    client: 'BVLGARI',
    cover: 4,
    services: ['influencer'],
    year: null,
    gallery: gallery('bvlgari-cancun', [
      { n: 1, w: 800, h: 400, alt: { es: 'Corte de listón en la apertura de la boutique BVLGARI en La Isla Cancún', en: 'Ribbon-cutting at the opening of the BVLGARI boutique at La Isla Cancún' } },
      { n: 2, w: 800, h: 400, alt: { es: 'Presentación ante invitados dentro de la boutique BVLGARI', en: 'Talk for guests inside the BVLGARI boutique' } },
      { n: 3, w: 500, h: 400, alt: { es: 'Invitados frente al muro BVLGARI Cancún La Isla', en: 'Guests in front of the BVLGARI Cancún La Isla backdrop' } },
      { n: 4, w: 500, h: 500, alt: { es: 'Invitada con joyería BVLGARI a bordo de un yate al atardecer', en: 'Guest wearing BVLGARI jewelry aboard a yacht at sunset' } },
      { n: 5, w: 400, h: 800, alt: { es: 'Invitada en la cena de gala', en: 'Guest at the gala dinner' } },
      { n: 6, w: 400, h: 800, alt: { es: 'Mesa de la cena de gala iluminada con velas', en: 'Candlelit gala dinner table' } },
      { n: 7, w: 400, h: 400, alt: { es: 'Invitada en un yate con la marca BVLGARI', en: 'Guest on a BVLGARI-branded yacht' } },
    ]),
    copy: {
      es: {
        title: 'Apertura de BVLGARI en La Isla Cancún',
        summary: 'Convocatoria de influencers de lujo para la apertura de la boutique BVLGARI en La Isla Cancún, comunicando la elegancia italiana de la marca.',
        ...PENDING,
      },
      en: {
        title: 'BVLGARI opening at La Isla Cancún',
        summary: "Luxury influencer outreach for the opening of the BVLGARI boutique at La Isla Cancún, conveying the brand's Italian elegance.",
        ...PENDING,
      },
    },
  },
  'aston-martin': {
    brand: 'halo',
    project: 'aston',
    client: 'Aston Martin',
    cover: 1,
    services: ['production', 'content'],
    year: null,
    gallery: gallery('aston-martin', [
      { n: 1, w: 800, h: 500, alt: { es: 'Tres Aston Martin frente a una hacienda', en: 'Three Aston Martin cars in front of a hacienda' } },
      { n: 2, w: 500, h: 500, alt: { es: 'Vista trasera de un Aston Martin', en: 'Rear view of an Aston Martin' } },
      { n: 3, w: 400, h: 600, alt: { es: 'Detalle del asiento de piel de un Aston Martin', en: 'Detail of an Aston Martin leather seat' } },
      { n: 4, w: 500, h: 500, alt: { es: 'Detalle de los escapes de un Aston Martin', en: "Detail of an Aston Martin's exhausts" } },
      { n: 5, w: 500, h: 500, alt: { es: 'Interior rojo de un Aston Martin', en: 'Red interior of an Aston Martin' } },
      { n: 6, w: 500, h: 500, alt: { es: 'Emblema de Aston Martin sobre carrocería roja', en: 'Aston Martin badge on red bodywork' } },
    ]),
    copy: {
      es: {
        title: 'Contenido para el lanzamiento de Aston Martin',
        summary: 'Contenido audiovisual exclusivo para el lanzamiento de los modelos de lujo de Aston Martin, capturando la esencia británica y la elegancia atemporal de la marca.',
        ...PENDING,
      },
      en: {
        title: 'Content for the Aston Martin launch',
        summary: "Exclusive video content for the launch of Aston Martin's luxury models, capturing the brand's British essence and timeless elegance.",
        ...PENDING,
      },
    },
  },
  'volvo-ooh': {
    brand: 'hunt',
    project: 'volvo',
    client: 'Volvo',
    cover: 1,
    services: [],
    year: null,
    gallery: gallery('volvo-ooh', [
      { n: 1, w: 1088, h: 1080, alt: { es: 'Espectacular nocturno del Volvo XC60 híbrido en un puente peatonal', en: 'Night billboard for the Volvo XC60 hybrid on a pedestrian bridge' } },
      { n: 2, w: 500, h: 500, alt: { es: 'Espectacular digital de Volvo durante el día', en: 'Volvo digital billboard during the day' } },
      { n: 3, w: 500, h: 500, alt: { es: 'Muro retroiluminado del Volvo XC60 en un paso a desnivel', en: 'Backlit Volvo XC60 wall in an underpass' } },
      { n: 4, w: 400, h: 400, alt: { es: 'Pantalla del Volvo XC60 en el aeropuerto', en: 'Volvo XC60 screen at the airport' } },
    ]),
    copy: {
      es: {
        title: 'Campaña OOH de Volvo',
        summary: 'Campaña integral de medios OOH para Volvo, maximizando el impacto de marca en puntos estratégicos de la ciudad: espectaculares, muros y pantallas en aeropuerto.',
        ...PENDING,
      },
      en: {
        title: 'Volvo OOH campaign',
        summary: 'A full OOH media campaign for Volvo, maximizing brand impact at strategic points across the city: billboards, walls and airport screens.',
        ...PENDING,
      },
    },
  },
}

/* Published case for a brand project, or null — brand and service pages
   link to a case only once it's out of draft. */
export function publishedCaseFor(brandId, projectId) {
  const slug = CASE_PAGE_IDS.find((id) => CASES[id].brand === brandId && CASES[id].project === projectId)
  return slug && isPublishedCase(slug) ? slug : null
}

/* Published cases in order (for "next case"). */
export const publishedCases = () => CASE_PAGE_IDS.filter(isPublishedCase)
