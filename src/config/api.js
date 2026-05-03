/**
 * API CONFIGURATION UTILITY
 * 
 * Centralized configuration for all backend API calls.
 * This file handles environment detection and provides a consistent way
 * to make API requests throughout the application.
 * 
 * Student Note: Why use this?
 * - Single source of truth for API URLs
 * - Easy to switch between development and production
 * - No need to change URLs in multiple files
 * - Environment variables make deployment easier
 * 
 * How it works:
 * 1. Checks if VITE_API_BASE_URL environment variable is set
 * 2. If not set, uses localhost:5000 for development
 * 3. Uses production URL for production builds
 * 4. Provides helper functions for making API calls
 */

/**
 * Get the base URL for API requests
 * 
 * Priority:
 * 1. VITE_API_BASE_URL environment variable (highest priority)
 * 2. Development: http://localhost:5000
 * 3. Production: Render backend URL (if backend is deployed)
 * 
 * @returns {string} The base URL for API requests
 */
const getApiBaseUrl = () => {
  // Check if environment variable is explicitly set
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl;
  }

  // Detect if we're in development mode
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    // Local development - use localhost
    return 'http://localhost:5000';
  } else {
    // Production - use Render backend URL
    // TODO: Replace with your actual Render backend URL
    // You can find this in your Render dashboard
    // return 'https://your-backend.onrender.com';
    return 'https://fyp-code-test-production.up.railway.app';
  }
};

/**
 * Base URL for all API requests
 * This is computed once when the module loads
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * Get full API URL by appending endpoint to base URL
 * 
 * @param {string} endpoint - API endpoint (e.g., '/api/admin/login')
 * @returns {string} Full URL for the API request
 * 
 * Example:
 * getApiUrl('/api/admin/login') 
 * Returns: 'http://localhost:5000/api/admin/login' (in development)
 */
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Combine base URL with endpoint
  return `${API_BASE_URL}${cleanEndpoint}`;
};

/**
 * Make a fetch request to the API with proper error handling
 * 
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>} Fetch response
 * 
 * Example:
 * apiRequest('/api/admin/check', { credentials: 'include' })
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  // Default options
  const defaultOptions = {
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // Allow custom headers to override
    },
  };

  // Merge user options with defaults
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    return response;
  } catch (error) {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error(`API Request failed: ${url}`, error);
    }
    throw error;
  }
};

/**
 * Check if backend server is available
 * 
 * @returns {Promise<boolean>} True if backend is connected, false otherwise
 * 
 * Student Note: This is useful for showing connection status to users
 */
export const checkBackendConnection = async () => {
  try {
    const response = await apiRequest('/api/admin/check', {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Get connection status message
 * 
 * @returns {string} Human-readable connection status
 */
export const getConnectionStatusMessage = () => {
  const isDevelopment = import.meta.env.DEV;
  const baseUrl = API_BASE_URL;
  
  if (isDevelopment) {
    return `Backend server not detected. Please ensure Flask server is running on ${baseUrl}`;
  } else {
    return `Cannot connect to backend server at ${baseUrl}. Please check your network connection.`;
  }
};

// Export default object with all utilities
export default {
  API_BASE_URL,
  getApiUrl,
  apiRequest,
  checkBackendConnection,
  getConnectionStatusMessage,
};

