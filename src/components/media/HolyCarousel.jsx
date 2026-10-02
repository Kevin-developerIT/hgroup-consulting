import { useEffect, useState } from 'react'
import { HOLY_IMAGES } from './sources'
import './media.css'

/* Auto-advancing crossfade of HOLY's photos. Only ticks while `active`. */
function HolyCarousel({ active }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % HOLY_IMAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [active])

  return (
    <div className="holy-carousel">
      {HOLY_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`holy-slide ${i === idx ? 'is-active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
        />
      ))}
    </div>
  )
}

export default HolyCarousel
