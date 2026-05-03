/**
 * TESTIMONIALS CAROUSEL COMPONENT
 * 
 * Interactive carousel for client testimonials
 * Auto-plays with manual navigation
 */

import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar, FiMessageSquare } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const TestimonialsCarousel = () => {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      location: "Bahria Town, Rawalpindi",
      systemSize: "15KW Hybrid",
      rating: 5,
      comment: "Al-Muslim Engineering ka kaam bohat zabardast hai! Unhon ne consultation se net metering approval tak sab kuch handle kiya. Mera bijli ka bill 65% kam ho gaya. Bilkul recommend karta hoon!",
      commentEnglish: "Excellent service from Al-Muslim Engineering! They handled everything from consultation to net metering approval. My electricity bill has reduced by 65%. Highly recommended!",
      company: "Residential Customer",
      projectImage: "/res 2.jpeg",
      projectImageAlt: "Residential solar installation in Bahria Town"
    },
    {
      id: 2,
      name: "Fatima Khan",
      location: "DHA Phase 2, Islamabad",
      systemSize: "10KW Hybrid",
      rating: 5,
      comment: "Bohat professional team hai. Installation sirf 5 din mein complete ho gayi. Hybrid system load shedding mein bilkul perfect kaam karta hai. Har paisa wasool!",
      commentEnglish: "Very professional team. Installation was completed in just 5 days. The hybrid system works perfectly during load shedding. Worth every penny!",
      company: "Residential Customer",
      projectImage: "/res 3.jpeg",
      projectImageAlt: "Solar panels on residential roof in DHA"
    },
    {
      id: 3,
      name: "Muhammad Bilal",
      location: "Chaklala Scheme III, Rawalpindi",
      systemSize: "20KW On-Grid",
      rating: 5,
      comment: "Mere commercial plaza ke liye behtareen decision tha. Ab net metering se bijli ka bill bilkul zero hai. Team bohat cooperative aur knowledgeable thi.",
      commentEnglish: "Best decision for my commercial plaza. Zero electricity bills now with net metering. The team was very cooperative and knowledgeable.",
      company: "Commercial Customer",
      projectImage: "/res 4.webp",
      projectImageAlt: "Commercial solar installation on plaza"
    },
    {
      id: 4,
      name: "Zainab Malik",
      location: "Gulzar-e-Quaid, Rawalpindi",
      systemSize: "5KW On-Grid",
      rating: 5,
      comment: "Bohat acha experience raha! Team ne sab kuch clearly explain kiya aur time pe installation complete ki. Mera monthly bill 25,000 se sirf 2,500 ho gaya!",
      commentEnglish: "Great experience! The team explained everything clearly and completed installation on time. My monthly bill dropped from 25,000 to just 2,500!",
      company: "Residential Customer",
      projectImage: "/res 5.webp",
      projectImageAlt: "Small residential solar system installation"
    },
    {
      id: 5,
      name: "Imran Industries",
      location: "I-9 Industrial Area, Islamabad",
      systemSize: "30KW On-Grid",
      rating: 5,
      comment: "Hamare manufacturing unit ki solar installation par zabardast kaam kiya. Professional approach aur excellent after-sales support. Hamare operational costs mein bohat kami aayi.",
      commentEnglish: "Outstanding work on our manufacturing unit's solar installation. Professional approach and excellent after-sales support. Reduced our operational costs significantly.",
      company: "Industrial Customer",
      projectImage: "/res 6.jpeg",
      projectImageAlt: "Industrial solar installation on factory roof"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {language === 'ur' ? 'ہمارے کلائنٹس کیا کہتے ہیں؟' : 'What Our Clients Say'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'ur' ? 'اصلی کسٹمرز کی اصلی فیڈ بیک - جو ہم سے سولر لگوائے ہیں۔' : 'Real feedback from real customers who have gone solar with us'}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Project Image Section */}
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <img
                  src={testimonials[currentIndex].projectImage}
                  alt={testimonials[currentIndex].projectImageAlt}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = '/res 2.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-900">{testimonials[currentIndex].systemSize}</p>
                    <p className="text-xs text-gray-600">{testimonials[currentIndex].location}</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Content Section */}
              <div className="p-8 md:p-12 relative">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-blue-100">
                  <FiMessageSquare className="text-6xl" />
                </div>

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-500 fill-current text-xl" />
                    ))}
                  </div>

                  {/* Comment - Show based on language */}
                  <p className="text-lg md:text-xl text-gray-800 mb-6 text-center leading-relaxed font-medium">
                    "{language === 'ur' ? testimonials[currentIndex].comment : testimonials[currentIndex].commentEnglish}"
                  </p>

                  {/* Author Info */}
                  <div className="text-center border-t pt-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600 mb-2 font-medium">
                      {language === 'ur' 
                        ? (testimonials[currentIndex].company === 'Residential Customer' ? t('testimonials.residentialCustomer')
                           : testimonials[currentIndex].company === 'Commercial Customer' ? t('testimonials.commercialCustomer')
                           : t('testimonials.industrialCustomer'))
                        : testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Mobile Responsive */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 bg-white shadow-lg text-gray-700 p-2 sm:p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 z-20"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="text-xl sm:text-2xl" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 bg-white shadow-lg text-gray-700 p-2 sm:p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 z-20"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="text-xl sm:text-2xl" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;

