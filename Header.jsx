import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTravel } from '../context/TravelContext'

function Header() {
  const { darkMode, setDarkMode, recentSearches } = useTravel()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container header-container">
        <div className="logo-wrapper">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-icon">✈️</span>
            <span className="logo-text">AI Travel<span className="highlight">Pro</span></span>
          </motion.div>
          {recentSearches.length > 0 && (
            <div className="recent-badge">
              <i className="fas fa-history"></i> {recentSearches.length}
            </div>
          )}
        </div>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('calculator')}>Calculator</button>
          <button onClick={() => scrollToSection('features')}>Features</button>
          <button onClick={() => scrollToSection('testimonials')}>Reviews</button>
          <button onClick={() => scrollToSection('faq')}>FAQ</button>
        </nav>

        <div className="header-actions">
          <motion.button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i>
          </motion.button>
          
          <motion.button 
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
