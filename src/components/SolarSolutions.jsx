/**
 * SOLAR SOLUTIONS COMPONENT
 * 
 * Displays the main solar products and services offered by the company.
 * Each solution card includes:
 * - Icon and title
 * - Description of the service
 * - Key features list
 * - Image
 * - Call-to-action button
 * 
 * Student Note: This component demonstrates card-based layout and data mapping
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiHome, FiGrid, FiRefreshCw } from 'react-icons/fi'
import { solarImages } from '../data/imageUrls'
import SafeImage from './SafeImage'

/**
 * SolarSolutions Component
 * 
 * Displays a grid of solar solution cards with features and CTAs.
 * 
 * @returns {JSX.Element} The solar solutions section
 */
const SolarSolutions = () => {
  const solutions = [
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Residential Solar Systems',
      description:
        'Power your home with clean, renewable energy. Our residential solar systems are designed to maximize your energy savings and reduce your carbon footprint.',
      features: [
        '5-100 kW Systems',
        'Grid-tied & Off-grid',
        '25-Year Warranty',
        'Easy Installation',
      ],
      image: solarImages.services.installation,
    },
    {
      icon: <FiHome className="w-8 h-8" />,
      title: 'Commercial Solar Systems',
      description:
        'Reduce operational costs and enhance your business sustainability with our commercial solar solutions tailored for your energy needs. Serving businesses across Pakistan.',
      features: [
        '10-500 kW Systems',
        'Custom Design',
        'ROI Optimization',
        'Maintenance Included',
      ],
      image: solarImages.services.consultation,
    },
    {
      icon: <FiGrid className="w-8 h-8" />,
      title: 'Net Metering Services',
      description:
        'Connect your solar system to WAPDA grid and earn credits for excess energy. Complete documentation and grid synchronization services. NEPRA approved process.',
      features: [
        'Complete Documentation',
        'WAPDA Grid Synchronization',
        'NEPRA Approved',
        'Fast Processing',
      ],
      image: solarImages.services.netMetering,
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: 'Maintenance & Support',
      description:
        'Ensure optimal performance with our comprehensive maintenance and support services. 24/7 monitoring and preventative maintenance across Pakistan.',
      features: [
        '24/7 Monitoring',
        'Preventative Maintenance',
        'Emergency Support',
        'Performance Reports',
      ],
      image: solarImages.services.maintenance,
    },
  ]

  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Solar Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From in-depth feasibility studies to long-term maintenance, we
            provide complete solar energy solutions for Pakistan's industrial
            sector with guaranteed performance and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="h-48 overflow-hidden">
                <SafeImage
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-3">{solution.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* Learn More Button - navigates to services page */}
                {/* Student Note: Link component for client-side navigation */}
                <Link
                  to="/services"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolarSolutions

