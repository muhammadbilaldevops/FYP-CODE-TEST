/**
 * COMPANY DATA CONFIGURATION
 * 
 * This file contains all company information, solar system specifications,
 * pricing data, and other business details for Al-Muslim Engineering.
 * Data extracted from the proposal documents and images.
 */

// ==================== COMPANY INFORMATION ====================
export const companyInfo = {
  name: "Al Muslim Engineering",
  tagline: "LET SUNLIGHT ENLIGHTEN YOUR LIVES",
  slogan: "Specialist in Service - Complete Solar Energy Solutions",
  
  // Company Vision
  vision: {
    statement: "Our Vision is to provide best energy consultancy with wide range of top-quality products in the most affordable prices abiding by the following characteristics:",
    values: [
      {
        title: "Commitment",
        description: "Dedicated to delivering excellence in every project",
        icon: "commitment"
      },
      {
        title: "Reliability", 
        description: "Consistent and dependable solar solutions",
        icon: "reliability"
      },
      {
        title: "Integrity",
        description: "Honest and transparent business practices",
        icon: "integrity"
      },
      {
        title: "Honesty",
        description: "Truthful communication with all stakeholders",
        icon: "honesty"
      }
    ],
    mission: "Solar energy solutions focus on energizing everything under the sun – one light bulb, one household, one neighborhood at a time"
  },

  // Contact Information
  contact: {
    address: "Muneeb Plaza, Opp Adyala Electronics, Ch Bostan Khan Road, Chaklala Scheme III, Rawalpindi",
    phones: [
      { number: "0346-51 88 458", label: "Muhammad Saeed", primary: true },
      { number: "0314-51 88 458", label: "Sales", primary: false },
      { number: "0333-51 88 458", label: "Customer Service", primary: false }
    ],
    email: "info@almuslimengineering.com",
    supportEmail: "support@almuslimengineering.com",
    salesEmail: "sales@almuslimengineering.com",
    website: "www.almuslimengineering.com",
    
    // Business Hours
    businessHours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
      saturday: "Saturday: 10:00 AM - 4:00 PM",
      sunday: "Sunday: Closed",
      emergency: "24/7 Emergency Support for Existing Customers"
    },
    
    // Social Media
    social: {
      facebook: "https://facebook.com/almuslimengineering",
      instagram: "https://instagram.com/almuslimengineering",
      linkedin: "https://linkedin.com/company/almuslimengineering",
      twitter: "https://twitter.com/almuslimeng"
    }
  },

  // Company Specializations
  specialization: "We are specialized in Sun powered energy solutions which include Solar Energy designing, solar panel, Solar Inverter installation and customer support service for Complete Solar Energy Solution."
};

// ==================== SOLAR SYSTEM DESCRIPTIONS ====================
export const solarSystems = {
  onGrid: {
    name: "On-Grid System",
    title: "On-Grid Solar System",
    purpose: "To sell units to WAPDA and reduce bill to zero.",
    batteries: "Not Required",
    dayTimeOperation: "Sell Units to WAPDA, Shuts down when WAPDA is not available",
    nightTimeOperation: "Remains Shut down",
    benefits: [
      "Zero electricity bills",
      "Sell excess power to WAPDA",
      "No battery maintenance costs",
      "Lower initial investment",
      "Net metering benefits"
    ],
    bestFor: "Residential and commercial properties with stable grid connection",
    savingsPotential: "Up to 100% bill reduction"
  },
  
  hybrid: {
    name: "Hybrid System",
    title: "Hybrid Solar System",
    purpose: "To provide backup and sell units to WAPDA as well hence reducing bill by 60-70%",
    batteries: "Required",
    dayTimeOperation: "Sell Units to WAPDA, Provide backup by sharing load with batteries",
    nightTimeOperation: "Provide Backup only",
    benefits: [
      "60-70% bill reduction",
      "Backup power during outages",
      "Sell excess to WAPDA",
      "Energy independence",
      "Optimal energy utilization"
    ],
    bestFor: "Areas with frequent power outages",
    savingsPotential: "60-70% bill reduction"
  },
  
  offGrid: {
    name: "Off-Grid System",
    title: "Off-Grid Solar System",
    purpose: "To provide Backup",
    batteries: "Required",
    dayTimeOperation: "Do Not Sell Units, Provide backup by sharing load with batteries",
    nightTimeOperation: "Provide Backup only",
    benefits: [
      "Complete energy independence",
      "No grid dependency",
      "Ideal for remote locations",
      "24/7 power availability",
      "No electricity bills"
    ],
    bestFor: "Remote areas without grid access",
    savingsPotential: "100% independence from grid"
  }
};

// ==================== ENERGY PRODUCTION DATA ====================
export const energyProduction = {
  monthly: [
    { srNo: 1, month: "Jan", "5KW": 477.40, "10KW": 954.80, "15KW": 1432.20, "20KW": 1909.60 },
    { srNo: 2, month: "Feb", "5KW": 477.40, "10KW": 954.80, "15KW": 1432.20, "20KW": 1909.60 },
    { srNo: 3, month: "Mar", "5KW": 643.50, "10KW": 1287.00, "15KW": 1930.50, "20KW": 2574.00 },
    { srNo: 4, month: "Apr", "5KW": 784.30, "10KW": 1568.60, "15KW": 2352.90, "20KW": 3137.20 },
    { srNo: 5, month: "May", "5KW": 792.00, "10KW": 1584.00, "15KW": 2376.00, "20KW": 3168.00 },
    { srNo: 6, month: "Jun", "5KW": 841.50, "10KW": 1683.00, "15KW": 2524.50, "20KW": 3366.00 },
    { srNo: 7, month: "Jul", "5KW": 835.45, "10KW": 1670.90, "15KW": 2506.35, "20KW": 3341.80 },
    { srNo: 8, month: "Aug", "5KW": 818.40, "10KW": 1636.80, "15KW": 2455.20, "20KW": 3273.60 },
    { srNo: 9, month: "Sep", "5KW": 726.00, "10KW": 1452.00, "15KW": 2178.00, "20KW": 2904.00 },
    { srNo: 10, month: "Oct", "5KW": 716.10, "10KW": 1432.20, "15KW": 2148.30, "20KW": 2864.40 },
    { srNo: 11, month: "Nov", "5KW": 577.50, "10KW": 1155.00, "15KW": 1732.50, "20KW": 2310.00 },
    { srNo: 12, month: "Dec", "5KW": 443.30, "10KW": 886.60, "15KW": 1329.90, "20KW": 1773.20 }
  ],
  yearly: {
    "5KW": 8132.85,
    "10KW": 16265.7,
    "15KW": 24398.6,
    "20KW": 32531.4
  }
};

// ==================== PRODUCT SPECIFICATIONS ====================
export const products = {
  wire: {
    name: "Wiring",
    description: "Copper DC wire 4mm, Copper AC Wire 4mm",
    specifications: ["4mm DC Copper Wire", "4mm AC Copper Wire", "High quality insulation"]
  },
  structure: {
    name: "Mounting Structure",
    description: "H-beam structure",
    specifications: ["H-beam design", "Weather resistant", "Long-lasting durability", "Easy installation"]
  },
  nutBolt: {
    name: "Fasteners",
    description: "Galvanized Nut bolt",
    specifications: ["Galvanized coating", "Rust resistant", "High tensile strength"]
  },
  anchors: {
    name: "Anchors",
    description: "Spit/Index Seepage free",
    specifications: ["Seepage free design", "Strong foundation", "Weather proof"]
  },
  breakers: {
    name: "Circuit Breakers",
    description: "Schneider",
    brand: "Schneider",
    specifications: ["Schneider brand", "Safety certified", "Overload protection", "Quick response"]
  },
  pvcAccessories: {
    name: "PVC Accessories",
    description: "Any Available",
    specifications: ["Conduit pipes", "Junction boxes", "Cable protection"]
  },
  duct: {
    name: "Cable Duct",
    description: "Any Available",
    specifications: ["Cable management", "Protection system", "Professional installation"]
  }
};

// ==================== TERMS & CONDITIONS ====================
export const termsAndConditions = {
  priceValidity: {
    title: "Price Validity",
    description: "2 days from issuance of this proposal. The product prices are linked with USD-PKR Parity."
  },
  
  paymentTerms: {
    title: "Payment Terms",
    advance: { percentage: 70, description: "70% advance payment required" },
    installation: { percentage: 25, description: "25% upon complete installation" },
    netMetering: { percentage: 5, description: "5% after net metering completion" }
  },
  
  deliveryTime: {
    title: "Delivery Time",
    duration: "Within 2 Days - 2 Weeks",
    description: "Delivery timeframe depends on system size and equipment availability"
  },
  
  operationMaintenance: {
    title: "Operation & Maintenance",
    terms: [
      "Cost of civil work (if required) will be charged Separately",
      "Client will be provided with the basic level maintenance manuals",
      "Address the issue online",
      "Visit the site (if required)",
      "Find the cause of Fault"
    ]
  },
  
  netMeteringRequirements: {
    title: "Net Metering Documents Required",
    documents: [
      "Electric Bill",
      "CNIC Copy",
      "Extension of Load",
      "Allotment Letter / Registry",
      "Completion Certificate (For Bahria Housing Society)"
    ]
  },
  
  projectTimeline: {
    title: "Project Timeline",
    phases: [
      { ser: 1, task: "Signing of The Project", duration: "Day 0" },
      { ser: 2, task: "Start of The Delivery", duration: "Within 2 days" },
      { ser: 3, task: "Starting Installation", duration: "7 days after delivery" },
      { ser: 4, task: "Installation Completion", duration: "3-7 days" },
      { ser: 5, task: "Net Metering", duration: "15-30 days" }
    ]
  },
  
  contractTerms: {
    inspection: "The Buyer/Client shall inspect the object upon delivery to the said Buyer. The Buyer shall reject the said object and notify the Seller if the equipment is damaged or not according to above agreed quotation standards.",
    forceMateure: "The company is not responsible for any damage due to Acts of God, War, riots, Civil commotion/strikes, lockdown/curfew or any disturbance causing delay in supply or damage to product which company has no control.",
    delivery: "Delivery shall be made upon the agreed timeline given by Al Muslim Engineering (maximum 20 days).",
    modifications: "The seller cannot, in any way make any improvements or modifications, even at his/her expense, without the consent and affirmation of the Buyer/Client.",
    installation: "Installation will be started within 7 days after the equipment delivery. Any equipment damage during installation process will be replaced by company."
  }
};

