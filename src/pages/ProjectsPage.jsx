/**
 * PROJECTS PAGE
 * 
 * Showcase of completed solar installations.
 * 
 * Student Note: This page displays:
 * - Completed project gallery with filtering
 * - Project statistics and achievements
 * - Installation process steps
 * - Client success stories
 * - Project details (location, capacity, savings)
 * 
 * Key Features:
 * - Category filtering (All, Residential, Commercial, Industrial)
 * - Responsive project cards
 * - Image galleries
 * - Statistics display
 * - Process timeline
 * 
 * Technical Concepts:
 * - useState: Manages selected category filter
 * - Array filtering: Shows projects based on selected category
 * - Conditional rendering: Different styles for different categories
 * - Responsive grid layouts
 */

import React, { useState } from 'react';
import { FiMapPin, FiZap, FiCalendar, FiUser, FiCheck } from 'react-icons/fi';
import { solarImages } from '../data/imageUrls';
import SafeImage from '../components/SafeImage';
import { useTranslation } from '../hooks/useTranslation';

/**
 * ProjectsPage Component
 * 
 * Renders a gallery of completed solar projects with filtering capabilities
 * and detailed project information.
 * 
 * @returns {JSX.Element} The complete projects page layout
 */
const ProjectsPage = () => {
  const { t } = useTranslation()
  
  // State to track selected category filter
  // Student Note: 'all' shows all projects, others filter by category
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Project Categories for Filtering
  // Student Note: Array of filter options
  // - nameKey: Translation key for multilingual support
  const categories = [
    { id: 'all', nameKey: 'projects.categories.all' },
    { id: 'residential', nameKey: 'projects.categories.residential' },
    { id: 'commercial', nameKey: 'projects.categories.commercial' },
    { id: 'industrial', nameKey: 'projects.categories.industrial' }
  ];

  // Completed Projects Data
  // Student Note: Array of project objects with all details
  // Each project has: id, title, category, location, capacity, type, etc.
  const projects = [
    {
      id: 1,
      title: "15KW Hybrid System - Bahria Town",
      category: "residential",
      location: "Bahria Town, Rawalpindi",
      capacity: "15 KW",
      type: "Hybrid System",
      completionDate: "November 2024",
      savings: "65% Bill Reduction",
      description: "Complete hybrid solar solution with battery backup for a large residential property.",
      image: solarImages.projects.c1,
      features: ["18 Solar Panels (550W each)", "15KW Hybrid Inverter", "Battery Storage", "Net Metering Approved"]
    },
    {
      id: 2,
      title: "20KW On-Grid System - Commercial Plaza",
      category: "commercial",
      location: "Chaklala Scheme III, Rawalpindi",
      capacity: "20 KW",
      type: "On-Grid System",
      completionDate: "October 2024",
      savings: "Zero Electricity Bills",
      description: "On-grid solar system for a busy commercial plaza with net metering.",
      image: solarImages.projects.c2,
      features: ["36 Solar Panels (550W each)", "20KW Growatt Inverter", "Net Metering", "H-Beam Structure"]
    },
    {
      id: 3,
      title: "10KW Hybrid System - DHA Phase 2",
      category: "residential",
      location: "DHA Phase 2, Islamabad",
      capacity: "10 KW",
      type: "Hybrid System",
      completionDate: "September 2024",
      savings: "70% Bill Reduction",
      description: "Hybrid system with backup for uninterrupted power supply.",
      image: solarImages.projects.c3,
      features: ["18 Solar Panels", "10KW Inverter", "Battery Backup", "24/7 Power"]
    },
    {
      id: 4,
      title: "30KW On-Grid - Manufacturing Unit",
      category: "industrial",
      location: "I-9 Industrial Area, Islamabad",
      capacity: "30 KW",
      type: "On-Grid System",
      completionDate: "August 2024",
      savings: "85% Cost Reduction",
      description: "Large-scale solar installation for manufacturing facility.",
      image: solarImages.projects.c4,
      features: ["54 Solar Panels", "30KW Inverter", "Industrial Grade", "WAPDA Approved"]
    },
    {
      id: 5,
      title: "5KW On-Grid System - Residential",
      category: "residential",
      location: "Gulzar-e-Quaid, Rawalpindi",
      capacity: "5 KW",
      type: "On-Grid System",
      completionDate: "July 2024",
      savings: "90% Bill Reduction",
      description: "Compact on-grid system for medium-sized home.",
      image: solarImages.projects.c5,
      features: ["10 Solar Panels", "5KW Inverter", "Net Metering", "Quick Installation"]
    },
    {
      id: 6,
      title: "12KW Hybrid - Retail Store",
      category: "commercial",
      location: "Blue Area, Islamabad",
      capacity: "12 KW",
      type: "Hybrid System",
      completionDate: "June 2024",
      savings: "60% Bill Reduction",
      description: "Hybrid system for retail store ensuring no downtime during load shedding.",
      image: solarImages.projects.c6,
      features: ["22 Solar Panels", "12KW Inverter", "Battery Backup", "Business Continuity"]
    }
  ];

  // Company Statistics
  // Student Note: Achievement statistics displayed prominently
  const stats = [
    { labelKey: "projects.stats.completed", value: "500+", icon: FiCheck },
    { labelKey: "projects.stats.clients", value: "450+", icon: FiUser },
    { labelKey: "projects.stats.capacity", value: "5 MW+", icon: FiZap },
    { labelKey: "projects.stats.experience", value: "8+", icon: FiCalendar }
  ];

  // Filter Projects Based on Selected Category
  // Student Note: Ternary operator and array.filter()
  // - If 'all' selected: return all projects
  // - Otherwise: filter projects where category matches selectedCategory
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Student Note: Hero section with gradient background
          - Responsive padding: adjusts based on screen size
          - Centered text for better visual hierarchy */}
      <section className="bg-gradient-to-br from-green-900 via-blue-900 to-green-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom section-padding text-center px-4 sm:px-6 lg:px-8">
          {/* Main heading - responsive font sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('projects.title')}
          </h1>
          {/* Subtitle - responsive text size */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      {/* Student Note: Company achievements displayed in grid
          - Builds trust and credibility
          - Responsive grid layout */}
      <section className="section-padding bg-white py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Statistics Grid */}
          {/* Student Note: Responsive grid
              - Mobile: 2 columns
              - Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Map through stats array */}
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                {/* Icon Container */}
                {/* Student Note: Circular icon with gradient background */}
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full mb-3 sm:mb-4">
                  <stat.icon className="text-white w-6 h-6 sm:w-7 sm:h-7 md:text-3xl" />
                </div>
                {/* Statistic Value - large, bold number */}
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                {/* Statistic Label - translated text */}
                <div className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      {/* Student Note: Main content section with project cards
          - Category filtering functionality
          - Responsive grid layout
          - Hover effects for interactivity */}
      <section className="section-padding bg-gray-50 py-12 sm:py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Section Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
              {t('projects.completed')}
            </h2>
            {/* Section Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              {t('projects.browse')}
            </p>

            {/* Category Filter Buttons */}
            {/* Student Note: Filter buttons to show different project categories
                - selectedCategory state controls which projects are shown
                - onClick updates the selectedCategory state
                - Conditional styling shows active state */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 min-h-[44px] ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label={`Filter projects by ${t(category.nameKey)}`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {t(category.nameKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {/* Student Note: Responsive grid layout
              - Mobile: 1 column (stacked)
              - Tablet: 2 columns
              - Desktop: 3 columns
              - gap-8: Spacing between cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Map through filtered projects */}
            {/* Student Note: filteredProjects contains only projects matching selected category
                - Each project is rendered as a card
                - Hover effects provide visual feedback */}
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Project Image */}
                {/* Student Note: Image container with overlay badge */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  {/* Project Image */}
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  {/* Capacity Badge - Overlay on image */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                    {project.capacity}
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-5 sm:p-6">
                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 leading-tight">
                    {project.title}
                  </h3>
                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
                  
                  {/* Project Details */}
                  {/* Student Note: Icon + text layout for project information */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {/* Location */}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <FiMapPin className="mr-2 text-blue-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="leading-relaxed">{project.location}</span>
                    </div>
                    {/* System Type */}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <FiZap className="mr-2 text-green-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="leading-relaxed">{project.type}</span>
                    </div>
                    {/* Completion Date */}
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <FiCalendar className="mr-2 text-purple-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="leading-relaxed">{project.completionDate}</span>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  {/* Student Note: Prominent display of savings achieved */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <p className="text-green-700 font-semibold text-center text-sm sm:text-base">
                      {project.savings}
                    </p>
                  </div>

                  {/* Key Features */}
                  {/* Student Note: Border-top creates visual separation */}
                  <div className="border-t border-gray-200 pt-4 sm:pt-5">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-3">{t('projects.keyFeatures')}:</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {/* Map through features array */}
                      {project.features.map((feature, index) => (
                        <li key={index} className="text-xs sm:text-sm text-gray-600 flex items-start leading-relaxed">
                          {/* Checkmark icon */}
                          <span className="text-green-500 mr-2 text-base sm:text-lg flex-shrink-0">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process Section */}
      {/* Student Note: Step-by-step process explanation
          - Builds trust by showing transparency
          - Helps customers understand what to expect */}
      <section className="section-padding bg-gradient-to-br from-blue-900 to-green-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Section Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('projects.process.title')}
            </h2>
            {/* Section Description */}
            <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
              {t('projects.process.subtitle')}
            </p>
          </div>

          {/* Process Steps Grid */}
          {/* Student Note: Responsive grid for process steps
              - Mobile: 1 column
              - Tablet: 2 columns
              - Desktop: 5 columns (all steps visible) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Process Steps Array */}
            {/* Student Note: Array of process steps with translation keys
                - Each step has a number, title, and description */}
            {[
              { step: "1", titleKey: "projects.process.steps.survey.title", descKey: "projects.process.steps.survey.desc" },
              { step: "2", titleKey: "projects.process.steps.proposal.title", descKey: "projects.process.steps.proposal.desc" },
              { step: "3", titleKey: "projects.process.steps.installation.title", descKey: "projects.process.steps.installation.desc" },
              { step: "4", titleKey: "projects.process.steps.testing.title", descKey: "projects.process.steps.testing.desc" },
              { step: "5", titleKey: "projects.process.steps.netMetering.title", descKey: "projects.process.steps.netMetering.desc" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                {/* Step Number Circle */}
                {/* Student Note: Circular badge with step number
                    - bg-opacity-20: Semi-transparent white background */}
                <div className="bg-white bg-opacity-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto mb-3 sm:mb-4">
                  {item.step}
                </div>
                {/* Step Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">{t(item.titleKey)}</h3>
                {/* Step Description */}
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action (CTA) Section */}
      {/* Student Note: Encourages user engagement
          - Bilingual text for Pakistani market
          - Multiple CTA buttons for different actions */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container-custom text-center px-4 sm:px-6 lg:px-8">
          {/* CTA Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Humare Success Stories Ka Hissa Banein? | Ready to Join Our Success Stories?
          </h2>
          {/* CTA Description */}
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Humare agle satisfied customer banein. Aaj hi free consultation lein! 
            <br className="sm:hidden" /> {/* Line break on mobile only */}
            <span className="hidden sm:inline"> | </span>Be our next satisfied customer. Get a free consultation today!
          </p>
          {/* CTA Buttons */}
          {/* Student Note: Responsive button layout
              - Mobile: Stacked vertically
              - Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {/* Primary CTA Button */}
            <a 
              href="/quote" 
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100 py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              aria-label="Get free quote"
            >
              Get Free Quote
            </a>
            {/* Secondary CTA Button */}
            <a 
              href="/contact" 
              className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              aria-label="Contact us"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
