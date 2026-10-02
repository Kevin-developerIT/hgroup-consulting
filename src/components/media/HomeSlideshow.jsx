import { useEffect, useRef, useState } from 'react'
import { HOME_VIDEOS } from './sources'
import './media.css'

/* Auto-advancing video slideshow for HOME — stacks the 8 short clips,
   plays one at a time and crossfades on 'ended'. Pauses when `active`
   turns false. */
function HomeSlideshow({ active }) {
  const [idx, setIdx] = useState(0)
  const videoRefs = useRef([])

  const advance = () => setIdx((i) => (i + 1) % HOME_VIDEOS.length)

  useEffect(() => {
    if (!active) {
      videoRefs.current.forEach((v) => v && v.pause())
      return
    }
    const current = videoRefs.current[idx]
    if (current) {
      try { current.currentTime = 0 } catch { /* seek can throw */ }
      const p = current.play()
      if (p) p.catch(() => {})
    }
    videoRefs.current.forEach((v, i) => {
      if (v && i !== idx) v.pause()
    })
    // Fallback timer in case 'ended' never fires (network hiccup,
    // Safari edge cases). 12s is longer than any of these clips.
    const timer = setTimeout(advance, 12000)
    return () => clearTimeout(timer)
  }, [active, idx])

  const nextIdx = (idx + 1) % HOME_VIDEOS.length

  return (
    <div className="home-slideshow">
      {HOME_VIDEOS.map((src, i) => {
        const preload = i === idx ? 'auto' : i === nextIdx ? 'metadata' : 'none'
        return (
          <video
            key={src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={src}
            muted
            playsInline
            preload={preload}
            onEnded={i === idx ? advance : undefined}
            className={`home-slide ${i === idx ? 'is-active' : ''}`}
          />
        )
      })}
    </div>
  )
}

export default HomeSlideshow
