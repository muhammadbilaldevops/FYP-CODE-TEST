/**
 * SERVICES PAGE - Complete Solar Solutions
 * 
 * Showcasing all services offered by Al-Muslim Engineering.
 * 
 * Student Note: This page displays:
 * - On-Grid, Hybrid, and Off-Grid solar systems
 * - Detailed information about each system type
 * - Benefits and use cases for each system
 * - Visual representations of each system
 * 
 * Key Features:
 * - Responsive grid layouts
 * - Image galleries for each system type
 * - Comparison information
 * - Call-to-action buttons
 * 
 * Technical Concepts:
 * - Component composition (using SafeImage, etc.)
 * - Data mapping from companyData
 * - Responsive design with Tailwind breakpoints
 */

import React from 'react';
import { FiSun, FiZap, FiBattery, FiSettings, FiAward, FiTrendingUp, FiShield, FiCheckCircle } from 'react-icons/fi';
import { solarSystems, services } from '../data/companyData';
import { solarImages } from '../data/imageUrls';
import SafeImage from '../components/SafeImage';
import { useTranslation } from '../hooks/useTranslation';

/**
 * ServicesPage Component
 * 
 * Renders a comprehensive services page showcasing all solar system types
 * and services offered by the company.
 * 
 * @returns {JSX.Element} The complete services page layout
 */
const ServicesPage = () => {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Student Note: Hero section with gradient background
          - Responsive padding: adjusts based on screen size
          - Centered text for better visual hierarchy */}
      <section className="bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom section-padding text-center px-4 sm:px-6 lg:px-8">
          {/* Main heading - responsive font sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('services.title')}
          </h1>
          {/* Subtitle - responsive text size */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            {t('services.subtitle')}
          </p>
          {/* CTA Button - touch-friendly size on mobile */}
          <a 
            href="/quote" 
            className="btn-primary inline-block py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Get a free consultation"
          >
            {t('services.getConsultation')}
          </a>
        </div>
      </section>

      {/* Solar System Types Section */}
      {/* Student Note: This section displays detailed information about each system type
          - Each system has its own card with gradient background
          - Responsive grid: stacks on mobile, side-by-side on desktop
          - Includes images, benefits, and use cases */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            {/* Responsive heading sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('services.chooseSystem')}
            </h2>
            {/* Description text */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t('services.chooseSystemDesc')}
            </p>
          </div>

          {/* On-Grid System Card */}
          {/* Student Note: First system type - On-Grid
              - Gradient background for visual appeal
              - Rounded corners with shadow for depth
              - Responsive padding and spacing */}
          <div className="mb-10 sm:mb-12 md:mb-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            {/* Grid layout: 1 column on mobile, 2 columns on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
              {/* Left Column: System Information */}
              {/* Student Note: Contains title, description, features, and benefits */}
              <div>
                {/* System Title with Icon */}
                {/* Student Note: Flexbox layout for icon and title alignment */}
                <div className="flex items-center mb-4 sm:mb-6">
                  {/* Icon container - responsive size */}
                  <div className="bg-blue-600 p-3 sm:p-4 rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <FiZap className="text-white w-6 h-6 sm:w-8 sm:h-8 md:text-4xl" />
                  </div>
                  {/* System title - responsive font size */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {solarSystems.onGrid.title}
                  </h3>
                </div>
                
                {/* System Purpose - highlighted text */}
                <p className="text-lg sm:text-xl text-blue-600 font-semibold mb-4 sm:mb-6">
                  {solarSystems.onGrid.purpose}
                </p>
                
                {/* System Features List */}
                {/* Student Note: Space-y-4 adds vertical spacing between items */}
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {/* Feature Item */}
                  {/* Student Note: Flexbox layout with icon and text
                      - flex-shrink-0 prevents icon from shrinking
                      - mt-1 aligns icon with first line of text */}
                  <div className="flex items-start">
                    {/* Check icon - green for positive indication */}
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      {/* Feature label */}
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Day Time Operation:</p>
                      {/* Feature description */}
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.onGrid.dayTimeOperation}</p>
                    </div>
                  </div>
                  {/* Night Time Operation Feature */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Night Time Operation:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.onGrid.nightTimeOperation}</p>
                    </div>
                  </div>
                  {/* Batteries Feature */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Batteries:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.onGrid.batteries}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits Card */}
                {/* Student Note: White card with shadow for visual separation */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  {/* Benefits List Header */}
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Key Benefits:</h4>
                  {/* Benefits List */}
                  {/* Student Note: .map() creates a list item for each benefit */}
                  <ul className="space-y-2 sm:space-y-3">
                    {solarSystems.onGrid.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        {/* Checkmark icon */}
                        <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                        {/* Benefit text - responsive font size */}
                        <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Additional Information */}
                  {/* Student Note: Border-top creates visual separation */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      <strong className="font-semibold">Best For:</strong> {solarSystems.onGrid.bestFor}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <strong className="font-semibold">Savings:</strong> {solarSystems.onGrid.savingsPotential}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column: System Image */}
              {/* Student Note: Image display with responsive sizing */}
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full">
                  {/* SafeImage component handles image loading errors gracefully */}
                  <div className="bg-gray-50 rounded-xl mb-4 w-full h-32 sm:h-40 md:h-48 overflow-hidden">
                    <SafeImage 
                      src={solarImages.systems.onGrid} 
                      alt="On-Grid Solar System" 
                      className="rounded-xl w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                    <p className="text-gray-600">Bill Reduction Possible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hybrid System Card */}
          {/* Student Note: Second system type - Hybrid
              - Different gradient colors (purple/pink) for visual distinction
              - order-2/order-1 classes swap image and text on mobile vs desktop
              - Image appears first on mobile, text first on desktop */}
          <div className="mb-10 sm:mb-12 md:mb-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            {/* Grid layout with responsive ordering */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
              {/* Image Column - appears second on mobile, first on desktop */}
              <div className="order-2 lg:order-1 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full">
                  <div className="bg-gray-50 rounded-xl mb-4 w-full h-32 sm:h-40 md:h-48 overflow-hidden">
                    <SafeImage 
                      src={solarImages.systems.hybrid} 
                      alt="Hybrid Solar System" 
                      className="rounded-xl w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-2">60-70%</div>
                    <p className="text-xs sm:text-sm text-gray-600">Bill Reduction + Backup</p>
                  </div>
                </div>
              </div>
              
              {/* Information Column - appears first on mobile, second on desktop */}
              <div className="order-1 lg:order-2">
                {/* System Title with Icon */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="bg-purple-600 p-3 sm:p-4 rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <FiBattery className="text-white w-6 h-6 sm:w-8 sm:h-8 md:text-4xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {solarSystems.hybrid.title}
                  </h3>
                </div>
                
                {/* System Purpose */}
                <p className="text-lg sm:text-xl text-purple-600 font-semibold mb-4 sm:mb-6">
                  {solarSystems.hybrid.purpose}
                </p>
                
                {/* System Features List */}
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {/* Day Time Operation */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Day Time Operation:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.hybrid.dayTimeOperation}</p>
                    </div>
                  </div>
                  {/* Night Time Operation */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Night Time Operation:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.hybrid.nightTimeOperation}</p>
                    </div>
                  </div>
                  {/* Batteries */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Batteries:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.hybrid.batteries}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits Card */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Key Benefits:</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {solarSystems.hybrid.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                        <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      <strong className="font-semibold">Best For:</strong> {solarSystems.hybrid.bestFor}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <strong className="font-semibold">Savings:</strong> {solarSystems.hybrid.savingsPotential}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Off-Grid System Card */}
          {/* Student Note: Third system type - Off-Grid
              - Green/teal gradient for visual distinction
              - Standard layout: text left, image right */}
          <div className="mb-10 sm:mb-12 md:mb-16 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12">
              {/* Left Column: System Information */}
              <div>
                {/* System Title with Icon */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="bg-green-600 p-3 sm:p-4 rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <FiSun className="text-white w-6 h-6 sm:w-8 sm:h-8 md:text-4xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {solarSystems.offGrid.title}
                  </h3>
                </div>
                
                {/* System Purpose */}
                <p className="text-lg sm:text-xl text-green-600 font-semibold mb-4 sm:mb-6">
                  {solarSystems.offGrid.purpose}
                </p>
                
                {/* System Features List */}
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {/* Day Time Operation */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Day Time Operation:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.offGrid.dayTimeOperation}</p>
                    </div>
                  </div>
                  {/* Night Time Operation */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Night Time Operation:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.offGrid.nightTimeOperation}</p>
                    </div>
                  </div>
                  {/* Batteries */}
                  <div className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Batteries:</p>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{solarSystems.offGrid.batteries}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits Card */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Key Benefits:</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {solarSystems.offGrid.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                        <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      <strong className="font-semibold">Best For:</strong> {solarSystems.offGrid.bestFor}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      <strong className="font-semibold">Savings:</strong> {solarSystems.offGrid.savingsPotential}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column: System Image */}
              <div className="flex items-center justify-center">
                <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full">
                  <div className="bg-gray-50 rounded-xl mb-4 w-full h-48 sm:h-56 md:h-64 flex items-center justify-center overflow-hidden">
                    <SafeImage 
                      src={solarImages.systems.offGrid} 
                      alt="Off-Grid Solar System" 
                      className="rounded-xl w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-gray-600">Energy Independence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Humare Complete Services | Our Complete Service Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Consultation se after-sales support tak - sab kuch hum karte hain. 
              | End-to-end solar solutions - from consultation to after-sales support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-600 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <FiSettings className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-gray-700 mb-4">{service.details}</p>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('services.whyChoose')}
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              {t('services.whyChooseDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('services.features.quality')}</h3>
              <p className="text-blue-100">{t('services.features.qualityDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSettings className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('services.features.installation')}</h3>
              <p className="text-blue-100">{t('services.features.installationDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('services.features.roi')}</h3>
              <p className="text-blue-100">{t('services.features.roiDesc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('services.features.support')}</h3>
              <p className="text-blue-100">{t('services.features.supportDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Solar Pe Switch Karein? | Ready to Switch to Solar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Suraj ki roshni se apni zindagi roshan karein! Aaj hi free consultation aur detailed proposal lein. 
            | Let sunlight enlighten your life! Get a free consultation and detailed proposal today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/quote" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Get Free Quote
            </a>
            <a href="/contact" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
