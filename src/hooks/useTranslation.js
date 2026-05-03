/**
 * USE TRANSLATION HOOK - Translation Helper
 * 
 * Custom React hook that provides easy access to translations throughout the app.
 * 
 * Student Note: What is a Custom Hook?
 * - A custom hook is a JavaScript function that starts with "use"
 * - It can use other hooks (like useState, useEffect, useContext)
 * - Allows code reuse and cleaner component code
 * - This hook makes it easy to get translated text in any component
 * 
 * How to use:
 * ```jsx
 * const { t } = useTranslation()
 * <h1>{t('header.companyName')}</h1> // Gets translated company name
 * ```
 * 
 * Features:
 * - Automatically uses correct language (English or Urdu)
 * - Supports nested keys (e.g., 'header.nav.home')
 * - Provides fallback if translation missing
 * - Returns translation function and current language
 */

import { useLanguage } from '../contexts/LanguageContext'
import enTranslations from '../data/translations/en'
import urTranslations from '../data/translations/ur'

/**
 * useTranslation Hook
 * 
 * Student Note: This hook:
 * 1. Gets current language from LanguageContext
 * 2. Selects appropriate translation object (English or Urdu)
 * 3. Returns a function 't' that looks up translations by key
 * 4. Also returns current language for conditional rendering
 * 
 * @returns {object} Object containing:
 *   - t: Function to get translated text
 *   - language: Current language code ('en' or 'ur')
 * 
 * Example Usage:
 * ```jsx
 * const { t, language } = useTranslation()
 * const title = t('header.companyName') // "Al Muslim Engineering"
 * if (language === 'ur') { ... } // Check if Urdu is active
 * ```
 */
export const useTranslation = () => {
  // Get current language from context
  // Student Note: This comes from LanguageProvider in App.jsx
  const { language } = useLanguage()
  
  // Select translation object based on current language
  // Student Note: Ternary operator - if language is 'ur', use Urdu translations, else English
  const translations = language === 'ur' ? urTranslations : enTranslations

  /**
   * Translation Function (t)
   * 
   * Student Note: This function looks up translated text by key.
   * 
   * How it works:
   * 1. Split key by '.' to handle nested objects (e.g., 'header.nav.home')
   * 2. Navigate through translation object using each part of the key
   * 3. Return the final translated string
   * 4. If key not found, return fallback or the key itself
   * 
   * @param {string} key - Translation key (supports nested keys like 'header.nav.home')
   * @param {string} fallback - Optional fallback text if translation not found
   * @returns {string} Translated text
   * 
   * Example:
   * t('header.companyName') → "Al Muslim Engineering"
   * t('header.nav.home') → "Home"
   * t('nonexistent.key', 'Default Text') → "Default Text"
   */
  const t = (key, fallback = '') => {
    // Split key by '.' to handle nested keys
    // Student Note: 'header.nav.home' becomes ['header', 'nav', 'home']
    const keys = key.split('.')
    let value = translations // Start with root translation object
    
    // Navigate through nested object structure
    // Student Note: Loop through each part of the key to find the value
    for (const k of keys) {
      // Check if current value is an object and contains the key
      if (value && typeof value === 'object' && k in value) {
        value = value[k] // Move deeper into the object
      } else {
        // Translation not found - return fallback or the key itself
        // Student Note: This prevents errors if translation is missing
        return fallback || key
      }
    }
    
    // Return the final value if it's a string, otherwise return fallback
    // Student Note: Ensures we always return a string, never an object
    return typeof value === 'string' ? value : fallback || key
  }

  // Return translation function and current language
  // Student Note: Components can use both t() for translations and language for conditional logic
  return { t, language }
}

