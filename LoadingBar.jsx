import React from 'react'
import { motion } from 'framer-motion'

function LoadingBar() {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-logo"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✈️
      </motion.div>
      <motion.div
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        AI Travel Pro
      </motion.div>
      <motion.div className="loading-bar">
        <motion.div
          className="loading-progress"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  )
}

export default LoadingBar
