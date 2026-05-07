/**
 * PRODUCTS PAGE
 * 
 * Showcase of solar products and equipment.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiZap, FiBattery, FiPackage } from 'react-icons/fi';
import { solarPackages } from '../data/companyData';
import VideoSection from '../components/VideoSection';
import { useTranslation } from '../hooks/useTranslation';
import CompanyStats from '../components/CompanyStats';

/**
 * ProductsPage Component
 * 
 * Renders a comprehensive products page showcasing all solar equipment
 * and pre-configured packages available from the company.
 */
const ProductsPage = () => {
  const { t } = useTranslation()
  
  const productCategories = [
    {
      id: 1,
      name: "Solar Panels",
      icon: FiSun,
      description: "High-efficiency monocrystalline and polycrystalline solar panels",
      products: [
        { name: "550W Monocrystalline Panel", efficiency: "21%", warranty: "25 years", price: "Contact" },
        { name: "450W Polycrystalline Panel", efficiency: "18%", warranty: "25 years", price: "Contact" },
        { name: "660W Bifacial Panel", efficiency: "22%", warranty: "30 years", price: "Contact" }
      ]
    },
    {
      id: 2,
      name: "Solar Inverters",
      icon: FiZap,
      description: "Advanced inverters for maximum efficiency and reliability",
      products: [
        { name: "5KW Hybrid Inverter", type: "Hybrid", warranty: "5 years", price: "Contact" },
        { name: "10KW On-Grid Inverter", type: "On-Grid", warranty: "5 years", price: "Contact" },
        { name: "15KW Three-Phase Inverter", type: "Commercial", warranty: "10 years", price: "Contact" }
      ]
    },
    {
      id: 3,
      name: "Solar Batteries",
      icon: FiBattery,
      description: "Deep cycle batteries for reliable energy storage",
      products: [
        { name: "200Ah Tubular Battery", capacity: "200Ah", warranty: "5 years", price: "Contact" },
        { name: "150Ah Gel Battery", capacity: "150Ah", warranty: "3 years", price: "Contact" },
        { name: "100Ah Lithium Battery", capacity: "100Ah", warranty: "10 years", price: "Contact" }
      ]
    },
    {
      id: 4,
      name: "Accessories",
      icon: FiPackage,
      description: "Complete range of mounting structures and accessories",
      products: [
        { name: "H-Beam Structure Kit", description: "Galvanized steel structure", warranty: "10 years", price: "Contact" },
        { name: "DC/AC Wiring Kit", description: "4mm copper cables", warranty: "1 year", price: "Contact" },
        { name: "Circuit Breakers", description: "Schneider protection", warranty: "2 years", price: "Contact" }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom section-padding text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('products.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Solar Packages Section */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('products.packages.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t('products.packages.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {solarPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                <div className="w-full flex-grow flex items-center justify-center bg-gray-50">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-6 border-t border-gray-100 mt-auto bg-white">
                  <Link 
                    to="/contact" 
                    className="bg-blue-600 text-white w-full text-center block py-3 sm:py-4 px-4 sm:px-6 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="section-padding bg-gray-50 py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              Browse Our Range
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Explore our comprehensive range of high-quality solar products.
            </p>
          </div>

          {productCategories.map((category, categoryIndex) => (
            <div 
              key={category.id} 
              className={`mb-10 sm:mb-12 md:mb-16 ${categoryIndex % 2 === 0 ? '' : 'bg-white rounded-2xl p-6 sm:p-8 shadow-lg'}`}
            >
              <div className="flex items-center mb-6 sm:mb-8 flex-col sm:flex-row">
                <div className="bg-gradient-to-br from-blue-600 to-green-600 p-3 sm:p-4 rounded-xl mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                  <category.icon className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {category.products.map((product, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{product.name}</h4>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {product.efficiency && <p className="text-xs sm:text-sm text-gray-600"><strong>Efficiency:</strong> {product.efficiency}</p>}
                      {product.type && <p className="text-xs sm:text-sm text-gray-600"><strong>Type:</strong> {product.type}</p>}
                      {product.capacity && <p className="text-xs sm:text-sm text-gray-600"><strong>Capacity:</strong> {product.capacity}</p>}
                      {product.description && <p className="text-xs sm:text-sm text-gray-600"><strong>Description:</strong> {product.description}</p>}
                      <p className="text-xs sm:text-sm text-gray-600"><strong>Warranty:</strong> {product.warranty}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <Link to="/contact" className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-700">
                        {product.price}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unified Statistics Section */}
      <CompanyStats />
    </div>
  );
};

export default ProductsPage;
