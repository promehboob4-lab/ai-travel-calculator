import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const faqs = [
  {
    question: 'How accurate is the AI calculator?',
    answer: 'Our AI achieves 99% accuracy by analyzing real-time data from thousands of sources including hotels, airlines, and local businesses. The algorithm continuously learns from user feedback to improve predictions.',
    category: 'general'
  },
  {
    question: 'Does it work for all destinations?',
    answer: 'Yes! We cover all UAE destinations plus 50+ international locations. For international trips, we factor in flight distances, visa requirements, and local costs.',
    category: 'general'
  },
  {
    question: 'How do you calculate seasonal variations?',
    answer: 'Our AI analyzes historical pricing data for each destination across different seasons. Peak seasons (holidays, festivals) show higher prices, while off-seasons offer better deals.',
    category: 'technical'
  },
  {
    question: 'Can I save my calculations?',
    answer: 'Absolutely! Your calculations are automatically saved locally. You can bookmark trips, compare different options, and come back to them anytime.',
    category: 'features'
  },
  {
    question: 'Is my data private?',
    answer: '100% private. All calculations happen in your browser. We don\'t store any personal data on servers.',
    category: 'privacy'
  }
]

function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="faq-section" id="faq" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about our AI calculator
          </p>
        </motion.div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={`faq-question ${openIndex === index ? 'open' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                    <span className="faq-category">{faq.category}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
