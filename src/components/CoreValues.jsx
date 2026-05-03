import React from 'react'
import { FiAward, FiZap, FiHeart } from 'react-icons/fi'

const CoreValues = () => {
  const values = [
    {
      icon: <FiAward className="w-10 h-10" />,
      title: 'Quality Excellence',
      description:
        'We maintain the highest standards in every project, ensuring durability, performance, and customer satisfaction.',
    },
    {
      icon: <FiZap className="w-10 h-10" />,
      title: 'Innovation & Leadership',
      description:
        'Staying ahead with cutting-edge technology and innovative solutions that set industry benchmarks.',
    },
    {
      icon: <FiHeart className="w-10 h-10" />,
      title: 'Sustainability Focus',
      description:
        'Committed to promoting renewable energy and reducing carbon footprint for a sustainable future.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 text-center border border-blue-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues

