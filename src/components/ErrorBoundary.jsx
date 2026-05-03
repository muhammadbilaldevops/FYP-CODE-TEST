/**
 * ERROR BOUNDARY COMPONENT
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 * 
 * Student Note: This component provides:
 * - Error catching for React component errors
 * - Fallback UI when errors occur
 * - Error logging for debugging
 * - Prevents entire app from crashing
 * 
 * Why use Error Boundaries?
 * - React components can throw errors during rendering
 * - Without error boundary, entire app would crash
 * - Error boundary catches errors and shows friendly message
 * - Better user experience than blank screen
 * 
 * Technical Concepts:
 * - Class component (required for error boundaries)
 * - getDerivedStateFromError: Updates state when error occurs
 * - componentDidCatch: Logs error information
 * - Conditional rendering: Shows error UI or normal children
 * 
 * Important Notes:
 * - Only catches errors in child components
 * - Does NOT catch errors in event handlers, async code, or during SSR
 * - Must be a class component (hooks don't support error boundaries yet)
 */

import React from 'react'

/**
 * ErrorBoundary Class Component
 * 
 * Catches errors in child components and displays fallback UI.
 * This is a class component because error boundaries must be classes.
 * 
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * Constructor
   * 
   * Student Note: Initializes component state
   * - hasError: Tracks if an error has occurred
   * - error: Stores the error object for display
   */
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * Get Derived State From Error
   * 
   * Student Note: This is a static lifecycle method that:
   * - Is called when an error is thrown in a child component
   * - Updates state to indicate an error occurred
   * - Returns new state object
   * 
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object with error information
   */
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error }
  }

  /**
   * Component Did Catch
   * 
   * Student Note: This lifecycle method:
   * - Is called after an error has been thrown
   * - Can be used to log errors to error reporting service
   * - Receives error and errorInfo (component stack)
   * 
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Information about which component threw the error
   */
  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, send to error reporting service)
    console.error('Error caught by boundary:', error, errorInfo)
    // In production, you might want to send this to an error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  /**
   * Render Method
   * 
   * Student Note: Renders either:
   * - Error UI if an error occurred
   * - Normal children if no error
   * 
   * @returns {JSX.Element} Error UI or children components
   */
  render() {
    // If error occurred, show fallback UI
    if (this.state.hasError) {
      return (
        // Error Fallback UI
        // Student Note: User-friendly error message with reload option
        // - Centered layout for better visibility
        // - Clear error message
        // - Reload button to try again
        // - Responsive padding and styling
        <div style={{ 
          padding: '20px 40px', 
          textAlign: 'center', 
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#fff',
          color: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Error Heading */}
          <h1 style={{ 
            color: '#dc2626', 
            marginBottom: '20px',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' // Responsive font size
          }}>
            Something went wrong
          </h1>
          {/* Error Message */}
          {/* Student Note: Shows actual error message if available */}
          <p style={{ 
            color: '#666', 
            marginBottom: '10px',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', // Responsive font size
            maxWidth: '600px',
            padding: '0 20px'
          }}>
            {this.state.error?.message || 'An error occurred'}
          </p>
          {/* Reload Button */}
          {/* Student Note: Allows user to reload page and try again */}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '20px',
              fontSize: '1rem',
              fontWeight: '600',
              minHeight: '44px', // Touch-friendly size
              transition: 'background-color 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            aria-label="Reload page"
          >
            Reload Page
          </button>
        </div>
      )
    }

    // If no error, render children normally
    // Student Note: this.props.children contains all child components
    return this.props.children
  }
}

export default ErrorBoundary

