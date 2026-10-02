import { SERVICE_PAGES } from '../data/services'
import { SERVICE_PAGE_IDS, servicePath } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import LocaleLink from './LocaleLink'
import './ServicesIndex.css'

/* Home → service pages (report point 5): a typographic index of the
   service lines below the brand accordion, each naming its Hs. */
function ServicesIndex() {
  const { t, language } = useLanguage()
  return (
    <section className="services-index" aria-labelledby="services-index-title">
      <div className="services-index__inner">
        <h2 id="services-index-title" className="services-index__label">{t('home.servicesHeading')}</h2>
        <ol className="services-index__list">
          {SERVICE_PAGE_IDS.map((id, i) => {
            const service = SERVICE_PAGES[id]
            return (
              <li key={id}>
                <LocaleLink to={servicePath(id)} className="services-index__link">
                  <span className="services-index__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="services-index__name">{service.copy[language].name}</h3>
                  <span className="services-index__brands">
                    {service.brands.map((b) => b.toUpperCase()).join(' · ')}
                  </span>
                  <span className="services-index__arrow" aria-hidden="true">→</span>
                </LocaleLink>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default ServicesIndex
