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

import './HsAccordion.css'

gsap.registerPlugin(ScrollTrigger)

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
      const v = layer.querySelector('video')

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
                <video
                  src={H_VIDEOS[h.id]}
                  muted
                  loop
                  playsInline
                  preload={distance === 0 ? 'auto' : 'metadata'}
                />
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
