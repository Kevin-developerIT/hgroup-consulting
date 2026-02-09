import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import './Pages.css'

function JoinUs() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  
  // Direct navigation without loading
  const handleClose = () => {
    navigate('/')
  }
  
  // Get openings from translations
  const openings = t('joinUs.openings') || []

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
            <Link to="/work-with-us" className="nav-item">{t('nav.workWithUs')}</Link>
          </div>
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <span className="nav-item">{t('nav.joinUs')}</span>
          </div>
          <div className="page-nav">
            <Link to="/100-voices" className="nav-item">{t('nav.hundredVoices')}</Link>
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
        </div>
      </div>

      <div className="page-content">
        <div className="content-text">
          <p>{t('joinUs.text1')}</p>
          <p dangerouslySetInnerHTML={{ 
            __html: t('joinUs.text2').replace('aquí', '<strong>aquí</strong>').replace('here', '<strong>here</strong>')
          }} />
        </div>

        <div className="filter-buttons">
          <button className="filter-btn active">{t('joinUs.allLocations')}</button>
          <button className="filter-btn">{language === 'en' ? 'MEXICO CITY' : 'CDMX'}</button>
        </div>

        <div className="job-listings">
          {openings.map((job, index) => (
            <div key={index} className="job-item">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-location">{job.location}</p>
              <p className="job-description">{job.description}</p>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-link">
                {t('joinUs.applyLinkedin')} <span className="arrow">↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
     
    </div>
     {/* Language Toggle */}
      <LanguageToggle />
    </>
  )
}

export default JoinUs