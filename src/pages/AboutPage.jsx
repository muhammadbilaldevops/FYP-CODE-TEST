/**
 * ABOUT PAGE
 * 
 * This page provides comprehensive information about Al Muslim Engineers:
 * - Company history and background
 * - Mission and vision
 * - Core values
 * - Team information
 * - Certifications and accreditations
 * 
 * Purpose: To build trust and credibility with potential clients
 * Student Note: This page uses multiple components to tell our company story
 */

import React from 'react'
import AboutUs from '../components/AboutUs'
import CoreValues from '../components/CoreValues'
import Certifications from '../components/Certifications'
import { FiAward, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

/**
 * AboutPage Component
 * 
 * This component renders the about page with company information,
 * values, certifications, and achievements.
 * 
 * @returns {JSX.Element} The complete about page layout
 */
const AboutPage = () => {
  const { t } = useTranslation()
  
  // Company statistics data
  // Student Note: Defining data as constants makes it easy to update and maintain
  const stats = [
    {
      icon: <FiAward className="text-4xl text-blue-600" />,
      value: '10+',
      labelKey: 'about.stats.experience',
      descriptionKey: 'about.stats.experienceDesc'
    },
    {
      icon: <FiUsers className="text-4xl text-green-600" />,
      value: '1500+',
      labelKey: 'about.stats.clients',
      descriptionKey: 'about.stats.clientsDesc'
    },
    {
      icon: <FiTrendingUp className="text-4xl text-purple-600" />,
      value: '200MW+',
      labelKey: 'about.stats.capacity',
      descriptionKey: 'about.stats.capacityDesc'
    },
    {
      icon: <FiShield className="text-4xl text-red-600" />,
      value: '100%',
      labelKey: 'about.stats.quality',
      descriptionKey: 'about.stats.qualityDesc'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Page Header Section */}
      {/* Student Note: Hero section with gradient background
          - Responsive padding: smaller on mobile, larger on desktop
          - Text sizes scale with screen size for better readability */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom section-padding text-center px-4 sm:px-6 lg:px-8">
          {/* Main heading - responsive font sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('about.title')}
          </h1>
          {/* Description text - responsive and centered */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Company Statistics Section */}
      {/* Student Note: Grid layout automatically arranges items in responsive columns
          - Mobile: 1 column (stacked)
          - Tablet: 2 columns
          - Desktop: 4 columns
          - Gap provides spacing between cards */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Responsive grid: adapts to screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Map through stats array to create cards */}
            {/* Student Note: .map() is used to render lists dynamically in React */}
            {/* Map through stats array to create statistic cards */}
            {/* Student Note: .map() creates a card for each statistic
                - key={index} helps React track which item is which
                - Each card is self-contained and reusable */}
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon container */}
                {/* Student Note: Icons are rendered as JSX elements from the stats array */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
                {/* Statistic value - large, bold number */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {stat.value}
                </div>
                {/* Statistic label - what the number represents */}
                <div className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                  {t(stat.labelKey)}
                </div>
                {/* Statistic description - additional context */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {t(stat.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Company overview */}
      {/* Student Note: This is a separate component for better code organization
          - Components can be reused in other pages
          - Makes the code easier to maintain */}
      <AboutUs />
      
      {/* Core Values Section - What drives us */}
      {/* Student Note: Another reusable component showcasing company values */}
      <CoreValues />
      
      {/* Certifications Section - Our credentials */}
      {/* Student Note: Displays certifications and accreditations to build trust */}
      <Certifications />

      {/* Call to Action (CTA) Section */}
      {/* Student Note: CTA sections encourage user engagement
          - Prominent button to guide users to next step
          - High contrast colors for visibility
          - Clear value proposition */}
      <section className="section-padding bg-blue-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom text-center px-4 sm:px-6 lg:px-8">
          {/* CTA Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('about.cta.title')}
          </h2>
          {/* CTA Description */}
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('about.cta.description')}
          </p>
          {/* CTA Button */}
          {/* Student Note: Using <a> tag instead of Link component here
              - href="/contact" works for both client-side and server-side navigation
              - Button has high contrast (white on blue) for visibility
              - Hover effects provide visual feedback */}
          <a 
            href="/contact" 
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100 inline-block py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Contact us for more information"
          >
            {t('about.cta.button')}
          </a>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

