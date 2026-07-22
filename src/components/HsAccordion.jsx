import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { holdingsLogos } from '../assets/logos'
import { holdingLinks } from '../data/holdings'
import { useLanguage } from '../contexts/useLanguage'

/* Reuse the same H videos already imported by HSections — Vite
   deduplicates the chunks so this doesn't add bundle weight. */
import heroVideo from '../assets/mp4/herovideo.mp4'
import hackVideo from '../assets/mp4/videohalo.mp4'
import haloVideo from '../assets/mp4/halovideo1.webm'
import hereVideo from '../assets/mp4/herevideo.mp4'
import hitsVideo from '../assets/mp4/hitsvideo.mp4'
import homeVideo from '../assets/mp4/homevideo.mp4'
import hopeVideo from '../assets/mp4/hopevideo.mp4'
import huntVideo from '../assets/mp4/huntvideo.mp4'
import hypeVideo from '../assets/mp4/HypeVideo.mp4'
import hookVideo from '../assets/mp4/videoshook.mp4'

import holy1 from '../assets/holy/holy1.jpeg'
import holy2 from '../assets/holy/holy2.jpeg'
import holy3 from '../assets/holy/holy3.jpeg'
import holy4 from '../assets/holy/holy4.jpeg'
import holy5 from '../assets/holy/holy5.jpeg'
import holy6 from '../assets/holy/holy6.jpeg'
import holy7 from '../assets/holy/holy7.jpeg'

import home1 from '../assets/home/home1.mp4'
import home2 from '../assets/home/home2.mp4'
import home3 from '../assets/home/home3.mp4'
import home4 from '../assets/home/home4.mp4'
import home5 from '../assets/home/home5.mp4'
import home6 from '../assets/home/home6.mp4'
import home7 from '../assets/home/home7.mp4'
import home8 from '../assets/home/home8.mp4'

import './HsAccordion.css'

gsap.registerPlugin(ScrollTrigger)

const HOLY_IMAGES = [holy1, holy2, holy3, holy4, holy5, holy6, holy7]
const HOME_VIDEOS = [home1, home2, home3, home4, home5, home6, home7, home8]

/* Auto-advancing video slideshow for the HOME H — stacks the 8
   short clips, plays one at a time, crossfades on 'ended'. Same
   mounting rules as the other layers (rendered only when active
   or adjacent). */
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

/* Auto-advancing crossfade for the HOLY H. Mounts only when
   `active` is true (parent stops rendering when this layer is
   more than one slot away from the active H). */
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

/* ==============================================================
   HsAccordion — unified menu + H showcase
   --------------------------------------------------------------
   Replaces the old separate "menu" + "10 sections with galleries"
   into a SINGLE interactive showcase. No more photos.

   • One full-viewport section, video background per H
   • Menu of 10 Hs always visible on the left
   • Hovering an H = it becomes the active one (video + description)
   • Clicking an H = same (touch-friendly fallback)
   • The active H also persists as the "selected" — when mouse
     leaves the menu, the selected H is what remains shown
   • Description + "View Site" CTA appear inline NEXT TO the
     active H's name (other Hs collapse cleanly)
   • DIRECTIONAL conveyor: when active moves DOWN the list, the
     video slides UP from below; moving UP the list, the video
     slides DOWN from above. Direction follows the user's gesture.
   ============================================================== */

const H_VIDEOS = {
  hero: heroVideo,
  hack: hackVideo,
  halo: haloVideo,
  here: hereVideo,
  hits: hitsVideo,
  home: homeVideo,
  hope: hopeVideo,
  hunt: huntVideo,
  hype: hypeVideo,
  hook: hookVideo,
}

/* H's that render a custom media component (not a single <video>).
   Their child owns play/pause via the `active` prop, so the parent
   effects below MUST NOT touch the <video>s inside those layers. */
const CUSTOM_PLAYER_IDS = new Set(['home', 'holy'])

function HsAccordion() {
  const { t } = useLanguage()

  /* i18n → name → description map, updates with language toggle */
  const descByName = useMemo(() => {
    const expertise = t('expertise') || []
    const map = {}
    expertise.forEach((e) => {
      map[String(e.name).toUpperCase()] = e.description
    })
    return map
  }, [t])

  /* selected = persistent (changes on click)
     hovered  = transient (changes on mouseenter)
     active   = what's shown right now = hovered ?? selected */
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex
  const prevActiveRef = useRef(0)

  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const videoLayersRef = useRef([])
  const overlayRef = useRef(null)

  /* Initial state: HERO visible, all others parked below.
     HERO video starts playing immediately. */
  useEffect(() => {
    videoLayersRef.current.forEach((layer, i) => {
      if (!layer) return
      if (i === 0) {
        gsap.set(layer, { yPercent: 0, opacity: 1 })
        const v = layer.querySelector('video')
        if (v) {
          const p = v.play()
          if (p) p.catch(() => {})
        }
      } else {
        gsap.set(layer, { yPercent: 100, opacity: 1 })
      }
    })
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 1 })
    }
  }, [])

  /* DIRECTIONAL conveyor transition when activeIndex changes.
     • Moving DOWN the list (active goes from i to j, j > i):
         new layer slides UP from below   (yPercent 100 → 0)
         old layer slides UP off the top  (yPercent 0 → -100)
     • Moving UP the list (j < i):
         new layer slides DOWN from above (yPercent -100 → 0)
         old layer slides DOWN off bottom (yPercent 0 → 100)
     Direction mirrors the user's gesture → reads as one
     continuous motion in their chosen direction. */
  useEffect(() => {
    const prev = prevActiveRef.current
    const next = activeIndex
    if (prev === next) return

    const goingDown = next > prev
    const newFromY = goingDown ? 100 : -100
    const oldToY = goingDown ? -100 : 100

    const DURATION = 1.2
    const EASE = 'power3.inOut'

    videoLayersRef.current.forEach((layer, i) => {
      if (!layer) return
      const holdingId = holdingsLogos[i]?.id
      const isCustom = CUSTOM_PLAYER_IDS.has(holdingId)
      const v = isCustom ? null : layer.querySelector('video')

      if (i === next) {
        // New active: slide in from below or above
        gsap.fromTo(
          layer,
          { yPercent: newFromY },
          {
            yPercent: 0,
            duration: DURATION,
            ease: EASE,
            overwrite: 'auto',
          }
        )
        if (v) {
          v.currentTime = 0
          const p = v.play()
          if (p) p.catch(() => {})
        }
      } else if (i === prev) {
        // Old active: slide out in the same direction
        gsap.to(layer, {
          yPercent: oldToY,
          duration: DURATION,
          ease: EASE,
          overwrite: 'auto',
        })
        if (v) v.pause()
      }
      // All other layers stay parked at yPercent: 100 (untouched)
    })

    prevActiveRef.current = next
  }, [activeIndex])

  /* SCROLL-DRIVEN navigation. The outer container is taller than the
     viewport (50vh per H). The inner block sticks. As the user scrolls
     through the parent's range, the progress maps to one of the 10 Hs,
     updating selectedIndex. Hovering still overrides (via hoveredIndex)
     for transient previews. */
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.round(self.progress * (holdingsLogos.length - 1)),
            holdingsLogos.length - 1
          )
          setSelectedIndex(newIndex)
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  /* Click an H → smooth-scroll the WINDOW to the position where that
     H's scroll range begins. The ScrollTrigger above then advances
     selectedIndex to match. */
  const handleClick = (i) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const containerTop = container.getBoundingClientRect().top + window.scrollY
    const containerHeight = container.offsetHeight
    const stickyHeight = window.innerHeight
    const scrollRange = Math.max(0, containerHeight - stickyHeight)
    const targetProgress = i / Math.max(1, holdingsLogos.length - 1)
    const targetScroll = containerTop + targetProgress * scrollRange
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="hs-menu-container">
      <div className="hs-menu-sticky">
    <section
      ref={sectionRef}
      className="hs-menu"
      aria-label="Our Hs"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Video stack — one absolute layer per H, full-bleed.
          Only active + immediate neighbours mount the <video> so the
          browser never buffers all 10 clips at once. Layer <div>s stay
          rendered so GSAP refs & directional transitions still line up. */}
      <div className="hs-menu-bg-stack" aria-hidden="true">
        {holdingsLogos.map((h, i) => {
          const distance = Math.abs(i - activeIndex)
          const shouldRenderVideo = distance <= 1
          return (
            <div
              key={h.id}
              ref={(el) => (videoLayersRef.current[i] = el)}
              className="hs-menu-bg-layer"
            >
              {shouldRenderVideo && (
                h.id === 'holy' ? (
                  <HolyCarousel active={distance === 0} />
                ) : h.id === 'home' ? (
                  <HomeSlideshow active={distance === 0} />
                ) : (
                  <video
                    src={H_VIDEOS[h.id]}
                    muted
                    loop
                    playsInline
                    preload={distance === 0 ? 'auto' : 'metadata'}
                  />
                )
              )}
            </div>
          )
        })}
        <div ref={overlayRef} className="hs-menu-bg-overlay" />
      </div>

      {/* Menu — always visible, every H is a button */}
      <ul className="hs-menu-list" role="menu">
        {holdingsLogos.map((h, i) => {
          const isActive = i === activeIndex
          const isSelected = i === selectedIndex
          const description = descByName[h.name]
          const link = holdingLinks[h.id]
          return (
            <li
              key={h.id}
              className={`hs-menu-item ${isActive ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''}`}
              role="menuitem"
            >
              <button
                type="button"
                className="hs-menu-link"
                onMouseEnter={() => setHoveredIndex(i)}
                onFocus={() => setHoveredIndex(i)}
                onClick={() => handleClick(i)}
              >
                <span className="hs-menu-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hs-menu-name">{h.name}</span>
              </button>

              {/* Description + CTA — inline next to the active H */}
              <div className="hs-menu-detail">
                {description && (
                  <p className="hs-menu-desc">{description}</p>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hs-menu-cta"
                  >
                    View Site <span className="hs-menu-cta-arrow">↗</span>
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
      </div>
    </div>
  )
}

export default HsAccordion
