/**
 * WHY CHOOSE US COMPONENT
 * 
 * Highlights the benefits of choosing our services and eligibility criteria.
 * This component helps build trust and guide potential customers.
 * 
 * Student Note: Demonstrates how to present benefits and requirements clearly
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'

/**
 * WhyChooseUs Component
 * 
 * Displays company benefits and net metering eligibility information.
 * 
 * @returns {JSX.Element} The why choose us section
 */
const WhyChooseUs = () => {
  const benefits = [
    'NEPRA Certified Partners',
    'Complete Documentation',
    '24/7 Monitoring',
    'Expert Installation Team',
    'Fast Approval Process',
    'Comprehensive Warranty',
  ]

  const eligibility = [
    'Residential Property',
    'Commercial Property',
    'Industrial Facilities',
    '5kW to 25MW Capacity',
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Choose Our Net Metering Services?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Our Benefits
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <FiCheck className="text-white w-4 h-4" />
                  </div>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            {/* Call to Action Buttons */}
            {/* Student Note: Buttons should always lead somewhere or do something */}
            <div className="mt-8 space-y-4">
              <Link to="/quote" className="btn-secondary w-full sm:w-auto inline-block text-center">
                Get Net Metering
              </Link>
              <Link
                to="/services"
                className="block sm:inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors mt-4 sm:mt-0 sm:ml-4"
              >
                Learn More →
              </Link>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Net Metering Eligibility
            </h3>
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <ul className="space-y-4">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

