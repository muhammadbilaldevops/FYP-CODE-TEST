/**
 * CONTACT PAGE
 * 
 * This page provides multiple ways for customers to contact us:
 * - Contact form for inquiries
 * - Phone numbers and email addresses
 * - Office location and map
 * - Business hours
 * - Emergency support information
 * 
 * Purpose: To make it easy for customers to reach out to us
 * Student Note: Forms are essential for collecting user information
 */

import React from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'

/**
 * ContactPage Component
 * 
 * Renders a comprehensive contact page with form, contact details,
 * and additional information about reaching our team.
 * 
 * @returns {JSX.Element} The complete contact page layout
 */
const ContactPage = () => {
  const { t } = useTranslation()
  // Office locations data from Al-Muslim Engineering
  const offices = [
    {
      city: 'Rawalpindi',
      address: 'Al Muslim engineering solar system and cooling center',
      phone: '0346-51 88 458',
      email: 'info@almuslimengineering.com',
      manager: 'Muhammad Saeed'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Page Header Section */}
      {/* Student Note: Hero section with gradient background for visual appeal */}
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          {/* Responsive heading - smaller on mobile, larger on desktop */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t('contact.title')}
          </h1>
        </div>
      </section>

      {/* Quick Contact Methods Section */}
      {/* Student Note: This section provides quick access to contact methods
          - Grid layout: 1 column on mobile, 2 columns on desktop
          - Cards are touch-friendly with hover effects
          - Phone numbers are clickable (tel: links work on mobile) */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Responsive grid: stacks on mobile, side-by-side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto">
            {/* Phone Card */}
            {/* Student Note: tel: links allow users to call directly from mobile devices */}
            <div className="text-center p-6 sm:p-8 bg-blue-50 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Icon container - touch-friendly size */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 text-white rounded-full mb-4">
                <FiPhone size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">{t('contact.callUs')}</h3>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-slate-900 font-semibold mb-2">Amir Solar Manager</p>
                {/* Clickable phone number - larger on mobile for easy tapping */}
                <a 
                  href="tel:+923419231892" 
                  className="block text-blue-600 font-semibold text-lg sm:text-xl hover:text-blue-700 transition-all duration-300 transform hover:scale-110 cursor-pointer hover:underline py-2 px-4 rounded-lg hover:bg-blue-100"
                  aria-label="Call Amir Solar Manager at 0341 9231892"
                >
                  0341 9231892
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            {/* Student Note: Similar structure to phone card for consistency */}
            <div className="text-center p-6 sm:p-8 bg-green-50 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Icon container - touch-friendly size */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-600 text-white rounded-full mb-4">
                <FiMessageSquare size={28} className="sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">{t('contact.whatsapp')}</h3>
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-slate-900 font-semibold mb-2">Mubashir Solar Cordinator</p>
                {/* Clickable phone number - larger on mobile for easy tapping */}
                <a 
                  href="tel:+923318441722" 
                  className="block text-green-600 font-semibold text-lg sm:text-xl hover:text-green-700 transition-all duration-300 transform hover:scale-110 cursor-pointer hover:underline py-2 px-4 rounded-lg hover:bg-green-100"
                  aria-label="Call Mubashir Solar Coordinator at 0331 8441722"
                >
                  0331 8441722
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Office Locations Section */}
      {/* Student Note: Displays office locations with map integration
          - Uses Google Maps API for location links
          - Responsive card layout
          - id="office-location" allows anchor navigation from chatbot */}
      <section id="office-location" className="section-padding bg-gray-50 py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            {/* Responsive heading sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              {t('contact.officeLocations')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t('contact.officeDescription')}
            </p>
          </div>

          {/* Office Cards */}
          {/* Student Note: Centered layout with max-width for better readability */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full max-w-md">
              {/* Map through offices array */}
              {offices.map((office, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                {/* Office City Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                  {office.city} Office
                </h3>
                
                {/* Address Section */}
                {/* Student Note: Flexbox layout with icon and text for better visual hierarchy */}
                <div className="flex items-start mb-6">
                  {/* Icon - flex-shrink-0 prevents icon from shrinking */}
                  <FiMapPin className="text-blue-600 mr-3 mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                  {/* Address text - responsive font size */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{office.address}</p>
                </div>
                
                {/* Get Location Button */}
                {/* Student Note: Opens Google Maps in new tab
                    - encodeURIComponent ensures special characters in address are properly encoded
                    - rel="noopener noreferrer" for security when opening external links */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Al Muslim engineering solar system and cooling center')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full text-center inline-block py-3 sm:py-4 text-sm sm:text-base font-semibold"
                  aria-label="Open location in Google Maps"
                >
                  {t('contact.getLocation')} 📍
                </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      {/* Student Note: Displays operating hours in a clear, readable format
          - Responsive padding and spacing
          - Mobile-friendly text sizes */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-blue-50 rounded-xl p-6 sm:p-8 lg:p-10">
            {/* Section Header */}
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <FiClock className="text-blue-600 mr-3 w-6 h-6 sm:w-8 sm:h-8" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{t('contact.businessHours')}</h3>
            </div>
            
            {/* Hours List */}
            {/* Student Note: Flexbox layout for day and time
                - Responsive text sizes
                - Proper spacing between items */}
            <div className="space-y-3 sm:space-y-4 text-center">
              {/* Monday - Friday */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start max-w-md mx-auto gap-2 sm:gap-0">
                <span className="font-semibold text-sm sm:text-base text-gray-700">Monday - Sunday:</span>
                <span className="text-sm sm:text-base text-gray-600">9:00 AM - 8:00 PM</span>
              </div>
              {/* Sunday */}
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start max-w-md mx-auto gap-2 sm:gap-0">
                <span className="font-semibold text-sm sm:text-base text-gray-700">Friday:</span>
                <span className="text-sm sm:text-base text-gray-600">Closed</span>
              </div>
              
              {/* Emergency Support Notice */}
              {/* Student Note: Highlighted section for important information */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
                    <strong className="text-red-600">{t('contact.emergencySupport')}</strong> {t('contact.emergencyDesc')} 
                    <br className="sm:hidden" /> {/* Line break on mobile only */}
                    <span className="hidden sm:inline">  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage

