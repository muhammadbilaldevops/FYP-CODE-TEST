/**
 * FAQ COMPONENT
 * 
 * Comprehensive Frequently Asked Questions section
 * with accordion-style answers organized by categories
 */

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import { faqCategories } from '../data/faqData';

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="container-custom max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FiHelpCircle className="text-white text-3xl" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about solar energy, installation, costs, and more.
            Can't find what you're looking for? Contact us directly!
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 transition-all duration-300"
              >
                <div className="flex items-center">
                  <span className="text-xl font-bold">{category.category}</span>
                  <span className="ml-3 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {category.questions.length} questions
                  </span>
                </div>
                {openCategory === category.id ? (
                  <FiChevronUp className="text-2xl" />
                ) : (
                  <FiChevronDown className="text-2xl" />
                )}
              </button>

              {/* Questions in Category */}
              {openCategory === category.id && (
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="border-l-4 border-transparent hover:border-blue-500 transition-colors">
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        {openQuestion === faq.id ? (
                          <FiChevronUp className="text-blue-600 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {/* Answer */}
                      {openQuestion === faq.id && (
                        <div className="px-6 pb-4 text-gray-700 leading-relaxed bg-blue-50 animate-fadeIn">
                          <p className="pt-2">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-lg mb-6">
            Our solar experts are here to help you make the right decision for your energy needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us Now
            </a>
            <a
              href="tel:+923465188458"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              Call: 0346-51 88 458
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

