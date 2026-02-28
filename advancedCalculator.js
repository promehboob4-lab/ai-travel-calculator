// Advanced AI Travel Cost Calculator Logic

// Comprehensive cost database with seasonal variations
const COST_DATABASE = {
  destinations: {
    dubai: {
      name: 'Dubai',
      country: 'UAE',
      currency: 'AED',
      peakSeason: ['nov', 'dec', 'jan', 'feb', 'mar'],
      offSeason: ['jun', 'jul', 'aug'],
      multipliers: {
        peak: 1.4,
        off: 0.8,
        normal: 1.0
      }
    },
    abudhabi: {
      name: 'Abu Dhabi',
      country: 'UAE',
      currency: 'AED',
      peakSeason: ['nov', 'dec', 'jan', 'feb', 'mar'],
      offSeason: ['jun', 'jul', 'aug'],
      multipliers: {
        peak: 1.3,
        off: 0.85,
        normal: 1.0
      }
    },
    international: {
      name: 'International',
      country: 'Various',
      currency: 'USD',
      peakSeason: ['jun', 'jul', 'aug', 'dec'],
      offSeason: ['jan', 'feb', 'sep'],
      multipliers: {
        peak: 1.5,
        off: 0.75,
        normal: 1.0
      }
    }
  },
  
  hotels: {
    budget: {
      dubai: { min: 200, max: 350, avg: 275 },
      abudhabi: { min: 180, max: 300, avg: 240 },
      international: { min: 100, max: 250, avg: 175 }
    },
    '3star': {
      dubai: { min: 350, max: 600, avg: 475 },
      abudhabi: { min: 300, max: 500, avg: 400 },
      international: { min: 200, max: 450, avg: 325 }
    },
    '4star': {
      dubai: { min: 600, max: 1000, avg: 800 },
      abudhabi: { min: 500, max: 850, avg: 675 },
      international: { min: 350, max: 700, avg: 525 }
    },
    '5star': {
      dubai: { min: 900, max: 3000, avg: 1500 },
      abudhabi: { min: 800, max: 2500, avg: 1200 },
      international: { min: 500, max: 2000, avg: 900 }
    },
    luxury: {
      dubai: { min: 2000, max: 10000, avg: 4000 },
      abudhabi: { min: 1500, max: 8000, avg: 3000 },
      international: { min: 1000, max: 5000, avg: 2000 }
    }
  },
  
  flights: {
    economy: {
      dubai: { min: 0, max: 0, avg: 0 },
      abudhabi: { min: 0, max: 0, avg: 0 },
      international: { 
        short: { min: 1500, max: 3000, avg: 2000 },
        medium: { min: 3000, max: 5000, avg: 3800 },
        long: { min: 5000, max: 10000, avg: 7000 }
      }
    },
    business: {
      dubai: { min: 0, max: 0, avg: 0 },
      abudhabi: { min: 0, max: 0, avg: 0 },
      international: {
        short: { min: 5000, max: 10000, avg: 7000 },
        medium: { min: 10000, max: 20000, avg: 14000 },
        long: { min: 15000, max: 35000, avg: 22000 }
      }
    },
    first: {
      dubai: { min: 0, max: 0, avg: 0 },
      abudhabi: { min: 0, max: 0, avg: 0 },
      international: {
        short: { min: 10000, max: 20000, avg: 14000 },
        medium: { min: 20000, max: 40000, avg: 28000 },
        long: { min: 30000, max: 60000, avg: 40000 }
      }
    }
  },
  
  dailyExpenses: {
    dubai: {
      budget: { min: 150, max: 300, avg: 200 },
      mid: { min: 300, max: 600, avg: 400 },
      luxury: { min: 600, max: 2000, avg: 1000 }
    },
    abudhabi: {
      budget: { min: 120, max: 250, avg: 170 },
      mid: { min: 250, max: 500, avg: 350 },
      luxury: { min: 500, max: 1500, avg: 800 }
    },
    international: {
      budget: { min: 80, max: 200, avg: 130 },
      mid: { min: 200, max: 400, avg: 280 },
      luxury: { min: 400, max: 1200, avg: 650 }
    }
  },
  
  activities: {
    dubai: [
      { name: 'Burj Khalifa', cost: 150, type: 'attraction' },
      { name: 'Desert Safari', cost: 250, type: 'adventure' },
      { name: 'Dubai Mall', cost: 50, type: 'shopping' },
      { name: 'Aquaventure', cost: 300, type: 'waterpark' },
      { name: 'Ski Dubai', cost: 250, type: 'activity' },
      { name: 'Dhow Cruise', cost: 200, type: 'dinner' }
    ],
    abudhabi: [
      { name: 'Sheikh Zayed Mosque', cost: 0, type: 'cultural' },
      { name: 'Ferrari World', cost: 350, type: 'amusement' },
      { name: 'Louvre Abu Dhabi', cost: 70, type: 'cultural' },
      { name: 'Yas Waterworld', cost: 280, type: 'waterpark' },
      { name: 'Qasr Al Watan', cost: 65, type: 'cultural' },
      { name: 'Warner Bros World', cost: 350, type: 'amusement' }
    ],
    international: [
      { name: 'City Tours', cost: 100, type: 'cultural' },
      { name: 'Museum Visits', cost: 50, type: 'cultural' },
      { name: 'Adventure Sports', cost: 200, type: 'adventure' },
      { name: 'Cooking Classes', cost: 80, type: 'experience' },
      { name: 'Wine Tasting', cost: 120, type: 'experience' },
      { name: 'Local Shows', cost: 90, type: 'entertainment' }
    ]
  }
}

