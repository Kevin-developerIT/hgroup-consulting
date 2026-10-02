import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/useLanguage'
import { pad } from '../hooks/useBrandPage'
import LocaleLink from './LocaleLink'

/* Pieces shared by the brand and service pages (styles in BrandPage.css). */

export function BrandTopbar({ tone }) {
  const { t } = useLanguage()
  return (
    <header className={`brand-topbar is-${tone}`}>
      <LocaleLink to="/" className="brand-topbar__logo">
        <img src={logohgroup} alt="H Group" />
      </LocaleLink>
      <nav className="brand-topbar__nav" aria-label="H Group">
        <LocaleLink to="/work-with-us">{t('nav.workWithUs')}</LocaleLink>
        <LocaleLink to="/contact">{t('nav.contact')}</LocaleLink>
      </nav>
    </header>
  )
}

/* Numbered list for services, methodology steps and what a service
   includes. Items with only a title (no text) switch to a compact
   multi-column layout; `tag` adds a link to the H behind the item. */
export function ServiceList({ title, items }) {
  const compact = items.every((item) => !item.text)
  return (
    <section className="brand-section" data-bar="light">
      <h2 className="brand-label" data-reveal>{title}</h2>
      <ol className={`brand-services${compact ? ' brand-services--compact' : ''}`}>
        {items.map((item, i) => (
          <li key={item.title} className="brand-services__item" data-reveal>
            <span className="brand-services__index">{pad(i + 1)}</span>
            <h3 className="brand-services__name">{item.title}</h3>
            {item.text && (
              <p className="brand-services__text">
                {item.text}
                {item.tag && (
                  <LocaleLink to={item.tag.to} className="brand-services__tag">
                    {item.tag.label} <span aria-hidden="true">→</span>
                  </LocaleLink>
                )}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* Row of large text links (related / other services). */
export function LinkList({ title, links }) {
  return (
    <section className="brand-section" data-bar="light">
      <h2 className="brand-label" data-reveal>{title}</h2>
      <ul className="brand-links" data-reveal>
        {links.map((link) => (
          <li key={link.to}>
            <LocaleLink to={link.to}>
              {link.label} <span className="brand-links__arrow" aria-hidden="true">→</span>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
