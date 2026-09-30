import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { holdingsLogos } from '../assets/logos'
import { holdingLinks } from '../data/holdings'
import { BRAND_PAGE_IDS } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import LocaleLink from './LocaleLink'

import HomeSlideshow from './media/HomeSlideshow'
import HolyCarousel from './media/HolyCarousel'
import { H_VIDEOS } from './media/sources'

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

  /* The accordion sits below the hero banner: its footage only starts
     loading once the section is about to scroll into view, so the hero
     video has the connection to itself on first load. */
  const [nearViewport, setNearViewport] = useState(false)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNearViewport(true)
        io.disconnect()
      },
      // The section starts right below the fold, so this fires on the
      // first bit of scroll — well before the videos are on screen.
      { rootMargin: '0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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
    <div ref={containerRef} className="hs-menu-container" id="marcas">
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
          const shouldRenderVideo = nearViewport && distance <= 1
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
                    // Starts the active clip when the stack first mounts
                    // (see nearViewport); after that the effects above
                    // play and pause it.
                    autoPlay={distance === 0}
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

      <h2 className="sr-only">{t('home.hsHeading')}</h2>

      {/* Menu — always visible; each H name is an <h3> wrapping its
          button (WAI-ARIA accordion pattern). */}
      <ul className="hs-menu-list">
        {holdingsLogos.map((h, i) => {
          const isActive = i === activeIndex
          const isSelected = i === selectedIndex
          const description = descByName[h.name]
          const link = holdingLinks[h.id]
          return (
            <li
              key={h.id}
              className={`hs-menu-item ${isActive ? 'is-active' : ''} ${isSelected ? 'is-selected' : ''}`}
            >
              <h3 className="hs-menu-heading">
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
              </h3>

              {/* Description + CTA — inline next to the active H */}
              <div className="hs-menu-detail">
                {description && (
                  <p className="hs-menu-desc">{description}</p>
                )}
                {BRAND_PAGE_IDS.includes(h.id) ? (
                  <LocaleLink to={`/marcas/${h.id}`} className="hs-menu-cta">
                    {t('home.ctaInternal')} <span className="hs-menu-cta-arrow">→</span>
                  </LocaleLink>
                ) : link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hs-menu-cta"
                  >
                    {t('home.ctaExternal')} <span className="hs-menu-cta-arrow">↗</span>
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
