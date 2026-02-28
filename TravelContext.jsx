import React, { createContext, useState, useContext, useEffect } from 'react'
import { loadState, saveState } from '../utils/storage'

const TravelContext = createContext()

export const useTravel = () => {
  const context = useContext(TravelContext)
  if (!context) {
    throw new Error('useTravel must be used within TravelProvider')
  }
  return context
}

export const TravelProvider = ({ children }) => {
  const [currency, setCurrency] = useState('AED')
  const [recentSearches, setRecentSearches] = useState([])
  const [savedTrips, setSavedTrips] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [exchangeRates, setExchangeRates] = useState({
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    INR: 22.5
  })

  // Load saved data from localStorage
  useEffect(() => {
    const saved = loadState()
    if (saved) {
      setRecentSearches(saved.recentSearches || [])
      setSavedTrips(saved.savedTrips || [])
      setDarkMode(saved.darkMode || false)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    saveState({
      recentSearches,
      savedTrips,
      darkMode
    })
  }, [recentSearches, savedTrips, darkMode])

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const addRecentSearch = (search) => {
    setRecentSearches(prev => [search, ...prev].slice(0, 5))
  }

  const saveTrip = (trip) => {
    setSavedTrips(prev => [trip, ...prev])
  }

  const removeTrip = (id) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== id))
  }

  const convertCurrency = (amount, from = 'AED', to = currency) => {
    const inAED = from === 'AED' ? amount : amount / exchangeRates[from]
    return inAED * exchangeRates[to]
  }

  return (
    <TravelContext.Provider value={{
      currency,
      setCurrency,
      recentSearches,
      savedTrips,
      darkMode,
      setDarkMode,
      exchangeRates,
      addRecentSearch,
      saveTrip,
      removeTrip,
      convertCurrency
    }}>
      {children}
    </TravelContext.Provider>
  )
}
