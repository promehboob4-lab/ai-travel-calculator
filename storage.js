// Local storage utilities
const STORAGE_KEY = 'ai_travel_calculator'

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    console.error('Error saving to localStorage:', err)
  }
}

export const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (err) {
    console.error('Error loading from localStorage:', err)
    return null
  }
}

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.error('Error clearing localStorage:', err)
  }
}
