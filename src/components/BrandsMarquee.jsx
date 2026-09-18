import './BrandsMarquee.css'

/* Vite `import.meta.glob` bundles all 22 brand logos as eager URLs.
   Sorted so the marquee order is deterministic (brand01 → brand22). */
const brandModules = import.meta.glob('../assets/brands/*.png', {
  eager: true,
  import: 'default',
})

const BRANDS = Object.entries(brandModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: path.match(/brand(\d+)/)?.[0] ?? 'brand',
  }))

/* Duplicate the list once so `translateX(-50%)` produces a seamless
   loop — as the first half scrolls off, the second half is already
   in place, no visible seam. */
function BrandsMarquee() {
  return (
    <section className="brands-marquee" aria-label="Marcas asociadas">
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
