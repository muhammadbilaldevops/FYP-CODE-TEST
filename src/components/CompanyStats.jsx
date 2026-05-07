/**
 * COMPANY STATISTICS COMPONENT
 * 
 * A reusable, high-performance statistics section for the entire website.
 * Features an animated counter on a professional dark gradient background.
 * 
 * Student Note: Centralizing statistics ensures data consistency across the app.
 * If the number of projects or years increases, you only change it here.
 */

import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import { useTranslation } from '../hooks/useTranslation';

/**
 * CompanyStats Component
 * 
 * Displays the same core business metrics everywhere it's used.
 * - Uses AnimatedCounter for "wow" effect when scrolling
 * - Uses responsive grid (1, 2, or 4 columns)
 * - Professional Pakistan-Solar focused gradient
 */
const CompanyStats = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-gradient-to-r from-blue-900 via-green-800 to-blue-900 text-white py-12 sm:py-16 md:py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Satisfied Clients */}
          <div className="flex justify-center">
            <AnimatedCounter 
              end={1500} 
              suffix="+" 
              label={t('about.stats.clients')} 
            />
          </div>
          
          {/* Total Capacity */}
          <div className="flex justify-center">
            <AnimatedCounter 
              end={200} 
              suffix="MW+" 
              label={t('about.stats.capacity')} 
            />
          </div>
          
          {/* Systems Installed */}
          <div className="flex justify-center">
            <AnimatedCounter 
              end={500} 
              suffix="+" 
              label={t('home.stats.systemsInstalled')} 
            />
          </div>
          
          {/* Years of Experience */}
          <div className="flex justify-center">
            <AnimatedCounter 
              end={13} 
              suffix="+" 
              label={`${t('home.stats.experience')} Years`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;