// ==================== SOLAR PACKAGES ====================
export const solarPackages = [
  { id: 1, name: "3KW Solar System", capacity: "3KW", image: "/Solar Packages/3kw.png" },
  { id: 2, name: "4KW Solar System", capacity: "4KW", image: "/Solar Packages/4kw.png" },
  { id: 3, name: "6KW Solar System", capacity: "6KW", image: "/Solar Packages/6kw.png" },
  { id: 4, name: "8KW Solar System", capacity: "8KW", image: "/Solar Packages/8kw.png" },
  { id: 5, name: "10KW Solar System", capacity: "10KW", image: "/Solar Packages/10kw.png" },
  { id: 6, name: "12KW Solar System", capacity: "12KW", image: "/Solar Packages/12kw.png" }
];

// ==================== BRANDS WE TRUST ====================
export const trustedBrands = {
  panels: [
    { name: "Longi Solar", logo: "/brands/longi.png" },
    { name: "JA Solar", logo: "/brands/ja-solar.png" },
    { name: "Jinko Solar", logo: "/brands/jinko.png" },
    { name: "Canadian Solar", logo: "/brands/canadian.png" },
    { name: "Trina Solar", logo: "/brands/trina_solar.svg" }
  ],
  inverters: [
    { name: "Growatt", logo: "/brands/growatt.svg" },
    { name: "Huawei", logo: "/brands/huawei.png" },
    { name: "Sungrow", logo: "/brands/sungrow.png" },
    { name: "Inverex", logo: "/brands/inverex.png" },
    { name: "GoodWe", logo: "/brands/goodwe.png" }
  ],
  batteries: [
    { name: "Narada", logo: "/brands/narada.png" },
    { name: "Phoenix", logo: "/brands/phoenix.png" },
    { name: "AGS", logo: "/brands/ags.png" },
    { name: "Exide", logo: "/brands/exide.png" }
  ]
};

// ==================== SERVICES OFFERED ====================
export const services = [
  {
    id: 1,
    title: "Solar System Consultancy",
    description: "Expert advice on the best solar solution for your needs",
    icon: "consultancy",
    details: "Our team analyzes your energy consumption, roof space, and budget to recommend the perfect solar system.",
    features: ["Free site survey", "Load analysis", "Customized solutions", "ROI calculations"]
  },
  {
    id: 2,
    title: "Solar System Installation",
    description: "Professional installation by certified engineers",
    icon: "installation",
    details: "We handle everything from structure mounting to final commissioning with quality assurance.",
    features: ["Certified installers", "Quality materials", "Safety compliance", "Timely completion"]
  },
  {
    id: 3,
    title: "Net Metering Services",
    description: "Complete net metering application and approval support",
    icon: "net-metering",
    details: "We assist with all documentation and liaison with WAPDA/distribution companies.",
    features: ["Document preparation", "WAPDA coordination", "Application submission", "Follow-up support"]
  },
  {
    id: 4,
    title: "Maintenance & Support",
    description: "Regular maintenance and 24/7 technical support",
    icon: "maintenance",
    details: "Keep your system running at peak efficiency with our maintenance packages.",
    features: ["Regular cleaning", "Performance monitoring", "Fault diagnosis", "Quick repairs"]
  },
  {
    id: 5,
    title: "Solar Panel Cleaning",
    description: "Professional cleaning services for optimal performance",
    icon: "cleaning",
    details: "Regular cleaning can improve efficiency by 15-20%. We offer scheduled cleaning services.",
    features: ["Eco-friendly cleaning", "No scratches", "Extended lifespan", "Improved efficiency"]
  },
  {
    id: 6,
    title: "System Upgradation",
    description: "Upgrade existing systems with latest technology",
    icon: "upgrade",
    details: "Modernize your old solar system with new panels, inverters, or battery storage.",
    features: ["Assessment of existing system", "Cost-effective upgrades", "Enhanced performance", "Future-proof technology"]
  }
];

export default {
  companyInfo,
  solarSystems,
  energyProduction,
  products,
  termsAndConditions,
  solarPackages,
  trustedBrands,
  services
};

