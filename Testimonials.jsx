import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Ahmed Al Mansouri',
    role: 'Travel Blogger',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'This AI calculator saved me thousands on my Dubai trip. The predictions were spot-on!',
    rating: 5,
    location: 'Dubai'
  },
  {
    name: 'Sarah Johnson',
    role: 'Digital Nomad',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Finally a tool that understands real travel costs. The breakdown by category is incredibly helpful.',
    rating: 5,
    location: 'International'
  },
  {
    name: 'Mohammed Al Zaabi',
    role: 'Travel Agent',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'I recommend this to all my clients. Accurate, fast, and the AI recommendations are brilliant.',
    rating: 5,
    location: 'Abu Dhabi'
  }
]

function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="testimonials-section" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <h2 className="section-title">
            What <span className="gradient-text">Travelers Say</span>
          </h2>
          <p className="section-subtitle">
            Trusted by thousands of happy travelers
          </p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-location">
                <i className="fas fa-map-marker-alt"></i> {testimonial.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
