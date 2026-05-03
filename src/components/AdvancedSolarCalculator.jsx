/**
 * ADVANCED SOLAR CALCULATOR COMPONENT
 * 
 * Based on alphasolar.com.pk/calculator/
 * Features:
 * - Appliance-based load calculation
 * - Real-time cost and savings calculation
 * - Pakistan-specific pricing and rates
 * - System size recommendation
 * - Detailed financial analysis
 */

import React, { useState, useEffect } from 'react';
import { FiSun, FiZap, FiDollarSign, FiTrendingUp, FiCalendar, FiX, FiActivity } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const AdvancedSolarCalculator = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [appliances, setAppliances] = useState([
    // Lighting - Auto-selected common items
    { id: 1, name: 'LED Bulbs (10W)', quantity: 10, hours: 8, watts: 10, selected: true, category: 'Lighting' },
    { id: 2, name: 'LED Bulbs (15W)', quantity: 5, hours: 6, watts: 15, selected: false, category: 'Lighting' },
    { id: 3, name: 'LED Tube Light (20W)', quantity: 4, hours: 8, watts: 20, selected: false, category: 'Lighting' },
    { id: 4, name: 'CFL Bulb (25W)', quantity: 3, hours: 6, watts: 25, selected: false, category: 'Lighting' },
    { id: 5, name: 'Chandelier (LED)', quantity: 1, hours: 4, watts: 50, selected: false, category: 'Lighting' },
    
    // Fans & Cooling - Auto-selected common items
    { id: 6, name: 'Ceiling Fan', quantity: 4, hours: 12, watts: 75, selected: true, category: 'Cooling' },
    { id: 7, name: 'Table Fan', quantity: 2, hours: 8, watts: 50, selected: false, category: 'Cooling' },
    { id: 8, name: 'Exhaust Fan', quantity: 2, hours: 6, watts: 40, selected: false, category: 'Cooling' },
    { id: 9, name: 'Air Conditioner (1 Ton)', quantity: 1, hours: 8, watts: 1200, selected: true, category: 'Cooling' },
    { id: 10, name: 'Air Conditioner (1.5 Ton)', quantity: 1, hours: 8, watts: 1800, selected: false, category: 'Cooling' },
    { id: 11, name: 'Inverter AC (1 Ton)', quantity: 1, hours: 8, watts: 800, selected: false, category: 'Cooling' },
    { id: 12, name: 'Inverter AC (1.5 Ton)', quantity: 1, hours: 8, watts: 1200, selected: false, category: 'Cooling' },
    { id: 13, name: 'Cooler/Desert Cooler', quantity: 1, hours: 6, watts: 200, selected: false, category: 'Cooling' },
    { id: 14, name: 'Air Cooler (Portable)', quantity: 1, hours: 4, watts: 150, selected: false, category: 'Cooling' },
    
    // Kitchen Appliances - Auto-selected common items
    { id: 15, name: 'Refrigerator (Single Door)', quantity: 1, hours: 24, watts: 150, selected: true, category: 'Kitchen' },
    { id: 16, name: 'Refrigerator (Double Door)', quantity: 1, hours: 24, watts: 250, selected: false, category: 'Kitchen' },
    { id: 17, name: 'Deep Freezer', quantity: 1, hours: 24, watts: 200, selected: false, category: 'Kitchen' },
    { id: 18, name: 'Microwave Oven', quantity: 1, hours: 0.5, watts: 1000, selected: false, category: 'Kitchen' },
    { id: 19, name: 'Electric Stove (Single Burner)', quantity: 1, hours: 1, watts: 2000, selected: false, category: 'Kitchen' },
    { id: 20, name: 'Electric Stove (Double Burner)', quantity: 1, hours: 1, watts: 3000, selected: false, category: 'Kitchen' },
    { id: 21, name: 'Electric Kettle', quantity: 1, hours: 0.5, watts: 2000, selected: false, category: 'Kitchen' },
    { id: 22, name: 'Water Dispenser (Hot/Cold)', quantity: 1, hours: 12, watts: 500, selected: false, category: 'Kitchen' },
    { id: 23, name: 'Electric Oven', quantity: 1, hours: 1, watts: 2500, selected: false, category: 'Kitchen' },
    { id: 24, name: 'Toaster', quantity: 1, hours: 0.25, watts: 800, selected: false, category: 'Kitchen' },
    { id: 25, name: 'Blender/Mixer Grinder', quantity: 1, hours: 0.25, watts: 500, selected: false, category: 'Kitchen' },
    { id: 26, name: 'Food Processor', quantity: 1, hours: 0.25, watts: 750, selected: false, category: 'Kitchen' },
    { id: 27, name: 'Rice Cooker', quantity: 1, hours: 1, watts: 600, selected: false, category: 'Kitchen' },
    { id: 28, name: 'Electric Pressure Cooker', quantity: 1, hours: 0.5, watts: 1000, selected: false, category: 'Kitchen' },
    { id: 29, name: 'Juicer', quantity: 1, hours: 0.25, watts: 400, selected: false, category: 'Kitchen' },
    { id: 30, name: 'Coffee Maker', quantity: 1, hours: 0.5, watts: 800, selected: false, category: 'Kitchen' },
    
    // Laundry
    { id: 31, name: 'Washing Machine (Semi-Auto)', quantity: 1, hours: 1, watts: 2000, selected: false, category: 'Laundry' },
    { id: 32, name: 'Washing Machine (Fully Auto)', quantity: 1, hours: 1.5, watts: 2500, selected: false, category: 'Laundry' },
    { id: 33, name: 'Dryer', quantity: 1, hours: 1, watts: 3000, selected: false, category: 'Laundry' },
    { id: 34, name: 'Iron', quantity: 1, hours: 1, watts: 1000, selected: false, category: 'Laundry' },
    { id: 35, name: 'Steam Iron', quantity: 1, hours: 0.5, watts: 1500, selected: false, category: 'Laundry' },
    
    // Entertainment - Auto-selected common items
    { id: 36, name: 'TV (LED 32")', quantity: 1, hours: 6, watts: 80, selected: true, category: 'Entertainment' },
    { id: 37, name: 'TV (LED 42")', quantity: 1, hours: 6, watts: 120, selected: false, category: 'Entertainment' },
    { id: 38, name: 'TV (LED 55")', quantity: 1, hours: 6, watts: 150, selected: false, category: 'Entertainment' },
    { id: 39, name: 'Home Theater System', quantity: 1, hours: 3, watts: 200, selected: false, category: 'Entertainment' },
    { id: 40, name: 'Gaming Console (PS5/Xbox)', quantity: 1, hours: 2, watts: 200, selected: false, category: 'Entertainment' },
    { id: 41, name: 'Set Top Box (Cable/DTH)', quantity: 1, hours: 8, watts: 15, selected: false, category: 'Entertainment' },
    { id: 42, name: 'Sound System/Speakers', quantity: 1, hours: 2, watts: 100, selected: false, category: 'Entertainment' },
    
    // Computers & Electronics
    { id: 43, name: 'Desktop Computer', quantity: 1, hours: 6, watts: 200, selected: false, category: 'Electronics' },
    { id: 44, name: 'Laptop', quantity: 1, hours: 6, watts: 60, selected: false, category: 'Electronics' },
    { id: 45, name: 'Printer', quantity: 1, hours: 0.5, watts: 50, selected: false, category: 'Electronics' },
    { id: 46, name: 'WiFi Router', quantity: 1, hours: 24, watts: 10, selected: false, category: 'Electronics' },
    { id: 47, name: 'Modem', quantity: 1, hours: 24, watts: 15, selected: false, category: 'Electronics' },
    { id: 48, name: 'Mobile Charger', quantity: 3, hours: 3, watts: 5, selected: false, category: 'Electronics' },
    { id: 49, name: 'Tablet Charger', quantity: 1, hours: 2, watts: 10, selected: false, category: 'Electronics' },
    
    // Water & Heating
    { id: 50, name: 'Geyser (Instant)', quantity: 1, hours: 1, watts: 3000, selected: false, category: 'Heating' },
    { id: 51, name: 'Geyser (Storage)', quantity: 1, hours: 2, watts: 2000, selected: false, category: 'Heating' },
    { id: 52, name: 'Water Pump (1/2 HP)', quantity: 1, hours: 1, watts: 400, selected: false, category: 'Water' },
    { id: 53, name: 'Water Pump (1 HP)', quantity: 1, hours: 1, watts: 750, selected: false, category: 'Water' },
    { id: 54, name: 'Water Pump (1.5 HP)', quantity: 1, hours: 1, watts: 1100, selected: false, category: 'Water' },
    { id: 55, name: 'Submersible Pump', quantity: 1, hours: 1, watts: 1000, selected: false, category: 'Water' },
    { id: 56, name: 'Water Motor', quantity: 1, hours: 1, watts: 750, selected: false, category: 'Water' },
    { id: 57, name: 'RO Water Purifier', quantity: 1, hours: 2, watts: 50, selected: false, category: 'Water' },
    { id: 58, name: 'Water Heater (Small)', quantity: 1, hours: 1, watts: 1500, selected: false, category: 'Heating' },
    
    // Cleaning & Other
    { id: 59, name: 'Vacuum Cleaner', quantity: 1, hours: 0.5, watts: 1200, selected: false, category: 'Cleaning' },
    { id: 60, name: 'Hair Dryer', quantity: 1, hours: 0.25, watts: 1500, selected: false, category: 'Personal' },
    { id: 61, name: 'Hair Straightener', quantity: 1, hours: 0.25, watts: 100, selected: false, category: 'Personal' },
    { id: 62, name: 'Electric Shaver', quantity: 1, hours: 0.1, watts: 15, selected: false, category: 'Personal' },
    { id: 63, name: 'Sewing Machine', quantity: 1, hours: 1, watts: 100, selected: false, category: 'Other' },
    { id: 64, name: 'Electric Drill', quantity: 1, hours: 0.25, watts: 500, selected: false, category: 'Other' },
    { id: 65, name: 'Inverter/UPS', quantity: 1, hours: 24, watts: 50, selected: false, category: 'Other' },
    { id: 66, name: 'Battery Charger', quantity: 1, hours: 4, watts: 100, selected: false, category: 'Other' },
    { id: 67, name: 'Electric Blanket', quantity: 1, hours: 6, watts: 100, selected: false, category: 'Heating' },
    { id: 68, name: 'Room Heater', quantity: 1, hours: 4, watts: 2000, selected: false, category: 'Heating' },
    { id: 69, name: 'Electric Chimney', quantity: 1, hours: 1, watts: 200, selected: false, category: 'Kitchen' },
    { id: 70, name: 'Dishwasher', quantity: 1, hours: 1, watts: 1500, selected: false, category: 'Kitchen' }
  ]);

  const [customAppliances, setCustomAppliances] = useState([]);
  const [systemType, setSystemType] = useState('hybrid');
  const [electricityRate, setElectricityRate] = useState(25);
  const [showQuotation, setShowQuotation] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories
  const categories = ['all', ...new Set(appliances.map(app => app.category))];
  
  // Filter appliances by category
  const filteredAppliances = selectedCategory === 'all' 
    ? appliances 
    : appliances.filter(app => app.category === selectedCategory);

  // Calculate total load
  const calculateTotalLoad = () => {
    let totalWatts = 0;
    let totalUnits = 0;

    appliances.forEach(app => {
      if (app.selected) {
        const dailyWatts = app.quantity * app.watts * app.hours;
        totalWatts += dailyWatts;
        totalUnits += dailyWatts / 1000; // Convert to kWh
      }
    });

    customAppliances.forEach(app => {
      const dailyWatts = app.quantity * app.watts * app.hours;
      totalWatts += dailyWatts;
      totalUnits += dailyWatts / 1000;
    });

    return {
      dailyUnits: totalUnits,
      monthlyUnits: totalUnits * 30,
      totalWatts: totalWatts
    };
  };

  // Calculate system requirements
  const calculateSystem = () => {
    const load = calculateTotalLoad();
    
    if (load.dailyUnits === 0) {
      setResults(null);
      return;
    }

    // Pakistan average: 4.5 peak sun hours
    const peakSunHours = 4.5;
    const systemEfficiency = 0.85;
    
    // Required system capacity
    const requiredCapacity = load.dailyUnits / (peakSunHours * systemEfficiency);
    
    // Round to standard sizes
    const standardSizes = [3, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 50];
    const recommendedSize = standardSizes.find(size => size >= requiredCapacity) || 50;

    // Calculate costs (Pakistan market rates - PKR)
    let costPerWatt;
    if (systemType === 'onGrid') {
      costPerWatt = 90; // Rs. 90 per watt for on-grid
    } else if (systemType === 'hybrid') {
      costPerWatt = 140; // Rs. 140 per watt for hybrid
    } else {
      costPerWatt = 130; // Rs. 130 per watt for off-grid
    }

    const systemCost = recommendedSize * 1000 * costPerWatt;

    // Calculate monthly generation (based on Pakistan average)
    const monthlyGeneration = (recommendedSize * peakSunHours * 30 * systemEfficiency).toFixed(0);

    // Calculate savings
    let monthlySavings;
    if (systemType === 'onGrid') {
      // On-grid can save up to 100% with net metering
      monthlySavings = Math.min(parseFloat(monthlyGeneration) * electricityRate, load.monthlyUnits * electricityRate);
    } else if (systemType === 'hybrid') {
      // Hybrid saves 60-70%
      monthlySavings = load.monthlyUnits * electricityRate * 0.65;
    } else {
      // Off-grid saves 100% but can't sell back
      monthlySavings = Math.min(parseFloat(monthlyGeneration) * electricityRate, load.monthlyUnits * electricityRate);
    }

    const yearlySavings = monthlySavings * 12;
    const paybackPeriod = systemCost / yearlySavings;
    const lifetime25Years = (yearlySavings * 25) - systemCost;
    const roi = ((yearlySavings * 25) / systemCost) * 100;

    // Number of panels (550W panels)
    const numberOfPanels = Math.ceil((recommendedSize * 1000) / 550);
    const requiredRoofSpace = numberOfPanels * 35; // 35 sq ft per panel

    setResults({
      recommendedSize,
      systemCost,
      monthlyGeneration,
      monthlySavings: monthlySavings.toFixed(0),
      yearlySavings: yearlySavings.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1),
      lifetime25Years: lifetime25Years.toFixed(0),
      roi: roi.toFixed(0),
      numberOfPanels,
      requiredRoofSpace,
      dailyLoad: load.dailyUnits.toFixed(2),
      monthlyLoad: load.monthlyUnits.toFixed(0)
    });
  };

  useEffect(() => {
    calculateSystem();
  }, [appliances, customAppliances, systemType, electricityRate, selectedCategory]);

  const toggleAppliance = (id) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, selected: !app.selected } : app
    ));
  };

  const updateAppliance = (id, field, value) => {
    setAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, [field]: parseFloat(value) || 0 } : app
    ));
  };

  const addCustomAppliance = () => {
    setCustomAppliances(prev => [...prev, {
      id: Date.now(),
      name: 'Custom Appliance',
      quantity: 1,
      hours: 1,
      watts: 100,
      selected: true
    }]);
  };

  const removeCustomAppliance = (id) => {
    setCustomAppliances(prev => prev.filter(app => app.id !== id));
  };

  const updateCustomAppliance = (id, field, value) => {
    setCustomAppliances(prev => prev.map(app => 
      app.id === id ? { ...app, [field]: field === 'name' ? value : (parseFloat(value) || 0) } : app
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header - Mobile Responsive */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <FiActivity className="text-2xl sm:text-3xl mr-2 sm:mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">{t('advancedCalculator.title')}</h2>
              <p className="text-xs sm:text-sm text-blue-100 hidden sm:block">{t('advancedCalculator.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors flex-shrink-0 ml-2"
          >
            <FiX size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Side - Appliance Selection */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                  {t('advancedCalculator.selectAppliances')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  Apne appliances select karein aur quantity aur hours set karein | Select your appliances and set quantity and hours
                </p>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('advancedCalculator.filterByCategory')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          selectedCategory === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {cat === 'all' ? t('advancedCalculator.all') : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAppliances.map(app => (
                    <div key={app.id} className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-blue-400 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={app.selected}
                            onChange={() => toggleAppliance(app.id)}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <span className="ml-3 font-semibold text-gray-900">{app.name}</span>
                        </label>
                        <span className="text-sm text-gray-500">{app.watts}W</span>
                      </div>
                      
                      {app.selected && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">{t('advancedCalculator.quantity')}</label>
                            <input
                              type="number"
                              value={app.quantity}
                              onChange={(e) => updateAppliance(app.id, 'quantity', e.target.value)}
                              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">{t('advancedCalculator.hoursPerDay')}</label>
                            <input
                              type="number"
                              value={app.hours}
                              onChange={(e) => updateAppliance(app.id, 'hours', e.target.value)}
                              className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              min="0"
                              max="24"
                              step="0.5"
                            />
                          </div>
                          <div className="flex items-end">
                            <div className="w-full bg-blue-50 rounded-lg p-2 text-center">
                              <div className="text-xs text-gray-600">Daily Units</div>
                              <div className="font-bold text-blue-600">
                                {((app.quantity * app.watts * app.hours) / 1000).toFixed(2)} kWh
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Custom Appliances */}
                  {customAppliances.map(app => (
                    <div key={app.id} className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={app.name}
                          onChange={(e) => updateCustomAppliance(app.id, 'name', e.target.value)}
                          placeholder={t('advancedCalculator.applianceName')}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold"
                        />
                        <button
                          onClick={() => removeCustomAppliance(app.id)}
                          className="ml-2 text-red-600 hover:text-red-700"
                        >
                          <FiX />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('advancedCalculator.watts')}</label>
                          <input
                            type="number"
                            value={app.watts}
                            onChange={(e) => updateCustomAppliance(app.id, 'watts', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('advancedCalculator.quantity')}</label>
                          <input
                            type="number"
                            value={app.quantity}
                            onChange={(e) => updateCustomAppliance(app.id, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">{t('advancedCalculator.hoursPerDay')}</label>
                          <input
                            type="number"
                            value={app.hours}
                            onChange={(e) => updateCustomAppliance(app.id, 'hours', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            min="0"
                            max="24"
                            step="0.5"
                          />
                        </div>
                        <div className="flex items-end">
                          <div className="w-full bg-purple-50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-600">Units</div>
                            <div className="font-bold text-purple-600">
                              {((app.quantity * app.watts * app.hours) / 1000).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addCustomAppliance}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors font-semibold"
                  >
                    {t('advancedCalculator.addCustom')}
                  </button>
                </div>
              </div>

              {/* System Configuration */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {t('advancedCalculator.systemConfig')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('advancedCalculator.systemType')}
                    </label>
                    <select
                      value={systemType}
                      onChange={(e) => setSystemType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    >
                      <option value="onGrid">{t('calculator.labels.onGrid')}</option>
                      <option value="hybrid">{t('calculator.labels.hybrid')}</option>
                      <option value="offGrid">{t('calculator.labels.offGrid')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('advancedCalculator.electricityRate')}
                    </label>
                    <input
                      type="number"
                      value={electricityRate}
                      onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 25)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      min="10"
                      max="100"
                      step="0.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('advancedCalculator.currentRate')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Instant Estimate */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 text-white rounded-xl p-4 sm:p-6 sticky top-4 sm:top-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <FiActivity className="text-xl sm:text-2xl mr-2 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold">{t('advancedCalculator.instantEstimate')}</h3>
                </div>

                {results ? (
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.totalCost')}</div>
                      <div className="text-3xl font-bold">
                        Rs. {parseInt(results.systemCost).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.recommendedSystem')}</div>
                      <div className="text-2xl font-bold">{results.recommendedSize} KW</div>
                      <div className="text-xs opacity-75 mt-1">
                        {results.numberOfPanels} Panels | {results.requiredRoofSpace} sq ft needed
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.monthlySavings')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(results.monthlySavings).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.annualSavings')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(results.yearlySavings).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-white bg-opacity-20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.paybackPeriod')}</div>
                      <div className="text-2xl font-bold">
                        {results.paybackPeriod} {t('advancedCalculator.years')}
                      </div>
                    </div>

                    <div className="bg-green-500 rounded-lg p-4 mt-4">
                      <div className="text-sm opacity-90 mb-1">{t('advancedCalculator.roi')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(results.lifetime25Years).toLocaleString()}
                      </div>
                    </div>

                    <div className="text-xs opacity-75 mt-4 pt-4 border-t border-white border-opacity-30">
                      <p>Daily Load: {results.dailyLoad} kWh</p>
                      <p>Monthly Load: {results.monthlyLoad} kWh</p>
                      <p>Monthly Generation: {results.monthlyGeneration} kWh</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiSun className="text-5xl mx-auto mb-4 opacity-50" />
                    <p className="text-sm opacity-75">
                      Appliances select karein aur estimate dekhein | Select appliances to see estimate
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showQuotation}
                      onChange={(e) => setShowQuotation(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm">Quotation Chahiye? | Need Quotation?</span>
                  </label>
                </div>

                {showQuotation && results && (
                  <button
                    onClick={() => {
                      // Navigate to quote page with pre-filled data
                      window.location.href = `/quote?systemSize=${results.recommendedSize}&systemType=${systemType}&monthlyBill=${results.monthlyLoad * electricityRate}`;
                    }}
                    className="w-full mt-4 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {t('advancedCalculator.getQuote')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSolarCalculator;

