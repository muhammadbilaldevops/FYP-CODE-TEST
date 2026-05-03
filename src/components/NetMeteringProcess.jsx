import React from 'react'
import { FiFileText, FiSearch, FiSettings, FiCheckCircle } from 'react-icons/fi'

const NetMeteringProcess = () => {
  const steps = [
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: 'Application Submission',
      description: 'Complete documentation and application submission to NEPRA.',
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: 'Technical Assessment',
      description: 'Site evaluation and technical feasibility assessment.',
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: 'Installation & Testing',
      description: 'Professional installation and comprehensive system testing.',
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: 'NEPRA Approval',
      description: 'Final approval and grid connection activation.',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Net Metering Installation Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures quick approval and installation of
            your net metering system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center h-full">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-blue-300"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-blue-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NetMeteringProcess

