/**
 * QUOTE REQUEST PAGE
 * 
 * This page allows customers to request a detailed quote for their solar project:
 * - Advanced form with project specifications
 * - ROI calculator
 * - Financing options information
 * - Instant estimate based on inputs
 * 
 * Purpose: To collect detailed project information and provide preliminary quotes
 * Student Note: Forms with calculations demonstrate interactive React features
 */

import React, { useState, useEffect, useRef } from 'react'
import { 
  FiHome, FiTrendingUp, FiDollarSign, FiZap, 
  FiAlertCircle, FiCheckCircle, FiActivity, FiUpload, FiFile, FiImage
} from 'react-icons/fi'
import { useTranslation } from '../hooks/useTranslation'
import { getApiUrl, getConnectionStatusMessage } from '../config/api'

/**
 * QuotePage Component
 * 
 * Provides an interactive quote request form with real-time calculations
 * and instant cost estimates.
 * 
 * @returns {JSX.Element} The complete quote page layout
 */
const QuotePage = () => {
  const { t, language } = useTranslation()
  // Form state
  // Student Note: useState manages form data and calculations
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    projectType: '',
    systemSize: '',
    monthlyBill: '',
    roofArea: '',
    propertyType: '',
    installationType: '',
    solarSystemType: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedQuoteId, setSubmittedQuoteId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimate, setEstimate] = useState(null)
  const successMessageRef = useRef(null)
  
  // Debug: Watch for submitted state changes
  useEffect(() => {
    console.log('🔍 Submitted state changed to:', submitted)
    console.log('🔍 SubmittedQuoteId:', submittedQuoteId)
  }, [submitted, submittedQuoteId])
  const [uploadedFiles, setUploadedFiles] = useState({
    cnicFront: null,
    cnicBack: null,
    landRegistry: null,
    electricityBill: null
  })
  const [filePreviews, setFilePreviews] = useState({
    cnicFront: null,
    cnicBack: null,
    landRegistry: null,
    electricityBill: null
  })

  // Debug: Watch for submitted state changes to verify rendering
  useEffect(() => {
    if (submitted) {
      console.log('✅✅✅ SUBMITTED STATE IS TRUE - Success message should be visible! ✅✅✅')
      console.log('Submitted Quote ID:', submittedQuoteId)
      console.log('Current submitted value:', submitted)
    } else {
      console.log('Submitted state is FALSE')
    }
  }, [submitted, submittedQuoteId])
  
  // Calculate estimate whenever relevant fields change
  // Student Note: useEffect runs when dependencies change
  useEffect(() => {
    if (formData.systemSize && formData.monthlyBill) {
      calculateEstimate()
    }
  }, [formData.systemSize, formData.monthlyBill])

  /**
   * Calculate cost estimate based on system size and monthly bill
   * Student Note: This is a simplified calculation for demonstration
   */
  const calculateEstimate = () => {
    const size = parseFloat(formData.systemSize)
    const bill = parseFloat(formData.monthlyBill)
    
    if (size && bill) {
      // Approximate costs (PKR)
      const costPerKW = 200000 // Rs. 200,000 per kW
      const totalCost = size * costPerKW
      const annualSavings = bill * 12 * 0.7 // 70% reduction
      const paybackPeriod = totalCost / annualSavings
      const roi25Years = (annualSavings * 25) - totalCost

      setEstimate({
        totalCost: totalCost.toFixed(0),
        annualSavings: annualSavings.toFixed(0),
        paybackPeriod: paybackPeriod.toFixed(1),
        roi25Years: roi25Years.toFixed(0),
        monthlySavings: (bill * 0.7).toFixed(0)
      })
    }
  }

  /**
   * Handle input changes
   * Student Note: This function updates state when user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileUpload = (field, file) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [field]: file }))
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setFilePreviews(prev => ({ ...prev, [field]: reader.result }))
        }
        reader.readAsDataURL(file)
      } else if (file.name.toLowerCase().endsWith('.pdf')) {
        setFilePreviews(prev => ({ ...prev, [field]: 'pdf' }))
      } else if (file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx')) {
        setFilePreviews(prev => ({ ...prev, [field]: 'doc' }))
      } else {
        setFilePreviews(prev => ({ ...prev, [field]: 'file' }))
      }
    }
  }

  /**
   * Validate form before submission
   * Student Note: Always validate user input before processing
   */
  const validateForm = () => {
    const newErrors = {}
    
    // Only validate fields that are actually in the form
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    // Email is optional - validate format only if provided
    if (formData.email && formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    // Address, projectType, and systemSize are optional - only validate if form has these fields
    
    if (import.meta.env.DEV && Object.keys(newErrors).length > 0) {
      console.log('Form validation failed:', newErrors)
    }
    
    return newErrors
  }

  /**
   * Handle form submission
   * Student Note: preventDefault() stops page reload on form submit
   */
  const handleSubmit = async (e) => {
    // Wrap entire handler in try-catch to catch any errors
    try {
      e.preventDefault()
      e.stopPropagation() // Prevent event bubbling
      
      console.log('=== FORM SUBMIT TRIGGERED ===')
      
      // Clear previous errors and set loading state immediately
      setErrors({})
      setIsSubmitting(true)
      
      console.log('Validation starting...')
      const newErrors = validateForm()
      console.log('Validation result:', newErrors)
      
      // Show validation errors prominently if validation fails
      if (Object.keys(newErrors).length > 0) {
        console.error('VALIDATION FAILED:', newErrors)
        setIsSubmitting(false)
        setErrors(newErrors)
        
        // Show alert with validation errors
        const errorMessages = Object.values(newErrors).join('\n')
        alert(`Please fix the following errors:\n\n${errorMessages}`)
        
        // Scroll to first error
        setTimeout(() => {
          const firstErrorField = Object.keys(newErrors)[0]
          if (firstErrorField) {
            const errorInput = document.querySelector(`[name="${firstErrorField}"]`)
            if (errorInput) {
              errorInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
              errorInput.focus()
            }
          }
        }, 100)
        return // Stop here if validation fails
      }
    
      // Validation passed - proceed with submission
      console.log('✓ Form validation passed, starting submission...')
      console.log('Form data state:', {
        name: formData.name ? '✓' : '✗',
        email: formData.email ? '✓' : '✗',
        phone: formData.phone ? '✓' : '✗',
        city: formData.city ? '✓' : '✗',
        address: formData.address ? '✓' : '✗',
        projectType: formData.projectType ? '✓' : '✗',
        systemSize: formData.systemSize ? '✓' : '✗'
      })
      
      try {
        // Create FormData to handle file uploads
        const formDataToSend = new FormData()
        
        // Add form fields - use defaults for missing fields
        formDataToSend.append('name', formData.name)
        formDataToSend.append('email', formData.email || 'notprovided@example.com')
        formDataToSend.append('phone', formData.phone)
        if (formData.city) formDataToSend.append('city', formData.city)
        formDataToSend.append('address', formData.address || 'Not provided')
        formDataToSend.append('project_type', formData.projectType || 'Residential')
        formDataToSend.append('system_size', formData.systemSize ? parseFloat(formData.systemSize) : 5.0)
        if (formData.monthlyBill) formDataToSend.append('monthly_bill', parseFloat(formData.monthlyBill))
        if (formData.roofArea) formDataToSend.append('roof_area', parseFloat(formData.roofArea))
        if (formData.propertyType) formDataToSend.append('property_type', formData.propertyType)
        if (formData.installationType) formDataToSend.append('installation_type', formData.installationType)
        if (formData.solarSystemType) formDataToSend.append('solar_system_type', formData.solarSystemType)
        if (formData.message) formDataToSend.append('message', formData.message)
        
        // Add files if uploaded
        const filesToUpload = []
        if (uploadedFiles.cnicFront) {
          formDataToSend.append('cnicFront', uploadedFiles.cnicFront)
          filesToUpload.push('cnicFront')
        }
        if (uploadedFiles.cnicBack) {
          formDataToSend.append('cnicBack', uploadedFiles.cnicBack)
          filesToUpload.push('cnicBack')
        }
        if (uploadedFiles.landRegistry) {
          formDataToSend.append('landRegistry', uploadedFiles.landRegistry)
          filesToUpload.push('landRegistry')
        }
        if (uploadedFiles.electricityBill) {
          formDataToSend.append('electricityBill', uploadedFiles.electricityBill)
          filesToUpload.push('electricityBill')
        }
        
        if (import.meta.env.DEV) {
          console.log('Submitting quote with files:', filesToUpload)
          console.log('Form data being sent:', {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            address: formData.address,
            projectType: formData.projectType,
            systemSize: formData.systemSize,
            filesCount: filesToUpload.length
          })
        }
        
        // Submit to backend API with timeout
        const apiUrl = getApiUrl('/api/quotes')
        console.log('Making API request to:', apiUrl)
        console.log('FormData contents:', {
          hasFiles: filesToUpload.length > 0,
          fileCount: filesToUpload.length,
          fieldCount: Array.from(formDataToSend.keys()).length
        })
        
        // Create abort controller for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
          controller.abort()
          console.error('✗ API request timed out after 30 seconds')
        }, 30000) // 30 second timeout
        
        let response
        try {
          response = await fetch(apiUrl, {
            method: 'POST',
            body: formDataToSend,
            signal: controller.signal
            // Don't set Content-Type header - browser will set it automatically for FormData
          })
          
          clearTimeout(timeoutId)
          console.log('✓ Response received:', response.status, response.statusText)
        console.log('Response headers:', Object.fromEntries(response.headers.entries()))

        if (!response.ok) {
          console.error('✗ API request failed:', response.status, response.statusText)
          // Try to get error message from response
          let errorMessage = 'Failed to submit quote request';
          let errorDetails = null
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            errorDetails = errorData
            console.error('Error response data:', errorData)
          } catch (e) {
            // If response is not JSON, try to get text
            try {
              const errorText = await response.text();
              console.error('Error response text:', errorText)
              errorMessage = errorText || response.statusText || errorMessage;
            } catch (e2) {
              errorMessage = response.statusText || errorMessage;
            }
          }
          throw new Error(errorMessage);
        }
        } catch (fetchError) {
          clearTimeout(timeoutId)
          if (fetchError.name === 'AbortError') {
            throw new Error('Request timed out. Please check your internet connection and try again.')
          }
          throw fetchError
        }

        const data = await response.json()
        console.log('✓ Quote request submitted successfully!')
        console.log('Response data:', data)
        console.log('Files uploaded:', filesToUpload)
        
        // Store quote ID from response for display
        const quoteId = data?.quote_id || data?.id || data?.quote?.id || null
        console.log('Quote ID extracted:', quoteId)
        
        // Use React state batching - update all states together
        console.log('=== SETTING SUCCESS STATES ===')
        setErrors({})
        setIsSubmitting(false)
        setSubmittedQuoteId(quoteId)
        setSubmitted(true) // This should trigger re-render and show success message
        
        console.log('✓✓✓ All success states set - submitted=true, message should appear NOW ✓✓✓')
        
        // Scroll to success message after a brief delay to ensure it's rendered
        setTimeout(() => {
          console.log('Attempting to scroll to success message...')
          if (successMessageRef.current) {
            console.log('Success message ref found, scrolling...')
            successMessageRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          } else {
            console.warn('Success message ref not found, using fallback scroll')
            // Fallback: scroll to top of form if ref not available
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 300);
        
        // Reset form after 8 seconds (increased from 5 to give more time to see success message)
        setTimeout(() => {
          setSubmitted(false)
          setSubmittedQuoteId(null)
          setFormData({
            name: '',
            email: '',
            phone: '',
            city: '',
            address: '',
            projectType: '',
            systemSize: '',
            monthlyBill: '',
            roofArea: '',
            propertyType: '',
            installationType: ''
          })
          setUploadedFiles({
            cnicFront: null,
            cnicBack: null,
            landRegistry: null,
            electricityBill: null
          })
          setFilePreviews({
            cnicFront: null,
            cnicBack: null,
            landRegistry: null,
            electricityBill: null
          })
          setEstimate(null)
          setSubmittedQuoteId(null)
        }, 8000) // Increased to 8 seconds
      } catch (error) {
        console.error('Error submitting quote:', error)
        setIsSubmitting(false)
        setSubmitted(false)
        
        // Show alert with error message
        let errorMessage = 'Failed to submit quote request. Please try again.'
        if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
          errorMessage = getConnectionStatusMessage()
        } else if (error.message) {
          errorMessage = error.message
        }
        
        alert(`❌ Error: ${errorMessage}`)
        
        // Show more specific error message
        setErrors({ submit: errorMessage })
        
        // Scroll to error message
        setTimeout(() => {
          const errorElement = document.querySelector('[role="alert"]')
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    } catch (error) {
      // Catch any JavaScript errors that prevent handler execution
      console.error('=== CRITICAL ERROR IN FORM SUBMIT HANDLER ===', error)
      console.error('Error stack:', error.stack)
      setIsSubmitting(false)
      setSubmitted(false)
      
      // Display error prominently
      const errorMessage = error.message || 'Unknown error occurred'
      setErrors({ 
        submit: `An unexpected error occurred: ${errorMessage}. Please check the browser console (F12) for details or contact support.` 
      })
      
      // Scroll to error message immediately
      setTimeout(() => {
        const errorElement = document.querySelector('[role="alert"]')
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 150)
    }
  }
  
  // Backup button click handler in case form onSubmit fails
  const handleButtonClick = (e) => {
    console.log('=== BUTTON CLICKED (onClick handler) ===')
    // Show immediate feedback that button was clicked
    if (!isSubmitting) {
      console.log('Button clicked, form should submit now')
      // Don't prevent default - let form onSubmit handle it
    }
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-green-900 to-blue-900 text-white py-12">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Free Solar Quote Lein | Get Your Free Solar Quote
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Neeche form bhar kar apke liye detailed, customized quote lein. Instant estimates aur experts se baat karein. 
            | Fill out the form below to receive a detailed, customized quote for your 
            solar energy project. Get instant estimates and speak with our experts.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {t('Customer Details: ')}
                </h2>

                {/* Error Message */}
                {errors.submit && (
                  <div 
                    className="mb-6 p-4 bg-red-100 border-2 border-red-500 text-red-800 rounded-lg flex items-center shadow-lg"
                    role="alert"
                    aria-live="assertive"
                  >
                    <FiAlertCircle className="mr-3 flex-shrink-0" size={28} />
                    <div>
                      <strong className="text-lg">Error!</strong>
                      <p className="mt-1">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}

                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <FiAlertCircle className="mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                       
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <FiAlertCircle className="mr-1" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select City</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <FiAlertCircle className="mr-1" /> {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Additional Options */}
                  <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email (Optional) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <FiAlertCircle className="mr-1" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Solar System Type Dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Solar System Type
                        </label>
                        <select
                          name="solarSystemType"
                          value={formData.solarSystemType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Solar System Type</option>
                          <option value="On-Grid">On-Grid Solar System</option>
                          <option value="Off-Grid">Off-Grid Solar System</option>
                          <option value="Hybrid">Hybrid Solar System</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Box (Optional) */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message / Notes (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any additional details or requirements..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    onClick={handleButtonClick}
                    disabled={isSubmitting}
                    className={`btn-primary w-full text-lg py-4 mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Free Quote Lein | Get My Free Quote'}
                  </button>

                  {/* Success Message - Below Button - Always show when submitted is true */}
                  {submitted && (
                    <div 
                      ref={successMessageRef}
                      className="mt-6 p-6 sm:p-8 bg-gradient-to-r from-green-50 to-green-100 border-4 border-green-500 text-green-800 rounded-xl flex items-start shadow-2xl z-50"
                      role="alert"
                      aria-live="polite"
                      style={{ 
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1
                      }}
                      key={`success-${submittedQuoteId || Date.now()}`}
                    >
                      <FiCheckCircle className="mr-4 flex-shrink-0 mt-1 text-green-600" size={32} />
                      <div className="flex-1">
                        <strong className="text-xl sm:text-2xl block mb-3 font-bold">
                          {language === 'ur' ? 'Shukriya! ✅ Quote Request Submit Ho Gaya!' : 'Thank you! ✅ Quote Request Submitted Successfully!'}
                        </strong>
                        <p className="text-base sm:text-lg leading-relaxed font-medium">
                          {language === 'ur' 
                            ? 'Apka quote request submit ho gaya hai. Humara team 24 ghante mein contact karega.'
                            : 'Your quote request has been submitted successfully. Our team will contact you within 24 hours.'
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 text-center mt-4">
                    * {t('quote.form.requiredFields')}
                  </p>
                </form>
              </div>
            </div>

            {/* Estimate Sidebar */}
            <div className="lg:col-span-1">
              {/* Instant Estimate Card */}
              {estimate ? (
                <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6 mb-6 sticky top-24">
                  <div className="flex items-center mb-4">
                    <FiActivity className="text-3xl mr-3" />
                    <h3 className="text-2xl font-bold">{t('quote.estimate.title')}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-b border-blue-400 pb-3">
                      <div className="text-sm opacity-90">{t('quote.estimate.totalCost')}</div>
                      <div className="text-3xl font-bold">
                        Rs. {parseInt(estimate.totalCost).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm opacity-90">{t('quote.estimate.monthlySavings')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(estimate.monthlySavings).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm opacity-90">{t('quote.estimate.annualSavings')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(estimate.annualSavings).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm opacity-90">{t('quote.estimate.paybackPeriod')}</div>
                      <div className="text-2xl font-bold">
                        {estimate.paybackPeriod} {t('quote.estimate.years')}
                      </div>
                    </div>

                    <div className="bg-green-500 rounded-lg p-4 mt-4">
                      <div className="text-sm opacity-90">{t('quote.estimate.roi')}</div>
                      <div className="text-2xl font-bold">
                        Rs. {parseInt(estimate.roi25Years).toLocaleString()}
                      </div>
                      <div className="text-xs mt-2 opacity-90">
                        Current electricity rates ke mutabiq | Based on current electricity rates
                      </div>
                    </div>
                  </div>

                  <p className="text-xs mt-4 opacity-75">
                    * This is an approximate estimate. Final quote may vary based on 
                    site assessment and specific requirements.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <FiActivity className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    System size aur monthly bill bhar kar instant estimates dekhein. 
                    | Fill in the system size and monthly bill to see instant estimates
                  </p>
                </div>
              )}

              {/* Why Get A Quote Card */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Quote Kyun Lein? | Why Get a Quote?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Apke project ki accurate cost projection | Accurate cost projection for your project
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Potential savings ki samajh | Understanding of potential savings
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {t('quote.estimate.consultation')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Apke budget ke mutabiq financing options | Financing options tailored to your budget
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Koi commitment nahi | No obligation to proceed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="section-padding bg-white border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <FiCheckCircle className="text-4xl text-green-600 mx-auto mb-3" />
              <div className="font-semibold text-slate-900">{t('quote.benefits.freeAssessment')}</div>
              <div className="text-sm text-gray-600">{t('quote.benefits.noObligation')}</div>
            </div>
            <div className="text-center">
              <FiActivity className="text-4xl text-blue-600 mx-auto mb-3" />
              <div className="font-semibold text-slate-900">{t('quote.benefits.instantEstimate')}</div>
              <div className="text-sm text-gray-600">{t('quote.benefits.realTime')}</div>
            </div>
            <div className="text-center">
              <FiDollarSign className="text-4xl text-purple-600 mx-auto mb-3" />
              <div className="font-semibold text-slate-900">{t('quote.benefits.financing')}</div>
              <div className="text-sm text-gray-600">{t('quote.benefits.flexiblePlans')}</div>
            </div>
            <div className="text-center">
              <FiTrendingUp className="text-4xl text-red-600 mx-auto mb-3" />
              <div className="font-semibold text-slate-900">{t('quote.benefits.quickResponse')}</div>
              <div className="text-sm text-gray-600">{t('quote.benefits.within24Hours')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuotePage

