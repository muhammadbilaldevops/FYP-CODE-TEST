/**
 * QUOTATION TEMPLATES DATA
 * 
 * Contains all template data for the 10-page quotation document
 */

// Company Information
export const companyInfo = {
  name: 'Al Muslim Engineering',
  contactPerson: 'Muhammad Saeed',
  phones: [
    '0346-51 88 458',
    '0314-51 88 458',
    '0333-51 88 458'
  ],
  address: 'Al Muslim Engineering, Muneeb Plaza, Opp Adyala Electronics, Ch Bostan Khan Road, Chaklala Scheme III, Rawalpindi',
  specialization: 'Specialist in: Service We are specialized in Sun powered energy solutions which include Solar Energy designing, solar panel, Solar Inverter installation and customer support service for Complete Solar Energy Solution.'
};

// Company Vision
export const companyVision = {
  heading: 'OUR VISION',
  statement: 'Our Vision is to provide best energy consultancy with wide range of top-quality products in the most affordable prices abiding by the following characteristics:',
  characteristics: [
    'Commitment',
    'Reliability',
    'Integrity',
    'Honesty'
  ],
  focus: 'Solar energy solutions focus on energizing everything under the sun – one light bulb, one household, one neighborhood at a time'
};

// Brief Description
export const solarSystemDescription = {
  heading: 'A Brief Description of Solar System',
  definition: 'A solar power plant is a facility that converts light into electricity suitable to be supplied to homes and industries.'
};

// Solar System Comparison
export const systemComparison = {
  columns: ['Descriptions', 'On-Grid System', 'Hybrid System', 'Off Grid System'],
  rows: [
    {
      description: 'Purpose',
      onGrid: 'To sell units to WAPDA and reduce bill to zero.',
      hybrid: 'To provide backup and sell units to WAPDA as well hence reducing bill by 60-70%',
      offGrid: 'To provide Backup'
    },
    {
      description: 'Batteries',
      onGrid: 'Not Required',
      hybrid: 'Required',
      offGrid: 'Required'
    },
    {
      description: 'Day time operation',
      onGrid: 'Sell Units to WAPDA, Shuts down when WAPDA is not available',
      hybrid: 'Sell Units to WAPDA, Provide backup by sharing load with batteries',
      offGrid: 'Do Not Sell Units, Provide backup by sharing load with batteries'
    },
    {
      description: 'Night Time Operation',
      onGrid: 'Remains Shut down',
      hybrid: 'Provide Backup only',
      offGrid: 'Provide Backup only'
    }
  ]
};

// Products Catalog
export const productCatalog = [
  {
    product: 'Wire',
    description: 'Copper Dc wire 4mm, Copper Ac Wire 4mm.',
    item: 'Wire Image'
  },
  {
    product: 'Structure',
    description: 'H-beam structure.',
    item: 'Structure Image'
  },
  {
    product: 'Nut bolt',
    description: 'Galvanized Nut bolt',
    item: 'Nut bolt Image'
  },
  {
    product: 'Anchors',
    description: 'Spit/Index Seepage free',
    item: 'Anchors Image'
  },
  {
    product: 'Breakers',
    description: 'Schneider',
    item: 'Breakers Image'
  },
  {
    product: 'PVC Accessories',
    description: 'Any Available',
    item: 'PVC Accessories Image'
  },
  {
    product: 'Duct',
    description: 'Any Available',
    item: 'Duct Image'
  }
];

// Terms & Conditions
export const termsAndConditions = {
  priceValidity: '2 days from issuance of this proposal. The product prices are linked with USD-PKR Parity.',
  paymentTerms: {
    advance: '70%',
    installation: '25%',
    netMetering: '5%'
  },
  deliveryTime: 'Within 2 Day -2 Weeks.',
  operationMaintenance: [
    'Cost of civil work (if required) will be charged Separately.',
    'Client will be provided with the basic level maintenance manuals.',
    'Address the issue online.',
    'Visit the site (if required).',
    'Find the cause of Fault.'
  ],
  netMetering: {
    heading: 'Following Documents are required',
    documents: [
      'Electric Bill',
      'CNIC Copy',
      'Extension of Load',
      'Allotment Letter / Registry'
    ]
  },
  bahriaHousing: {
    document: 'Completion Certificate'
  }
};

// Warranty Information
export const warrantyInfo = {
  comprehensive: '1 Years',
  solarPanelsProduct: '12 Years',
  solarPanelsPerformance: '30 Years',
  solarInverter: '5 Years',
  hybridInverter: ''
};

// Account Details
export const accountDetails = {
  accountTitle: 'Muhmmad Saeed',
  bank: 'Allied Bank',
  accountNumber: '07390010083883640016'
};

// Project Timeline Template
export const projectTimelineTemplate = [
  { task: 'Signing of The Project', date: '' },
  { task: 'Start of The Delivery', date: '' },
  { task: 'Starting Installation', date: '' },
  { task: 'Installation Completion', date: '' },
  { task: 'Net metering', date: '' }
];

// Contract Agreement Clauses
export const contractClauses = {
  inspection: [
    'The Buyer/Client shall inspect the object upon delivery to the said Buyer. The Buyer shall reject the said object and notify the seller if the equipment is damaged or not according to above agreed quotation standards.',
    'The company is not responsible for any damage due to Acts of God, War, riots, Civil commotion/ strikes, lockdown/curfew or any disturbance causing delay in supply or damage to product which company has no control.'
  ],
  delivery: 'Delivery shall be made upon the agreed timeline given buy Al Muslim Engineering (maximum 20 days).',
  modifications: 'The seller cannot, in any way make any improvements or modifications, even at his/her expense, without the consent and affirmation of the Buyer/Client.',
  installation: 'Installation will be started within 7 days after the equipment delivery. Any equipment damage during installation process will be replace by company.'
};

