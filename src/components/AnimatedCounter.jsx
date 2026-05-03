/**
 * ANIMATED COUNTER COMPONENT
 * 
 * Animated number counter for statistics display.
 * 
 * Student Note: This component provides:
 * - Smooth counting animation from 0 to target value
 * - Scroll-triggered animation (starts when visible)
 * - Customizable duration and formatting
 * - Easing function for natural motion
 * 
 * Key Features:
 * - Only animates when element enters viewport
 * - Smooth easing animation (not linear)
 * - Supports prefix/suffix (e.g., "$", "%", "+")
 * - Number formatting with locale
 * 
 * Technical Concepts:
 * - Intersection Observer: Detects when element is visible
 * - requestAnimationFrame: Smooth animation loop
 * - Easing functions: Non-linear animation curves
 * - useRef: Direct DOM element access
 * 
 * Use Cases:
 * - Statistics counters (e.g., "500+ Projects")
 * - Achievement numbers (e.g., "25+ Years Experience")
 * - Performance metrics (e.g., "100% Satisfaction")
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter Component
 * 
 * Renders an animated counter that counts from 0 to target value.
 * 
 * @param {number} end - Target number to count to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {string} prefix - Text to show before number (e.g., "$", "Rs.")
 * @param {string} suffix - Text to show after number (e.g., "+", "%", "K")
 * @param {string} label - Label text below the counter
 * @returns {JSX.Element} The animated counter component
 */
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '', label }) => {
  // State to track current count value
  // Student Note: Starts at 0, animates to 'end' value
  const [count, setCount] = useState(0);
  
  // State to track if element is visible in viewport
  // Student Note: Animation only starts when element is visible
  const [isVisible, setIsVisible] = useState(false);
  
  // Ref to the counter DOM element
  // Student Note: Used by Intersection Observer to detect visibility
  const counterRef = useRef(null);

  /**
   * Intersection Observer Effect
   * 
   * Student Note: This effect watches for when the counter element
   * enters the viewport. Once visible, it triggers the animation.
   * 
   * How it works:
   * 1. Creates IntersectionObserver to watch element
   * 2. When element enters viewport (10% visible), sets isVisible to true
   * 3. This triggers the animation effect
   * 4. Cleanup removes observer when component unmounts
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If element is visible and not already animated
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true); // Trigger animation
        }
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    // Start observing the counter element
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  /**
   * Animation Effect
   * 
   * Student Note: This effect creates the counting animation.
   * It uses requestAnimationFrame for smooth 60fps animation.
   * 
   * How it works:
   * 1. Only runs when element is visible
   * 2. Uses requestAnimationFrame for smooth animation
   * 3. Calculates progress (0 to 1) based on elapsed time
   * 4. Applies easing function for natural motion
   * 5. Updates count state each frame
   * 6. Stops when progress reaches 1
   */
  useEffect(() => {
    if (!isVisible) return; // Don't animate if not visible

    let startTime = null;
    
    /**
     * Animation Frame Function
     * 
     * Student Note: This function runs on each animation frame.
     * It calculates the current count based on elapsed time and easing.
     * 
     * @param {number} currentTime - Current timestamp from requestAnimationFrame
     */
    const animate = (currentTime) => {
      // Initialize start time on first frame
      if (!startTime) startTime = currentTime;
      
      // Calculate progress (0 to 1)
      // Student Note: Math.min ensures progress never exceeds 1
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      // Student Note: easeOutQuart creates deceleration (fast start, slow end)
      // Formula: 1 - (1 - progress)^4
      // This creates a more natural animation than linear
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Calculate current count based on progress
      // Student Note: Math.floor ensures whole numbers
      const currentCount = Math.floor(easeOutQuart * end);
      
      // Update count state
      setCount(currentCount);

      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animate); // Schedule next frame
      } else {
        // Animation complete, ensure final value
        setCount(end);
      }
    };

    // Start animation
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]); // Re-run if visibility, end, or duration changes

  return (
    // Counter Container
    // Student Note: ref={counterRef} allows Intersection Observer to watch this element
    <div ref={counterRef} className="text-center">
      {/* Counter Number */}
      {/* Student Note: 
          - Responsive font sizes: text-5xl on mobile, text-6xl on desktop
          - toLocaleString() formats number with commas (e.g., 1000 → "1,000")
          - prefix and suffix allow custom formatting */}
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      {/* Counter Label */}
      {/* Student Note: Conditional rendering - only shows if label prop provided */}
      {label && (
        <div className="text-base sm:text-lg text-blue-100 leading-relaxed">
          {label}
        </div>
      )}
    </div>
  );
};

export default AnimatedCounter;

