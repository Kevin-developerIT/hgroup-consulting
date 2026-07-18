import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/useLanguage'
import { useCanonical } from '../hooks/useCanonical'
import LanguageToggle from './LanguageToggle'
import './Pages.css'
import './Privacy.css'

const CONTACT_EMAIL = 'kevin.martinez@hgroup.consulting'
const SITE_URL = 'https://hgroup.consulting/'

function Section({ number, title, children }) {
  return (
    <>
      <h2>
        <span className="privacy-section-number">{number}.</span>
        {title}
      </h2>
      {children}
    </>
  )
}

function Privacy() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  useCanonical('Política de Privacidad — HGROUP')

  const handleClose = () => navigate('/')

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
              <Link to="/contact" className="nav-item">
                {t('nav.contact')}
              </Link>
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
          </div>
        </div>

        <div className="page-content">
          <article className="privacy-article">
            <h1>Política de Privacidad</h1>
            <p className="privacy-updated">
              Última actualización: 17 de julio de 2026
            </p>

            <p className="privacy-lead">
              En MYT Marketing Comunicación (&quot;HGROUP&quot;, &quot;nosotros&quot; o &quot;la empresa&quot;), respetamos la privacidad de nuestros usuarios y nos comprometemos a proteger la información personal que recopilamos.
            </p>

            <p>
              Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos los datos personales obtenidos a través de nuestro sitio web, formularios de contacto, campañas digitales y formularios de generación de prospectos en plataformas como LinkedIn, Meta y otros medios digitales.
            </p>

            <Section number="1" title="Responsable del tratamiento de los datos">
              <div className="privacy-meta-block">
                <p><strong>Razón social:</strong> MYT Marketing Comunicación</p>
                <p>
                  <strong>Sitio web:</strong>{' '}
                  <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                    {SITE_URL}
                  </a>
                </p>
                <p>
                  <strong>Correo electrónico de contacto:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
              </div>
            </Section>

            <Section number="2" title="Información que recopilamos">
              <p>
                Podemos recopilar la siguiente información cuando un usuario interactúa con nuestros formularios o solicita información sobre nuestros servicios:
              </p>
              <ul>
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número telefónico</li>
                <li>Empresa</li>
                <li>Cargo</li>
                <li>Industria</li>
                <li>Ciudad o país</li>
                <li>Cualquier otra información que el usuario decida compartir voluntariamente.</li>
              </ul>
            </Section>

            <Section number="3" title="Finalidad del tratamiento">
              <p>La información recopilada podrá utilizarse para:</p>
              <ul>
                <li>Contactar al usuario respecto a los servicios de HGROUP.</li>
                <li>Dar seguimiento a solicitudes de información o cotizaciones.</li>
                <li>Compartir propuestas comerciales.</li>
                <li>Programar reuniones o demostraciones.</li>
                <li>Enviar contenido relacionado con marketing, comunicación, creatividad, producción, estrategia digital e innovación.</li>
                <li>Mejorar nuestros productos, servicios y experiencia del usuario.</li>
                <li>Cumplir obligaciones legales cuando sea aplicable.</li>
              </ul>
            </Section>

            <Section number="4" title="Compartición de información">
              <p>
                MYT Marketing Comunicación no vende ni comercializa datos personales.
              </p>
              <p>
                La información únicamente podrá compartirse con proveedores tecnológicos o socios comerciales que participen en la prestación de nuestros servicios y que estén obligados a mantener la confidencialidad de la información.
              </p>
              <p>
                Asimismo, podremos divulgar información cuando exista una obligación legal o una solicitud de una autoridad competente.
              </p>
            </Section>

            <Section number="5" title="Conservación de la información">
              <p>
                Los datos personales se conservarán únicamente durante el tiempo necesario para cumplir con las finalidades descritas en esta Política o conforme a las obligaciones legales aplicables.
              </p>
            </Section>

            <Section number="6" title="Seguridad">
              <p>
                Implementamos medidas administrativas, técnicas y organizacionales razonables para proteger la información personal contra pérdida, uso indebido, acceso no autorizado, alteración o divulgación.
              </p>
              <p>
                No obstante, ningún sistema de transmisión o almacenamiento electrónico puede garantizar una seguridad absoluta.
              </p>
            </Section>

            <Section number="7" title="Derechos del titular">
              <p>El usuario podrá solicitar en cualquier momento:</p>
              <ul>
                <li>Acceder a sus datos personales.</li>
                <li>Rectificar información incorrecta o desactualizada.</li>
                <li>Solicitar la eliminación de sus datos cuando sea legalmente procedente.</li>
                <li>Limitar u oponerse al tratamiento de su información.</li>
                <li>Retirar su consentimiento para recibir comunicaciones comerciales.</li>
              </ul>
              <p>
                Las solicitudes podrán enviarse a{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </Section>

            <Section number="8" title="Cookies">
              <p>
                Nuestro sitio web puede utilizar cookies y tecnologías similares para analizar el comportamiento de navegación, mejorar la experiencia del usuario y optimizar nuestras campañas de marketing.
              </p>
              <p>
                El usuario puede modificar la configuración de cookies desde su navegador.
              </p>
            </Section>

            <Section number="9" title="Cambios a esta Política">
              <p>
                MYT Marketing Comunicación podrá actualizar esta Política de Privacidad en cualquier momento. Las modificaciones serán publicadas en esta misma página junto con la fecha de la última actualización.
              </p>
            </Section>

            <Section number="10" title="Contacto">
              <p>
                Si tienes preguntas relacionadas con esta Política de Privacidad o con el tratamiento de tus datos personales, puedes escribirnos a:
              </p>
              <div className="privacy-meta-block">
                <p><strong>MYT Marketing Comunicación</strong></p>
                <p>
                  <strong>Correo:</strong>{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
                <p>
                  <strong>Sitio web:</strong>{' '}
                  <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
                    {SITE_URL}
                  </a>
                </p>
              </div>
            </Section>
          </article>
        </div>
      </div>
      <LanguageToggle />
    </>
  )
}

export default Privacy
