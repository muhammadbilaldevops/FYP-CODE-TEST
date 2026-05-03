/**
 * HERO SLIDER COMPONENT
 * 
 * Hero section with background image slider and call-to-action buttons.
 * 
 * Student Note: This component provides:
 * - Full-screen hero section with background images
 * - Centered content overlay with heading and buttons
 * - Responsive text sizing
 * - Eye-catching CTA buttons with animations
 * - Background image slider for visual appeal
 * 
 * Key Features:
 * - Full-width background image slider
 * - Centered content overlay
 * - Responsive design for all screen sizes
 * - Smooth animations and transitions
 * 
 * Technical Concepts:
 * - Component composition (uses BackgroundImageSlider)
 * - Responsive design with Tailwind breakpoints
 * - Link navigation for internal routing
 * - CSS transforms and transitions for animations
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import BackgroundImageSlider from './BackgroundImageSlider';

/**
 * HeroSlider Component
 * 
 * Renders the main hero section with background images and call-to-action buttons.
 * 
 * @returns {JSX.Element} The hero slider component
 */
const HeroSlider = () => {
  const { t } = useTranslation();

  return (
    // Hero Section Container
    // Student Note: 
    // - relative: For absolute positioning of children
    // - min-h-screen: Full viewport height minimum
    // - overflow-hidden: Prevents content from spilling out
    <div className="relative min-h-screen sm:h-screen w-full overflow-hidden" data-hero-section>
      {/* Full-Width Background Image Slider */}
      {/* Student Note: BackgroundImageSlider component handles image rotation
          - Provides visual backdrop for hero content
          - Auto-plays through images */}
      <BackgroundImageSlider />
      
      {/* Content Overlay - Centered */}
      {/* Student Note: Overlay positioned above background images
          - z-10: Ensures content appears above background
          - flex items-center justify-center: Centers content vertically and horizontally */}
      <div className="relative z-10 h-full min-h-screen flex items-center justify-center">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            {/* Main Heading */}
            {/* Student Note: Responsive font sizes
                - Mobile: text-4xl (36px)
                - Desktop: text-7xl (72px)
                - textShadow: Improves readability over images */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              <span 
                className="block"
                style={{ 
                  fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
                  textShadow: '2px 2px 12px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)',
                  letterSpacing: '0.05em'
                }}
              >
                {t('heroSlider.title')}
              </span>
            </h1>
            
            {/* Description */}
            {/* Student Note: Responsive text with shadow for readability
                - textShadow: Makes text readable over images
                - leading-relaxed: Better line spacing for readability */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-100 leading-relaxed max-w-3xl mx-auto px-4" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              {t('heroSlider.description')}
            </p>
            
            {/* Call-to-Action Buttons */}
            {/* Student Note: Enhanced buttons with animations
                - group: Enables group-hover effects
                - transform hover:scale-105: Grows on hover
                - active:scale-95: Shrinks on click for feedback
                - Multiple animation layers for visual appeal */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center px-4">
              {/* Contact Us Button */}
              <Link
                to="/contact"
                className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-xl transition-all duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 active:scale-95 overflow-hidden min-h-[48px] sm:min-h-[56px] flex items-center justify-center"
                aria-label="Contact us for more information"
              >
                {/* Animated background glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('heroSlider.contactButton')}
                  {/* Arrow icon - slides right on hover */}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Pulse animation overlay */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></span>
              </Link>
              
              {/* Get Free Quote Button */}
              <Link
                to="/quote"
                className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 md:px-10 rounded-xl transition-all duration-300 text-sm sm:text-base md:text-lg whitespace-nowrap shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 overflow-hidden min-h-[48px] sm:min-h-[56px] flex items-center justify-center"
                aria-label="Get a free quote"
              >
                {/* Animated background glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('heroSlider.quoteButton')}
                  {/* Arrow icon - slides right on hover */}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Pulse animation overlay */}
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
