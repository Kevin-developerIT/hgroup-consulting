import { useState, useEffect, useRef, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { logohgroup, holdingsLogos } from './assets/logos'
import { images } from './assets'
import WorkWithUs from './components/WorkWithUs'
import JoinUs from './components/JoinUs'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import LanguageToggle from './components/LanguageToggle'
import HundredVoices from './components/HundredVoices'
import gsap from 'gsap'
import './App.css'

const holdingLinks = {
  hero: 'https://heromexico.com/',
  halo: 'https://halocontent.mx/',
  here: 'https://hereconvocatorias.com/',
  hits: 'https://hitspage.netlify.app/',
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
    const isFromSubpage = location.state?.fromSubpage
    const sessionVisited = sessionStorage.getItem('hasVisited')
    
    if (!isFromSubpage && !sessionVisited) {
      setIsInitialLoad(true)
      setShowPresentation(true)
      
      sessionStorage.setItem('hasVisited', 'true')
      
      const timer = setTimeout(() => {
        setShowPresentation(false)
        setIsInitialLoad(false)
      }, 4300)
      
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

      <header className={`main-header ${!showMainHeader ? 'hidden' : ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <img 
              src={logohgroup} 
              alt="HGROUP" 
              className="logo"
              onClick={() => {
                setActivePage('home')
                navigate('/', { state: { fromSubpage: false } })
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation('work', '/work-with-us')
                  }}
                  className={`nav-link ${activePage === 'work' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{t('nav.workWithUs')}</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation('join', '/join-us')
                  }}
                  className={`nav-link ${activePage === 'join' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{t('nav.joinUs')}</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation('hundred', '/100-voices')
                  }}
                  className={`nav-link ${activePage === 'hundred' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{t('nav.hundredVoices')}</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="https://www.instagram.com/hgroupp_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <span className="nav-text">{t('nav.followUs')}</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="holdings-list-vertical">
            {holdingsLogos.map((holding, index) => (
              <div
                key={holding.id} 
                className="holding-list-item"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleHoldingClick(holding.id)}
              >
                <span className="holding-name-wrapper">
                  <span className="holding-name">{holding.name}</span>
                </span>
                <span className="holding-arrow">↗</span>
              </div>
            ))}
          </div>

          <div className="view-work-btn">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`filter-toggle ${getActiveFilterCount() > 0 ? 'has-filters' : ''}`}
            >
              {t('nav.viewWorkBy')} : {getFilterDisplayText()}
              {getActiveFilterCount() > 0 && (
                <span className="filter-count">{getActiveFilterCount()}</span>
              )}
              <span className={`arrow ${showFilterMenu ? 'up' : 'down'}`}>▼</span>
            </button>
            
            {showFilterMenu && (
              <div className="filter-dropdown">
                <div className="filter-dropdown-content">
                  <button 
                    className="filter-close-mobile"
                    onClick={() => setShowFilterMenu(false)}
                    aria-label="Close filters"
                  >
                    ×
                  </button>
                  
                  {getActiveFilterCount() > 0 && (
                    <div className="filter-actions">
                      <button 
                        onClick={clearAllFilters}
                        className="clear-all-btn"
                      >
                        {t('nav.clearAll')} ({getActiveFilterCount()})
                      </button>
                    </div>
                  )}
                  
                  {getUniqueCategories().length > 0 && (
                    <div className="filter-section">
                      <h4>{t('nav.byH')}</h4>
                      {getUniqueCategories().map(category => (
                        <label key={category} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                          />
                          <span className="checkmark"></span>
                          <span className="filter-label">{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  <div className="filter-section">
                    <h4>{t('nav.byCompany')}</h4>
                    {getUniqueCompanies().map(company => (
                      <label key={company} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.includes(company)}
                          onChange={() => handleCompanyToggle(company)}
                        />
                        <span className="checkmark"></span>
                        <span className="filter-label">{company}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
            {/* Holdings Submenu - Solo móvil */}
<section className={`holdings-menu ${!showMainHeader ? 'fixed' : ''} ${!showHoldingsMenu ? 'hidden' : ''}`}>
  <div className="holdings-container">
    {holdingsLogos.map((holding, index) => (
      <div
        key={holding.id} 
        className="holding-item"
        style={{ animationDelay: `${0.5 + index * 0.1}s` }}
        onClick={() => handleHoldingClick(holding.id)}
      >
        <img 
          src={holding.logo} 
          alt={holding.alt} 
          className="holding-logo"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="holding-placeholder" style={{ display: 'none' }}>
          {holding.name}
        </div>
      </div>
    ))}
  </div>
</section>
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

      <div className="zoom-controls">
        <button 
          className={`zoom-btn zoom-plus ${isAnimating ? 'animating' : ''}`}
          onClick={handleZoomIn}
          disabled={gridColumns === 1 || isAnimating}
        >
          +
        </button>
        <div className="zoom-divider"></div>
        <button 
          className={`zoom-btn zoom-minus ${isAnimating ? 'animating' : ''}`}
          onClick={handleZoomOut}
          disabled={gridColumns === 7 || isAnimating}
        >
          −
        </button>
      </div>

      <main className="main-content">
        <section className="portfolio-section">
          <div 
            ref={portfolioRef}
            className="portfolio-masonry"
            data-columns={gridColumns}
            style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            {filteredProjects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className="portfolio-item-wrapper"
                onClick={() => openProject(project)}
              >
                <div className="portfolio-item-inner">
                  {project.type === 'image' ? (
                    <img 
                      src={project.image} 
                      alt={project.alt}
                      className="portfolio-image"
                    />
                  ) : (
                    <video 
                      src={project.video}
                      className="portfolio-video"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  )}
                  <div className="project-info-container">
                    {project.category && (
                      <span className="project-tag">{project.category}</span>
                    )}
                    {project.company && (
                      <span className="project-tag company">{project.company}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && getActiveFilterCount() > 0 && (
            <div className="no-results">
              <h3>{t('nav.noResults')}</h3>
              <p>{t('nav.tryAdjusting')} <button onClick={clearAllFilters} className="clear-link">{t('nav.clearFilters')}</button></p>
            </div>
          )}
        </section>
      </main>

      {selectedProject && (
        <div className="fullscreen-modal" onClick={closeProject}>
          <button className="close-modal" onClick={closeProject}>
            ×
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedProject.type === 'image' ? (
              <img 
                src={selectedProject.image} 
                alt={selectedProject.alt}
                className="modal-image"
              />
            ) : (
              <video 
                src={selectedProject.video}
                className="modal-video"
                controls
                autoPlay
                loop
              />
            )}
            <div className="modal-info">
              {selectedProject.category && (
                <span className="modal-tag">{selectedProject.category}</span>
              )}
              {selectedProject.company && (
                <span className="modal-tag company">{selectedProject.company}</span>
              )}
            </div>
          </div>
        </div>
      )}

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
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App