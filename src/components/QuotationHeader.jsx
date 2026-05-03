/**
 * QUOTATION HEADER COMPONENT
 * 
 * Reusable header for all quotation pages
 * Includes: Logo, company name, contact info, specialization bar
 */

import React from 'react';
import CompanyLogo from './CompanyLogo';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { companyInfo } from '../data/quotationTemplates';

const QuotationHeader = () => {
  return (
    <div className="mb-6">
      {/* Header with Logo and Contact */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <CompanyLogo size={80} />
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#4A90E2' }}>
              {companyInfo.name.split(' ')[0]}
            </h1>
            <h2 className="text-2xl font-bold" style={{ color: '#4A90E2' }}>
              {companyInfo.name.split(' ').slice(1).join(' ')}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800" style={{ color: '#4A90E2' }}>
            {companyInfo.contactPerson}
          </p>
          {companyInfo.phones.map((phone, idx) => (
            <div key={idx} className="flex items-center justify-end gap-1 text-sm text-gray-600">
              {idx === 0 ? (
                <FaWhatsapp className="text-xs text-green-600" />
              ) : (
                <FiPhone className="text-xs" />
              )}
              <p>{phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Black bar with specialization */}
      <div className="bg-black text-white p-3 rounded">
        <p className="text-sm">{companyInfo.specialization}</p>
      </div>
    </div>
  );
};

export default QuotationHeader;

