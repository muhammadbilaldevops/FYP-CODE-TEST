/**
 * MAIN.JSX - Application Entry Point
 * 
 * This is the starting point of the React application. It:
 * - Renders the root App component into the DOM
 * - Wraps the app in React.StrictMode for development warnings
 * - Provides error boundary protection to prevent crashes
 * 
 * Student Note:
 * - This file is the first JavaScript file that runs when the app loads
 * - ReactDOM.createRoot() is the modern way to render React apps (React 18+)
 * - StrictMode helps find potential problems during development
 * - ErrorBoundary catches errors and shows a fallback UI instead of crashing
 * 
 * How it works:
 * 1. Browser loads index.html
 * 2. index.html loads this main.jsx file
 * 3. This file finds the <div id="root"> element in index.html
 * 4. Renders the App component inside that div
 * 5. App component renders all other components
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

/**
 * Render the application
 * 
 * Student Note:
 * - document.getElementById('root') finds the div in index.html
 * - createRoot() creates a React root container
 * - render() renders the App component inside that container
 * - React.StrictMode enables additional checks and warnings
 * - ErrorBoundary wraps App to catch and handle errors gracefully
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ErrorBoundary catches any errors in child components */}
    <ErrorBoundary>
      {/* Main App component - contains all routes and pages */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

