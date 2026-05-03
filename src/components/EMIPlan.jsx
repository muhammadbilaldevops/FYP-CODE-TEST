/**
 * EMI PLAN COMPONENT
 * 
 * Easy monthly installment plan with 0% markup
 * Based on alphasolar.com.pk features
 */

import React, { useState } from 'react';
import { FiCheckCircle, FiPercent, FiCalendar, FiDollarSign, FiZap } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const EMIPlan = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    product: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('EMI Plan application submitted! We will contact you soon.');
  };

  const features = [
    'emi.features.zeroMarkup',
    'emi.features.flexibleTerms',
    'emi.features.upTo20KW',
    'emi.features.allTypes',
    'emi.features.fiftyPercent',
    'emi.features.noBank'
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container-custom">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FiPercent className="mr-2" />
                {t('emi.subtitle')}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('emi.title')}
              </h2>
              
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                {t('emi.description')}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((featureKey, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <FiCheckCircle className="mr-2 flex-shrink-0" />
                    <span>{t(featureKey)}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t('emi.form.name')}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t('emi.form.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder={t('emi.form.phone')}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={t('emi.form.address')}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('emi.form.city')}
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder={t('emi.form.province')}
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                    className="px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <select
                    required
                    value={formData.product}
                    onChange={(e) => setFormData({...formData, product: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:border-white"
                  >
                    <option value="">{t('emi.form.selectProduct')}</option>
                    <option value="hybrid">{t('emi.form.products.hybrid')}</option>
                    <option value="on-grid">{t('emi.form.products.onGrid')}</option>
                    <option value="water-pump">{t('emi.form.products.waterPump')}</option>
                    <option value="street-lights">{t('emi.form.products.streetLights')}</option>
                    <option value="hot-water">{t('emi.form.products.hotWater')}</option>
                    <option value="industrial">{t('emi.form.products.industrial')}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  {t('emi.apply')}
                </button>
              </form>
            </div>

            {/* Right Side - Benefits */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full mb-4">
                  <FiDollarSign className="text-white text-4xl" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {t('emi.whyChoose.title')}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FiPercent className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('emi.whyChoose.zeroMarkup.title')}</h4>
                    <p className="text-gray-600">{t('emi.whyChoose.zeroMarkup.description')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <FiCalendar className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('emi.whyChoose.flexible.title')}</h4>
                    <p className="text-gray-600">{t('emi.whyChoose.flexible.description')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FiZap className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('emi.whyChoose.upTo20KW.title')}</h4>
                    <p className="text-gray-600">{t('emi.whyChoose.upTo20KW.description')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FiCheckCircle className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('emi.whyChoose.allTypes.title')}</h4>
                    <p className="text-gray-600">{t('emi.whyChoose.allTypes.description')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-2">50%</div>
                <p className="text-blue-100">{t('emi.downPayment')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMIPlan;