// AI Recommendation Engine
export class AIRecommendationEngine {
  static analyzeBudget(total, perPerson, days, destination) {
    const dailyPerPerson = perPerson / days
    const recommendations = []
    
    if (dailyPerPerson < 200) {
      recommendations.push({
        type: 'budget',
        message: 'Consider hostels or budget hotels',
        icon: '💰'
      })
    } else if (dailyPerPerson < 400) {
      recommendations.push({
        type: 'mid',
        message: 'Good for 3-star hotels and local dining',
        icon: '🏨'
      })
    } else if (dailyPerPerson < 800) {
      recommendations.push({
        type: 'premium',
        message: 'Perfect for 4-star hotels and fine dining',
        icon: '✨'
      })
    } else {
      recommendations.push({
        type: 'luxury',
        message: 'Luxury resorts and premium experiences',
        icon: '👑'
      })
    }
    
    return recommendations
  }

  static predictSeasonalAdjustment(destination, month) {
    const dest = COST_DATABASE.destinations[destination]
    const monthStr = month.toLowerCase().substring(0, 3)
    
    if (dest.peakSeason.includes(monthStr)) {
      return dest.multipliers.peak
    } else if (dest.offSeason.includes(monthStr)) {
      return dest.multipliers.off
    }
    return dest.multipliers.normal
  }

  static generateSmartWarning(total, perPerson, destination, days) {
    const warnings = []
    
    if (perPerson < 100 * days) {
      warnings.push({
        level: 'critical',
        message: '⚠️ Extremely low budget - consider reducing days or increasing budget'
      })
    } else if (perPerson < 200 * days) {
      warnings.push({
        level: 'warning',
        message: '⚠️ Budget may be tight for comfortable travel'
      })
    }
    
    if (destination === 'dubai' && perPerson < 500 * days) {
      warnings.push({
        level: 'info',
        message: '💡 Dubai is generally expensive - consider Abu Dhabi for better value'
      })
    }
    
    return warnings
  }
}

// Main calculation function
export function calculateAdvancedCost(formData) {
  const {
    destination,
    days,
    travelers,
    hotelType,
    flightType,
    activities,
    month = new Date().getMonth(),
    flightDistance = 'medium'
  } = formData

  // Get seasonal multiplier
  const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  const seasonalMultiplier = AIRecommendationEngine.predictSeasonalAdjustment(destination, monthNames[month])

  // Hotel cost with variation
  const hotelData = COST_DATABASE.hotels[hotelType][destination]
  const baseHotelRate = hotelData.avg * seasonalMultiplier
  const totalHotel = baseHotelRate * days * travelers

  // Flight cost
  let flightPerPerson = 0
  if (destination === 'international') {
    const flightData = COST_DATABASE.flights[flightType][destination][flightDistance]
    flightPerPerson = flightData.avg * seasonalMultiplier
  }
  const totalFlights = flightPerPerson * travelers

  // Daily expenses based on hotel type
  const expenseLevel = hotelType === 'budget' ? 'budget' : hotelType === '5star' ? 'luxury' : 'mid'
  const dailyExpenseData = COST_DATABASE.dailyExpenses[destination][expenseLevel]
  const dailyExpense = dailyExpenseData.avg
  const totalDaily = dailyExpense * days * travelers

  // Activities
  const activityOptions = COST_DATABASE.activities[destination]
  const avgActivityCost = activityOptions.reduce((sum, act) => sum + act.cost, 0) / activityOptions.length
  const totalActivities = avgActivityCost * activities * travelers

  // Calculate totals
  const subtotal = totalHotel + totalFlights + totalDaily + totalActivities
  const tax = subtotal * 0.05 // 5% tax
  const total = subtotal + tax
  const perPerson = total / travelers
  const dailyBudget = perPerson / days

  // Generate AI insights
  const recommendations = AIRecommendationEngine.analyzeBudget(total, perPerson, days, destination)
  const warnings = AIRecommendationEngine.generateSmartWarning(total, perPerson, destination, days)

  // Confidence score based on data completeness
  const confidenceScore = Math.min(100, Math.round(
    (hotelData ? 30 : 0) +
    (dailyExpenseData ? 30 : 0) +
    (activityOptions.length ? 20 : 0) +
    (seasonalMultiplier ? 20 : 0)
  ))

  return {
    total: Math.round(total),
    perPerson: Math.round(perPerson),
    dailyBudget: Math.round(dailyBudget),
    breakdown: {
      hotel: Math.round(totalHotel),
      flights: Math.round(totalFlights),
      daily: Math.round(totalDaily),
      activities: Math.round(totalActivities),
      tax: Math.round(tax)
    },
    recommendations,
    warnings,
    confidenceScore,
    seasonalMultiplier,
    month: monthNames[month],
    destination: COST_DATABASE.destinations[destination].name
  }
}

export function getPopularActivities(destination, limit = 3) {
  return COST_DATABASE.activities[destination]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, limit)
}

export function compareDestinations(dest1, dest2, formData) {
  const result1 = calculateAdvancedCost({ ...formData, destination: dest1 })
  const result2 = calculateAdvancedCost({ ...formData, destination: dest2 })
  
  return {
    [dest1]: result1,
    [dest2]: result2,
    savings: Math.abs(result1.total - result2.total),
    cheaper: result1.total < result2.total ? dest1 : dest2
  }
}
