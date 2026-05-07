/**
 * ABOUT US COMPONENT
 * 
 * Provides a brief overview of the company with key statistics.
 * Shows company experience, client count, team size, and total capacity.
 * 
 * Student Note: Statistics build credibility and trust with potential clients
 */

import CompanyStats from './CompanyStats'

/**
 * AboutUs Component
 * 
 * Displays company overview and key statistics in a visual format.
 */
const AboutUs = () => {
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

        {/* Standardized Statistics Section */}
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <CompanyStats />
        </div>
      </div>
    </section>
  )
}

export default AboutUs

