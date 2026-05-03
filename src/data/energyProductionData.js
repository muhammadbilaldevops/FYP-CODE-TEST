/**
 * ENERGY PRODUCTION DATA
 * 
 * Monthly and yearly energy production data for different system sizes
 * Based on the company's original quotation data
 */

export const energyProductionData = {
  // Monthly units for each system size
  monthly: [
    { month: 'Jan', '5KW': 477.40, '10KW': 954.80, '15KW': 1432.20, '20KW': 1909.60 },
    { month: 'Feb', '5KW': 477.40, '10KW': 954.80, '15KW': 1432.20, '20KW': 1909.60 },
    { month: 'Mar', '5KW': 643.50, '10KW': 1287.00, '15KW': 1930.50, '20KW': 2574.00 },
    { month: 'Apr', '5KW': 784.30, '10KW': 1568.60, '15KW': 2352.90, '20KW': 3137.20 },
    { month: 'May', '5KW': 792.00, '10KW': 1584.00, '15KW': 2376.00, '20KW': 3168.00 },
    { month: 'Jun', '5KW': 841.50, '10KW': 1683.00, '15KW': 2524.50, '20KW': 3366.00 },
    { month: 'Jul', '5KW': 835.45, '10KW': 1670.90, '15KW': 2506.35, '20KW': 3341.80 },
    { month: 'Aug', '5KW': 818.40, '10KW': 1636.80, '15KW': 2455.20, '20KW': 3273.60 },
    { month: 'Sep', '5KW': 726.00, '10KW': 1452.00, '15KW': 2178.00, '20KW': 2904.00 },
    { month: 'Oct', '5KW': 716.10, '10KW': 1432.20, '15KW': 2148.30, '20KW': 2864.40 },
    { month: 'Nov', '5KW': 577.50, '10KW': 1155.00, '15KW': 1732.50, '20KW': 2310.00 },
    { month: 'Dec', '5KW': 443.30, '10KW': 886.60, '15KW': 1329.90, '20KW': 1773.20 }
  ],
  // Yearly totals
  yearly: {
    '5KW': 8132.85,
    '10KW': 16265.7,
    '15KW': 24398.6,
    '20KW': 32531.4
  }
};

/**
 * Calculate energy production for a given system size
 * Interpolates between known values for sizes not in the table
 */
export const calculateEnergyProduction = (systemSize) => {
  const kw = parseFloat(systemSize);
  if (isNaN(kw) || kw <= 0) return null;

  // Use known data if available
  if (kw === 5 || kw === 10 || kw === 15 || kw === 20) {
    const key = `${kw}KW`;
    return {
      monthly: energyProductionData.monthly.map(month => ({
        month: month.month,
        units: month[key]
      })),
      yearly: energyProductionData.yearly[key]
    };
  }

  // Interpolate for other sizes
  let lowerSize, upperSize;
  if (kw < 5) {
    lowerSize = 5;
    upperSize = 10;
  } else if (kw < 10) {
    lowerSize = 5;
    upperSize = 10;
  } else if (kw < 15) {
    lowerSize = 10;
    upperSize = 15;
  } else if (kw < 20) {
    lowerSize = 15;
    upperSize = 20;
  } else {
    // For sizes > 20kW, extrapolate from 20kW
    lowerSize = 20;
    upperSize = 20;
  }

  const lowerKey = `${lowerSize}KW`;
  const upperKey = `${upperSize}KW`;
  const ratio = (kw - lowerSize) / (upperSize - lowerSize || 1);

  return {
    monthly: energyProductionData.monthly.map(month => {
      const lowerValue = month[lowerKey];
      const upperValue = month[upperKey];
      const interpolated = lowerValue + (upperValue - lowerValue) * ratio;
      return {
        month: month.month,
        units: parseFloat(interpolated.toFixed(2))
      };
    }),
    yearly: (() => {
      const lowerYearly = energyProductionData.yearly[lowerKey];
      const upperYearly = energyProductionData.yearly[upperKey];
      return parseFloat((lowerYearly + (upperYearly - lowerYearly) * ratio).toFixed(2));
    })()
  };
};

