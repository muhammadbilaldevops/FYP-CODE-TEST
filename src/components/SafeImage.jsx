/**
 * SAFE IMAGE COMPONENT
 * 
 * Image component with error handling and fallback.
 * 
 * Student Note: This component provides:
 * - Automatic error handling for failed image loads
 * - Fallback to default image if original fails
 * - Lazy loading for performance
 * - Prevents infinite error loops
 * 
 * Why use this?
 * - Prevents broken image icons
 * - Better user experience
 * - Handles network errors gracefully
 * - Lazy loading improves page performance
 * 
 * Technical Concepts:
 * - useState: Tracks image source and error state
 * - Error handling: onError callback switches to fallback
 * - Props spreading: Passes through additional props
 * - Lazy loading: Only loads images when needed
 */

import React, { useState } from 'react';
import { fallbackImage } from '../data/imageUrls';

/**
 * SafeImage Component
 * 
 * Renders an image with automatic fallback on error.
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS classes for styling
 * @param {object} props - Additional props to pass to img element
 * @returns {JSX.Element} The image element with error handling
 */
const SafeImage = ({ src, alt, className, ...props }) => {
  // State to track current image source
  // Student Note: Starts with provided src, switches to fallback on error
  const [imgSrc, setImgSrc] = useState(src);
  
  // State to track if error has occurred
  // Student Note: Prevents infinite error loop if fallback also fails
  const [hasError, setHasError] = useState(false);

  /**
   * Handle Image Loading Error
   * 
   * Student Note: This function is called when image fails to load.
   * It switches to fallback image and marks error as occurred.
   * 
   * Why check hasError?
   * - Prevents infinite loop if fallback image also fails
   * - Only switches once per image
   */
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackImage); // Switch to fallback image
    }
  };

  return (
    // Image Element
    // Student Note: 
    // - src={imgSrc}: Uses state value (may be original or fallback)
    // - onError={handleError}: Calls handler if image fails
    // - loading="lazy": Only loads when image enters viewport
    // - {...props}: Spreads additional props (onClick, style, etc.)
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;

