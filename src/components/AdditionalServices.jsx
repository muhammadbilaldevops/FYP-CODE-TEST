import React from 'react'
import { FiZap, FiLayers, FiDollarSign, FiTool } from 'react-icons/fi'

const AdditionalServices = () => {
  const services = [
    {
      icon: <FiZap className="w-10 h-10" />,
      title: 'Energy Consulting',
      description:
        'Expert advice on energy efficiency and solar system optimization.',
    },
    {
      icon: <FiLayers className="w-10 h-10" />,
      title: 'Project Engineering',
      description:
        'Professional engineering services for solar project design and implementation.',
    },
    {
      icon: <FiDollarSign className="w-10 h-10" />,
      title: 'Financing Solutions',
      description:
        'Flexible financing options to make solar energy accessible to everyone.',
    },
    {
      icon: <FiTool className="w-10 h-10" />,
      title: 'EPC & O&M Services',
      description:
        'End-to-end Engineering, Procurement, Construction, and Operations & Maintenance.',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Additional Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive support throughout your solar journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="btn-primary mb-4 inline-block cursor-pointer"
          >
            Select a Service
          </a>
          <p className="text-sm text-gray-500">
            Need something else? Contact us for a custom solution.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdditionalServices

