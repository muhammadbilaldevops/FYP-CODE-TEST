/**
 * SOLAR IMAGE SLIDER COMPONENT
 * 
 * Image slider for solar images with auto-play functionality.
 * 
 * Student Note: This component provides:
 * - Auto-playing image carousel
 * - Manual navigation with arrow buttons
 * - Slide indicators for current position
 * - Pause on manual interaction, resume after delay
 * - Smooth transitions between images
 * 
 * Key Features:
 * - Auto-advances every 4 seconds
 * - Touch-friendly navigation buttons
 * - Visual indicators for current slide
 * - Responsive image sizing
 * 
 * Technical Concepts:
 * - useState: Manages current slide index and auto-play state
 * - useEffect: Sets up interval for auto-play
 * - Array methods: Modulo operator for circular navigation
 * - CSS transforms: translateX for slide animation
 */

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { solarImages } from '../data/imageUrls';

/**
 * SolarImageSlider Component
 * 
 * Renders an auto-playing image slider with navigation controls.
 * 
 * @returns {JSX.Element|null} The image slider component or null if no images
 */
const SolarImageSlider = () => {
  // State to track current slide index
  // Student Note: 0 = first image, 1 = second image, etc.
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State to control auto-play functionality
  // Student Note: true = auto-playing, false = paused
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get all hero images as an array
  // Student Note: Object.values() converts object to array
  // Example: { img1: 'url1', img2: 'url2' } → ['url1', 'url2']
  const images = Object.values(solarImages.hero);

  /**
   * Auto-play Slider Effect
   * 
   * Student Note: This effect creates an interval that automatically
   * advances to the next slide every 4 seconds.
   * 
   * How it works:
   * 1. Checks if auto-play is enabled and images exist
   * 2. Creates setInterval to change slide every 4 seconds
   * 3. Uses modulo operator (%) for circular navigation
   * 4. Cleanup function clears interval when component unmounts
   */
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      // Advance to next slide, wrap around to 0 if at end
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    // Cleanup: clear interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  /**
   * Navigate to specific slide
   * 
   * Student Note: This function:
   * - Changes to the specified slide
   * - Pauses auto-play temporarily
   * - Resumes auto-play after 5 seconds
   * 
   * @param {number} index - The slide index to navigate to
   */
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  /**
   * Navigate to next slide
   * Student Note: Uses modulo operator for circular navigation
   */
  const nextSlide = () => {
    goToSlide((currentIndex + 1) % images.length);
  };

  /**
   * Navigate to previous slide
   * Student Note: Adds images.length to handle negative numbers correctly
   */
  const prevSlide = () => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  };

  // Don't render if no images available
  if (images.length === 0) return null;

  return (
    // Slider Container
    // Student Note: Responsive container with proper spacing
    // - pt-4 sm:pt-6: Padding on mobile
    // - lg:pt-0 lg:-mt-4: Adjustments for desktop layout
    <div className="relative w-full h-full flex items-center justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-0 lg:-mt-4">
      {/* Slider Wrapper */}
      {/* Student Note: Responsive height
          - Mobile: Fixed heights (350px, 400px, 500px)
          - Desktop: Full height with max constraint */}
      <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-full xl:max-h-[90vh] overflow-hidden rounded-lg sm:rounded-xl">
        {/* Image Container */}
        <div className="relative w-full h-full">
          {/* Images Slider */}
          {/* Student Note: Flex container with transform for sliding
              - translateX moves container left/right
              - currentIndex * 100%: Moves by full slide width
              - transition-transform: Smooth animation */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {/* Map through images array */}
            {images.map((imageUrl, index) => (
              <div
                key={index}
                className="min-w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay for better text visibility */}
                {/* Student Note: Gradient overlay from bottom to top
                    - Helps text readability if text is overlaid */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          {/* Student Note: Navigation button on left side
              - z-20: Appears above images
              - Touch-friendly size (min 44x44px)
              - Hover effects for interactivity */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2.5 sm:p-3 shadow-2xl transition-all duration-300 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous image"
          >
            <FiChevronLeft className="text-lg sm:text-xl md:text-2xl text-blue-600" />
          </button>

          {/* Next Button */}
          {/* Student Note: Navigation button on right side
              - Same styling as previous button for consistency */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2.5 sm:p-3 shadow-2xl transition-all duration-300 transform hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next image"
          >
            <FiChevronRight className="text-lg sm:text-xl md:text-2xl text-blue-600" />
          </button>

          {/* Slide Indicators */}
          {/* Student Note: Dots showing current slide position
              - Active dot is wider and fully opaque
              - Inactive dots are smaller and semi-transparent
              - Clickable to jump to specific slide */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 min-w-[8px] ${
                  index === currentIndex
                    ? 'bg-white w-6 sm:w-8' // Active: wider and fully opaque
                    : 'bg-white/50 w-2 hover:bg-white/75' // Inactive: smaller and semi-transparent
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarImageSlider;

