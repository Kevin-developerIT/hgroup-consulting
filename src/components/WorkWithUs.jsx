import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { holdingLinks } from '../data/holdings'
import { useLanguage } from '../contexts/useLanguage'
import { useCanonical } from '../hooks/useCanonical'
import LanguageToggle from './LanguageToggle'
import './Pages.css'

function WorkWithUs() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  useCanonical('Trabaja con nosotros — HGROUP')

  const expertise = t('expertise')

  const handleClose = () => {
    navigate('/')
  }

  const handleHoldingClick = (e, holdingName) => {
    const link = holdingLinks[holdingName.toLowerCase()]
    if (link) {
      e.preventDefault()
      window.open(link, '_blank')
    }
  }

  return (
    <>
    <div className="page-container">
      <button 
        className="close-page-btn"
        onClick={handleClose}
        aria-label="Close page"
      >
        ×
      </button>
      
      <div className="page-sidebar">
        <div onClick={handleClose} style={{ cursor: 'pointer' }}>
          <img src={logohgroup} alt="HGROUP" className="page-logo" />
        </div>
        
        <div className="sidebar-content">
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <span className="nav-item">{t('nav.workWithUs')}</span>
          </div>
          <div className="page-nav">
            <Link to="/join-us" className="nav-item">{t('nav.joinUs')}</Link>
          </div>
          <div className="page-nav">
            <Link to="/100-voices" className="nav-item">{t('nav.hundredVoices')}</Link>
          </div>
          <div className="page-nav">
            <Link to="/contact" className="nav-item">{t('nav.contact')}</Link>
          </div>
          <div className="page-nav">
            <a href="https://www.instagram.com/hgroupp_/" target="_blank" rel="noopener noreferrer" className="nav-item">
              {t('nav.followUs')} <span style={{fontSize: '0.8rem', marginLeft: '4px'}}>↗</span>
            </a>
          </div>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/hgroupp_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://www.linkedin.com/company/herohgroup/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              IN
            </a>
          </div>

          <div className="sidebar-legal">
            <Link to="/privacy-policy">Política de Privacidad</Link>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="content-text">
          <p>{t('workWithUs.text1')}</p>
          <p>{t('workWithUs.text2')}</p>
          <p>{t('workWithUs.text3')}</p>
          <p>{t('workWithUs.text4')}</p>
        </div>

        <div className="contact-section">
  <h3>{t('workWithUs.contact')}</h3>
  <a 
    href="https://wa.me/5215535358818?text=Hola%20HGROUP,%20me%20gustaría%20trabajar%20con%20ustedes"
    target="_blank"
    rel="noopener noreferrer"
    className="contact-email whatsapp-link"
  >

    {t('workWithUs.whatsapp')}
  </a>
</div>

        <div className="expertise-section">
          <h3>{t('workWithUs.ourHs')}</h3>
          <div className="h-list">
            {expertise
              /* HUGE is hidden from the public list per business
                 decision — uncomment its filter line to bring it
                 back without touching the translation source. */
              .filter((item) => item.name !== 'HUGE')
              .map((item, index) => (
                <div key={index} className="h-item">
                  <div className="h-header">
                    <h4 className="h-name">{item.name}</h4>
                    <a
                      href={holdingLinks[item.name.toLowerCase()] || `#${item.name.toLowerCase()}`}
                      className="h-link"
                      onClick={(e) => handleHoldingClick(e, item.name)}
                      target={holdingLinks[item.name.toLowerCase()] ? "_blank" : "_self"}
                      rel={holdingLinks[item.name.toLowerCase()] ? "noopener noreferrer" : undefined}
                    >
                      {t('workWithUs.viewMore')} <span className="h-arrow">↗</span>
                    </a>
                  </div>
                  <p className="h-description">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
       
      </div>
      
    </div>
    {/* Language Toggle */}
      <LanguageToggle />
    </>
  )
}

export default WorkWithUs