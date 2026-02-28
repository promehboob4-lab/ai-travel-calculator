import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingBar from './components/LoadingBar'
import { TravelProvider } from './context/TravelContext'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setLoading(false), 1500)
  }, [])

  return (
    <TravelProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingBar />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="app"
          >
            <Header />
            <Hero />
            <Calculator />
            <Features />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <Footer />
            <ScrollToTop />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TravelProvider>
  )
}

export default App
