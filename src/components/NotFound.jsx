import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/useLanguage'
import LocaleLink from './LocaleLink'
import LanguageToggle from './LanguageToggle'
import './NotFound.css'

/* Catch-all page for unknown URLs. The prerendered /404.html carries
   <meta name="robots" content="noindex">, and usePageMeta adds it on
   client-side navigation, so broken URLs never get indexed. */
function NotFound() {
  const { t } = useLanguage()

  return (
    <main className="not-found">
      <LocaleLink to="/" className="not-found__logo">
        <img src={logohgroup} alt="H Group" />
      </LocaleLink>

      <div className="not-found__body">
        <p className="not-found__eyebrow">{t('notFound.eyebrow')}</p>
        <h1 className="not-found__title">{t('notFound.title')}</h1>
        <p className="not-found__text">{t('notFound.text')}</p>
        <nav className="not-found__actions" aria-label="H Group">
          <LocaleLink to="/" className="not-found__btn not-found__btn--solid">
            {t('notFound.home')} <span aria-hidden="true">→</span>
          </LocaleLink>
          <LocaleLink to="/#marcas" state={{ fromSubpage: true }} className="not-found__btn">
            {t('notFound.brands')}
          </LocaleLink>
          <LocaleLink to="/contact" className="not-found__btn">
            {t('notFound.contact')}
          </LocaleLink>
        </nav>
      </div>

      <span className="not-found__code" aria-hidden="true">404</span>
      <LanguageToggle />
    </main>
  )
}

export default NotFound
