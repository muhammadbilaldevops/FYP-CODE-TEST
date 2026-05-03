import React from 'react'

const NetMeteringSolutions = () => {
  const benefits = [
    { value: '80%', label: 'Reduced Electricity Bills' },
    { value: '24/7', label: 'Power Availability' },
    { value: '3-5 Years', label: 'ROI Achievement' },
    { value: 'Zero', label: 'Carbon Footprint' },
  ]

  return (
    <section id="net-metering" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            NEPRA-Approved Net Metering Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Transform your home, business, or industrial facility into a power
            generator with our comprehensive net metering solutions. We provide
            everything from NEPRA-approved grid-tied systems to off-grid systems
            ranging from 5kW to 25MW capacity.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 text-center border border-blue-100"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {benefit.value}
              </div>
              <div className="text-gray-700 font-medium text-sm sm:text-base">
                {benefit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NetMeteringSolutions

