import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { holdingsLogos, logohgroup } from '../assets/logos'
import { images } from '../assets'
import { useLanguage } from '../contexts/LanguageContext'
import {
  heroHero,
  bulgariHype,
  lamborghiniHere,
  anserHero,
  cartierHome,
  cienvoces,
  omodaHome,
  sheinHome,
  eventiHome,
  heroparty,
} from '../assets/media'

/* H presentation videos (one per H — uploaded by the user) */
import heroVideo from '../assets/mp4/herovideo.mp4'
import hackVideo from '../assets/mp4/hackvideo.mp4'
import haloVideo from '../assets/mp4/halovideo.mp4'
import hereVideo from '../assets/mp4/herevideo.mp4'
import hitsVideo from '../assets/mp4/hitsvideo.mp4'
import homeVideo from '../assets/mp4/homevideo.mp4'
import hopeVideo from '../assets/mp4/hopevideo.mp4'
import hypeVideo from '../assets/mp4/HypeVideo.mp4'
import hookVideo from '../assets/mp4/videoshook.mp4'

import './HSections.css'

gsap.registerPlugin(ScrollTrigger)

/* ==============================================================
   HSections — editorial sections with sticky left-info panel
   --------------------------------------------------------------
   New layout per H section:

   ┌────────────────────┬─────────────────────────────────────┐
   │                    │                                     │
   │   HERO             │     [100vh transparent stage —      │
   │  (click → menu)    │      the fixed bg image shows]      │
   │                    │                                     │
   │  Social impact…    ├─────────────────────────────────────┤
   │  ────────────      │                                     │
   │  View Site ↗       │     [editorial gallery on white,    │
   │                    │      items aligned in clean pairs]  │
   │  ← sticky          │                                     │
   │                    │                                     │
   └────────────────────┴─────────────────────────────────────┘

   • LEFT column is sticky → name + description + CTA persist
     while the user scrolls through the section.
   • Click on the H name → smooth-scroll back to the Hs list.
   • Dark gradient on the left edge keeps white text readable
     over either the cinematic image (stage) or the white gallery.
   • Right column shows the bg image during stage (100vh trans-
     parent), then white gallery below with items 100% aligned.
   • Crossfade between H sections is unchanged — global parent
     swaps which image/video layer is opaque per scroll position.
   ============================================================== */

const H_VIDEOS = {
  hero: heroVideo,
  hack: hackVideo,
  halo: haloVideo,
  here: hereVideo,
  hits: hitsVideo,
  home: homeVideo,
  hope: hopeVideo,
  hunt: haloVideo,    // reuses HALO's video by request
  hype: hypeVideo,
  hook: hookVideo,
}

/* One representative still per H — fallback when the user hasn't
   supplied a video for that H. */
const H_IMAGES = {
  hero: heroHero,
  hype: bulgariHype,
  here: lamborghiniHere,
  hunt: anserHero,
  home: cartierHome,
  hope: cienvoces,
  halo: omodaHome,
  hack: sheinHome,
  hits: eventiHome,
  hook: heroparty,
}

const HOLDING_LINKS = {
  hero: 'https://heromexico.com/',
  hype: 'https://hypeagency.mx/',
  here: 'https://hereconvocatorias.com/',
  hunt: 'https://huntmedia.mx/',
  home: 'https://homemalls.mx/',
  hope: 'https://hopeadvertising.mx/',
  halo: 'https://halocontent.mx/',
  hack: 'https://hackdigital.mx/',
  hits: 'https://hitscreativity.com/',
  hook: 'https://hookproductions.mx/',
}

