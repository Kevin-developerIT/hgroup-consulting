import { useEffect, useRef } from 'react'
import { BRAND_PAGES } from '../data/brands'
import { SERVICE_PAGES } from '../data/services'
import { publishedCaseFor } from '../data/cases'
import { SERVICE_PAGE_IDS, casePath, servicePath } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import { keepTogether, pad, useBarTone, useScrollReveal } from '../hooks/useBrandPage'
import LocaleLink from './LocaleLink'
import LanguageToggle from './LanguageToggle'
import SiteFooter from './SiteFooter'
import HMedia from './media/HMedia'
import { BrandTopbar, LinkList, ServiceList } from './BrandParts'
import './BrandPage.css'
import './ServicePage.css'

const brandPath = (id) => `/marcas/${id}`

/* One page per service line: hero with the lead H's footage → intro →
   what it includes → the Hs that deliver it → featured projects → other
   services → CTA → next service. Same visual language as BrandPage. */
function ServicePage({ serviceId }) {
  const { t, language } = useLanguage()
  const rootRef = useRef(null)
  const service = SERVICE_PAGES[serviceId]
  const copy = service.copy[language]
  const index = SERVICE_PAGE_IDS.indexOf(serviceId)
  const nextId = SERVICE_PAGE_IDS[(index + 1) % SERVICE_PAGE_IDS.length]

  const brands = service.brands.map((id) => ({ id, name: BRAND_PAGES[id].name, role: copy.roles[id] }))
  const includes = copy.includes.map((item) => ({
    ...item,
    tag: { to: brandPath(item.brand), label: BRAND_PAGES[item.brand].name },
  }))
  const featured = service.featured.map(([brandId, projectId]) => {
    const brand = BRAND_PAGES[brandId]
    return {
      ...brand.projects.find((p) => p.id === projectId),
      brandId,
      brandName: brand.name,
      text: brand.copy[language].projects[projectId],
      caseId: publishedCaseFor(brandId, projectId),
    }
  })
  const others = SERVICE_PAGE_IDS.filter((id) => id !== serviceId).map((id) => ({
    to: servicePath(id),
    label: SERVICE_PAGES[id].copy[language].name,
  }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [serviceId])

  const barTone = useBarTone(rootRef, serviceId)
  useScrollReveal(rootRef, [serviceId, language])

  return (
    <div className="brand-page service-page" ref={rootRef}>
      <BrandTopbar tone={barTone} />

      <section className="brand-hero" data-bar="dark">
        <div className="brand-hero__media" aria-hidden="true">
          <HMedia id={service.heroBrand} className="brand-hero__video" />
          <div className="brand-hero__scrim" />
        </div>
        <div className="brand-hero__content">
          <p className="brand-hero__eyebrow brand-rise">
            <span className="brand-hero__index">{pad(index + 1)}</span>
            {t('service.eyebrow')}
          </p>
          <h1 className="brand-hero__title">
            <span className="brand-hero__name service-hero__name brand-rise">{copy.name}</span>{' '}
            <span className="brand-hero__headline brand-rise">{copy.headline}</span>
          </h1>
        </div>
        <span className="brand-hero__scroll" aria-hidden="true">{t('brand.scroll')}</span>
      </section>

      <section className="brand-intro" data-bar="light">
        <p className="brand-label" data-reveal>{brands.map((b) => b.name).join(' · ')}</p>
        <p className="brand-intro__text" data-reveal>{keepTogether(copy.intro)}</p>
      </section>

      {includes.length > 0 && <ServiceList title={t('service.includes')} items={includes} />}

      <section className="brand-section" data-bar="light">
        <h2 className="brand-label" data-reveal>{t('service.brands')}</h2>
        <ul className="service-brands">
          {brands.map((brand) => (
            <li key={brand.id} data-reveal>
              <LocaleLink to={brandPath(brand.id)} className="service-brand">
                <h3 className="service-brand__name">{brand.name}</h3>
                <p className="service-brand__role">{brand.role}</p>
                <span className="service-brand__cta">
                  {t('service.visitBrand')} {brand.name} <span aria-hidden="true">→</span>
                </span>
              </LocaleLink>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 && (
        <section className="brand-band" data-bar="light">
          <div className="brand-section">
            <h2 className="brand-label" data-reveal>{t('service.featured')}</h2>
            <ul className="service-cases">
              {featured.map((project) => (
                <li key={`${project.brandId}-${project.id}`} data-reveal>
                  <LocaleLink
                    to={project.caseId ? casePath(project.caseId) : brandPath(project.brandId)}
                    className="service-case"
                  >
                    <figure className="service-case__media">
                      <img
                        src={project.image}
                        alt={`${project.brandName} × ${project.name}`}
                        width={project.width}
                        height={project.height}
                        style={project.focus ? { objectPosition: project.focus } : undefined}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                    <span className="service-case__brand">{project.brandName}</span>
                    <h3 className="service-case__name">{project.name}</h3>
                    <p className="service-case__text">{project.text}</p>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <LinkList title={t('service.others')} links={others} />

      <section className="brand-cta" data-bar="dark">
        <div className="brand-cta__inner">
          <h2 className="brand-cta__title" data-reveal>{t('brand.ctaTitle')}</h2>
          <div className="brand-cta__actions" data-reveal>
            <LocaleLink to="/contact" className="brand-btn brand-btn--solid">
              {t('brand.ctaContact')} <span aria-hidden="true">→</span>
            </LocaleLink>
          </div>
        </div>
      </section>

      <footer className="brand-next" data-bar="dark">
        <LocaleLink to={servicePath(nextId)} className="brand-next__link">
          <span className="brand-next__eyebrow">
            {t('service.next')} · {pad(SERVICE_PAGE_IDS.indexOf(nextId) + 1)}
          </span>
          <span className="brand-next__name brand-next__name--long">
            {SERVICE_PAGES[nextId].copy[language].name}
            <span className="brand-next__arrow" aria-hidden="true">→</span>
          </span>
        </LocaleLink>
        <SiteFooter />
      </footer>

      <LanguageToggle />
    </div>
  )
}

export default ServicePage
