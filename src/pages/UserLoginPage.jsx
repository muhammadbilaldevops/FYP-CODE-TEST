import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiPhone, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { getApiUrl } from '../config/api'

const UserLoginPage = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(getApiUrl('/api/user/check'), { credentials: 'include' })
        const data = await res.json()
        if (data.authenticated) navigate('/user/dashboard')
      } catch (e) { /* not logged in */ }
    }
    checkAuth()
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch(getApiUrl('/api/user/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData)
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/user/dashboard')
      } else {
        setErrors({ form: data.error || 'Login failed' })
      }
    } catch {
      setErrors({ form: 'Server connection failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validate
    const newErrors = {}
    if (!signupData.name.trim()) newErrors.name = 'Name is required'
    if (!signupData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(signupData.email)) newErrors.email = 'Email is invalid'
    if (!signupData.password) newErrors.password = 'Password is required'
    else if (signupData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(getApiUrl('/api/user/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          phone: signupData.phone,
          password: signupData.password
        })
      })
      const data = await res.json()
      if (res.ok) {
        navigate('/user/dashboard')
      } else {
        setErrors({ form: data.error || 'Signup failed' })
      }
    } catch {
      setErrors({ form: 'Server connection failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) => `w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${errors[field] ? 'border-red-500' : 'border-gray-300'}`

  return (
    <div>
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-12">
        <div className="container-custom px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">My Account</h1>
          <p className="text-gray-300 max-w-xl mx-auto">Login or create an account to track your solar quote applications and upload documents.</p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="flex">
              <button onClick={() => { setActiveTab('login'); setErrors({}) }} className={`flex-1 py-4 text-center font-semibold transition-all ${activeTab === 'login' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Login
              </button>
              <button onClick={() => { setActiveTab('signup'); setErrors({}) }} className={`flex-1 py-4 text-center font-semibold transition-all ${activeTab === 'signup' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                Sign Up
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg flex items-center text-sm">
                  <FiAlertCircle className="mr-2 flex-shrink-0" /> {errors.form}
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 bg-green-50 border border-green-300 text-green-700 rounded-lg flex items-center text-sm">
                  <FiCheckCircle className="mr-2 flex-shrink-0" /> {successMsg}
                </div>
              )}

              {/* LOGIN FORM */}
              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" id="customer-email" name="customer-email" placeholder="Email Address" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className={inputClass('email')} autoComplete="username" required />
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" id="customer-password" name="customer-password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className={inputClass('password')} autoComplete="current-password" required />
                  </div>
                  <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>
              )}

              {/* SIGNUP FORM */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Full Name *" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} className={inputClass('name')} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" placeholder="Email Address *" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className={inputClass('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" placeholder="Phone Number (Optional)" value={signupData.phone} onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} className={inputClass('phone')} />
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="Password * (min 6 characters)" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className={inputClass('password')} />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="password" placeholder="Confirm Password *" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} className={inputClass('confirmPassword')} />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserLoginPage
