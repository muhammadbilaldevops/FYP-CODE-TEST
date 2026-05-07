import React, { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiAlertCircle } from 'react-icons/fi'
import { getApiUrl, getConnectionStatusMessage } from '../config/api'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    city: '',
    projectType: '',
    projectDetails: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setErrors({})
      try {
        const response = await fetch(getApiUrl('/api/contact'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            subject: `${formData.projectType} — ${formData.city}`,
            message: formData.projectDetails || 'Solar assessment request'
          })
        })
        if (response.ok) {
          setSubmitted(true)
          setTimeout(() => {
            setSubmitted(false)
            setFormData({
              companyName: '',
              email: '',
              phone: '',
              city: '',
              projectType: '',
              projectDetails: '',
            })
          }, 3000)
        } else {
          const data = await response.json().catch(() => ({}))
          setErrors({ submit: data.error || 'Failed to send message. Please try again.' })
        }
      } catch (error) {
        setErrors({ submit: getConnectionStatusMessage() })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Get Free Solar Assessment
            </h3>
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                Thank you! We'll contact you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+92 300 0000000"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.projectType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select project type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="net-metering">Net Metering</option>
                </select>
                {errors.projectType && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    {errors.projectType}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="projectDetails"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Details
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>

              {errors.submit && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}
              <button type="submit" disabled={isSubmitting} className={`btn-secondary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Sending...' : 'Request a Free Assessment'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy and
                Terms of Service.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiPhone className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Phone</div>
                    <div className="flex flex-col">
                      <a
                        href="tel:+923419231892"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        0341 9231892
                      </a>
                      <a
                        href="tel:+923318441722"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        0331 8441722
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiMail className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Email</div>
                    <a
                      href="mailto:info@almuslimengineering.com"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      info@almuslimengineering.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiMapPin className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">Office</div>
                    <div className="text-gray-600">
                      Al Muslim engineering solar system and cooling center, Rawalpindi
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <FiClock className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900">
                      Business Hours
                    </div>
                    <div className="text-gray-600">Monday - Sunday: 9:00 AM - 8:00 PM</div>
                    <div className="text-gray-600">Friday: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                24/7 Emergency Support
              </h4>
              <p className="text-gray-700 mb-4">
                Need immediate assistance? Our emergency support team is
                available round the clock.
              </p>
              <a 
                href="tel:+923419231892" 
                className="btn-secondary w-full sm:w-auto inline-block text-center"
              >
                Call Emergency Line
              </a>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                Why Choose Us?
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Response Time</span>
                  <span className="font-semibold text-blue-600">24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Installation Time</span>
                  <span className="font-semibold text-blue-600">7-14 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Customer Satisfaction</span>
                  <span className="font-semibold text-green-600">90%+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

