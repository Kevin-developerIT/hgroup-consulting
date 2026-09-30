import { useLanguage } from '../contexts/useLanguage'
import './BrandsMarquee.css'

/* Vite `import.meta.glob` bundles all 22 brand logos as eager URLs.
   Sorted so the marquee order is deterministic (brand01 → brand22). */
const brandModules = import.meta.glob('../assets/brands/*.png', {
  eager: true,
  import: 'default',
})

/* Client name per logo file — used as alt text so search engines and
   screen readers know which brands these are. Add a line when a new
   brandNN.png is dropped in the folder. */
const BRAND_NAMES = {
  brand01: "'47",
  brand02: 'Vambe',
  brand03: 'Bajaj',
  brand04: 'Grupo Bosque Real',
  brand05: 'Vuori',
  brand06: 'Carlo Corinto',
  brand07: 'Le Pain Quotidien',
  brand08: 'MGA Entertainment',
  brand09: 'Philip Morris International',
  brand10: 'MAJA',
  brand11: 'Toyota',
  brand12: 'American Airlines',
  brand13: 'Invex',
  brand14: 'Mastercard',
  brand15: 'Oracle',
  brand16: 'The Macallan',
  brand17: 'Riunite',
  brand18: 'Zeekr',
  brand19: 'Tinder',
  brand20: 'Duolingo',
  brand21: 'Lamborghini',
  brand22: "L'Oréal",
}

const BRANDS = Object.entries(brandModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const key = path.match(/brand\d+/)?.[0]
    return { src, alt: BRAND_NAMES[key] ?? '' }
  })

/* Duplicate the list once so `translateX(-50%)` produces a seamless
   loop — as the first half scrolls off, the second half is already
   in place, no visible seam. */
function BrandsMarquee() {
  const { t } = useLanguage()

  return (
    <section className="brands-marquee" aria-labelledby="brands-marquee-title">
      <h2 id="brands-marquee-title" className="sr-only">{t('home.clientsHeading')}</h2>
      <div className="brands-track">
        {[...BRANDS, ...BRANDS].map((brand, i) => (
          <div className="brands-slot" key={i} aria-hidden={i >= BRANDS.length}>
            <img
              src={brand.src}
              alt={i < BRANDS.length ? brand.alt : ''}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default BrandsMarquee
