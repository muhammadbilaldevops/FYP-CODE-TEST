/**
 * HEADER COMPONENT
 * 
 * This is the main navigation header that appears at the top of every page.
 * It includes:
 * - Company logo and name
 * - Navigation menu with links to all pages
 * - Mobile responsive hamburger menu
 * - Call-to-action button
 * 
 * Student Note: 
 * - This is a "sticky" header (stays at top when scrolling)
 * - Uses React Router's Link component for navigation
 * - Responsive design: full menu on desktop, hamburger menu on mobile
 */

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiGlobe, FiUser } from 'react-icons/fi'
import { FaCalculator } from 'react-icons/fa'
import Logo from './Logo'
import AdvancedSolarCalculator from './AdvancedSolarCalculator'
import { useTranslation } from '../hooks/useTranslation'
import { useLanguage } from '../contexts/LanguageContext'

/**
 * Header Component
 * 
 * Displays the navigation bar with logo, menu items, and mobile menu.
 * 
 * Student Note:
 * - useState manages the mobile menu open/close state
 * - useLocation helps identify which page is currently active
 * - Link component from react-router-dom enables SPA navigation
 * 
 * @returns {JSX.Element} The header navigation component
 */
const Header = () => {
  // State to track if mobile menu is open or closed
  // Student Note: false = closed, true = open
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Get current location/path from React Router
  // Student Note: This helps us highlight the active menu item
  const location = useLocation()

  // State to track if calculator modal is open
  const [showCalculator, setShowCalculator] = useState(false)

  // Language and translation hooks
  const { t } = useTranslation()
  const { language, toggleLanguage, isEnglish } = useLanguage()

  // Navigation menu items configuration
  // Student Note: Keeping data in an array makes it easy to maintain
  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'projects', path: '/projects' },
    { key: 'products', path: '/products' },
    { key: 'contact', path: '/contact' },
  ]

  /**
   * Check if a menu item is currently active
   * Student Note: Active item is highlighted differently
   * 
   * @param {string} path - The path to check
   * @returns {boolean} True if path matches current location
   */
  const isActive = (path) => {
    return location.pathname === path
  }

  /**
   * Handle mobile menu link click
   * Student Note: Close menu after clicking a link for better UX
   */
  const handleMobileMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    // Header element with styling
    // Student Note: 
    // - sticky top-0 makes header stay at top when scrolling
    // - z-50 ensures header appears above other content
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
          {/* Logo and Company Name - Enhanced with animations */}
          {/* Student Note: Link to="/" means clicking logo goes to home page */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            {/* Logo Component - Enhanced with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              <Logo className="w-14 h-14 sm:w-16 sm:h-16 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            {/* Company Name - Enhanced styling */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-white transition-all duration-300">
                {t('header.companyName')}
              </span>
              <span className="text-xs text-gray-300 group-hover:text-green-300 transition-colors duration-300">
                {t('header.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu - Enhanced with hover effects */}
          {/* Student Note: hidden md:flex means hidden on mobile, flex on medium+ screens */}
          <nav className="hidden md:flex items-center space-x-2">
            {/* Loop through navigation items */}
            {/* Student Note: .map() creates a menu item for each object in navItems array */}
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`relative px-4 py-2.5 text-base rounded-lg transition-all duration-300 group ${isActive(item.path)
                    ? 'text-blue-400 font-semibold bg-blue-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <span className="relative z-10">{t(`header.nav.${item.key}`)}</span>
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></span>
                )}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons - Desktop - Language Toggle, Calculator and Admin */}
          {/* Student Note: hidden md:flex means show only on medium+ screens */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="group relative bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-semibold border border-slate-600 hover:border-slate-500 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              title={isEnglish ? "Switch to Urdu" : "Switch to English"}
              aria-label="Toggle language"
            >
              <FiGlobe className="text-base" />
              <span className="hidden lg:inline">{isEnglish ? 'EN' : 'UR'}</span>
            </button>

            {/* Solar Calculator Button */}
            <button
              onClick={() => setShowCalculator(true)}
              className="group relative bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white px-2 py-1.5 rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex flex-col items-center justify-center gap-0.5 text-center min-w-[80px]"
              title={t('header.calculator')}
              aria-label="Open Calculator"
            >
              <FaCalculator className="text-lg mx-auto" />
              <span className="text-[10px] uppercase tracking-wider text-center w-full block">{t('header.calculator')}</span>
            </button>

            {/* User Login Button Desktop */}
            <Link
              to="/user/dashboard"
              className="group relative bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-500 hover:to-green-400 text-white px-3 py-1.5 rounded-xl transition-all duration-300 font-bold border border-transparent shadow-lg hover:shadow-xl transform hover:scale-105 flex flex-col items-center justify-center gap-0.5 text-center min-w-[80px]"
            >
              <FiUser className="text-lg mx-auto" />
              <span className="text-[10px] uppercase tracking-wider text-center w-full block">User Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          {/* Student Note: md:hidden means show only on small screens (mobile) */}
          <button
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {/* Show X icon if menu is open, hamburger icon if closed */}
            {/* Student Note: This is conditional rendering */}
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {/* Student Note: This menu slides in/out on mobile devices */}
        {/* Only render if isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-700 animate-slideDown">
            <nav className="flex flex-col py-4 px-4 space-y-3">
              {/* Mobile menu items - Enhanced */}
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={handleMobileMenuClick}
                  className={`relative px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                      ? 'text-blue-400 font-semibold bg-blue-500/10 border-l-4 border-blue-400'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {t(`header.nav.${item.key}`)}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-slate-700 space-y-2">
                {/* Language Toggle Button - Mobile */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <FiGlobe className="text-base" />
                  <span>{isEnglish ? 'Switch to Urdu' : 'Switch to English'}</span>
                </button>

                {/* Solar Calculator Button - Mobile */}
                <button
                  onClick={() => {
                    setShowCalculator(true);
                    handleMobileMenuClick();
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-md"
                >
                  <FaCalculator className="text-base" />
                  <span>{t('header.calculator')}</span>
                </button>

                {/* User Login Button - Mobile */}
                <Link
                  to="/user/dashboard"
                  onClick={handleMobileMenuClick}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 shadow-md"
                >
                  <FiUser className="text-base" />
                  <span>User Login / Portal</span>
                </Link>
              </div>

            </nav>
          </div>
        )}
      </div>

      {/* Advanced Calculator Modal */}
      <AdvancedSolarCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </header>
  )
}

export default Header

/**
 * HEADER DESIGN PATTERNS FOR STUDENTS:
 * 
 * 1. Responsive Design:
 *    - Desktop: Full horizontal menu
 *    - Mobile: Hamburger menu (icon that opens drawer)
 *    - Tailwind classes like 'md:hidden' and 'hidden md:flex' handle this
 * 
 * 2. State Management:
 *    - useState tracks if mobile menu is open/closed
 *    - Clicking hamburger icon toggles the state
 *    - State change triggers re-render, showing/hiding menu
 * 
 * 3. Active Link Highlighting:
 *    - useLocation() tells us current page
 *    - isActive() function checks if link matches current page
 *    - Active links get different styling (blue color, bold)
 * 
 * 4. Accessibility:
 *    - aria-label for screen readers
 *    - aria-expanded tells if menu is open
 *    - Semantic HTML (<header>, <nav>)
 * 
 * 5. User Experience:
 *    - Smooth transitions (transition-colors, transition-opacity)
 *    - Hover effects provide visual feedback
 *    - Mobile menu closes after clicking link (better UX)
 *    - Sticky header always accessible while scrolling
 */
