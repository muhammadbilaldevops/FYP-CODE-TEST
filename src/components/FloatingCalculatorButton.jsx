/**
 * FLOATING CALCULATOR BUTTON COMPONENT
 * 
 * Floating calculator button positioned below chatbot.
 * Opens AdvancedSolarCalculator modal when clicked.
 * 
 * Student Note: This component provides:
 * - Quick access to solar calculator from any page
 * - Fixed positioning (stays in place when scrolling)
 * - Responsive sizing for mobile and desktop
 * - Smooth animations and hover effects
 * 
 * Key Features:
 * - Positioned below chatbot button
 * - Only visible when isVisible prop is true
 * - Opens calculator modal on click
 * - Mobile-friendly touch target size
 * 
 * Technical Concepts:
 * - useState: Manages modal open/close state
 * - Conditional rendering: Only shows if isVisible is true
 * - Fixed positioning: Stays in viewport while scrolling
 * - z-index: Ensures button appears above other content
 */

import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';
import AdvancedSolarCalculator from './AdvancedSolarCalculator';
import { useTranslation } from '../hooks/useTranslation';

/**
 * FloatingCalculatorButton Component
 * 
 * Renders a floating action button that opens the solar calculator.
 * 
 * @param {boolean} isVisible - Whether the button should be visible
 * @returns {JSX.Element|null} The floating button component or null if not visible
 */
const FloatingCalculatorButton = ({ isVisible = true }) => {
  const { t } = useTranslation();
  // State to track if calculator modal is open
  // Student Note: false = closed, true = open
  const [showCalculator, setShowCalculator] = useState(false);

  // Don't render if not visible
  // Student Note: Early return pattern - exits function early if condition not met
  if (!isVisible) return null;

  return (
    <>
      {/* Floating Calculator Button */}
      {/* Student Note: Fixed positioning keeps button in viewport
          - bottom-4 right-4: Position on mobile
          - sm:bottom-6 sm:right-6: Position on larger screens
          - z-50: High z-index to appear above other content
          - rounded-full: Makes button circular
          - p-3 sm:p-4: Responsive padding (touch-friendly on mobile) */}
      <button
        onClick={() => setShowCalculator(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 min-w-[56px] min-h-[56px] flex items-center justify-center"
        aria-label="Open Solar Calculator"
        title={t('header.calculator')}
      >
        {/* Calculator Icon - responsive size */}
        <FaCalculator className="text-2xl sm:text-3xl" />
      </button>

      {/* Advanced Calculator Modal */}
      {/* Student Note: Modal component that opens when button is clicked
          - isOpen: Controls visibility of modal
          - onClose: Function to close the modal */}
      <AdvancedSolarCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </>
  );
};

export default FloatingCalculatorButton;

