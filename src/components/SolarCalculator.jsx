/**
 * SOLAR CALCULATOR COMPONENT
 * 
 * Advanced solar calculator that calculates:
 * - System size needed based on monthly bill or consumption
 * - Estimated cost and savings
 * - Payback period and ROI
 * - Monthly energy generation
 * - Annual savings projection
 */

import React, { useState, useEffect } from 'react';
import { FiSun, FiDollarSign, FiTrendingUp, FiZap, FiCalendar } from 'react-icons/fi';
import { energyProduction } from '../data/companyData';
import { useTranslation } from '../hooks/useTranslation';

const SolarCalculator = () => {
  const { t } = useTranslation();
  // State for input values
  const [monthlyBill, setMonthlyBill] = useState(15000);
  const [electricityRate, setElectricityRate] = useState(25);
  const [systemType, setSystemType] = useState('hybrid');
  const [roofSpace, setRoofSpace] = useState(300);
  
  // State for calculated results
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Calculate results when inputs change
  useEffect(() => {
    calculateSolarSystem();
  }, [monthlyBill, electricityRate, systemType, roofSpace]);

  const calculateSolarSystem = () => {
    // Calculate monthly consumption in units (kWh)
    const monthlyUnits = monthlyBill / electricityRate;
    
    // Calculate required system size (considering efficiency factors)
    // Average 4.5 peak sun hours in Pakistan
    const peakSunHours = 4.5;
    const systemEfficiency = 0.85; // 85% system efficiency
    const dailyGeneration = monthlyUnits / 30;
    
    let requiredCapacity = dailyGeneration / (peakSunHours * systemEfficiency);
    
    // Round to nearest standard size (3, 5, 7, 10, 12, 15, 20, 25, 30 kW)
    const standardSizes = [3, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40];
    requiredCapacity = standardSizes.find(size => size >= requiredCapacity) || 40;
    
    // Check if roof space is sufficient (1 kW needs ~60-70 sq ft)
    const requiredRoofSpace = requiredCapacity * 65;
    const roofSufficient = roofSpace >= requiredRoofSpace;
    
    // Get yearly generation based on capacity
    let yearlyGeneration;
    if (energyProduction.yearly[`${requiredCapacity}KW`]) {
      yearlyGeneration = energyProduction.yearly[`${requiredCapacity}KW`];
    } else {
      // Estimate based on 5KW baseline
      yearlyGeneration = energyProduction.yearly["5KW"] * (requiredCapacity / 5);
    }
    
    const monthlyGeneration = yearlyGeneration / 12;
    
    // Calculate costs (approximate PKR)
    let costPerWatt;
    if (systemType === 'onGrid') {
      costPerWatt = 90; // PKR per watt for on-grid
    } else if (systemType === 'hybrid') {
      costPerWatt = 140; // PKR per watt for hybrid (with batteries)
    } else {
      costPerWatt = 130; // PKR per watt for off-grid
    }
    
    const systemCost = requiredCapacity * 1000 * costPerWatt;
    
    // Calculate savings based on system type
    let monthlySavings;
    if (systemType === 'onGrid') {
      // On-grid can save up to 100% with net metering
      monthlySavings = Math.min(monthlyGeneration * electricityRate, monthlyBill);
    } else if (systemType === 'hybrid') {
      // Hybrid saves 60-70% typically
      monthlySavings = monthlyBill * 0.65;
    } else {
      // Off-grid saves 100% but can't sell back
      monthlySavings = Math.min(monthlyGeneration * electricityRate, monthlyBill);
    }
    
    const yearlySavings = monthlySavings * 12;
    const paybackPeriod = systemCost / yearlySavings;
    const lifetime25Years = (yearlySavings * 25) - systemCost;
    const roi = ((yearlySavings * 25) / systemCost) * 100;
    
    // CO2 savings (1 kWh = ~0.7 kg CO2 in Pakistan)
    const annualCO2Saved = (yearlyGeneration * 0.7) / 1000; // in tons
    const treesEquivalent = Math.round(annualCO2Saved * 25);
    
    // Number of panels (assuming 550W panels)
    const panelWattage = 550;
    const numberOfPanels = Math.ceil((requiredCapacity * 1000) / panelWattage);
    
    setResults({
      requiredCapacity,
      systemCost,
      monthlyGeneration: monthlyGeneration.toFixed(0),
      yearlyGeneration: yearlyGeneration.toFixed(0),
      monthlySavings: monthlySavings.toFixed(0),
      yearlySavings: yearlySavings.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1),
      lifetime25Years: lifetime25Years.toFixed(0),
      roi: roi.toFixed(0),
      annualCO2Saved: annualCO2Saved.toFixed(1),
      treesEquivalent,
      numberOfPanels,
      requiredRoofSpace: requiredRoofSpace.toFixed(0),
      roofSufficient,
      monthlyUnits: monthlyUnits.toFixed(0)
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('calculator.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('calculator.description')}
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Electricity Bill */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('calculator.labels.monthlyBill')}
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  min="1000"
                  max="500000"
                  step="100"
                />
                <p className="text-xs text-gray-500 mt-1">{t('calculator.labels.averageBill')}</p>
              </div>

              {/* Electricity Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('calculator.labels.electricityRate')}
                </label>
                <input
                  type="number"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  min="10"
                  max="100"
                  step="0.5"
                />
              </div>

              {/* System Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('calculator.labels.systemType')}
                </label>
                <select
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="onGrid">{t('calculator.labels.onGrid')}</option>
                  <option value="hybrid">{t('calculator.labels.hybrid')}</option>
                  <option value="offGrid">{t('calculator.labels.offGrid')}</option>
                </select>
              </div>

              {/* Available Roof Space */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('calculator.labels.roofSpace')}
                </label>
                <input
                  type="number"
                  value={roofSpace}
                  onChange={(e) => setRoofSpace(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  min="50"
                  max="10000"
                  step="10"
                />
                <p className="text-xs text-gray-500 mt-1">{t('calculator.labels.approximateRoof')}</p>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t('calculator.labels.calculate')}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-6 animate-fadeIn">
            {/* System Overview Card */}
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">{t('calculator.labels.recommendedSystem')}</h3>
                <div className="text-6xl font-bold">{results.requiredCapacity} KW</div>
                <p className="text-blue-100 mt-2">{t('calculator.labels.systemCapacity')}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{results.numberOfPanels}</div>
                  <div className="text-sm text-blue-100">Solar Panels</div>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{results.monthlyGeneration}</div>
                  <div className="text-sm text-blue-100">Units/Month</div>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{results.requiredRoofSpace}</div>
                  <div className="text-sm text-blue-100">Sq Ft Needed</div>
                </div>
                <div className="text-center bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-2xl font-bold">{results.paybackPeriod}</div>
                  <div className="text-sm text-blue-100">Years Payback</div>
                </div>
              </div>

              {!results.roofSufficient && (
                <div className="mt-6 bg-yellow-500 bg-opacity-20 border border-yellow-300 rounded-lg p-4">
                  <p className="text-sm text-white">
                    ⚠️ Note: You need approximately {results.requiredRoofSpace} sq ft of roof space. 
                    Consider ground mounting or consult our team for alternative solutions.
                  </p>
                </div>
              )}
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Investment */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiDollarSign className="text-blue-600 text-2xl" />
                  </div>
                  <h4 className="ml-3 text-lg font-bold text-gray-800">Investment</h4>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatCurrency(results.systemCost)}
                </div>
                <p className="text-sm text-gray-600">Total system cost</p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>• 70% advance payment</p>
                  <p>• 25% on installation</p>
                  <p>• 5% on net metering</p>
                </div>
              </div>

              {/* Monthly Savings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiTrendingUp className="text-green-600 text-2xl" />
                  </div>
                  <h4 className="ml-3 text-lg font-bold text-gray-800">Monthly Savings</h4>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatCurrency(results.monthlySavings)}
                </div>
                <p className="text-sm text-gray-600">Estimated monthly savings</p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Consumption: {results.monthlyUnits} units</p>
                  <p>Generation: {results.monthlyGeneration} units</p>
                </div>
              </div>

              {/* Annual Savings */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiCalendar className="text-purple-600 text-2xl" />
                  </div>
                  <h4 className="ml-3 text-lg font-bold text-gray-800">Annual Savings</h4>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatCurrency(results.yearlySavings)}
                </div>
                <p className="text-sm text-gray-600">Total yearly savings</p>
                <div className="mt-4 text-xs text-gray-500">
                  <p>Yearly generation: {results.yearlyGeneration} units</p>
                </div>
              </div>
            </div>

            {/* ROI & Lifetime Savings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl shadow-lg p-8 text-white">
                <h4 className="text-xl font-bold mb-4">25-Year Returns</h4>
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(results.lifetime25Years)}
                </div>
                <p className="text-green-100 mb-4">Total profit over 25 years</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span>Return on Investment</span>
                    <span className="text-2xl font-bold">{results.roi}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white">
                <h4 className="text-xl font-bold mb-4">Environmental Impact</h4>
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold">{results.annualCO2Saved} Tons</div>
                    <p className="text-blue-100 text-sm">CO₂ Saved Annually</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl font-bold">{results.treesEquivalent} Trees</div>
                    <p className="text-blue-100 text-sm">Equivalent to planting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Type Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Your Selected System: {systemType === 'onGrid' ? 'On-Grid' : systemType === 'hybrid' ? 'Hybrid' : 'Off-Grid'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {systemType === 'onGrid' && (
                  <>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Zero electricity bills with net metering</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Sell excess power to WAPDA</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Lower initial investment</span>
                    </div>
                  </>
                )}
                {systemType === 'hybrid' && (
                  <>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">60-70% bill reduction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Backup during power outages</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Sell excess to WAPDA</span>
                    </div>
                  </>
                )}
                {systemType === 'offGrid' && (
                  <>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Complete energy independence</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">No grid dependency</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Ideal for remote locations</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">{t('calculator.ready')}</h3>
              <p className="text-lg mb-6">
                {t('calculator.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/quote" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                  {t('calculator.getQuote')}
                </a>
                <a href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                  {t('calculator.contactUs')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;

