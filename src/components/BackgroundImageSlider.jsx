/**
 * BACKGROUND IMAGE SLIDER COMPONENT
 * 
 * Full-width background image slider for hero section.
 * 
 * Student Note: This component provides:
 * - Auto-playing background image carousel
 * - Smooth transitions between images
 * - Error handling with fallback images
 * - Image preloading for smooth transitions
 * - Dark overlay for text readability
 * 
 * Key Features:
 * - Positioned absolutely behind content
 * - Auto-advances every 5 seconds
 * - Preloads next image for smooth transition
 * - Handles image loading errors gracefully
 * 
 * Technical Concepts:
 * - useState: Manages current slide and error states
 * - useEffect: Sets up auto-play interval
 * - CSS transforms: translateX for slide animation
 * - Error handling: Tracks failed images and uses fallback
 */

import React, { useState, useEffect } from 'react';
import { solarImages, fallbackImage } from '../data/imageUrls';

/**
 * BackgroundImageSlider Component
 * 
 * Renders a full-width background image slider that auto-plays
 * through hero images with smooth transitions.
 * 
 * @returns {JSX.Element|null} The background slider or null if no images
 */
const BackgroundImageSlider = () => {
  // State to track current slide index
  // Student Note: 0 = first image, increments for each slide
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to control auto-play functionality
  // Student Note: true = auto-playing, false = paused
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // State to track which images failed to load
  // Student Note: Object with image index as key, boolean as value
  // Example: { 0: true, 2: true } means images at index 0 and 2 failed
  const [imageErrors, setImageErrors] = useState({});

  // Get all hero images as an array
  // Student Note: Object.values() converts object to array
  const images = Object.values(solarImages.hero);

  /**
   * Auto-play Slider Effect
   * 
   * Student Note: This effect creates an interval that automatically
   * advances to the next slide every 5 seconds.
   * 
   * How it works:
   * 1. Checks if auto-play is enabled and images exist
   * 2. Creates setInterval to change slide every 5 seconds
   * 3. Uses modulo operator (%) for circular navigation
   * 4. Cleanup function clears interval when component unmounts
   */
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      // Advance to next slide, wrap around to 0 if at end
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    // Cleanup: clear interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  /**
   * Handle Image Loading Error
   * 
   * Student Note: This function is called when an image fails to load.
   * It marks that image as failed so we can use a fallback.
   * 
   * @param {number} index - The index of the failed image
   */
  const handleImageError = (index) => {
    // Mark this image index as failed
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Don't render if no images available
  if (images.length === 0) return null;

  return (
    // Background Slider Container
    // Student Note: 
    // - absolute inset-0: Fills parent container
    // - overflow-hidden: Prevents images from spilling out
    // - bg-slate-900: Dark background fallback
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900">
      {/* Background Images Slider */}
      {/* Student Note: Flex container with transform for sliding
          - translateX moves container left/right
          - currentIndex * 100%: Moves by full slide width
          - transition-transform: Smooth 1-second animation */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Map through images array */}
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center relative"
            style={{
              // Use fallback image if this image failed to load
              backgroundImage: `url("${imageErrors[index] ? fallbackImage : imageUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Preload Next Image */}
            {/* Student Note: Preloading improves transition smoothness
                - Only preloads the next image (not all images)
                - Hidden img tag loads image in background
                - onError handler catches loading failures */}
            {index === (currentIndex + 1) % images.length && (
              <img
                src={images[(currentIndex + 1) % images.length]}
                alt=""
                className="hidden"
                onError={() => handleImageError((currentIndex + 1) % images.length)}
              />
            )}
            {/* Dark Overlay for Text Readability */}
            {/* Student Note: Gradient overlay ensures text is readable
                - from-black/60: Darker at top
                - via-black/50: Medium in middle
                - to-black/60: Darker at bottom
                - Creates depth and improves text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundImageSlider;

