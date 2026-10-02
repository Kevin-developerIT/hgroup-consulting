import { ADDRESS_LINE, COMPANY, whatsappUrl } from '../data/company'
import { useLanguage } from '../contexts/useLanguage'
import LocaleLink from './LocaleLink'
import './SiteFooter.css'

/* Name, address, phone and official profiles (report point 10), shown the
   same way on the home, brand and service pages. Sits inside a dark
   section; the parent provides the <footer> element. */
function SiteFooter() {
  const { t } = useLanguage()
  return (
    <div className="site-footer">
      <address className="site-footer__contact">
        <span className="site-footer__name">{COMPANY.name}</span>
        <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer">
          {ADDRESS_LINE}
        </a>
        <a href={`tel:${COMPANY.phone.e164}`}>{COMPANY.phone.display}</a>
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </address>
      <ul className="site-footer__links">
        <li>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </li>
        <li>
          <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </li>
        <li>
          <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li>
          <LocaleLink to="/privacy-policy">{t('nav.privacy')}</LocaleLink>
        </li>
        <li className="site-footer__copy">© {COMPANY.name}</li>
      </ul>
    </div>
  )
}

export default SiteFooter
