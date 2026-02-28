import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate subscription
    setSubscribed(true)
    toast.success('Successfully subscribed!', {
      icon: '📧'
    })
    setEmail('')
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          className="newsletter-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="newsletter-content">
            <h3>Get AI Travel Insights</h3>
            <p>Subscribe for weekly travel tips, destination guides, and exclusive AI predictions</p>
            
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribed}
              />
              <button 
                type="submit" 
                className="btn btn-gradient"
                disabled={subscribed}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            
            {subscribed && (
              <motion.p 
                className="success-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-check-circle"></i> Check your inbox for confirmation!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
