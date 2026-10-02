import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { holdingsLogos, logohgroup } from '../assets/logos'
import { BRAND_PAGES } from '../data/brands'
import { BRAND_PAGE_IDS } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import LocaleLink from './LocaleLink'
import LanguageToggle from './LanguageToggle'
import HMedia from './media/HMedia'
import BrandGallery from './BrandGallery'
import './BrandPage.css'

gsap.registerPlugin(ScrollTrigger)

const pad = (n) => String(n).padStart(2, '0')
// Never break "H Group" across two lines.
const keepTogether = (s) => s.replace(/H Group/g, 'H Group')
const brandIndex = (id) => holdingsLogos.findIndex((h) => h.id === id)

/* Numbered list shared by services and methodology steps. Items with
   only a title (no text) switch to a compact multi-column layout. */
function ServiceList({ title, items }) {
  const compact = items.every((item) => !item.text)
  return (
    <section className="brand-section" data-bar="light">
      <h2 className="brand-label" data-reveal>{title}</h2>
      <ol className={`brand-services${compact ? ' brand-services--compact' : ''}`}>
        {items.map((item, i) => (
          <li key={item.title} className="brand-services__item" data-reveal>
            <span className="brand-services__index">{pad(i + 1)}</span>
            <h3 className="brand-services__name">{item.title}</h3>
            {item.text && <p className="brand-services__text">{item.text}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* Client logos at a similar visual weight: every logo gets roughly the
   same area, so wide wordmarks and square crests read as equals. */
const LOGO_AREA = 3600
function logoSize({ width, height }) {
  const ratio = width / height
  let h = Math.min(56, Math.max(16, Math.sqrt(LOGO_AREA / ratio)))
  let w = h * ratio
  if (w > 190) {
    w = 190
    h = w / ratio
  }
  return { width: Math.round(w), height: Math.round(h) }
}

/* Next H in accordion order that also has its own page, or null. */
function nextBrandWithPage(id) {
  const start = brandIndex(id)
  for (let step = 1; step < holdingsLogos.length; step++) {
    const candidate = holdingsLogos[(start + step) % holdingsLogos.length].id
    if (BRAND_PAGE_IDS.includes(candidate)) return candidate
  }
  return null
}

/* Shared template for every H page: hero with the H's footage → intro →
   services → projects → collaborations → CTA → next brand. */
function BrandPage({ brandId }) {
  const { t, language } = useLanguage()
  const rootRef = useRef(null)
  const brand = BRAND_PAGES[brandId]
  const copy = brand.copy[language]
  const nextId = nextBrandWithPage(brandId)

  // Arriving from the accordion leaves the window scrolled far down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [brandId])

  // Top bar turns ink over light sections and white over dark ones
  // (each section declares its tone in data-bar).
  const [barTone, setBarTone] = useState('dark')
  useEffect(() => {
    const probeY = 44
    const update = () => {
      const sections = rootRef.current?.querySelectorAll('[data-bar]') ?? []
      for (const el of sections) {
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= probeY && bottom > probeY) {
          setBarTone(el.dataset.bar)
          return
        }
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [brandId])

  // Below-the-fold reveals. The hero entrance is pure CSS so the
  // prerendered HTML never flashes before hydration.
  useEffect(() => {
    const mm = gsap.matchMedia(rootRef)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    })
    return () => mm.revert()
  }, [brandId, language])

  return (
    <div className="brand-page" ref={rootRef}>
      <header className={`brand-topbar is-${barTone}`}>
        <LocaleLink to="/" className="brand-topbar__logo">
          <img src={logohgroup} alt="H Group" />
        </LocaleLink>
        <nav className="brand-topbar__nav" aria-label="H Group">
          <LocaleLink to="/work-with-us">{t('nav.workWithUs')}</LocaleLink>
          <LocaleLink to="/contact">{t('nav.contact')}</LocaleLink>
        </nav>
      </header>

      <section className="brand-hero" data-bar="dark">
        <div className="brand-hero__media" aria-hidden="true">
          <HMedia id={brandId} className="brand-hero__video" />
          <div className="brand-hero__scrim" />
        </div>
        <div className="brand-hero__content">
          <p className="brand-hero__eyebrow brand-rise">
            <span className="brand-hero__index">{pad(brandIndex(brandId) + 1)}</span>
            {t('brand.eyebrow')}
          </p>
          <h1 className="brand-hero__title">
            <span className="brand-hero__name brand-rise">{brand.name}</span>{' '}
            <span className="brand-hero__headline brand-rise">{copy.headline}</span>
          </h1>
        </div>
        <span className="brand-hero__scroll" aria-hidden="true">{t('brand.scroll')}</span>
      </section>

      <section className="brand-intro" data-bar="light">
        <p className="brand-label" data-reveal>{copy.tagline}</p>
        <p className="brand-intro__text" data-reveal>{keepTogether(copy.intro)}</p>
      </section>

      {copy.services?.length > 0 && <ServiceList title={t('brand.services')} items={copy.services} />}

      {copy.method?.length > 0 && <ServiceList title={t('brand.method')} items={copy.method} />}

      {copy.formats?.length > 0 && (
        <section className="brand-section" data-bar="light">
          <h2 className="brand-label" data-reveal>{t(`brand.${brand.formatsLabel ?? 'formats'}`)}</h2>
          <ul className="brand-formats" data-reveal>
            {copy.formats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </section>
      )}

      {(brand.gallery || brand.projects) && (
      <section className="brand-band" data-bar="light">
        <div className="brand-section">
          <h2 className="brand-label" data-reveal>{t('brand.projects')}</h2>
          {brand.gallery && <BrandGallery photos={brand.gallery} />}
          {brand.projects && (
          <div className="brand-projects">
            {brand.projects.map((project, i) => (
              <article
                key={project.id}
                className={[
                  'brand-project',
                  project.wide && 'brand-project--wide',
                  !project.wide && i % 2 === 1 && 'brand-project--flip',
                ].filter(Boolean).join(' ')}
              >
                <figure className="brand-project__media" data-reveal>
                  <img
                    src={project.image}
                    alt={`${brand.name} × ${project.name}`}
                    width={project.width}
                    height={project.height}
                    style={project.focus ? { objectPosition: project.focus } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="brand-project__body" data-reveal>
                  <span className="brand-project__index">{pad(i + 1)}</span>
                  {project.logo && (
                    <img className="brand-project__logo" src={project.logo} alt="" loading="lazy" decoding="async" />
                  )}
                  <h3 className="brand-project__name">{project.name}</h3>
                  <p className="brand-project__text">{copy.projects[project.id]}</p>
                </div>
              </article>
            ))}
          </div>
          )}
        </div>
      </section>
      )}

      {/* Logo wall: either one ready-made image (alt lists every brand)
          or individual logos. `label` swaps the heading, e.g. HACK's
          ad platforms or HOPE's universities. */}
      {brand.collaborations && (
        <section className="brand-section" data-bar="light">
          <h2 className="brand-label" data-reveal>
            {t(`brand.${brand.collaborations.label ?? 'collaborations'}`)}
          </h2>
          {brand.collaborations.logos ? (
            <ul className="brand-logos" data-reveal>
              {brand.collaborations.logos.map((logo) => (
                <li key={logo.name}>
                  <img src={logo.src} alt={logo.name} {...logoSize(logo)} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ) : (
            <img
              className="brand-collabs"
              src={brand.collaborations.image}
              alt={copy.collaborationsAlt}
              width={brand.collaborations.width}
              height={brand.collaborations.height}
              loading="lazy"
              decoding="async"
              data-reveal
            />
          )}
        </section>
      )}

      <section className="brand-cta" data-bar="dark">
        <div className="brand-cta__inner">
          <h2 className="brand-cta__title" data-reveal>{t('brand.ctaTitle')}</h2>
          <div className="brand-cta__actions" data-reveal>
            <LocaleLink to="/contact" className="brand-btn brand-btn--solid">
              {t('brand.ctaContact')} <span aria-hidden="true">→</span>
            </LocaleLink>
            <a
              href={brand.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-btn"
            >
              {t('brand.ctaExternal')} {brand.name} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="brand-next" data-bar="dark">
        {nextId ? (
          <LocaleLink to={`/marcas/${nextId}`} className="brand-next__link">
            <span className="brand-next__eyebrow">
              {t('brand.next')} · {pad(brandIndex(nextId) + 1)}
            </span>
            <span className="brand-next__name">
              {BRAND_PAGES[nextId].name}
              <span className="brand-next__arrow" aria-hidden="true">→</span>
            </span>
          </LocaleLink>
        ) : (
          <LocaleLink to="/#marcas" state={{ fromSubpage: true }} className="brand-next__link">
            <span className="brand-next__eyebrow">H Group</span>
            <span className="brand-next__name brand-next__name--long">
              {t('brand.allBrands')}
              <span className="brand-next__arrow" aria-hidden="true">→</span>
            </span>
          </LocaleLink>
        )}
        <div className="brand-next__footer">
          <span>© H Group</span>
          <LocaleLink to="/privacy-policy">{t('nav.privacy')}</LocaleLink>
        </div>
      </footer>

      <LanguageToggle />
    </div>
  )
}

export default BrandPage
