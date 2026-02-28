import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: '🧠',
    title: 'Neural Network Analysis',
    description: 'Our AI uses deep learning to analyze seasonal trends, demand patterns, and pricing fluctuations.',
    color: '#667eea'
  },
  {
    icon: '📊',
    title: 'Real-time Data Processing',
    description: 'Processes millions of data points instantly to give you the most accurate estimates.',
    color: '#f093fb'
  },
  {
    icon: '🎯',
    title: 'Predictive Algorithms',
    description: 'Forecasts future prices based on historical data and market trends.',
    color: '#4facfe'
  },
  {
    icon: '💡',
    title: 'Smart Recommendations',
    description: 'Personalized suggestions based on your budget, preferences, and travel style.',
    color: '#f5576c'
  },
  {
    icon: '🌍',
    title: 'Global Coverage',
    description: 'Comprehensive database for UAE and 50+ international destinations.',
    color: '#43e97b'
  },
  {
    icon: '⚡',
    title: 'Instant Calculations',
    description: 'Get accurate results in milliseconds with our optimized algorithms.',
    color: '#fa709a'
  }
]

function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="features-section" id="features" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            Powered by <span className="gradient-text">Advanced AI</span>
          </h2>
          <p className="section-subtitle">
            Cutting-edge technology for smart travel planning
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 40px ${feature.color}20`
              }}
            >
              <div className="feature-icon" style={{ background: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
