import { useEffect, useRef } from 'react'
import { BRAND_PAGES } from '../data/brands'
import { CASES, publishedCases } from '../data/cases'
import { SERVICE_PAGES } from '../data/services'
import { casePath, isPublishedCase, servicePath } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import { keepTogether, useBarTone, useScrollReveal } from '../hooks/useBrandPage'
import LocaleLink from './LocaleLink'
import LanguageToggle from './LanguageToggle'
import SiteFooter from './SiteFooter'
import BrandGallery from './BrandGallery'
import { BrandTopbar, LinkList } from './BrandParts'
import './BrandPage.css'
import './ServicePage.css'
import './CasePage.css'

const paragraphs = (text) => [].concat(text)

/* One story block (challenge / solution). Drafts show what's missing so
   the team knows what to send; published cases only show filled blocks. */
function CaseBlock({ title, text, pending }) {
  if (!text && !pending) return null
  return (
    <section className="brand-section case-block" data-bar="light">
      <h2 className="brand-label case-block__label" data-reveal>{title}</h2>
      <div className="case-block__body" data-reveal>
        {text
          ? paragraphs(text).map((p) => <p key={p} className="case-block__text">{p}</p>)
          : <p className="case-pending">{pending}</p>}
      </div>
    </section>
  )
}

/* Case study (report point 2): hero with the lead H's footage → summary
   and fact sheet → challenge → solution → results → gallery → related
   services → CTA → next case. */
function CasePage({ caseId }) {
  const { t, language } = useLanguage()
  const rootRef = useRef(null)
  const item = CASES[caseId]
  const copy = item.copy[language]
  const brand = BRAND_PAGES[item.brand]
  const draft = !isPublishedCase(caseId)

  const services = item.services.map((id) => ({
    to: servicePath(id),
    label: SERVICE_PAGES[id].copy[language].name,
  }))
  const published = publishedCases()
  const nextId = !draft && published.length > 1
    ? published[(published.indexOf(caseId) + 1) % published.length]
    : null
  const results = copy.results
  const cover = item.gallery.find((p) => p.id === item.cover)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [caseId])

  const barTone = useBarTone(rootRef, caseId)
  useScrollReveal(rootRef, [caseId, language])

  return (
    <div className="brand-page case-page" ref={rootRef}>
      <BrandTopbar tone={barTone} />

      {/* Client name across the full width, then summary + cover photo.
          Project photos are ~400–800px, so the cover sits at its own size
          instead of full-bleed. */}
      <section className="case-hero" data-bar="dark">
        <div className="case-hero__inner">
          <div className="case-hero__content">
            <p className="brand-hero__eyebrow brand-rise">
              <span className="brand-hero__index">{t('case.eyebrow')}</span>
              {brand.name}
            </p>
            <h1 className="brand-hero__title">
              <span className="brand-hero__name case-hero__name brand-rise">{item.client}</span>{' '}
              <span className="brand-hero__headline brand-rise">{copy.title}</span>
            </h1>
          </div>
          <p className="case-hero__summary brand-rise">{keepTogether(copy.summary)}</p>
          {cover && (
            <figure className="case-hero__media brand-rise">
              <img
                src={cover.full}
                alt={cover.alt[language]}
                width={cover.w}
                height={cover.h}
                fetchPriority="high"
                style={item.coverFocus ? { objectPosition: item.coverFocus } : undefined}
              />
            </figure>
          )}
        </div>
      </section>

      {draft && (
        <p className="case-draft" data-bar="light" role="note">{t('case.draft')}</p>
      )}

      <section className="brand-section case-facts-section" data-bar="light">
        <dl className="case-facts" data-reveal>
          <div>
            <dt>{t('case.client')}</dt>
            <dd>{item.client}</dd>
          </div>
          <div>
            <dt>{t('case.brand')}</dt>
            <dd><LocaleLink to={`/marcas/${item.brand}`}>{brand.name}</LocaleLink></dd>
          </div>
          {services.length > 0 && (
            <div>
              <dt>{t('case.services')}</dt>
              <dd className="case-facts__list">
                {services.map((s) => <LocaleLink key={s.to} to={s.to}>{s.label}</LocaleLink>)}
              </dd>
            </div>
          )}
          {item.year && (
            <div>
              <dt>{t('case.year')}</dt>
              <dd>{item.year}</dd>
            </div>
          )}
        </dl>
      </section>

      <CaseBlock
        title={t('case.challenge')}
        text={copy.challenge}
        pending={draft && t('case.pending.challenge')}
      />
      <CaseBlock
        title={t('case.solution')}
        text={copy.solution}
        pending={draft && t('case.pending.solution')}
      />

      {(results || draft) && (
        <section className="brand-section case-block" data-bar="light">
          <h2 className="brand-label case-block__label" data-reveal>{t('case.results')}</h2>
          <div className="case-block__body" data-reveal>
            {results ? (
              <>
                {results.metrics?.length > 0 && (
                  <ul className="case-metrics">
                    {results.metrics.map((m) => (
                      <li key={m.label}>
                        <span className="case-metrics__value">{m.value}</span>
                        <span className="case-metrics__label">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {results.text && paragraphs(results.text).map((p) => (
                  <p key={p} className="case-block__text">{p}</p>
                ))}
              </>
            ) : (
              <p className="case-pending">{t('case.pending.results')}</p>
            )}
          </div>
        </section>
      )}

      {item.gallery.length > 0 && (
        <section className="brand-band" data-bar="light">
          <div className="brand-section">
            <h2 className="brand-label" data-reveal>{t('case.gallery')}</h2>
            <BrandGallery photos={item.gallery} eventsTitle={null} />
          </div>
        </section>
      )}

      {services.length > 0 && <LinkList title={t('brand.relatedServices')} links={services} />}

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
        {nextId ? (
          <LocaleLink to={casePath(nextId)} className="brand-next__link">
            <span className="brand-next__eyebrow">{t('case.next')}</span>
            <span className="brand-next__name brand-next__name--long">
              {CASES[nextId].client}
              <span className="brand-next__arrow" aria-hidden="true">→</span>
            </span>
          </LocaleLink>
        ) : (
          <LocaleLink to={`/marcas/${item.brand}`} className="brand-next__link">
            <span className="brand-next__eyebrow">{t('case.moreFrom')} {brand.name}</span>
            <span className="brand-next__name">
              {brand.name}
              <span className="brand-next__arrow" aria-hidden="true">→</span>
            </span>
          </LocaleLink>
        )}
        <SiteFooter />
      </footer>

      <LanguageToggle />
    </div>
  )
}

export default CasePage
