import { Link, useLocation } from 'react-router-dom'
import { alternatePath } from '../data/seo'
import { useLanguage } from '../contexts/useLanguage'
import './LanguageToggle.css'

/* A real link to the same page in the other language, so crawlers can
   discover the /en/ versions. `fromSubpage` skips the home intro overlay. */
function LanguageToggle() {
  const { language } = useLanguage()
  const { pathname } = useLocation()
  const other = language === 'es' ? 'en' : 'es'

  return (
    <Link
      to={alternatePath(pathname)}
      state={{ fromSubpage: true }}
      className="language-toggle"
      hrefLang={other === 'en' ? 'en' : 'es-MX'}
      aria-label={other === 'en' ? 'View this page in English' : 'Ver esta página en español'}
    >
      <span className={language === 'en' ? 'active' : ''}>EN</span>
      <span className="divider">/</span>
      <span className={language === 'es' ? 'active' : ''}>ES</span>
    </Link>
  )
}

export default LanguageToggle
