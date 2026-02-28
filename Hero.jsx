import React from 'react'
import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">
              Plan Your Dream Trip with{' '}
              <span className="gradient-text">AI Precision</span>
            </h1>
            <p className="hero-subtitle">
              Advanced machine learning algorithms analyze millions of data points 
              to give you the most accurate travel cost estimates for UAE and worldwide destinations.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Calculations</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Destinations</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>

            <motion.button
              className="btn btn-gradient btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Planning <i className="fas fa-arrow-right"></i>
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card card-1">
              <i className="fas fa-plane"></i>
              <span>Dubai: 3,500 AED</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-hotel"></i>
              <span>5-Star: 900 AED/night</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-umbrella-beach"></i>
              <span>Activities: 250 AED</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
