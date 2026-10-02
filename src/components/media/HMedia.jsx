import HomeSlideshow from './HomeSlideshow'
import HolyCarousel from './HolyCarousel'
import { H_VIDEOS } from './sources'

/* Background footage for one H, used full-bleed in the brand page hero.
   Fills its positioned parent (the accordion uses the pieces directly). */
function HMedia({ id, className = '' }) {
  if (id === 'home') return <HomeSlideshow active />
  if (id === 'holy') return <HolyCarousel active />
  const src = H_VIDEOS[id]
  if (!src) return null
  return (
    <video
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  )
}

export default HMedia
