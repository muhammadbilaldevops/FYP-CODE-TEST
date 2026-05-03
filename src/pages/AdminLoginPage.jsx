/**
 * ADMIN LOGIN PAGE
 * 
 * Secure login page for administrators.
 * Provides authentication to access admin dashboard.
 * 
 * Student Note: This page handles:
 * - Admin authentication (username/password)
 * - Backend connection status checking
 * - Redirecting to dashboard after successful login
 * - Error handling for failed login attempts
 * 
 * Key Concepts:
 * - useState: Manages form data, loading state, and error messages
 * - useEffect: Checks authentication status when page loads
 * - useNavigate: Redirects user after successful login
 * - API calls: Uses centralized API config for backend communication
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiAlertCircle, FiShield } from 'react-icons/fi';
import { getApiUrl, checkBackendConnection, getConnectionStatusMessage } from '../config/api';

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const navigate = useNavigate();

  // Check if already logged in and backend status
  useEffect(() => {
    checkAuthStatus();
    checkBackendStatus();
  }, []);

  /**
   * Check if backend server is available
   * Student Note: This function tests the connection to the backend API
   * It's called when the page loads to show connection status to the user
   */
  const checkBackendStatus = async () => {
    try {
      const isConnected = await checkBackendConnection();
      setBackendStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setBackendStatus('disconnected');
    }
  };

  /**
   * Check if user is already authenticated
   * Student Note: If user is already logged in, redirect them to dashboard
   * This prevents showing login page to already authenticated users
   */
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(getApiUrl('/api/admin/check'), {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          navigate('/admin/dashboard');
        }
      }
      // Silently fail if backend is not available - don't show error on page load
    } catch (error) {
      // Don't show error on page load, only when user tries to login
      if (import.meta.env.DEV) {
        console.log('Backend check:', error.message);
      }
    }
  };

  /**
   * Handle form submission
   * Student Note: This function is called when user clicks "Sign In" button
   * It sends credentials to backend API and handles the response
   * 
   * Flow:
   * 1. Prevent default form submission (page reload)
   * 2. Show loading state
   * 3. Send credentials to backend
   * 4. If successful: save admin data and redirect to dashboard
   * 5. If failed: show error message
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session management
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        // Store admin info in localStorage for quick access
        localStorage.setItem('admin', JSON.stringify(data.admin));
        navigate('/admin/dashboard'); // Redirect to dashboard
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      // Only show connection error if it's actually a network error
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        setError(getConnectionStatusMessage());
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      if (import.meta.env.DEV) {
        console.error('Login error:', error);
      }
    } finally {
      setLoading(false); // Always stop loading, even if there's an error
    }
  };

  /**
   * Handle input field changes
   * Student Note: This is called when user types in username or password fields
   * It updates the credentials state with the new value
   * 
   * e.target.name = 'username' or 'password'
   * e.target.value = what the user typed
   */
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-2xl">
              <FiShield className="text-6xl text-blue-600" />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-blue-200">
            Al-Muslim Engineering Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Backend Status Indicator */}
          {backendStatus === 'disconnected' && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <FiAlertCircle className="mr-2" />
              <span className="text-sm">{getConnectionStatusMessage()}</span>
            </div>
          )}
          {backendStatus === 'connected' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <FiAlertCircle className="mr-2" />
              <span className="text-sm">✓ Backend server connected</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <FiAlertCircle className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Dev Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              <strong>Development Mode:</strong><br />
              Default credentials: admin / admin123<br />
              <span className="text-red-600">Make sure backend is running: python app.py in backend folder</span>
            </p>
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center">
          <a href="/" className="text-blue-200 hover:text-white transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