const scrollToMenu = () => {
  const target = document.querySelector('.hs-menu')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/* ----------------------------------------------------------------
   Single section — sticky left info + transparent stage + gallery
   ---------------------------------------------------------------- */
function HSection({ holding, items, description }) {
  const id = holding.id
  const name = holding.name
  const link = HOLDING_LINKS[id]

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const galleryRef = useRef(null)

  /* Scrub-linked entrance choreography:
       1. Sticky-panel pieces (title, desc, CTA) slide in from left
       2. Gallery items fade in cleanly (no offset, fully aligned)
     All long, slow easings → premium editorial pace. */
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const sideChildren = [titleRef.current, descRef.current, ctaRef.current].filter(Boolean)

      /* Children are visible at rest (CSS opacity) — animation
         only adds horizontal motion so even before the trigger
         fires the panel is fully legible. */
      if (sideChildren.length) {
        gsap.from(sideChildren, {
          x: -32,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            end: 'top 35%',
            scrub: 1.3,
          },
        })
      }

      /* Gallery items keep the opacity fade — they're far below
         the fold, the user always scrolls into them so the trigger
         always fires before they're visible. */
      if (galleryRef.current) {
        const galleryItems = galleryRef.current.querySelectorAll('.h-gallery-item')
        if (galleryItems.length) {
          gsap.from(galleryItems, {
            opacity: 0,
            y: 40,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 88%',
              end: 'top 40%',
              scrub: 1.1,
            },
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id={`h-section-${id}`}
      className="h-section"
      data-h={id}
      aria-label={name}
    >
      {/* Floating overlay — sits ABOVE the content, sticky while
          the section is in view. Pointer-events on the wrapper
          are off so clicks pass through to the imagery behind;
          re-enabled on the inner panel so the title/CTA work. */}
      <aside className="h-section-side" aria-hidden={false}>
        {/* HGROUP brand mark — top-left of the floating overlay */}
        <button
          type="button"
          className="h-side-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="HGROUP — back to top"
        >
          <img src={logohgroup} alt="HGROUP" />
        </button>

        <div className="h-side-inner">
          <h2
            ref={titleRef}
            className="h-side-title"
            onClick={scrollToMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToMenu()
              }
            }}
            aria-label={`${name} — back to all Hs`}
          >
            {name}
          </h2>
          {description && (
            <p ref={descRef} className="h-side-desc">{description}</p>
          )}
          {link && (
            <a
              ref={ctaRef}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-side-cta"
            >
              View Site <span className="h-side-cta-arrow">↗</span>
            </a>
          )}
        </div>
      </aside>

      {/* MAIN — full-width content, edge-to-edge. The floating
          overlay above sits on top of it; no column subtraction. */}
      <div className="h-section-main">
        {/* 100vh transparent — the fixed image/video shows through */}
        <div className="h-section-stage-blank" aria-hidden="true" />

        {items.length > 0 && (
          <div ref={galleryRef} className="h-section-gallery">
            {items.map((item, i) => (
              <figure
                key={`${id}-${i}`}
                className="h-gallery-item"
              >
                {item.type === 'video' ? (
                  <video
                    className="h-gallery-media"
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    className="h-gallery-media"
                    src={item.image}
                    alt={item.alt || name}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {i === 0 && (
                  <figcaption className="h-gallery-caption">
                    <span className="h-gallery-caption-eyebrow">SS·{name}</span>
                    <span className="h-gallery-caption-title">{item.company || name}</span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Parent — fixed image/video stack + sections
   ---------------------------------------------------------------- */
function HSections() {
  const { t } = useLanguage()

  const descByName = useMemo(() => {
    const expertise = t('expertise') || []
    const map = {}
    expertise.forEach((e) => {
      map[String(e.name).toUpperCase()] = e.description
    })
    return map
  }, [t])

  const itemsByCategory = useMemo(() => {
    const all = images.allPortfolioItems || []
    const grouped = {}
    holdingsLogos.forEach((h) => {
      grouped[h.id] = all.filter(
        (item) => (item.category || '').toUpperCase() === h.name.toUpperCase()
      )
    })
    return grouped
  }, [])

  const containerRef = useRef(null)
  const layersRef = useRef([])
  const activeLayerRef = useRef(null)
  const [, setActiveIndex] = useState(0)

  useEffect(() => {
    layersRef.current.forEach((layer) => {
      if (!layer) return
      gsap.set(layer, {
        opacity: 0,
        scale: 1.08,
      })
    })
  }, [])

  /* Per-section ScrollTrigger crossfade between layers (unchanged). */
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      holdingsLogos.forEach((h, i) => {
        ScrollTrigger.create({
          trigger: `#h-section-${h.id}`,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        })
      })
    }, containerRef)

    function activate(idx) {
      setActiveIndex(idx)
      layersRef.current.forEach((layer, i) => {
        if (!layer) return
        if (i === idx) {
          gsap.to(layer, {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: 'expo.out',
            overwrite: 'auto',
          })
          activeLayerRef.current = layer
        } else {
          gsap.to(layer, {
            opacity: 0,
            scale: 1.04,
            duration: 1.4,
            ease: 'expo.out',
            overwrite: 'auto',
          })
        }
      })
    }

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="h-sections">
      {/* Fixed image/video stack — one layer per H */}
      <div className="h-bg-stack" aria-hidden="true">
        {holdingsLogos.map((h, i) => {
          const video = H_VIDEOS[h.id]
          return (
            <div
              key={h.id}
              ref={(el) => (layersRef.current[i] = el)}
              className="h-bg-layer"
            >
              {video ? (
                <video
                  className="h-bg-media"
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  className="h-bg-media"
                  src={H_IMAGES[h.id]}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              )}
            </div>
          )
        })}
        <div className="h-bg-overlay" />
      </div>

      {holdingsLogos.map((holding) => (
        <HSection
          key={holding.id}
          holding={holding}
          items={itemsByCategory[holding.id] || []}
          description={descByName[holding.name.toUpperCase()] || ''}
        />
      ))}
    </div>
  )
}

export default HSections
