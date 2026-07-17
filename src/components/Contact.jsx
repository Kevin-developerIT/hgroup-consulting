import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/useLanguage'
import LanguageToggle from './LanguageToggle'
import './Pages.css'
import './Contact.css'

/* ==============================================================
   Contact — submits to kevin.martinez@hgroup.consulting via FormSubmit
   --------------------------------------------------------------
   FormSubmit (formsubmit.co) is a free no-account email-forwarding
   service. The very first submission triggers a verification email
   to the recipient — once they click the verification link, every
   subsequent submission lands in their inbox.

   We POST as JSON to the `/ajax/...` endpoint so we get a real
   in-page success state instead of a redirect.
   ============================================================== */

const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/kevin.martinez@hgroup.consulting'

function Contact() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const handleClose = () => {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const formEl = e.target
    const formData = new FormData(formEl)
    const payload = Object.fromEntries(formData.entries())

    // Honeypot — if a bot fills the hidden _honey field, silently succeed
    if (payload._honey) {
      setStatus('success')
      formEl.reset()
      return
    }

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      /* FormSubmit responds 200 even when the endpoint isn't activated
         yet, or when validation fails — success lives in the JSON body
         as a STRING ("true" / "false"), not as an HTTP status. */
      const data = await response.json().catch(() => null)
      if (response.ok && data?.success === 'true') {
        setStatus('success')
        formEl.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
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
              <Link to="/work-with-us" className="nav-item">
                {t('nav.workWithUs')}
              </Link>
            </div>
            <div className="page-nav">
              <Link to="/join-us" className="nav-item">
                {t('nav.joinUs')}
              </Link>
            </div>
            <div className="page-nav">
              <Link to="/100-voices" className="nav-item">
                {t('nav.hundredVoices')}
              </Link>
            </div>
            <div className="page-nav">
              <span className="nav-dot active"></span>
              <span className="nav-item">{t('nav.contact')}</span>
            </div>
            <div className="page-nav">
              <a
                href="https://www.instagram.com/hgroupp_/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
              >
                {t('nav.followUs')}{' '}
                <span style={{ fontSize: '0.8rem', marginLeft: '4px' }}>↗</span>
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
              <Link to="/privacidad">Política de Privacidad</Link>
            </div>
          </div>
        </div>

        <div className="page-content">
          <h2 className="contact-headline">{t('contact.headline')}</h2>
          <p className="contact-intro">{t('contact.intro')}</p>

          {status === 'success' ? (
            <div className="contact-success">
              <h3 className="contact-success-title">{t('contact.successTitle')}</h3>
              <p className="contact-success-message">{t('contact.successMessage')}</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="contact-submit"
              >
                {t('contact.sendAnother')}{' '}
                <span className="contact-submit-arrow">↗</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Honeypot — hidden from real users, irresistible to bots */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
              />
              {/* FormSubmit config — email subject + skip captcha + table layout */}
              <input
                type="hidden"
                name="_subject"
                value="New contact form submission — HGROUP"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">{t('contact.name')}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">{t('contact.email')}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-company">{t('contact.company')}</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">{t('contact.message')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="contact-error">{t('contact.errorMessage')}</div>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? t('contact.sending') : t('contact.send')}
                <span className="contact-submit-arrow">↗</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <LanguageToggle />
    </>
  )
}

export default Contact
