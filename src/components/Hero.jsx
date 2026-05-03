/**
 * HERO COMPONENT
 * 
 * This is the main hero/banner section at the top of the home page.
 * It's the first thing visitors see and should:
 * - Grab attention with compelling visuals
 * - Clearly communicate what we do
 * - Include strong call-to-action buttons
 * - Show key statistics
 * 
 * Student Note: The hero section is crucial for first impressions and conversions
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

/**
 * Hero Component
 * 
 * Displays the main hero section with headline, CTA buttons, and statistics.
 * 
 * @returns {JSX.Element} The hero section
 */
const Hero = () => {
  const { t } = useTranslation()
  
  // Statistics to display
  // Student Note: These numbers should be updated with real data
  const stats = [
    { value: '1500+', label: 'Projects Completed' },
    { value: '200MW+', label: 'Total Capacity Installed' },
    { value: '90.2%', label: 'Customer Satisfaction' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=2000&h=1200&fit=crop&q=90')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container-custom section-padding text-center">
        <p className="text-sm sm:text-base text-blue-300 mb-4 font-semibold">
          {t('hero.certified')}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {t('hero.title')}
          <br />
          <span className="text-green-400">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200 leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTA Button */}
        {/* Student Note: Clear, action-oriented button increases conversions */}
        <div className="flex justify-center mb-12">
          <Link
            to="/contact"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-lg uppercase tracking-wide"
          >
            {t('hero.contactButton')}
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero

