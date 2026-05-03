/**
 * ADMIN TOOLS COMPONENT
 * 
 * Admin-only tools that appear above chatbot:
 * - Advanced Solar Calculator button
 * - Only visible to logged-in admins
 */

/**
 * ADMIN TOOLS COMPONENT
 * 
 * Admin-only tools that appear above chatbot:
 * - Advanced Solar Calculator button
 * - Only visible to logged-in admins
 * 
 * Student Note: This component checks admin authentication status
 * and shows special tools only to authenticated admins.
 */

import React, { useState, useEffect } from 'react';
import { FiActivity, FiX } from 'react-icons/fi';
import AdvancedSolarCalculator from './AdvancedSolarCalculator';
import { useTranslation } from '../hooks/useTranslation';
import { getApiUrl } from '../config/api';

const AdminTools = ({ isVisible = true }) => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    // Check admin status every 5 seconds to catch login/logout
    const interval = setInterval(checkAdminStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Check if current user is an authenticated admin
   * Student Note: This function calls the backend API to verify admin status
   * It's called periodically to catch login/logout events
   */
  const checkAdminStatus = async () => {
    try {
      const response = await fetch(getApiUrl('/api/admin/check'), {
        credentials: 'include'
      });
      const data = await response.json();
      const authenticated = data.authenticated || false;
      setIsAdmin(authenticated);
      // Debug: Log admin status (only in development)
      if (authenticated && import.meta.env.DEV) {
        console.log('Admin authenticated - Calculator button should be visible');
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Admin check error:', error);
      }
      setIsAdmin(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      {/* Advanced Calculator Button - Admin Only */}
      {isVisible && (
        <button
          onClick={() => setShowCalculator(true)}
          className="fixed bottom-28 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 animate-pulse"
        aria-label="Open Advanced Calculator"
        title={t('adminTools.advancedCalculator')}
        style={{ zIndex: 60 }}
      >
        <span className="text-3xl">🧮</span>
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          !
        </span>
      </button>
      )}

      {/* Advanced Calculator Modal */}
      <AdvancedSolarCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />
    </>
  );
};

export default AdminTools;

