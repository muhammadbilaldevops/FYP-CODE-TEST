/**
 * LOGO COMPONENT
 * 
 * Al-Muslim Engineering Logo component.
 * 
 * Student Note: This component displays the company logo:
 * - Uses actual logo image file from public folder
 * - Circular shape with white background
 * - Error handling with fallback to initials
 * - Responsive sizing via className prop
 * 
 * Key Features:
 * - Circular logo display
 * - Error handling with fallback
 * - Responsive sizing
 * - White background for visibility
 * 
 * Technical Concepts:
 * - Props: Accepts className for custom sizing
 * - Error handling: onError callback for failed images
 * - DOM manipulation: Creates fallback element if image fails
 * - Aspect ratio: Maintains 1:1 ratio for circular shape
 */

import React from 'react';

/**
 * Logo Component
 * 
 * Renders the company logo in a circular container.
 * 
 * @param {string} className - Tailwind CSS classes for sizing (default: "w-12 h-12")
 * @returns {JSX.Element} The logo component
 */
const Logo = ({ className = "w-12 h-12" }) => {
  return (
    // Logo Container
    // Student Note: 
    // - rounded-full: Makes container circular
    // - overflow-hidden: Clips image to circle
    // - bg-white: White background for visibility
    // - aspectRatio: '1/1' ensures perfect circle
    <div 
      className={`${className} rounded-full overflow-hidden flex items-center justify-center bg-white`}
      style={{ aspectRatio: '1/1' }}
    >
      {/* Logo Image */}
      {/* Student Note: 
          - object-cover: Fills container while maintaining aspect ratio
          - rounded-full: Ensures image is circular
          - onError: Handles image loading failures */}
      <img
        src="/logo 2.jpg"
        alt="Al Muslim Engineering Solar System Logo"
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          /**
           * Error Handler: Fallback to Text Initials
           * 
           * Student Note: If image fails to load:
           * 1. Hide the broken image
           * 2. Create a div with company initials
           * 3. Style it to match logo appearance
           * 4. Append it to parent container
           */
          e.target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-full h-full flex items-center justify-center bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-full';
          fallback.textContent = 'AM';
          e.target.parentNode?.appendChild(fallback);
        }}
      />
    </div>
  );
};

export default Logo;

