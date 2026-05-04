/**
 * APP.JSX - Main Application Component
 * 
 * This is the root component of the Al Muslim Engineers web application.
 * It sets up the routing structure using React Router DOM, allowing users
 * to navigate between different pages.
 * 
 * Student Note: 
 * - BrowserRouter enables client-side routing (URL changes without page reload)
 * - Routes defines all available routes in the application
 * - Route maps URL paths to specific page components
 * - This pattern is called "Single Page Application" (SPA)
 * 
 * Why use routing?
 * - Better user experience (faster navigation)
 * - Better SEO (each page has its own URL)
 * - Easier to organize large applications
 * - Browser back/forward buttons work correctly
 */

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'

// Import Layout Components
// Student Note: These components appear on every page
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import Chatbot from './components/Chatbot'
import FloatingCalculatorButton from './components/FloatingCalculatorButton'
import AdminTools from './components/AdminTools'
import ScrollToTop from './components/ScrollToTop'

// Import Page Components
// Student Note: Each page represents a different section of the website
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'
import QuotePage from './pages/QuotePage'
import ProductsPage from './pages/ProductsPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserLoginPage from './pages/UserLoginPage'
import UserDashboardPage from './pages/UserDashboardPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'

/**
 * App Component
 * 
 * This is the main component that wraps the entire application.
 * It provides:
 * - Error handling (ErrorBoundary)
 * - Routing configuration
 * - Common layout (Header and Footer on all pages)
 * 
 * @returns {JSX.Element} The complete application structure
 */
function App() {
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero/video section element
      const heroSection = document.querySelector('[data-hero-section]');
      if (!heroSection) {
        setShowFloatingButtons(true);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      // Hide buttons if still in video section, show after scrolling past
      setShowFloatingButtons(scrollPosition > heroBottom + 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Router enables routing functionality throughout the app
    // Student Note: Everything inside Router can use routing features
    <Router>
      {/* LanguageProvider: Provides language context throughout the app */}
      <LanguageProvider>
        {/* ScrollToTop: Scrolls to top on route changes */}
        <ScrollToTop />
        {/* ErrorBoundary catches errors and prevents app crashes */}
        {/* Student Note: Always wrap your app in error boundary for better UX */}
        <ErrorBoundary>
        {/* Main app container */}
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header: Navigation bar - appears on all pages */}
          <Header />
          
          {/* Main Content Area: Different for each page */}
          {/* Student Note: flex-grow makes this area take up available space */}
          <main className="flex-grow">
            {/* Routes: Defines all pages in the application */}
            {/* Student Note: Only ONE Route will render at a time based on URL */}
            <Routes>
              {/* Home Page - Main landing page */}
              {/* path="/" means this is the default/home page */}
              <Route path="/" element={<HomePage />} />
              
              {/* About Page - Company information */}
              {/* path="/about" means URL will be yoursite.com/about */}
              <Route path="/about" element={<AboutPage />} />
              
              {/* Services Page - What we offer */}
              <Route path="/services" element={<ServicesPage />} />
              
              {/* Projects Page - Portfolio and case studies */}
              <Route path="/projects" element={<ProjectsPage />} />
              
              {/* Contact Page - Contact form and information */}
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Quote Page - Request a quote with calculator */}
              <Route path="/quote" element={<QuotePage />} />
              
              {/* Products Page - Solar products and packages */}
              <Route path="/products" element={<ProductsPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

              {/* User Routes */}
              <Route path="/user/login" element={<UserLoginPage />} />
              <Route path="/user/dashboard" element={<UserDashboardPage />} />
              
              {/* Legal Routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
              
              {/* 404 Page - For invalid URLs */}
              {/* Student Note: "*" matches any URL that doesn't match above routes */}
              <Route 
                path="*" 
                element={
                  <div className="section-padding text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn-primary inline-block">
                      Go Back Home
                    </a>
                  </div>
                } 
              />
            </Routes>
          </main>
          
          {/* Footer: Contact info and links - appears on all pages */}
          <Footer />
        </div>

        {/* Chatbot: Floating chat widget - appears on all pages */}
        <Chatbot isVisible={showFloatingButtons} onChatbotStateChange={setIsChatbotOpen} />
        
        {/* Floating Calculator Button - appears on all pages, hidden when chatbot is open */}
        <FloatingCalculatorButton isVisible={showFloatingButtons && !isChatbotOpen} />
      </ErrorBoundary>
      </LanguageProvider>
    </Router>
  )
}

export default App

/**
 * ROUTING EXPLANATION FOR STUDENTS:
 * 
 * Traditional vs Modern Routing:
 * - Traditional: Each page = separate HTML file, browser reloads on navigation
 * - Modern (SPA): One HTML file, JavaScript changes content, no page reload
 * 
 * How React Router Works:
 * 1. User clicks a link
 * 2. Router intercepts the navigation
 * 3. Browser URL changes but page doesn't reload
 * 4. Router renders the appropriate component
 * 5. Much faster user experience!
 * 
 * Key Concepts:
 * - <Router>: Provides routing context to the entire app
 * - <Routes>: Container for all route definitions
 * - <Route>: Maps a URL path to a component
 * - path: The URL pattern to match
 * - element: The component to render when path matches
 * 
 * Example Flow:
 * 1. User visits: www.almuslim.com/about
 * 2. Router finds: <Route path="/about" element={<AboutPage />} />
 * 3. Router renders: AboutPage component
 * 4. Header and Footer still show (they're outside Routes)
 */
