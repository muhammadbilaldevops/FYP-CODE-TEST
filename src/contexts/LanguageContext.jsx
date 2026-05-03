/**
 * LANGUAGE CONTEXT - Multilingual Support System
 * 
 * This file provides language switching functionality (English/Urdu) throughout the application.
 * 
 * Student Note: What is React Context?
 * - Context allows sharing data between components without passing props manually
 * - Think of it as a "global state" that any component can access
 * - Perfect for language, theme, user authentication, etc.
 * 
 * How it works:
 * 1. LanguageProvider wraps the entire app (in App.jsx)
 * 2. Any component can use useLanguage() hook to get current language
 * 3. Language preference is saved in browser's localStorage
 * 4. When user changes language, all components using translations update automatically
 * 
 * Key Concepts:
 * - createContext(): Creates a new context object
 * - Provider: Makes context value available to child components
 * - useContext(): Hook to access context value in components
 * - localStorage: Browser storage that persists even after closing browser
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

/**
 * Create the Language Context
 * 
 * Student Note: This creates a "container" that will hold our language state.
 * Components will use this context to access the current language.
 */
const LanguageContext = createContext()

/**
 * Custom Hook: useLanguage
 * 
 * Student Note: This is a helper function that makes it easier to use the context.
 * Instead of writing useContext(LanguageContext) everywhere, we write useLanguage().
 * 
 * @returns {object} Language context value with language, setLanguage, toggleLanguage, etc.
 * @throws {Error} If used outside LanguageProvider
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  // Safety check: Make sure we're inside a Provider
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

/**
 * LanguageProvider Component
 * 
 * Student Note: This component provides language state to all child components.
 * It must wrap the entire app (see App.jsx) for language switching to work.
 * 
 * Features:
 * - Manages current language state ('en' or 'ur')
 * - Saves preference to localStorage (persists across page reloads)
 * - Provides functions to change language
 * 
 * @param {React.ReactNode} children - All child components that need language access
 * @returns {JSX.Element} Provider component wrapping children
 */
export const LanguageProvider = ({ children }) => {
  /**
   * Language State
   * 
   * Student Note: useState with function initializer
   * - The function runs only once when component first mounts
   * - Checks localStorage for saved language preference
   * - If found, uses saved language; otherwise defaults to 'en'
   * 
   * Why use function initializer?
   * - localStorage access is synchronous but we only want to check once
   * - Prevents checking localStorage on every render
   */
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage')
    return saved || 'en' // Default to English if nothing saved
  })

  /**
   * Save Language Preference
   * 
   * Student Note: useEffect runs after component renders
   * - Whenever language changes, save it to localStorage
   * - This ensures user's language choice persists across page reloads
   * - [language] is the dependency array - effect runs when language changes
   */
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language]) // Run whenever language changes

  /**
   * Toggle Language Function
   * 
   * Student Note: Simple function to switch between English and Urdu
   * - If current language is 'en', switch to 'ur'
   * - If current language is 'ur', switch to 'en'
   * - Uses functional update (prev => ...) to ensure we get latest state
   */
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en')
  }

  /**
   * Context Value Object
   * 
   * Student Note: This object contains everything components need:
   * - language: Current language code ('en' or 'ur')
   * - setLanguage: Function to directly set language
   * - toggleLanguage: Function to switch between languages
   * - isEnglish/isUrdu: Boolean helpers for conditional rendering
   */
  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isUrdu: language === 'ur'
  }

  /**
   * Render Provider
   * 
   * Student Note: LanguageContext.Provider makes the value available to all children
   * - value prop contains all language-related data and functions
   * - {children} renders all child components (the entire app)
   */
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

