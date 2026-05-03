/**
 * COMPANY LOGO COMPONENT
 * 
 * Logo matching the company's original design:
 * - House with solar panel on roof
 * - Orange sun
 * - Green leaf
 * - Blue solar panel grid
 * - All in circular design
 */

import React from 'react';

const CompanyLogo = ({ size = 80, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        {/* Outer circle background */}
        <circle cx="50" cy="50" r="48" fill="#4A90E2" stroke="#2D2D2D" strokeWidth="2" />
        
        {/* Green leaf */}
        <ellipse cx="70" cy="30" rx="12" ry="18" fill="#22C55E" transform="rotate(-30 70 30)" />
        
        {/* Orange sun */}
        <circle cx="25" cy="25" r="8" fill="#F97316" />
        {/* Sun rays */}
        <line x1="25" y1="15" x2="25" y2="10" stroke="#F97316" strokeWidth="2" />
        <line x1="25" y1="35" x2="25" y2="40" stroke="#F97316" strokeWidth="2" />
        <line x1="15" y1="25" x2="10" y2="25" stroke="#F97316" strokeWidth="2" />
        <line x1="35" y1="25" x2="40" y2="25" stroke="#F97316" strokeWidth="2" />
        <line x1="18" y1="18" x2="15" y2="15" stroke="#F97316" strokeWidth="2" />
        <line x1="32" y1="32" x2="35" y2="35" stroke="#F97316" strokeWidth="2" />
        <line x1="32" y1="18" x2="35" y2="15" stroke="#F97316" strokeWidth="2" />
        <line x1="18" y1="32" x2="15" y2="35" stroke="#F97316" strokeWidth="2" />
        
        {/* House */}
        <rect x="35" y="50" width="30" height="25" fill="#F3F4F6" stroke="#2D2D2D" strokeWidth="1" />
        {/* Roof */}
        <polygon points="35,50 50,38 65,50" fill="#8B5CF6" stroke="#2D2D2D" strokeWidth="1" />
        
        {/* Solar panel on roof */}
        <rect x="40" y="42" width="20" height="8" fill="#1E40AF" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* Solar panel grid lines */}
        <line x1="45" y1="42" x2="45" y2="50" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="50" y1="42" x2="50" y2="50" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="55" y1="42" x2="55" y2="50" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="40" y1="46" x2="60" y2="46" stroke="#2D2D2D" strokeWidth="0.5" />
        
        {/* Door */}
        <rect x="45" y="60" width="10" height="15" fill="#2D2D2D" />
        
        {/* Windows */}
        <rect x="38" y="55" width="5" height="5" fill="#60A5FA" />
        <rect x="57" y="55" width="5" height="5" fill="#60A5FA" />
      </svg>
    </div>
  );
};

export default CompanyLogo;

