/**
 * ABOUT US COMPONENT
 * 
 * Provides a brief overview of the company with key statistics.
 * Shows company experience, client count, team size, and total capacity.
 * 
 * Student Note: Statistics build credibility and trust with potential clients
 */

import React from 'react'

/**
 * AboutUs Component
 * 
 * Displays company overview and key statistics in a visual format.
 * 
 * Student Note:
 * - Data is stored in an array for easy maintenance
 * - Cards use hover effects for interactivity
 * - Responsive grid adapts to screen size
 * 
 * @returns {JSX.Element} The about us section
 */
const AboutUs = () => {
  // Company statistics data
  // Student Note: Keeping data separate makes it easy to update
  const stats = [
    { value: '8+', label: 'Years of Experience' },
    { value: '500+', label: 'Satisfied Clients' },
    { value: '50+', label: 'Engineers & Technicians' },
    { value: '50MW+', label: 'Total Capacity Installed' },
  ]

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Leading Pakistan's Solar Revolution
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Al Muslim Engineers has been at the forefront of Pakistan's solar
            energy revolution for over 8 years. With a team of experienced
            engineers and technicians, we have successfully completed over 1500
            projects, installing more than 200MW of solar capacity across
            residential, commercial, and industrial sectors. Our commitment to
            quality, innovation, and sustainability drives us to provide the
            best solar solutions tailored to Pakistan's unique energy needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs

