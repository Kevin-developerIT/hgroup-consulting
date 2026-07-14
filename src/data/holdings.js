/* Single source of truth for each H (id → external site).
   Consumed by App.jsx, HsAccordion.jsx, WorkWithUs.jsx. */
export const holdingLinks = {
  hero: 'https://heromexico.com/',
  halo: 'https://halocontent.mx/',
  here: 'https://hereconvocatorias.com/',
  hits: 'https://hitscreativity.com/',
  hook: 'https://hookproductions.mx/',
  hunt: 'https://huntmedia.mx/',
  hype: 'https://hypeagency.mx/',
  hack: 'https://hackdigital.mx/',
  home: 'https://homemalls.mx/',
  hope: 'https://hopeadvertising.mx/',
  huge: 'https://hugeproperties.mx/',
}

export const getHoldingLink = (id) => holdingLinks[String(id).toLowerCase()] || null
