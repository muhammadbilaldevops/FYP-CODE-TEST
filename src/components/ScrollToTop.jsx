/**
 * SCROLL TO TOP COMPONENT
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * 
 * Student Note: This component provides:
 * - Automatic scroll to top on page navigation
 * - Smooth scroll animation for better UX
 * - No visual rendering (returns null)
 * 
 * Why is this needed?
 * - When navigating between pages, browser maintains scroll position
 * - Users might be scrolled down on previous page
 * - This ensures they always see the top of new page
 * - Better user experience
 * 
 * Technical Concepts:
 * - useEffect: Runs effect when pathname changes
 * - useLocation: Gets current route pathname
 * - window.scrollTo: Browser API for scrolling
 * - Returns null: Component doesn't render anything
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls window to top when route changes.
 * This is a utility component that doesn't render any UI.
 * 
 * @returns {null} This component doesn't render anything
 */
const ScrollToTop = () => {
  // Get current pathname from React Router
  // Student Note: pathname changes when user navigates to different page
  const { pathname } = useLocation()

  /**
   * Scroll to Top Effect
   * 
   * Student Note: This effect runs whenever pathname changes.
   * It smoothly scrolls the window to the top of the page.
   * 
   * How it works:
   * 1. User navigates to new page (pathname changes)
   * 2. useEffect detects the change
   * 3. window.scrollTo() scrolls to top with smooth animation
   * 4. User sees top of new page instead of maintaining scroll position
   */
  useEffect(() => {
    // Scroll to top when pathname changes
    // Student Note: window.scrollTo() is a browser API
    // - top: 0, left: 0 = scroll to top-left corner
    // - behavior: 'smooth' = animated scroll (not instant)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Smooth scroll animation for better UX
    })
  }, [pathname]) // Re-run when pathname changes

  // This component doesn't render anything
  // Student Note: Returns null because it only performs side effects
  return null
}

export default ScrollToTop

