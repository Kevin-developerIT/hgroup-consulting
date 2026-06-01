import { useState, useEffect, useRef, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { logohgroup, logohgroupWord, holdingsLogos } from './assets/logos'
import { images } from './assets'
import WorkWithUs from './components/WorkWithUs'
import JoinUs from './components/JoinUs'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import LanguageToggle from './components/LanguageToggle'
import HundredVoices from './components/HundredVoices'
import Contact from './components/Contact'
import HsAccordion from './components/HsAccordion'
import haloBannerVideo from './assets/mp4/halovideo.mp4'

/* ----------------------------------------------------------------
   HERO_VIDEO — currently reusing HALO's video by request.
   Swap the import above for a dedicated hero video when ready.
   Set to `null` for the white-background fallback.
   ---------------------------------------------------------------- */
const HERO_VIDEO = haloBannerVideo
import gsap from 'gsap'
import './App.css'

const holdingLinks = {
  hero: 'https://heromexico.com/',
  halo: 'https://halocontent.mx/',
  here: 'https://hereconvocatorias.com/',
  hits: 'https://hitscreativity.com/',
  hook: 'https://hookproductions.mx/',
  hunt: 'https://huntmedia.mx/',
  hype: 'https://hypeagency.mx/',
  hack: 'https://hackdigital.mx/',
  home: 'https://homemalls.mx/',
  hope: 'https://hopeadvertising.mx/',
  huge: 'https://hugeproperties.mx/'
};

function HomePage() {
  const [showMainHeader, setShowMainHeader] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const getInitialColumns = () => {
    if (window.innerWidth <= 768) return 2
    if (window.innerWidth <= 1024) return 3
    return 3
  }

  const [gridColumns, setGridColumns] = useState(getInitialColumns())
  const [showPresentation, setShowPresentation] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activePage, setActivePage] = useState('home')
  const [showHoldingsMenu, setShowHoldingsMenu] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  
  const [isMobile, setIsMobile] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  
  const portfolioRef = useRef(null)
  const timelineRef = useRef(null)
  const containerRef = useRef(null)
  
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    /* Show the loading overlay every time the user lands on `/`
       directly (refresh, new tab, deep link). Subpage → home
       navigation still skips it so the back-button feels instant. */
    const isFromSubpage = location.state?.fromSubpage

    if (!isFromSubpage) {
      setIsInitialLoad(true)
      setShowPresentation(true)

      const timer = setTimeout(() => {
        setShowPresentation(false)
        setIsInitialLoad(false)
      }, 4000) /* ~4s total loading experience (rotation + fade) */

      return () => clearTimeout(timer)
    } else {
      setIsInitialLoad(false)
      setShowPresentation(false)
    }
  }, [location])

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const getUniqueCategories = () => {
    if (!images.allPortfolioItems) return []
    const categories = [...new Set(images.allPortfolioItems.map(item => item.category))]
    return categories.filter(cat => cat).sort()
  }

  const getUniqueCompanies = () => {
    if (!images.allPortfolioItems) return []
    const portfolioCompanies = images.allPortfolioItems.map(item => item.company).filter(comp => comp)
    const allCompanies = [...new Set(portfolioCompanies)]
    return allCompanies.sort()
  }

  useEffect(() => {
    if (!images.allPortfolioItems) {
      setFilteredProjects([])
      return
    }

    let filtered = [...images.allPortfolioItems]
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      )
    }
    
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(item => 
        selectedCompanies.includes(item.company)
      )
    }
    
    const shuffled = shuffleArray(filtered)
    setFilteredProjects(shuffled)
  }, [selectedCategories, selectedCompanies])

  useEffect(() => {
    if (images.allPortfolioItems) {
      const shuffled = shuffleArray([...images.allPortfolioItems])
      setFilteredProjects(shuffled)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      if (window.scrollY > 50 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
      
      if (window.scrollY > 100) {
        setShowHoldingsMenu(false)
      } else {
        setShowHoldingsMenu(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  useEffect(() => {
    if (scrollY > 50) {
      setShowMainHeader(false)
    } else {
      setShowMainHeader(true)
    }
  }, [scrollY])

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  useEffect(() => {
    if (!portfolioRef.current || !containerRef.current) return

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const items = Array.from(portfolioRef.current.querySelectorAll('.portfolio-item-wrapper'))
    
    if (items.length === 0) return

    setIsAnimating(true)

    const initialStates = items.map(item => {
      const rect = item.getBoundingClientRect()
      return {
        element: item,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    })

    portfolioRef.current.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`
    portfolioRef.current.offsetHeight

    const finalStates = items.map(item => {
      const rect = item.getBoundingClientRect()
      return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    })

    const masterTL = gsap.timeline({
      defaults: {
        duration: isMobile ? 5.5 : 6.2,
        ease: isMobile ? "power2.out" : "power3.inOut"
      },
      onComplete: () => {
        setIsAnimating(false)
      }
    })

    items.forEach((item, i) => {
      const initial = initialStates[i]
      const final = finalStates[i]
      
      const deltaX = initial.x - final.x
      const deltaY = initial.y - final.y
      
      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const dynamicDuration = Math.min(2, Math.max(0.5, distance / 15))
        
        gsap.set(item, {
          x: deltaX,
          y: deltaY,
          scale: 0.97,
          rotation: 0,
          opacity: 0.8
        })
        
        masterTL.to(item, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: dynamicDuration,
          ease: "back.out(1.2)",
          overwrite: true
        }, i * 0.01)
        
      } else {
        gsap.set(item, {
          x: 0,
          y: 0,
          scale: 0.98,
          rotation: 0,
          opacity: 0.9
        })
        
        masterTL.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, i * 0.03)
      }
    })

    timelineRef.current = masterTL
  }, [gridColumns, isMobile])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterMenu && !event.target.closest('.view-work-btn')) {
        setShowFilterMenu(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showFilterMenu])

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe && gridColumns < 7) {
      handleZoomOut()
    }
    if (isRightSwipe && gridColumns > 1) {
      handleZoomIn()
    }
  }

  const handleZoomOut = () => {
    if (isAnimating || gridColumns >= 7) return
    setIsAnimating(true)
    
    portfolioRef.current?.classList.add('transitioning')
    
    setTimeout(() => {
      setGridColumns(prev => Math.min(prev + 1, 7))
      setTimeout(() => {
        portfolioRef.current?.classList.remove('transitioning')
        setIsAnimating(false)
      }, 100)
    }, 100)
  }

  const handleZoomIn = () => {
    if (isAnimating || gridColumns <= 1) return
    setIsAnimating(true)
    
    portfolioRef.current?.classList.add('transitioning')
    
    setTimeout(() => {
      setGridColumns(prev => Math.max(prev - 1, 1))
      setTimeout(() => {
        portfolioRef.current?.classList.remove('transitioning')
        setIsAnimating(false)
      }, 100)
    }, 100)
  }

  const openProject = (project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleCompanyToggle = (company) => {
    setSelectedCompanies(prev => {
      if (prev.includes(company)) {
        return prev.filter(comp => comp !== company)
      } else {
        return [...prev, company]
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCompanies([])
    setShowFilterMenu(false)
  }

  const handleHoldingClick = (holdingId) => {
    const link = holdingLinks[holdingId];
    
    if (link) {
      window.open(link, '_blank');
    } else {
      console.log(`No link available for ${holdingId} yet`);
    }
  }

  const getFilterDisplayText = () => {
    const totalFilters = selectedCategories.length + selectedCompanies.length
    
    if (totalFilters === 0) return t('nav.allWork')
    if (totalFilters === 1) {
      if (selectedCategories.length === 1) return selectedCategories[0].toUpperCase()
      if (selectedCompanies.length === 1) return selectedCompanies[0].toUpperCase()
    }
    
    return `${totalFilters} ${t('nav.filtersActive')}`
  }

  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedCompanies.length
  }

  const handleNavigation = (page, path) => {
    setActivePage(page)
    navigate(path)
  }

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
              <a
                onClick={(e) => { e.preventDefault(); handleNavigation('work', '/work-with-us') }}
                className="hero-nav-link"
              >
                {t('nav.workWithUs')}
              </a>
            </li>
            <li>
              <a
                onClick={(e) => { e.preventDefault(); handleNavigation('join', '/join-us') }}
                className="hero-nav-link"
              >
                {t('nav.joinUs')}
              </a>
            </li>
            <li>
              <a
                onClick={(e) => { e.preventDefault(); handleNavigation('hundred', '/100-voices') }}
                className="hero-nav-link"
              >
                {t('nav.hundredVoices')}
              </a>
            </li>
            <li>
              <a
                onClick={(e) => { e.preventDefault(); handleNavigation('contact', '/contact') }}
                className="hero-nav-link"
              >
                {t('nav.contact')}
              </a>
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
          <img src={logohgroupWord} alt="HGROUP" className="hero-logo" />
        </div>
        </div>

        {/* White scroll cue strip — separates the hero from the
            menu below and invites the user to scroll down */}
        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="hero-scroll-cue-label">Scroll</span>
          <span className="hero-scroll-cue-arrow">↓</span>
        </div>
      </section>

      {/* Unified menu + H showcase — video bg + interactive list with
          inline description + CTA on the active H. Replaces both the
          old menu section and the per-H gallery sections. */}
      <HsAccordion />

      <nav className={`horizontal-nav ${!showMainHeader ? 'visible' : ''}`}>
        <div className="nav-content">
          <img 
            src={logohgroup} 
            alt="HGROUP" 
            className="logo-small"
            onClick={() => {
              setActivePage('home')
              navigate('/', { state: { fromSubpage: false } })
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
              <a 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('work', '/work-with-us')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'work' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.workWithUs')}
              </a>
            </li>
            <li>
              <a 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('join', '/join-us')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'join' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.joinUs')}
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('hundred', '/100-voices')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'hundred' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.hundredVoices')}
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('contact', '/contact')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'contact' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.contact')}
              </a>
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

function App() {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <LanguageProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/100-voices" element={<HundredVoices />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App