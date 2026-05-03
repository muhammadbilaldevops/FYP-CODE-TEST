/**
 * FOOTER COMPONENT
 * 
 * This is the footer that appears at the bottom of every page.
 * It includes:
 * - Company contact information
 * - Quick links to important pages
 * - Newsletter subscription form
 * - Social media links
 * - Copyright information
 * 
 * Student Note:
 * - Footer provides easy access to contact info and important links
 * - Improves SEO (search engines look at footer links)
 * - Better user experience (users expect footer navigation)
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiUser } from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import Logo from './Logo'

/**
 * Footer Component
 * 
 * Displays company information, links, newsletter signup, and social media.
 * 
 * Student Note:
 * - Uses React Router Link for internal navigation
 * - Uses regular <a> tags for external links (social media)
 * - Form handling with useState for newsletter subscription
 * 
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const { t } = useTranslation()

  // Solutions/Services links data
  // Student Note: Storing data in arrays makes it reusable and maintainable
  const solutions = [
    { name: 'Residential Solar Systems', link: '/services' },
    { name: 'Commercial Solar Systems', link: '/services' },
    { name: 'Net Metering Solutions', link: '/services' },
    { name: 'Maintenance & Support', link: '/services' },
    { name: 'Energy Consulting', link: '/services' },
  ]

  // Company navigation links
  const companyLinks = [
    { name: 'About Us', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Projects', link: '/projects' },
    { name: 'Contact', link: '/contact' },
    { name: 'Get Quote', link: '/quote' },
  ]

  // Social media links
  // Student Note: Replace '#' with actual social media URLs
  const socialMedia = [
    { name: 'Facebook', icon: <FiFacebook />, url: 'https://facebook.com/almuslimengineers' },
    { name: 'Twitter', icon: <FiTwitter />, url: 'https://twitter.com/almuslimeng' },
    { name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://linkedin.com/company/almuslimengineers' },
    { name: 'Instagram', icon: <FiInstagram />, url: 'https://instagram.com/almuslimengineers' },
  ]

  return (
    // Footer element with dark background
    // Student Note: <footer> is semantic HTML - helps with SEO and accessibility
    <footer className="bg-slate-900 text-white">
      {/* Footer Container */}
      {/* Student Note: Responsive padding - smaller on mobile, larger on desktop */}
      <div className="container-custom section-padding pt-12 pb-6 sm:pt-16 sm:pb-8 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        {/* Student Note: Grid layout creates responsive columns
            - Mobile: 1 column (stacked)
            - Tablet: 2 columns
            - Desktop: 4 columns
            - gap-8: Spacing between columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12 items-start">
          
          {/* Column 1: Company Info & Contact Details */}
          {/* Student Note: First column contains company branding and contact info */}
          <div className="flex flex-col h-full">
            {/* Company Logo and Name */}
            {/* Student Note: Clickable logo that navigates to home page */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 mb-5 hover:opacity-80 transition-opacity">
              {/* Logo Component - Smaller size for footer */}
              <Logo className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
              {/* Company name - responsive font size */}
              <span className="text-lg sm:text-xl font-bold">{t('footer.companyName')}</span>
            </Link>
            
            {/* Company Description */}
            {/* Student Note: Brief company description for SEO and user information */}
            <p className="text-gray-400 mb-5 text-xs sm:text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Contact Information */}
            {/* Student Note: All contact methods with clickable links
                - tel: links work on mobile devices
                - mailto: links open email client */}
            <div className="space-y-3 text-xs sm:text-sm text-gray-400 mt-2">
              {/* Phone Numbers */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <strong className="text-white font-semibold">Phone:</strong>
                <div className="flex flex-wrap gap-2">
                  <a href="tel:03318441722" className="hover:text-blue-400 transition-colors whitespace-nowrap">0331 8441722</a>
                  <span className="text-gray-500">/</span>
                  <a href="tel:03419231892" className="hover:text-blue-400 transition-colors whitespace-nowrap">0341 9231892</a>
                </div>
              </div>
              {/* Email Address */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <strong className="text-white font-semibold">Email:</strong>
                <a
                  href="mailto:info@almuslimengineers.com"
                  className="hover:text-blue-400 transition-colors break-all"
                  aria-label="Send email to info@almuslimengineers.com"
                >
                  info@almuslimengineers.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions/Services Links */}
          {/* Student Note: Quick links to service pages for easy navigation */}
          <div className="flex flex-col">
            {/* Section Heading */}
            <h3 className="text-base sm:text-lg font-bold mb-5 text-center">{t('footer.solutions')}</h3>
            {/* Links List */}
            <ul className="space-y-2.5">
              {/* Map through solutions array to create links */}
              {/* Student Note: .map() creates a list item for each solution
                  - key={index} helps React track list items efficiently */}
              {solutions.map((item, index) => (
                <li key={index} className="text-center">
                  {/* Link component for internal navigation */}
                  {/* Student Note: Link prevents page reload (SPA navigation)
                      - hover:text-blue-400: Color change on hover
                      - block: Makes entire area clickable */}
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          {/* Student Note: Navigation links to main pages */}
          <div className="flex flex-col">
            {/* Section Heading */}
            <h3 className="text-base sm:text-lg font-bold mb-5 text-center">{t('footer.company')}</h3>
            {/* Links List */}
            <ul className="space-y-2.5">
              {/* Map through company links array */}
              {companyLinks.map((item, index) => (
                <li key={index} className="text-center">
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs sm:text-sm block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          {/* Student Note: Social media links */}
          <div className="flex flex-col">
            {/* Section Heading */}
            <h3 className="text-base sm:text-lg font-bold mb-5 text-center">{t('footer.stayConnected')}</h3>
            
            {/* Social Media Links */}
            {/* Student Note: External links use <a> tag, not Link component
                - target="_blank": Opens in new tab
                - rel="noopener noreferrer": Security best practice
                - w-10 h-10: Touch-friendly size (44x44px minimum) */}
            <div className="flex flex-wrap gap-3 justify-center">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                  aria-label={`Visit our ${social.name} page`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="border-t border-slate-700 pt-6 mt-8 pb-0">
          <div className="flex flex-col items-center gap-4">
            {/* Copyright Notice */}
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} {t('footer.companyName')}. {t('footer.allRightsReserved')}
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-conditions"
                className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

/**
 * FOOTER BEST PRACTICES FOR STUDENTS:
 * 
 * 1. Information Architecture:
 *    - Contact info (users need easy access to contact you)
 *    - Site navigation (helps users find pages)
 *    - Social media (builds community)
 *    - Newsletter (builds email list)
 *    - Legal links (privacy policy, terms - required by law)
 * 
 * 2. SEO Benefits:
 *    - Footer links help search engines understand site structure
 *    - Internal linking improves page ranking
 *    - Contact info helps with local SEO
 * 
 * 3. User Experience:
 *    - Users expect footer navigation on every page
 *    - Footer provides context about the company
 *    - Easy access to contact information
 * 
 * 4. Accessibility:
 *    - Semantic HTML (<footer>)
 *    - aria-label for icon-only buttons
 *    - Proper link text (not just "click here")
 * 
 * 5. Forms:
 *    - Controlled components (React manages input value)
 *    - preventDefault() stops page reload
 *    - Validation before submission
 *    - Clear feedback to user (success/error messages)
 */
