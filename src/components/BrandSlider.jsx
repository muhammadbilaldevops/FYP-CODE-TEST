/**
 * BRAND SLIDER COMPONENT
 * 
 * Displays trusted solar panel and inverter brands in a slider format
 * Shows company logos and names in a carousel
 */

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiAward } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const BrandSlider = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [logoErrors, setLogoErrors] = useState({});
  const [logoSources, setLogoSources] = useState({});

  // Suppress console errors for expected image loading failures
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Intercept console errors and suppress expected image 404 errors
    console.error = (...args) => {
      const message = args.join(' ');
      // Suppress 404 errors for image loading (expected failures)
      if (message.includes('404') && (message.includes('simpleicons.org') || message.includes('clearbit.com') || message.includes('favicon.ico'))) {
        return; // Silently ignore expected 404 errors
      }
      originalError.apply(console, args);
    };
    
    // Intercept console warnings for image loading
    console.warn = (...args) => {
      const message = args.join(' ');
      // Suppress tracking prevention warnings for logo services
      if (message.includes('Tracking Prevention') && (message.includes('clearbit.com') || message.includes('simpleicons.org'))) {
        return; // Silently ignore expected tracking prevention warnings
      }
      originalWarn.apply(console, args);
    };
    
    // Restore original console methods on cleanup
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Popular solar and inverter brands in Pakistan with locally served high-quality logos
  // Served locally to bypass browser tracking prevention blockers that were blocking 3rd-party logo providers
  const brands = [
    // Solar Panel Brands
    { name: 'Huawei', category: 'Solar Panel', file: 'huawei.png' },
    { name: 'LG', category: 'Solar Panel', file: 'lg.png' },
    { name: 'Panasonic', category: 'Solar Panel', file: 'panasonic.png' },
    { name: 'SunPower', category: 'Solar Panel', file: 'sunpower.png' },
    { name: 'First Solar', category: 'Solar Panel', file: 'first_solar.svg' },
    { name: 'Canadian Solar', category: 'Solar Panel', file: 'canadian_solar.png' },
    { name: 'Trina Solar', category: 'Solar Panel', file: 'trina_solar.svg' },
    // Inverter Brands
    { name: 'SMA', category: 'Inverter', file: 'sma.png' },
    { name: 'Fronius', category: 'Inverter', file: 'fronius.png' },
    { name: 'ABB', category: 'Inverter', file: 'abb.png' },
    { name: 'Sungrow', category: 'Inverter', file: 'sungrow.png' },
    { name: 'Growatt', category: 'Inverter', file: 'growatt.svg' },
    // Battery Brands
    { name: 'Exide', category: 'Battery', file: 'exide.png' },
    { name: 'Enphase', category: 'Battery', file: 'enphase.png' }
  ];

  const itemsPerSlide = 7; // Show 7 brands per slide to get exactly 2 slides (14 brands / 7 = 2)
  const totalSlides = Math.ceil(brands.length / itemsPerSlide);

  // Track which logos completely fail
  useEffect(() => {
    // Reset errors when brands change
    setLogoErrors({});
  }, [totalSlides, itemsPerSlide]);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const getCurrentBrands = () => {
    const start = currentIndex * itemsPerSlide;
    return brands.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="section-padding bg-gray-50" data-animate id="brands">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('brands.title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('brands.subtitle')}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Previous Button - Mobile Responsive */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 -ml-2 sm:-ml-4"
            aria-label="Previous brands"
          >
            <FiChevronLeft className="text-xl sm:text-2xl text-blue-600" />
          </button>

          {/* Slider - Mobile Responsive */}
          <div className="overflow-hidden mx-8 sm:mx-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6 px-2"
                >
                  {brands
                    .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                    .map((brand, index) => (
                      <div
                        key={`${slideIndex}-${index}`}
                        className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex flex-col items-center justify-center min-h-[150px] sm:min-h-[180px]"
                      >
                        <div className="text-center w-full">
                          {/* Brand Logo - Enhanced with sequential URL trying */}
                          <div className="mb-3 h-16 flex items-center justify-center">
                            {(() => {
                              const key = `${slideIndex}-${index}`;
                              const currentUrl = `/brands/${brand.file}`;
                              
                              if (logoErrors[key]) {
                                // Show text-based logo as final fallback
                                return (
                                  <div className="w-full h-16 flex items-center justify-center">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                                      <span className="text-white font-bold text-lg sm:text-xl">
                                        {brand.name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <img
                                  key={key}
                                  src={currentUrl}
                                  alt={`${brand.name} ${brand.category} logo`}
                                  className="h-12 sm:h-14 md:h-16 w-auto max-w-[120px] mx-auto object-contain filter drop-shadow-sm transition-all duration-300"
                                  onError={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Image is entirely missing from local assets
                                    setLogoErrors(prev => ({ ...prev, [key]: true }));
                                  }}
                                  onLoad={() => {
                                    if (logoErrors[key]) {
                                      setLogoErrors(prev => {
                                        const newErrors = { ...prev };
                                        delete newErrors[key];
                                        return newErrors;
                                      });
                                    }
                                  }}
                                  loading="lazy"
                                />
                              );
                            })()}
                          </div>
                          <p className="font-semibold text-gray-900 text-sm md:text-base">{brand.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{brand.category}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Next Button - Mobile Responsive */}
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 -mr-2 sm:-mr-4"
            aria-label="Next brands"
          >
            <FiChevronRight className="text-xl sm:text-2xl text-blue-600" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;

