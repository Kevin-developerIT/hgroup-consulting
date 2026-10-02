/* Official corporate data (report point 10). The visible footer, the
   contact page and the JSON-LD all read from here, so name, address,
   phone and profiles always match each other and the external profiles. */
export const COMPANY = {
  name: 'H Group',
  legalName: 'MYT Marketing Comunicación',
  address: {
    street: 'Blvd. Palmas Hills 1',
    neighborhood: 'Villa de las Palmas',
    postalCode: '52787',
    city: 'Naucalpan de Juárez',
    region: 'Estado de México',
    regionShort: 'Méx.',
    country: 'MX',
  },
  // Centtral Interlomas (from the Google Maps link below).
  geo: { latitude: 19.3927248, longitude: -99.2808515 },
  mapUrl: 'https://maps.app.goo.gl/9RXXi3Q8HD5reiDy6',
  // Mexico dropped the mobile "1" (+52 1 …) in 2019; +52 55 … dials the
  // same line from anywhere.
  phone: { display: '+52 55 2523 5285', e164: '+525525235285' },
  social: {
    instagram: 'https://www.instagram.com/hgroupp_/',
    // Same page as linkedin.com/company/65892926; the slug URL opens
    // without a LinkedIn login.
    linkedin: 'https://www.linkedin.com/company/herohgroup/',
  },
}

const { street, neighborhood, postalCode, city, regionShort } = COMPANY.address
export const ADDRESS_LINE = `${street}, ${neighborhood}, ${postalCode} ${city}, ${regionShort}`
