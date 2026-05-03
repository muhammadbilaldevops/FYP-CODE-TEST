/**
 * ADMIN DASHBOARD PAGE
 * 
 * Main dashboard for administrators
 * Features:
 * - Real-time statistics
 * - Quote management (approve/decline)
 * - Contact messages
 * - Real-time activity tracking
 * - Client submission management
 */

/**
 * ADMIN DASHBOARD PAGE
 * 
 * Main dashboard for administrators.
 * 
 * Student Note: This is the central control panel for admins. It provides:
 * - Real-time statistics (total quotes, pending, approved, etc.)
 * - Quote management (view, approve, decline quotes)
 * - Contact message management
 * - Analytics and reporting
 * - File downloads (CNIC, documents, etc.)
 * 
 * Key Features:
 * - Auto-refreshes data every 30 seconds
 * - Connection status monitoring
 * - Responsive design for mobile and desktop
 * - Real-time updates without page reload
 * 
 * Technical Concepts:
 * - useState: Manages all dashboard data and UI state
 * - useEffect: Handles data fetching and auto-refresh
 * - Promise.all: Fetches multiple API endpoints simultaneously
 * - Error handling: Gracefully handles API failures
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiFileText, FiCheckCircle, FiXCircle, FiClock,
  FiMail, FiTrendingUp, FiLogOut, FiRefreshCw, FiEdit, FiTrash2,
  FiAlertCircle, FiDollarSign, FiCalendar, FiMapPin, FiPhone,
  FiDownload, FiFilter, FiSearch, FiBarChart, FiPieChart,
  FiStar, FiTarget, FiActivity, FiShield, FiSettings, FiImage, FiFile,
  FiDatabase
} from 'react-icons/fi';

import QuotationGenerator from '../components/QuotationGenerator';
import { useTranslation } from '../hooks/useTranslation';
import { getApiUrl, checkBackendConnection, getConnectionStatusMessage } from '../config/api';

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [analytics, setAnalytics] = useState(null);
  const [showQuotationGenerator, setShowQuotationGenerator] = useState(false);
  const [selectedQuoteForQuotation, setSelectedQuoteForQuotation] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Check backend connection status
   * Student Note: This runs every 10 seconds to monitor backend availability
   * It updates the connectionStatus state which is displayed to the user
   */
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkBackendConnection();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };
    checkConnection();
    const interval = setInterval(checkConnection, 10000); // Check every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  /**
   * Check if user is authenticated
   * Student Note: This verifies the user's session is still valid
   * If not authenticated, redirects to login page
   */
  const checkAuth = async () => {
    try {
      const response = await fetch(getApiUrl('/api/admin/check'), {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (!data.authenticated) {
        navigate('/admin/login');
      } else {
        setAdmin(data.admin);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Auth check failed:', error);
      }
      navigate('/admin/login');
    }
  };

  /**
   * Fetch all dashboard data
   * Student Note: This function fetches statistics, quotes, and messages simultaneously
   * Using Promise.all makes all requests at the same time (faster than sequential)
   * 
   * Why Promise.all?
   * - Fetches all data in parallel instead of waiting for each one
   * - Much faster than fetching one after another
   * - All requests happen at the same time
   */
  const fetchDashboardData = async () => {
    try {
      const [statsRes, quotesRes, messagesRes] = await Promise.all([
        fetch(getApiUrl('/api/admin/stats'), { credentials: 'include' }),
        fetch(getApiUrl('/api/admin/quotes'), { credentials: 'include' }),
        fetch(getApiUrl('/api/admin/messages'), { credentials: 'include' })
      ]);

      let statsData = null;
      if (statsRes.ok) {
        statsData = await statsRes.json();
        setStats(statsData.stats);
      } else {
        const errorData = await statsRes.json().catch(() => ({}));
        console.error('Failed to fetch stats:', statsRes.status, errorData);
        if (statsRes.status === 401) {
          navigate('/admin/login');
          return;
        }
      }

      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        const quotesArray = quotesData.quotes || quotesData || [];
        setQuotes(quotesArray);
        
        if (import.meta.env.DEV) {
          console.log('Quotes fetched successfully:', quotesArray.length, 'quotes');
          // Debug: Log file information for each quote
          quotesArray.forEach(quote => {
            const hasFiles = quote.cnic_front_path || quote.cnic_back_path || quote.land_registry_path || quote.electricity_bill_path;
            if (hasFiles) {
              console.log(`Quote ${quote.id} has files:`, {
                cnic_front: quote.cnic_front_path,
                cnic_back: quote.cnic_back_path,
                land_registry: quote.land_registry_path,
                electricity_bill: quote.electricity_bill_path
              });
            }
          });
        }
        
        // Calculate analytics after quotes are loaded
        if (statsData) {
          calculateAnalytics(statsData.stats, quotesArray);
        }
      } else {
        const errorData = await quotesRes.json().catch(() => ({}));
        console.error('Failed to fetch quotes:', quotesRes.status, errorData);
        if (quotesRes.status === 401) {
          navigate('/admin/login');
          return;
        }
        setQuotes([]); // Set empty array on error
        
        // Log error details in development
        if (import.meta.env.DEV) {
          console.error('Quote fetch error details:', {
            status: quotesRes.status,
            statusText: quotesRes.statusText,
            error: errorData
          });
        }
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json();
        setMessages(messagesData.messages || []);
      } else {
        const errorData = await messagesRes.json().catch(() => ({}));
        console.error('Failed to fetch messages:', messagesRes.status, errorData);
        setMessages([]); // Set empty array on error
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Don't show alert, just log error and set defaults
      setLoading(false);
      // Set defaults to prevent crashes
      setStats({
        total_quotes: 0,
        pending_quotes: 0,
        approved_quotes: 0,
        declined_quotes: 0,
        unread_messages: 0
      });
      setQuotes([]);
      setMessages([]);
    }
  };

  const calculateAnalytics = (statsData, quotesData) => {
    // Calculate additional analytics
    const totalRevenue = quotesData.reduce((sum, q) => sum + (q.estimated_cost || 0), 0);
    const avgSystemSize = quotesData.length > 0 
      ? quotesData.reduce((sum, q) => sum + (q.system_size || 0), 0) / quotesData.length 
      : 0;
    const conversionRate = statsData.total_quotes > 0 
      ? (statsData.approved_quotes / statsData.total_quotes) * 100 
      : 0;

    setAnalytics({
      totalRevenue,
      avgSystemSize: avgSystemSize.toFixed(1),
      conversionRate: conversionRate.toFixed(1),
      avgResponseTime: '2.5 hours', // Mock data
      customerSatisfaction: '94%' // Mock data
    });
  };

  /**
   * Handle admin logout
   * Student Note: This function logs out the admin by:
   * 1. Calling the backend logout endpoint
   * 2. Removing admin data from localStorage
   * 3. Redirecting to login page
   */
  const handleLogout = async () => {
    try {
      await fetch(getApiUrl('/api/admin/logout'), {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('admin');
      navigate('/admin/login');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Logout failed:', error);
      }
    }
  };

  /**
   * Update quote status (approve/decline/pending)
   * Student Note: This function changes the status of a quote
   * 
   * @param {number} quoteId - ID of the quote to update
   * @param {string} status - New status ('approved', 'declined', 'pending')
   * @param {string} notes - Optional admin notes
   */
  const updateQuoteStatus = async (quoteId, status, notes = '') => {
    try {
      const response = await fetch(getApiUrl(`/api/admin/quotes/${quoteId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status, admin_notes: notes })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data after update
        setSelectedQuote(null);
        alert(`Quote ${status} successfully!`);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to update quote:', error);
      }
      alert('Failed to update quote status');
    }
  };

  /**
   * Delete a quote
   * Student Note: This function permanently deletes a quote from the database
   * 
   * @param {number} quoteId - ID of the quote to delete
   */
  const deleteQuote = async (quoteId) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        const response = await fetch(getApiUrl(`/api/admin/quotes/${quoteId}`), {
          method: 'DELETE',
          credentials: 'include'
        });

        if (response.ok) {
          fetchDashboardData(); // Refresh data after deletion
          alert('Quote deleted successfully!');
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Failed to delete quote:', error);
        }
        alert('Failed to delete quote');
      }
    }
  };

  const exportQuotes = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Address', 'Project Type', 'System Size', 'Status', 'Created At'].join(','),
      ...filteredQuotes.map(q => [
        q.name,
        q.email,
        q.phone,
        q.address,
        q.project_type,
        q.system_size,
        q.status,
        new Date(q.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchesSearch = !searchQuery || 
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.includes(searchQuery) ||
      q.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="text-6xl text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Connection Status Banner */}
      {connectionStatus === 'disconnected' && (
        <div className="bg-red-600 text-white p-3 text-center">
          <p className="font-semibold">
            ⚠️ Backend Server Not Connected! {getConnectionStatusMessage()}
            <br />
            <span className="text-sm">Run: <code className="bg-red-700 px-2 py-1 rounded">cd backend && python app.py</code></span>
          </p>
        </div>
      )}
      {/* Top Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg">
        <div className="container-custom py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Al-Muslim Engineering</h1>
            <p className="text-sm text-blue-100">Admin Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {admin?.full_name || admin?.username}</span>
            <button
              onClick={() => window.open('https://supabase.com/dashboard/project/zdegsmctyhdzfsmjkmrp/database/tables', '_blank', 'noopener,noreferrer')}
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <FiDatabase className="mr-2" />
              Database
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-custom py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiFileText className="text-3xl text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats?.total_quotes || 0}</span>
            </div>
            <h3 className="text-gray-600 text-sm">Total Quotes</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FiClock className="text-3xl text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats?.pending_quotes || 0}</span>
            </div>
            <h3 className="text-gray-600 text-sm">Pending Quotes</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="text-3xl text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats?.approved_quotes || 0}</span>
            </div>
            <h3 className="text-gray-600 text-sm">Approved Quotes</h3>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiMail className="text-3xl text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats?.unread_messages || 0}</span>
            </div>
            <h3 className="text-gray-600 text-sm">Unread Messages</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'quotes'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Quote Requests ({stats?.total_quotes || 0})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-4 border-b-2 font-medium transition-colors ${
                  activeTab === 'messages'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Messages ({messages.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                  <button
                    onClick={fetchDashboardData}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <FiRefreshCw className="mr-2" />
                    Refresh
                  </button>
                </div>

                {/* Analytics Cards */}
                {analytics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <FiDollarSign className="text-3xl opacity-80" />
                        <FiTrendingUp className="text-2xl" />
                      </div>
                      <div className="text-2xl font-bold">Rs. {analytics.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm opacity-90">{t('adminDashboard.totalRevenue')}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <FiTarget className="text-3xl opacity-80" />
                        <FiActivity className="text-2xl" />
                      </div>
                      <div className="text-2xl font-bold">{analytics.avgSystemSize} KW</div>
                      <div className="text-sm opacity-90">{t('adminDashboard.avgSystemSize')}</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <FiBarChart className="text-3xl opacity-80" />
                        <FiTrendingUp className="text-2xl" />
                      </div>
                      <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
                      <div className="text-sm opacity-90">{t('adminDashboard.conversionRate')}</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <FiStar className="text-3xl opacity-80" />
                        <FiShield className="text-2xl" />
                      </div>
                      <div className="text-2xl font-bold">{analytics.customerSatisfaction}</div>
                      <div className="text-sm opacity-90">{t('adminDashboard.satisfaction')}</div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Quotes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Quote Requests</h3>
                    <div className="space-y-3">
                      {quotes.slice(0, 5).map((quote) => (
                        <div key={quote.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{quote.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(quote.status)}`}>
                              {quote.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{quote.system_size} KW - {quote.project_type}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(quote.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Messages */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Contact Messages</h3>
                    <div className="space-y-3">
                      {messages.slice(0, 5).map((message) => (
                        <div key={message.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{message.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              message.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {message.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quotes Tab */}
            {activeTab === 'quotes' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-gray-900">Quote Requests</h2>
                  <div className="flex flex-wrap gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search quotes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* Filter */}
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="declined">Declined</option>
                      <option value="contacted">Contacted</option>
                    </select>
                    {/* Export Button */}
                    <button
                      onClick={exportQuotes}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FiDownload className="mr-1" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiFileText className="text-6xl mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold mb-2">No quote requests found</p>
                      {quotes.length === 0 && connectionStatus === 'connected' ? (
                        <p className="text-sm">No quotes have been submitted yet. Quotes will appear here when customers submit requests.</p>
                      ) : connectionStatus === 'disconnected' ? (
                        <p className="text-sm text-red-600">⚠️ Backend server is not connected. Please start the backend server to view quotes.</p>
                      ) : (
                        <p className="text-sm">Try adjusting your search or filter criteria.</p>
                      )}
                    </div>
                  ) : (
                    filteredQuotes.map((quote) => (
                      <div key={quote.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-bold text-gray-900 mr-3">{quote.name}</h3>
                              <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(quote.status)}`}>
                                {quote.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <FiMapPin className="mr-2 text-blue-600" />
                                <span>{quote.address}</span>
                              </div>
                              <div className="flex items-center">
                                <FiPhone className="mr-2 text-green-600" />
                                <span>{quote.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <FiMail className="mr-2 text-purple-600" />
                                <span>{quote.email}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-white rounded-lg">
                          <div>
                            <p className="text-xs text-gray-500">System Size</p>
                            <p className="font-semibold text-gray-900">{quote.system_size} KW</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Project Type</p>
                            <p className="font-semibold text-gray-900 capitalize">{quote.project_type}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Monthly Bill</p>
                            <p className="font-semibold text-gray-900">
                              {quote.monthly_bill ? `Rs. ${quote.monthly_bill.toLocaleString()}` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Installation Type</p>
                            <p className="font-semibold text-gray-900 capitalize">
                              {quote.installation_type || 'Not specified'}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-200 gap-4">
                          <span className="text-xs text-gray-500">
                            Received: {new Date(quote.created_at).toLocaleString()}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {quote.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateQuoteStatus(quote.id, 'approved')}
                                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  <FiCheckCircle className="mr-2" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateQuoteStatus(quote.id, 'declined')}
                                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                  <FiXCircle className="mr-2" />
                                  Decline
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => updateQuoteStatus(quote.id, 'contacted')}
                              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <FiPhone className="mr-2" />
                              Mark Contacted
                            </button>
                            <button
                              onClick={() => {
                                setSelectedQuoteForQuotation(quote);
                                setShowQuotationGenerator(true);
                              }}
                              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                              title="Generate Quotation"
                            >
                              <FiFileText className="mr-2" />
                              Generate Quotation
                            </button>

                            <button
                              onClick={() => deleteQuote(quote.id)}
                              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <FiTrash2 className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Uploaded Files Section */}
                        {(quote.cnic_front_path || quote.cnic_back_path || quote.land_registry_path || quote.electricity_bill_path) && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-3">{t('adminDashboard.uploadedDocuments')}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {quote.cnic_front_path && (
                                <a
                                  href={getApiUrl(`/api/admin/quotes/${quote.id}/files/cnic-front`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                                >
                                  <FiImage className="text-2xl text-blue-600 mb-2" />
                                  <span className="text-xs text-center">CNIC Front</span>
                                </a>
                              )}
                              {quote.cnic_back_path && (
                                <a
                                  href={getApiUrl(`/api/admin/quotes/${quote.id}/files/cnic-back`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                                >
                                  <FiImage className="text-2xl text-blue-600 mb-2" />
                                  <span className="text-xs text-center">CNIC Back</span>
                                </a>
                              )}
                              {quote.land_registry_path && (
                                <a
                                  href={getApiUrl(`/api/admin/quotes/${quote.id}/files/land-registry`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                                >
                                  <FiFile className="text-2xl text-green-600 mb-2" />
                                  <span className="text-xs text-center">Land Registry</span>
                                </a>
                              )}
                              {quote.electricity_bill_path && (
                                <a
                                  href={getApiUrl(`/api/admin/quotes/${quote.id}/files/electricity-bill`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                                >
                                  <FiFile className="text-2xl text-yellow-600 mb-2" />
                                  <span className="text-xs text-center">Electricity Bill</span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                        {quote.admin_notes && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-1">Admin Notes:</p>
                            <p className="text-sm text-gray-600">{quote.admin_notes}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiMail className="text-6xl mx-auto mb-4 opacity-50" />
                      <p>No messages found</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{message.name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                            {message.phone && (
                              <p className="text-sm text-gray-600">{message.phone}</p>
                            )}
                          </div>
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            message.status === 'unread' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {message.status}
                          </span>
                        </div>

                        {message.subject && (
                          <h4 className="font-semibold text-gray-900 mb-2">{message.subject}</h4>
                        )}

                        <p className="text-gray-700 mb-4">{message.message}</p>

                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Received: {new Date(message.created_at).toLocaleString()}</span>
                          <a
                            href={`mailto:${message.email}`}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                          >
                            Reply via Email
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>



      {/* Quotation Generator */}
      <QuotationGenerator
        isOpen={showQuotationGenerator}
        onClose={() => {
          setShowQuotationGenerator(false);
          setSelectedQuoteForQuotation(null);
          fetchDashboardData();
        }}
        quoteData={selectedQuoteForQuotation}
      />
    </div>
  );
};

export default AdminDashboardPage;

