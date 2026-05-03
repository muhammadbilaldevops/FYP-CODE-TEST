import React from 'react'

const Certifications = () => {
  const certifications = [
    { name: 'NEPRA Certified', logo: '🏆' },
    { name: 'ISO 9001:2015', logo: '✅' },
    { name: 'IEC Standards', logo: '⚡' },
    { name: 'PV Solar', logo: '☀️' },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Certifications & Partnerships
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We maintain high-quality standards through our certifications and
            partnerships.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 text-center shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-4">{cert.logo}</div>
              <div className="text-lg font-semibold text-slate-900">
                {cert.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications

