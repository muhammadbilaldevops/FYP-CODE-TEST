/**
 * BANK FINANCING COMPONENT
 * 
 * Displays bank financing options under SBP Green Scheme
 * Based on alphasolar.com.pk features
 */

import React from 'react';
import { FiCheckCircle, FiDollarSign, FiTrendingUp, FiShield } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const BankFinancing = () => {
  const { t } = useTranslation();
  const features = [
    t('bankFinancing.features.hassleFree'),
    t('bankFinancing.features.fastApproval'),
    t('bankFinancing.features.qualityPanels'),
    t('bankFinancing.features.systemRange'),
    t('bankFinancing.features.warranty'),
    t('bankFinancing.features.allBanks')
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container-custom">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FiDollarSign className="mr-2" />
                {t('bankFinancing.scheme')}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                {t('bankFinancing.title')}
              </h2>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t('bankFinancing.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <FiCheckCircle className="text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-900 mb-3">{t('bankFinancing.keyFeatures')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('bankFinancing.installationRange')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('bankFinancing.durablePanels')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('bankFinancing.bankPolicies')}</span>
                  </li>
                </ul>
              </div>

              <a
                href="/contact"
                className="btn-primary inline-block text-center"
              >
                {t('bankFinancing.applyButton')}
              </a>
            </div>

            {/* Right Side - Visual */}
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-6">
                  <FiShield className="text-6xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{t('bankFinancing.sbpApproved')}</h3>
                  <p className="text-blue-100">{t('bankFinancing.scheme')}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold mb-1">{t('bankFinancing.allBanks')}</div>
                    <div className="text-sm text-blue-100">{t('bankFinancing.majorBanks')}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold mb-1">5-100</div>
                    <div className="text-sm text-blue-100">{t('bankFinancing.kwSystems')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankFinancing;

