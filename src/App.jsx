import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { logohgroup, logohgroupWord } from './assets/logos'
import { LanguageProvider } from './contexts/LanguageContext'
import { useLanguage, useLocalePath } from './contexts/useLanguage'
import LocaleLink from './components/LocaleLink'
import LanguageToggle from './components/LanguageToggle'
import HsAccordion from './components/HsAccordion'
import BrandsMarquee from './components/BrandsMarquee'
import heroBannerVideo from './assets/mp4/videoprincipal.MOV'
import { usePageMeta } from './hooks/usePageMeta'
import { LANGS, PAGES } from './data/seo'
import './App.css'

/* Subpages are code-split — the home bundle stays lean. */
const WorkWithUs = lazy(() => import('./components/WorkWithUs'))
const JoinUs = lazy(() => import('./components/JoinUs'))
const HundredVoices = lazy(() => import('./components/HundredVoices'))
const Contact = lazy(() => import('./components/Contact'))
const Privacy = lazy(() => import('./components/Privacy'))
const BrandPage = lazy(() => import('./components/BrandPage'))

/* The intro overlay plays once per page load. Later visits to the home
   within the same session (back button, language switch, "all brands")
   skip it. Set only after it finishes, so StrictMode's double effect
   run in dev doesn't cancel it. */
let introShown = false

/* HERO_VIDEO — dedicated hero clip (videoprincipal.MOV).
   Set to `null` for the white-background fallback. */
const HERO_VIDEO = heroBannerVideo

function HomePage() {
  const [showMainHeader, setShowMainHeader] = useState(true)
  const [showPresentation, setShowPresentation] = useState(() => !introShown)
  const [isInitialLoad, setIsInitialLoad] = useState(() => !introShown)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const localize = useLocalePath()
  const location = useLocation()
  const { t } = useLanguage()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    /* Loading overlay: only on the first landing of this page load
       (refresh, new tab, deep link). In-site navigation back to the
       home skips it so it feels instant. */
    if (introShown || location.state?.fromSubpage) {
      introShown = true
      setIsInitialLoad(false)
      setShowPresentation(false)
      return
    }
    const timer = setTimeout(() => {
      introShown = true
      setShowPresentation(false)
      setIsInitialLoad(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [location])

  // "All brands" links land on the accordion (/#marcas).
  useEffect(() => {
    if (location.hash === '#marcas') {
      document.getElementById('marcas')?.scrollIntoView()
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setShowMainHeader(y <= 50)
      if (y > 50) setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="App" ref={containerRef}>
      {showPresentation && isInitialLoad && (
        <div className="presentation-overlay">
          <div className="presentation-content">
            <img
              src={logohgroup}
              alt="HGROUP"
              className="presentation-logo"
            />
          </div>
        </div>
      )}

      <section className={`hero-banner ${HERO_VIDEO ? 'has-video' : ''}`}>
        <div className="hero-stage">
        {HERO_VIDEO ? (
          <>
            <video
              className="hero-video"
              src={HERO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="hero-scrim" aria-hidden="true" />
          </>
        ) : (
          <div className="hero-bg" />
        )}
        <div className="hero-overlay" />

        <nav className="hero-nav">
          <ul className="hero-nav-list">
            <li>
              <LocaleLink to="/work-with-us" className="hero-nav-link">
                {t('nav.workWithUs')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/join-us" className="hero-nav-link">
                {t('nav.joinUs')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/100-voices" className="hero-nav-link">
                {t('nav.hundredVoices')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/contact" className="hero-nav-link">
                {t('nav.contact')}
              </LocaleLink>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hgroupp_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-nav-link"
              >
                {t('nav.followUs')} <span className="hero-nav-arrow">↗</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="hero-content">
          <h1 className="hero-title">
            <img src={logohgroupWord} alt="" className="hero-logo" />
            <span className="sr-only">{t('home.h1')}</span>
          </h1>
        </div>
        </div>

        {/* White scroll cue strip — separates the hero from the
            menu below and invites the user to scroll down */}
        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="hero-scroll-cue-label">Scroll</span>
          <span className="hero-scroll-cue-arrow">↓</span>
        </div>
      </section>

      <BrandsMarquee />

      {/* Unified menu + H showcase — video bg + interactive list with
          inline description + CTA on the active H. */}
      <HsAccordion />

      <nav className={`horizontal-nav ${!showMainHeader ? 'visible' : ''}`}>
        <div className="nav-content">
          <img
            src={logohgroup}
            alt="HGROUP"
            className="logo-small"
            onClick={() => {
              navigate(localize('/'))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{ cursor: 'pointer' }}
          />

          <ul
            className={`horizontal-nav-list ${mobileMenuOpen ? 'mobile-open' : ''}`}
            style={mobileMenuOpen && isMobile ? {
              background: '#FFFFFF',
              position: 'fixed',
              top: '60px',
              left: '0',
              right: '0',
              bottom: '0',
              width: '100%',
              height: 'calc(100vh - 60px)',
              zIndex: 997,
              padding: '40px',
              flexDirection: 'column',
              gap: '25px',
              display: 'flex'
            } : {}}
          >
            <li>
              <LocaleLink to="/work-with-us" onClick={closeMobileMenu}>
                {t('nav.workWithUs')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/join-us" onClick={closeMobileMenu}>
                {t('nav.joinUs')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/100-voices" onClick={closeMobileMenu}>
                {t('nav.hundredVoices')}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/contact" onClick={closeMobileMenu}>
                {t('nav.contact')}
              </LocaleLink>
            </li>
            <li>
              <a
                href="https://www.instagram.com/hgroupp_/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.followUs')} <span className="nav-arrow-small">↗</span>
              </a>
            </li>
          </ul>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <LanguageToggle />
    </div>
  )
}

const PAGE_COMPONENTS = {
  home: HomePage,
  work: WorkWithUs,
  join: JoinUs,
  hundred: HundredVoices,
  contact: Contact,
  privacy: Privacy,
}

const pageElement = (page) => {
  if (page.brandId) return <BrandPage brandId={page.brandId} />
  const Page = PAGE_COMPONENTS[page.id]
  return <Page />
}

/* The router lives outside App: BrowserRouter in main.jsx (browser),
   StaticRouter in entry-server.jsx (build-time prerender). Every page
   is mounted at both its Spanish and English path (see data/seo.js). */
function App() {
  usePageMeta()

  return (
    <LanguageProvider>
      <Suspense fallback={<div className="route-fallback" aria-hidden="true" />}>
        <Routes>
          {PAGES.flatMap((page) =>
            LANGS.map((lang) => (
              <Route key={page.paths[lang]} path={page.paths[lang]} element={pageElement(page)} />
            ))
          )}
        </Routes>
      </Suspense>
    </LanguageProvider>
  )
}

export default App
