import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTravel } from '../context/TravelContext'
import { calculateAdvancedCost, getPopularActivities, AIRecommendationEngine } from '../utils/advancedCalculator'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import toast from 'react-hot-toast'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

function Calculator() {
  const { currency, convertCurrency, addRecentSearch, savedTrips, saveTrip, removeTrip } = useTravel()
  
  const [formData, setFormData] = useState({
    destination: 'dubai',
    days: 5,
    travelers: 2,
    hotelType: '4star',
    flightType: 'economy',
    flightDistance: 'medium',
    activities: 3,
    month: new Date().getMonth(),
    includeInsurance: false,
    includeVisa: false,
    budget: 'mid'
  })

  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')
  const [comparisonMode, setComparisonMode] = useState(false)
  const [compareWith, setCompareWith] = useState('abudhabi')
  const [comparisonResult, setComparisonResult] = useState(null)
  const [popularActivities, setPopularActivities] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPopularActivities(getPopularActivities(formData.destination, 6))
  }, [formData.destination])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      const calculation = calculateAdvancedCost(formData)
      setResult(calculation)
      setShowResult(true)
      
      addRecentSearch({
        ...formData,
        result: calculation,
        timestamp: new Date().toISOString()
      })
      
      toast.success('✨ Calculation complete!', {
        icon: '🧠',
        duration: 3000
      })
      
      setLoading(false)
      
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }, 1500)
  }

  const handleCompare = () => {
    if (!comparisonMode) {
      setComparisonMode(true)
    } else {
      const comparison = compareDestinations(formData.destination, compareWith, formData)
      setComparisonResult(comparison)
      toast.success('📊 Comparison ready!')
    }
  }

  const handleSaveTrip = () => {
    if (result) {
      const trip = {
        id: Date.now(),
        ...formData,
        result,
        date: new Date().toISOString()
      }
      saveTrip(trip)
      toast.success('Trip saved successfully!', {
        icon: '💾'
      })
    }
  }

  const formatCurrency = (amount) => {
    const converted = convertCurrency(amount, 'AED', currency)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(converted)
  }

  // Chart data
  const chartData = result ? {
    labels: ['Hotel', 'Flights', 'Daily', 'Activities', 'Tax'],
    datasets: [
      {
        data: [
          result.breakdown.hotel,
          result.breakdown.flights,
          result.breakdown.daily,
          result.breakdown.activities,
          result.breakdown.tax
        ],
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
          '#4facfe'
        ],
        borderWidth: 0
      }
    ]
  } : null

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">AI Travel Cost Calculator</span>
              <span className="badge ai-badge">
                <i className="fas fa-robot"></i> AI-POWERED
              </span>
            </h2>
            <p className="section-subtitle">
              Advanced machine learning algorithms for accurate budget predictions
            </p>
          </div>

          <div className="calculator-tabs">
            <button 
              className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              <i className="fas fa-calculator"></i> Calculator
            </button>
            <button 
              className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <i className="fas fa-bookmark"></i> Saved Trips ({savedTrips.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
              onClick={() => setActiveTab('compare')}
            >
              <i className="fas fa-chart-bar"></i> Compare
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="calculator-card">
                  <form onSubmit={handleSubmit} className="calculator-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>
                          <i className="fas fa-map-marker-alt"></i> Destination
                        </label>
                        <select 
                          name="destination" 
                          value={formData.destination} 
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="dubai">🇦🇪 Dubai, UAE</option>
                          <option value="abudhabi">🇦🇪 Abu Dhabi, UAE</option>
                          <option value="international">🌍 International</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <i className="fas fa-calendar"></i> Travel Month
                        </label>
                        <select 
                          name="month" 
                          value={formData.month} 
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="0">January</option>
                          <option value="1">February</option>
                          <option value="2">March</option>
                          <option value="3">April</option>
                          <option value="4">May</option>
                          <option value="5">June</option>
                          <option value="6">July</option>
                          <option value="7">August</option>
                          <option value="8">September</option>
                          <option value="9">October</option>
                          <option value="10">November</option>
                          <option value="11">December</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <i className="fas fa-clock"></i> Duration (days)
                        </label>
                        <div className="input-with-range">
                          <input 
                            type="range" 
                            name="days" 
                            min="1" 
                            max="30" 
                            value={formData.days} 
                            onChange={handleChange}
                            className="range-input"
                          />
                          <input 
                            type="number" 
                            name="days" 
                            min="1" 
                            max="30" 
                            value={formData.days} 
                            onChange={handleChange}
                            className="form-control number-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          <i className="fas fa-users"></i> Travelers
                        </label>
                        <div className="input-with-range">
                          <input 
                            type="range" 
                            name="travelers" 
                            min="1" 
                            max="20" 
                            value={formData.travelers} 
                            onChange={handleChange}
                            className="range-input"
                          />
                          <input 
                            type="number" 
                            name="travelers" 
                            min="1" 
                            max="20" 
                            value={formData.travelers} 
                            onChange={handleChange}
                            className="form-control number-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>
                          <i className="fas fa-hotel"></i> Hotel Type
                        </label>
                        <select 
                          name="hotelType" 
                          value={formData.hotelType} 
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="budget">💰 Budget</option>
                          <option value="3star">⭐⭐⭐ 3 Star</option>
                          <option value="4star">⭐⭐⭐⭐ 4 Star</option>
                          <option value="5star">⭐⭐⭐⭐⭐ 5 Star</option>
                          <option value="luxury">👑 Luxury</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          <i className="fas fa-plane"></i> Flight Class
                        </label>
                        <select 
                          name="flightType" 
                          value={formData.flightType} 
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="economy">💺 Economy</option>
                          <option value="business">💼 Business</option>
                          <option value="first">👑 First Class</option>
                        </select>
                      </div>

                      {formData.destination === 'international' && (
                        <div className="form-group">
                          <label>
                            <i className="fas fa-globe"></i> Flight Distance
                          </label>
                          <select 
                            name="flightDistance" 
                            value={formData.flightDistance} 
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="short">🛫 Short Haul (1-3 hrs)</option>
                            <option value="medium">🛫🛬 Medium Haul (4-7 hrs)</option>
                            <option value="long">🌍 Long Haul (8+ hrs)</option>
                          </select>
                        </div>
                      )}

                      <div className="form-group">
                        <label>
                          <i className="fas fa-ticket-alt"></i> Activities/Day
                        </label>
                        <div className="input-with-range">
                          <input 
                            type="range" 
                            name="activities" 
                            min="0" 
                            max="10" 
                            value={formData.activities} 
                            onChange={handleChange}
                            className="range-input"
                          />
                          <input 
                            type="number" 
                            name="activities" 
                            min="0" 
                            max="10" 
                            value={formData.activities} 
                            onChange={handleChange}
                            className="form-control number-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="checkbox-grid">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="includeInsurance" 
                          checked={formData.includeInsurance} 
                          onChange={handleChange}
                        />
                        <span>🛡️ Travel Insurance (+5%)</span>
                      </label>
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          name="includeVisa" 
                          checked={formData.includeVisa} 
                          onChange={handleChange}
                        />
                        <span>🛂 Visa Fees (+500 AED)</span>
                      </label>
                    </div>

                    <div className="currency-selector">
                      <label>Currency:</label>
                      <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        className="currency-select"
                      >
                        <option value="AED">🇦🇪 AED</option>
                        <option value="USD">🇺🇸 USD</option>
                        <option value="EUR">🇪🇺 EUR</option>
                        <option value="GBP">🇬🇧 GBP</option>
                        <option value="INR">🇮🇳 INR</option>
                      </select>
                    </div>

                    <motion.button 
                      type="submit" 
                      className="btn btn-gradient btn-block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> AI Analyzing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-magic"></i> Calculate with AI
                        </>
                      )}
                    </motion.button>
                  </form>

                  {popularActivities.length > 0 && (
                    <div className="popular-activities">
                      <h4><i className="fas fa-star"></i> Popular Activities in {formData.destination === 'dubai' ? 'Dubai' : formData.destination === 'abudhabi' ? 'Abu Dhabi' : 'Your Destination'}</h4>
                      <div className="activity-tags">
                        {popularActivities.map((activity, index) => (
                          <span key={index} className="activity-tag">
                            {activity.name} - {formatCurrency(activity.cost)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {showResult && result && (
                      <motion.div 
                        id="results"
                        className="result-section"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="result-header">
                          <h3>AI Budget Analysis</h3>
                          <div className="confidence-badge">
                            AI Confidence: {result.confidenceScore}%
                          </div>
                        </div>

                        <div className="result-grid">
                          <motion.div 
                            className="result-card total"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="result-label">Total Cost</span>
                            <span className="result-value">{formatCurrency(result.total)}</span>
                            <span className="result-note">including taxes</span>
                          </motion.div>
                          
                          <motion.div 
                            className="result-card per-person"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="result-label">Per Person</span>
                            <span className="result-value">{formatCurrency(result.perPerson)}</span>
                            <span className="result-note">based on {formData.travelers} travelers</span>
                          </motion.div>
                          
                          <motion.div 
                            className="result-card daily"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="result-label">Daily Budget</span>
                            <span className="result-value">{formatCurrency(result.dailyBudget)}</span>
                            <span className="result-note">per person</span>
                          </motion.div>
                        </div>

                        <div className="chart-container">
                          <div className="chart">
                            {chartData && <Doughnut data={chartData} options={{
                              plugins: {
                                legend: { position: 'bottom' }
                              }
                            }} />}
                          </div>
                          <div className="breakdown-list">
                            <h4>Cost Breakdown</h4>
                            <ul>
                              <li><span>Hotel</span> {formatCurrency(result.breakdown.hotel)}</li>
                              <li><span>Flights</span> {formatCurrency(result.breakdown.flights)}</li>
                              <li><span>Daily Expenses</span> {formatCurrency(result.breakdown.daily)}</li>
                              <li><span>Activities</span> {formatCurrency(result.breakdown.activities)}</li>
                              <li><span>Tax (5%)</span> {formatCurrency(result.breakdown.tax)}</li>
                            </ul>
                          </div>
                        </div>

                        {result.warnings.length > 0 && (
                          <div className="warnings-container">
                            {result.warnings.map((warning, index) => (
                              <div key={index} className={`warning-message ${warning.level}`}>
                                {warning.message}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="recommendations">
                          <h4><i className="fas fa-robot"></i> AI Recommendations</h4>
                          <div className="recommendations-grid">
                            {result.recommendations.map((rec, index) => (
                              <div key={index} className="recommendation-item">
                                <span className="rec-icon">{rec.icon}</span>
                                <p>{rec.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="result-actions">
                          <button className="btn btn-outline" onClick={handleSaveTrip}>
                            <i className="fas fa-bookmark"></i> Save Trip
                          </button>
                          <button className="btn btn-outline" onClick={() => setShowResult(false)}>
                            <i className="fas fa-redo"></i> Recalculate
                          </button>
                          <button className="btn btn-outline" onClick={() => window.print()}>
                            <i className="fas fa-print"></i> Print
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === 'saved' && (
              <motion.div
                key="saved"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="saved-trips"
              >
                <h3>Your Saved Trips</h3>
                {savedTrips.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-bookmark fa-3x"></i>
                    <p>No saved trips yet. Calculate and save your first trip!</p>
                  </div>
                ) : (
                  <div className="trips-grid">
                    {savedTrips.map(trip => (
                      <div key={trip.id} className="trip-card">
                        <div className="trip-header">
                          <h4>{trip.destination.toUpperCase()}</h4>
                          <button onClick={() => removeTrip(trip.id)} className="delete-btn">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        <p>{trip.days} days, {trip.travelers} travelers</p>
                        <p className="trip-cost">{formatCurrency(trip.result.total)}</p>
                        <small>Saved: {new Date(trip.date).toLocaleDateString()}</small>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'compare' && (
              <motion.div
                key="compare"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="compare-section"
              >
                <h3>Compare Destinations</h3>
                <div className="compare-controls">
                  <select 
                    value={compareWith} 
                    onChange={(e) => setCompareWith(e.target.value)}
                    className="form-control"
                  >
                    <option value="dubai">Dubai</option>
                    <option value="abudhabi">Abu Dhabi</option>
                    <option value="international">International</option>
                  </select>
                  <button className="btn btn-gradient" onClick={handleCompare}>
                    Compare
                  </button>
                </div>

                {comparisonResult && (
                  <div className="comparison-result">
                    <div className="comparison-grid">
                      <div className="compare-card">
                        <h4>{formData.destination}</h4>
                        <p className="compare-cost">{formatCurrency(comparisonResult[formData.destination].total)}</p>
                      </div>
                      <div className="vs-badge">VS</div>
                      <div className="compare-card">
                        <h4>{compareWith}</h4>
                        <p className="compare-cost">{formatCurrency(comparisonResult[compareWith].total)}</p>
                      </div>
                    </div>
                    <div className="savings-info">
                      You can save {formatCurrency(comparisonResult.savings)} by choosing {comparisonResult.cheaper}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Calculator
