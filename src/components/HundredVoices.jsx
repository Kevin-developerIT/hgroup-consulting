import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { images } from '../assets'
import './Pages.css'

function HundredVoices() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  
  const handleClose = () => {
    navigate('/')
  }

  // Número de WhatsApp - cambia esto por el número real
  const whatsappNumber = '525644162396' // Reemplaza con el número real
  const whatsappMessage = encodeURIComponent('Hola, me gustaría obtener más información sobre 100 Voces')

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
            <Link to="/join-us" className="nav-item">{t('nav.joinUs')}</Link>
          </div>
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <span className="nav-item">CIEN VOCES</span>
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
          {/* Hero Section con número grande */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '50px',
            position: 'relative',
            paddingRight: '20px' // Añadido para evitar corte
          }}>
         <h1 style={{
    fontSize: 'clamp(4rem, 10vw, 7rem)', // Ajustado para mejor proporción
    fontWeight: '900',
    lineHeight: '0.9',
    margin: 0,
    color: '#000', // Texto negro sólido
    letterSpacing: '-0.02em',
    flexShrink: 0 // Evita que se comprima
  }}>
    CIEN
  </h1>
  <h2 style={{
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', // Más pequeño que CIEN
    fontWeight: '700',
    margin: 0,
    marginBottom: '0',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    lineHeight: '1',
    color: '#000',
    flexShrink: 0 // Evita que se comprima
  }}>
    VOCES
  </h2>
</div>

{/* Subtítulo destacado */}
<p style={{ 
  fontSize: '1.2rem', // Reducido ligeramente
  fontWeight: '300', 
  marginBottom: '50px',
  color: '#000',
  lineHeight: '1.6',
  maxWidth: '700px',
  letterSpacing: '0.3px'
}}>
  {t('hundredVoices.subtitle')}
</p>

          {/* Quote destacado */}
          <blockquote style={{
            borderLeft: '4px solid #000',
            paddingLeft: '30px',
            marginLeft: '0',
            marginBottom: '50px',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: '#403d39'
          }}>
            {t('hundredVoices.quote')}
          </blockquote>

          {/* Imagen principal de 100 voces */}
          {images.cienvoces && (
            <div style={{
              marginBottom: '60px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <img 
                src={images.cienvoces} 
                alt="100 Voces" 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          )}
          
          {/* Descripción principal */}
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '60px'
          }}>
            <p style={{ lineHeight: '1.8', color: '#403d39' }}>
              {t('hundredVoices.description1')}
            </p>
            
            <p style={{ lineHeight: '1.8', color: '#403d39' }}>
              {t('hundredVoices.description2')}
            </p>
          </div>

          {/* Segunda imagen opcional */}
          {images.cienvoces2 && (
            <div style={{
              marginBottom: '80px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <img 
                src={images.cienvoces2} 
                alt="100 Voces Evento" 
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          )}
        </div>

        {/* Contact Section con WhatsApp */}
        <div style={{ 
          marginTop: '80px',
          textAlign: 'center',
          padding: '50px 0'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '40px',
            color: '#666'
          }}>
            {t('hundredVoices.inquiries')}
          </h3>

          <div>
            <button style={{
              background: '#000',
              color: '#fff',
              padding: '18px 50px',
              border: '2px solid #000',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '700',
              fontFamily: 'Visby CF, sans-serif',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank')}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('hundredVoices.requestInfo')}
            </button>
          </div>
        </div>
      </div>
     
    </div>
     {/* Language Toggle */}
      <LanguageToggle />
    </>
  )
}

export default HundredVoices