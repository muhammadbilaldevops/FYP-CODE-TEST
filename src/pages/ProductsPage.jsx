/**
 * PRODUCTS PAGE
 * 
 * Showcase of solar products and equipment.
 * 
 * Student Note: This page displays:
 * - Solar packages (pre-configured systems)
 * - Product categories (panels, inverters, batteries, accessories)
 * - Individual product specifications
 * - Quality assurance information
 * - Video section for product demonstrations
 * 
 * Key Features:
 * - Responsive grid layouts for products
 * - Product filtering and categorization
 * - Detailed product specifications
 * - Call-to-action buttons for quotes
 * 
 * Technical Concepts:
 * - Component composition (VideoSection, SafeImage)
 * - Data mapping from companyData
 * - Responsive design with Tailwind breakpoints
 * - Link navigation for internal routing
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiZap, FiBattery, FiPackage, FiCheckCircle } from 'react-icons/fi';
import { solarPackages } from '../data/companyData';
import { solarImages } from '../data/imageUrls';
import SafeImage from '../components/SafeImage';
import VideoSection from '../components/VideoSection';
import { useTranslation } from '../hooks/useTranslation';

/**
 * ProductsPage Component
 * 
 * Renders a comprehensive products page showcasing all solar equipment
 * and pre-configured packages available from the company.
 * 
 * @returns {JSX.Element} The complete products page layout
 */
const ProductsPage = () => {
  const { t } = useTranslation()
  
  // Product Categories Data
  // Student Note: Array of product categories with their details
  // Each category contains an array of products with specifications
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
      {/* Student Note: Hero section with gradient background
          - Responsive padding: adjusts based on screen size
          - Centered text for better visual hierarchy */}
      <section className="bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom section-padding text-center px-4 sm:px-6 lg:px-8">
          {/* Main heading - responsive font sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('products.title')}
          </h1>
          {/* Subtitle - responsive text size */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>
      </section>

      {/* Video Section */}
      {/* Student Note: Embedded video component for product demonstrations
          - Shows installation process or product features
          - Reusable component for consistency */}
      <VideoSection />

      {/* Solar Packages Section */}
      {/* Student Note: Pre-configured solar system packages
          - Makes it easier for customers to choose
          - Shows complete systems with all components included */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            {/* Responsive heading sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('products.packages.title')}
            </h2>
            {/* Description text */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t('products.packages.subtitle')}
            </p>
          </div>

          {/* Packages Grid */}
          {/* Student Note: Responsive grid layout
              - Mobile: 1 column (stacked)
              - Tablet: 2 columns
              - Desktop: 3 columns
              - gap-8: Spacing between cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Map through solar packages array */}
            {/* Student Note: .map() creates a card for each package
                - key={pkg.id} helps React track which item is which
                - Each card is self-contained and reusable */}
            {solarPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                
                {/* Package Image Content */}
                <div className="w-full flex-grow flex items-center justify-center bg-gray-50">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* CTA Button */}
                {/* Student Note: Link to contact page for quote request
                    - w-full: Full width button
                    - block: Makes entire area clickable
                    - Responsive padding and text size */}
                <div className="p-4 sm:p-6 border-t border-gray-100 mt-auto bg-white">
                  <Link 
                    to="/contact" 
                    className="btn-primary w-full text-center block py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    aria-label={`Get quote for ${pkg.name}`}
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
      {/* Student Note: Displays individual products by category
          - Each category has its own section
          - Alternating background colors for visual distinction
          - Products displayed in responsive grid */}
      <section className="section-padding bg-gray-50 py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            {/* Responsive heading sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('products.range.title')}
            </h2>
            {/* Description text */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t('products.range.subtitle')} 
              <br className="sm:hidden" /> {/* Line break on mobile only */}
              <span className="hidden sm:inline"> | </span>Browse through our comprehensive range of solar products available across Pakistan
            </p>
          </div>

          {/* Map through product categories */}
          {/* Student Note: categoryIndex % 2 === 0 creates alternating styles
              - Even indices: no background
              - Odd indices: white background with shadow */}
          {productCategories.map((category, categoryIndex) => (
            <div 
              key={category.id} 
              className={`mb-10 sm:mb-12 md:mb-16 ${categoryIndex % 2 === 0 ? '' : 'bg-white rounded-2xl p-6 sm:p-8 shadow-lg'}`}
            >
              {/* Category Header */}
              {/* Student Note: Flexbox layout for icon and text */}
              <div className="flex items-center mb-6 sm:mb-8 flex-col sm:flex-row">
                {/* Icon Container */}
                <div className="bg-gradient-to-br from-blue-600 to-green-600 p-3 sm:p-4 rounded-xl mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0">
                  <category.icon className="text-white w-8 h-8 sm:w-10 sm:h-10 md:text-4xl" />
                </div>
                {/* Category Title and Description */}
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>

              {/* Products Grid */}
              {/* Student Note: Responsive grid for products
                  - Mobile: 1 column
                  - Tablet: 2 columns
                  - Desktop: 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Map through products in this category */}
                {category.products.map((product, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Product Name */}
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{product.name}</h4>
                    
                    {/* Product Specifications */}
                    {/* Student Note: Conditional rendering - only shows if property exists
                        - product.efficiency && ... means "if efficiency exists, show it" */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {/* Efficiency (for panels) */}
                      {product.efficiency && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <strong className="font-semibold">Efficiency:</strong> {product.efficiency}
                        </p>
                      )}
                      {/* Type (for inverters) */}
                      {product.type && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <strong className="font-semibold">Type:</strong> {product.type}
                        </p>
                      )}
                      {/* Capacity (for batteries) */}
                      {product.capacity && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <strong className="font-semibold">Capacity:</strong> {product.capacity}
                        </p>
                      )}
                      {/* Description (for accessories) */}
                      {product.description && (
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          <strong className="font-semibold">Description:</strong> {product.description}
                        </p>
                      )}
                      {/* Warranty - always shown */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        <strong className="font-semibold">Warranty:</strong> {product.warranty}
                      </p>
                    </div>
                    
                    {/* Price/Contact Section */}
                    {/* Student Note: Border-top creates visual separation */}
                    <div className="border-t border-gray-200 pt-4">
                      {/* Link to contact page for pricing */}
                      <Link 
                        to="/contact" 
                        className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-300 inline-block"
                        aria-label={`Get price for ${product.name}`}
                      >
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

      {/* Quality Assurance Section */}
      {/* Student Note: Trust-building section with statistics
          - Shows company credibility
          - High contrast colors for visibility */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-green-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom text-center px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            {t('products.quality.title')}
          </h2>
          {/* Statistics Grid */}
          {/* Student Note: Responsive grid: 1 column on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Statistic 1: Genuine Products */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{t('products.quality.genuineProducts').split(' ')[0] || '100%'}</div>
              <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">{t('products.quality.genuineProducts')}</p>
            </div>
            {/* Statistic 2: Warranty */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">25+</div>
              <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">{t('products.quality.yearsWarranty')}</p>
            </div>
            {/* Statistic 3: Happy Customers */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">{t('products.quality.happyCustomers')}</p>
            </div>
            {/* Statistic 4: Support */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <p className="text-xs sm:text-sm md:text-base text-blue-100 leading-relaxed">{t('products.quality.supportAvailable')}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductsPage;

