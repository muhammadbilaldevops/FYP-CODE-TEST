/**
 * ENHANCED HOME PAGE
 * 
 * Interactive homepage with comprehensive solar solutions information.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiSun, FiBattery, FiTrendingUp, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import HeroSlider from '../components/HeroSlider';
import CompanyStats from '../components/CompanyStats';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import BrandSlider from '../components/BrandSlider';
import { useTranslation } from '../hooks/useTranslation';

/**
 * HomePage Component
 * 
 * Main landing page component that showcases the company's solar solutions
 * and services with interactive elements and animations.
 */
const HomePage = () => {
  const { t } = useTranslation()
  
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const solutions = [
    {
      icon: FiSun,
      titleKey: 'home.solutions.domestic.title',
      descriptionKey: 'home.solutions.domestic.description',
      link: '/services',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiZap,
      titleKey: 'home.solutions.commercial.title',
      descriptionKey: 'home.solutions.commercial.description',
      link: '/services',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiBattery,
      titleKey: 'home.solutions.industrial.title',
      descriptionKey: 'home.solutions.industrial.description',
      link: '/services',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiTrendingUp,
      titleKey: 'home.solutions.agriculture.title',
      descriptionKey: 'home.solutions.agriculture.description',
      link: '/services',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Statistics Section - Consistent with all pages */}
      <CompanyStats />

      {/* Solutions Section */}
      <section className="section-padding bg-white py-20" data-animate id="solutions">
        <div className={`container-custom transition-all duration-1000 ${isVisible.solutions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t('home.solutions.title')}
            </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('home.solutions.subtitle')}
          </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <Link
                key={index}
                to={solution.link}
                className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <solution.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t(solution.titleKey)}</h3>
                <p className="text-gray-600 mb-4">{t(solution.descriptionKey)}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  {t('home.solutions.learnMore')} <FiArrowRight className="ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solar System Types Comparison */}
      <section className="section-padding bg-white py-20" data-animate id="systems">
        <div className={`container-custom transition-all duration-1000 ${isVisible.systems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {t('home.systems.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.systems.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* On-Grid System */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FiZap className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.systems.onGrid.title')}</h3>
              <p className="text-gray-700 mb-4">{t('home.systems.onGrid.purpose')}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.onGrid.batteries')}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.onGrid.savings')}
                </div>
              </div>
              <Link to="/services" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                {t('home.solutions.learnMore')} <FiArrowRight className="ml-2" />
              </Link>
            </div>

            {/* Hybrid System */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:scale-105">
              <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FiBattery className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.systems.hybrid.title')}</h3>
              <p className="text-gray-700 mb-4">{t('home.systems.hybrid.purpose')}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.hybrid.batteries')}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.hybrid.savings')}
                </div>
              </div>
              <Link to="/services" className="text-green-600 font-semibold hover:text-green-700 flex items-center">
                {t('home.solutions.learnMore')} <FiArrowRight className="ml-2" />
              </Link>
            </div>

            {/* Off-Grid System */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FiSun className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('home.systems.offGrid.title')}</h3>
              <p className="text-gray-700 mb-4">{t('home.systems.offGrid.purpose')}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.offGrid.batteries')}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FiCheckCircle className="text-green-600 mr-2" />
                  {t('home.systems.offGrid.savings')}
                </div>
              </div>
              <Link to="/services" className="text-purple-600 font-semibold hover:text-purple-700 flex items-center">
                {t('home.solutions.learnMore')} <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BrandSlider />
      <TestimonialsCarousel />

      <section className="section-padding bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 text-white py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/quote"
              className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
            >
              {t('home.cta.getQuote')}
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-lg"
            >
              {t('home.cta.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
