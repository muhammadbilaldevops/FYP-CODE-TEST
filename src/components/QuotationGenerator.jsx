/**
 * QUOTATION GENERATOR COMPONENT
 * 
 * Complete 10-page quotation generator for admin dashboard
 * Features:
 * - Initial kW selection screen (5-25kW or 25+)
 * - Full 10-page quotation document
 * - All fields editable
 * - Export as Word or PDF
 */

/**
 * QUOTATION GENERATOR COMPONENT
 * 
 * Complete 10-page quotation generator for admin dashboard.
 * 
 * Student Note: This component generates professional quotations with:
 * - Editable fields for all quotation details
 * - Export to PDF and Word formats
 * - Real-time calculations
 * - Professional formatting
 * 
 * Features:
 * - Initial kW selection screen (5-25kW or 25+)
 * - Full 10-page quotation document
 * - All fields editable
 * - Export as Word or PDF
 */

import React, { useState, useEffect } from 'react';
import { FiX, FiFileText, FiDownload, FiCheckCircle, FiEdit, FiSave } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { companyInfo, companyVision, solarSystemDescription, systemComparison, productCatalog, termsAndConditions, warrantyInfo, accountDetails, projectTimelineTemplate, contractClauses } from '../data/quotationTemplates';
import { calculateEnergyProduction, energyProductionData } from '../data/energyProductionData';
import CompanyLogo from './CompanyLogo';
import QuotationHeader from './QuotationHeader';
import { getApiUrl } from '../config/api';
import { useTranslation } from '../hooks/useTranslation';

const QuotationGenerator = ({ isOpen, onClose, quoteData }) => {
  const { t } = useTranslation();
  // View state: 'selection', 'kwSelect', or 'editor'
  const [currentView, setCurrentView] = useState('selection');
  const [selectedKW, setSelectedKW] = useState('');
  const [selectedKWRange, setSelectedKWRange] = useState(''); // '5-25' or '25+'
  
  // Comprehensive quotation data structure
  const [quotationData, setQuotationData] = useState({
    // Page 1: Cover/Header
    projectTitle: '',
    projectDate: new Date().toLocaleDateString('en-GB'),
    customerName: '',
    contactNo: '',
    projectLocation: '',
    
    // Client Information
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    
    // Project Details
    systemSize: '',
    projectType: '',
    monthlyBill: '',
    installationType: '',
    roofArea: '',
    propertyType: '',
    
    // Quotation Details
    quotationDate: new Date().toLocaleDateString('en-GB'),
    quotationNumber: `QT-${Date.now()}`,
    validity: '2 days',
    
    // Page 9: Main Quotation Items
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    received1st: 0,
    received2nd: 0,
    balance: 0,
    
    // Page 10: Project Timeline
    timeline: [...projectTimelineTemplate],
    
    // Notes
    notes: ''
  });

  // Auto-fill from quote data when component opens - COMPREHENSIVE AUTO-GENERATION
  useEffect(() => {
    if (quoteData && isOpen) {
      const systemSize = quoteData.system_size || '';
      const kwValue = parseFloat(systemSize) || 0;
      const currentDate = new Date().toLocaleDateString('en-GB');
      const quotationNum = `QT-${Date.now()}`;
      
      // Auto-select kW range based on system size (but still show selection screen)
      const kwRange = kwValue <= 25 ? '5-25' : '25+';
      setSelectedKWRange(kwRange);
      
      // Don't auto-advance - always show selection screen first
      // User will choose the range and kW value
      
      // Comprehensive auto-fill all fields
      setQuotationData(prev => ({
        ...prev,
        // Client Information - Auto-filled
        clientName: quoteData.name || '',
        clientEmail: quoteData.email || '',
        clientPhone: quoteData.phone || '',
        clientAddress: quoteData.address || '',
        
        // Page 1 Fields - Auto-filled
        customerName: quoteData.name || '',
        contactNo: quoteData.phone || '',
        projectLocation: quoteData.address || '',
        projectTitle: systemSize ? `${systemSize}kw solar system with Netmetreina` : 'Solar System with Netmetreina',
        projectDate: currentDate,
        validity: '2 days',
        
        // Project Details - Auto-filled
        systemSize: systemSize,
        projectType: quoteData.project_type || 'On-Grid',
        monthlyBill: quoteData.monthly_bill ? `Rs. ${parseFloat(quoteData.monthly_bill).toLocaleString()}` : '',
        installationType: quoteData.installation_type || 'Roof Mounted',
        roofArea: quoteData.roof_area ? `${quoteData.roof_area} sq ft` : '',
        propertyType: quoteData.property_type || 'Residential',
        
        // Quotation Details - Auto-generated
        quotationDate: currentDate,
        quotationNumber: quotationNum,
        
        // Reset financial fields (will be auto-calculated when items are generated)
        received1st: 0,
        received2nd: 0,
        balance: 0
      }));
    }
  }, [quoteData, isOpen]);

  // Reset state when component closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('selection');
      setSelectedKW('');
      setSelectedKWRange('');
    }
  }, [isOpen]);

  // Generate quotation items based on kW range - AUTO-GENERATE IMMEDIATELY
  useEffect(() => {
    if (selectedKW && quotationData.systemSize && currentView === 'editor') {
      // Small delay to ensure state is updated
      const timer = setTimeout(() => {
        generateQuotationItems(quotationData.systemSize, selectedKW);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [selectedKW, quotationData.systemSize, currentView]);
  
  // Auto-generate items when entering editor view (fallback)
  useEffect(() => {
    if (currentView === 'editor' && selectedKW && quotationData.systemSize && quotationData.items.length === 0) {
      const timer = setTimeout(() => {
        generateQuotationItems(quotationData.systemSize, selectedKW);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentView, selectedKW, quotationData.systemSize]);

  const handleKWRangeSelection = (kwRange) => {
    setSelectedKWRange(kwRange);
    if (kwRange === '25+') {
      // For 25+, open Google Docs link
      setSelectedKW('25+');
      // Auto-fill system size if available
      if (quoteData?.system_size) {
        const kwValue = parseFloat(quoteData.system_size);
        if (!isNaN(kwValue) && kwValue > 25) {
          setQuotationData(prev => ({ ...prev, systemSize: quoteData.system_size }));
        }
      }
      // Open Google Docs link in new tab
      window.open('https://docs.google.com/document/d/1RsdhQhrP07pcnXXrKcjKn2t-NkWBbQRI/edit?usp=sharing&ouid=111171819795476400192&rtpof=true&sd=true', '_blank');
      // Close the modal after opening the link
      onClose();
    } else {
      // For 5-25, show dropdown selection
      setCurrentView('kwSelect');
    }
  };

  const handleKWSelection = (kwValue) => {
    setSelectedKW('5-25');
    setQuotationData(prev => ({ ...prev, systemSize: kwValue.toString() }));
    // Open Google Docs link in new tab instead of showing editor
    window.open('https://docs.google.com/document/d/1RsdhQhrP07pcnXXrKcjKn2t-NkWBbQRI/edit?usp=sharing&ouid=111171819795476400192&rtpof=true&sd=true', '_blank');
    // Close the modal after opening the link
    onClose();
  };

  const generateQuotationItems = (kw, kwRange) => {
    const kwValue = parseFloat(kw);
    if (isNaN(kwValue) || kwValue <= 0) return;

    let items = [];

    if (kwRange === '5-25') {
      // 5-25kW package - Based on 20kW example from screenshots
      const numPanels = Math.ceil((kwValue * 1000) / 580); // Using 580W panels from example
      
      items = [
        { 
          name: 'Canadian, Jinko, Longi JA Aestroenergy /580/585 wall N-type bi facial Hall cut tier 1 A grade Solar Panels', 
          quantity: numPanels, 
          unit: 'pcs', 
          rate: 18600, 
          total: numPanels * 18600 
        },
        { 
          name: `${kwValue}kw Inverter Growatt/with Wifi Monitoring`, 
          quantity: 1, 
          unit: 'pcs', 
          rate: kwValue <= 10 ? 180000 : kwValue <= 15 ? 250000 : 352000, 
          total: kwValue <= 10 ? 180000 : kwValue <= 15 ? 250000 : 352000 
        },
        { 
          name: `Mounting Structure For solar pane IH beam C Channel ${kwValue}kw Mughal`, 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 15000, 
          total: kwValue * 15000 
        },
        { 
          name: 'DC cable for Solar Panels Aiwa Cable Original copper pure 6mm', 
          quantity: 1, 
          unit: 'set', 
          rate: 45000, 
          total: 45000 
        },
        { 
          name: 'AC cable Aiwa copper Pure 6mm/10mm', 
          quantity: 1, 
          unit: 'set', 
          rate: 20000, 
          total: 20000 
        },
        { 
          name: 'DB BOX and connedor', 
          quantity: 1, 
          unit: 'pcs', 
          rate: 8000, 
          total: 8000 
        },
        { 
          name: 'DC Circuit Breakers 32A MP schenider, AC Circuit Breakers/Chint, PV Connector, Rawal Plugs and Screw, PVC Pipes, Joints, Elbows and Connedors, Cable Ducts, Cable Ties, Insulation Tapes, External Disconnect Switch 400V 100Amp', 
          quantity: 1, 
          unit: 'Lot', 
          rate: 35000, 
          total: 35000 
        },
        { 
          name: 'Lighting Arrestor with Copper Rod Earthing', 
          quantity: 1, 
          unit: 'pcs', 
          rate: 35000, 
          total: 35000 
        },
        { 
          name: 'Water Proofing Chemical Flexible Pipe', 
          quantity: 1, 
          unit: 'set', 
          rate: 10000, 
          total: 10000 
        },
        { 
          name: 'Installation & Commissioning', 
          quantity: 1, 
          unit: 'set', 
          rate: 40000, 
          total: 40000 
        },
        { 
          name: 'Civil works', 
          quantity: 1, 
          unit: 'set', 
          rate: 10000, 
          total: 10000 
        },
        { 
          name: 'Netmebering Green Metre File cost and installation', 
          quantity: 1, 
          unit: 'set', 
          rate: 125000, 
          total: 125000 
        }
      ];
    } else {
      // 25+ kW package - Commercial/Industrial
      const numPanels = Math.ceil((kwValue * 1000) / 580);
      
      items = [
        { 
          name: 'Canadian, Jinko, Longi JA Aestroenergy /580/585 wall N-type bi facial Hall cut tier 1 A grade Solar Panels', 
          quantity: numPanels, 
          unit: 'pcs', 
          rate: 18000, 
          total: numPanels * 18000 
        },
        { 
          name: `${kwValue}kw Commercial Inverter Growatt/with Wifi Monitoring`, 
          quantity: Math.ceil(kwValue / 25), 
          unit: 'pcs', 
          rate: 800000, 
          total: Math.ceil(kwValue / 25) * 800000 
        },
        { 
          name: `Mounting Structure For solar pane IH beam C Channel ${kwValue}kw Mughal`, 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 12000, 
          total: kwValue * 12000 
        },
        { 
          name: 'DC cable for Solar Panels Aiwa Cable Original copper pure 6mm', 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 3000, 
          total: kwValue * 3000 
        },
        { 
          name: 'AC cable Aiwa copper Pure 6mm/10mm', 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 2000, 
          total: kwValue * 2000 
        },
        { 
          name: 'DB BOX and connedor', 
          quantity: 1, 
          unit: 'pcs', 
          rate: 15000, 
          total: 15000 
        },
        { 
          name: 'DC Circuit Breakers 32A MP schenider, AC Circuit Breakers/Chint, PV Connector, Rawal Plugs and Screw, PVC Pipes, Joints, Elbows and Connedors, Cable Ducts, Cable Ties, Insulation Tapes, External Disconnect Switch 400V 100Amp', 
          quantity: 1, 
          unit: 'Lot', 
          rate: kwValue * 2000, 
          total: kwValue * 2000 
        },
        { 
          name: 'Lighting Arrestor with Copper Rod Earthing', 
          quantity: 1, 
          unit: 'pcs', 
          rate: 50000, 
          total: 50000 
        },
        { 
          name: 'Water Proofing Chemical Flexible Pipe', 
          quantity: 1, 
          unit: 'set', 
          rate: 20000, 
          total: 20000 
        },
        { 
          name: 'Installation & Commissioning', 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 3000, 
          total: kwValue * 3000 
        },
        { 
          name: 'Civil works', 
          quantity: 1, 
          unit: 'set', 
          rate: kwValue * 1000, 
          total: kwValue * 1000 
        },
        { 
          name: 'Netmebering Green Metre File cost and installation', 
          quantity: 1, 
          unit: 'set', 
          rate: 125000, 
          total: 125000 
        }
      ];
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    const balance = total - (quotationData.received1st || 0) - (quotationData.received2nd || 0);

    setQuotationData(prev => ({
      ...prev,
      items,
      subtotal,
      tax,
      total,
      balance
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...quotationData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate total for this item
    if (field === 'quantity' || field === 'rate') {
      newItems[index].total = newItems[index].quantity * newItems[index].rate;
    }
    
    // Recalculate subtotal, tax, and total
    const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    const balance = total - (quotationData.received1st || 0) - (quotationData.received2nd || 0);
    
    setQuotationData(prev => ({
      ...prev,
      items: newItems,
      subtotal,
      tax,
      total,
      balance
    }));
  };

  const updateTimeline = (index, field, value) => {
    const newTimeline = [...quotationData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setQuotationData(prev => ({ ...prev, timeline: newTimeline }));
  };

  // Get energy production data for current system size
  const energyProduction = quotationData.systemSize 
    ? calculateEnergyProduction(quotationData.systemSize) 
    : null;

  const exportToPDF = async () => {
    const element = document.getElementById('quotation-content');
    if (!element) {
      alert('Quotation content not found');
      return;
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Quotation-${quotationData.quotationNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 3,
        useCORS: true,
        backgroundColor: null, // Preserves actual backgrounds
        logging: false,
        letterRendering: true,
        allowTaint: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Force backgrounds in cloned document
          const pages = clonedDoc.querySelectorAll('.page-break');
          pages.forEach(page => {
            const computedStyle = window.getComputedStyle(page);
            const bgColor = page.style.backgroundColor || computedStyle.backgroundColor || '#FFFFFF';
            page.style.setProperty('background-color', bgColor, 'important');
            
            // Also force background on all child elements that might need it
            const allElements = page.querySelectorAll('*');
            allElements.forEach(el => {
              const elBg = window.getComputedStyle(el).backgroundColor;
              if (elBg && elBg !== 'rgba(0, 0, 0, 0)' && elBg !== 'transparent') {
                el.style.setProperty('background-color', elBg, 'important');
              }
            });
          });
          
          // Force background on parent container
          const contentContainer = clonedDoc.getElementById('quotation-content');
          if (contentContainer) {
            contentContainer.style.setProperty('background-color', '#FFFFFF', 'important');
          }
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      alert('Failed to export PDF');
    }
  };

  const exportToWord = async () => {
    try {
      const children = [];

      // Page 1: Cover/Header
      children.push(
            new Paragraph({
          text: companyInfo.name.toUpperCase(),
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            }),
            new Paragraph({
          text: `Contact: ${companyInfo.contactPerson}`,
          alignment: AlignmentType.RIGHT,
          spacing: { after: 100 }
        }),
        ...companyInfo.phones.map(phone => 
            new Paragraph({
            text: phone,
            alignment: AlignmentType.RIGHT,
            spacing: { after: 50 }
          })
        ),
        new Paragraph({
          text: companyInfo.specialization,
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          text: `Project: ${quotationData.projectTitle}`,
              spacing: { after: 100 }
            }),
            new Paragraph({
          text: `Date: ${quotationData.projectDate}`,
          spacing: { after: 100 }
            }),
            new Paragraph({
          text: `Customer Name: ${quotationData.customerName}`,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: `Contact No: ${quotationData.contactNo}`,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: `Project Location: ${quotationData.projectLocation}`,
          spacing: { after: 400 }
        })
      );

      // Page 2: Company Vision
      children.push(
        new Paragraph({
          text: companyVision.heading,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: companyVision.statement,
              spacing: { after: 200 }
            }),
        ...companyVision.characteristics.map(char =>
            new Paragraph({
            text: `• ${char}`,
            spacing: { after: 100 }
          })
        ),
        new Paragraph({
          text: companyVision.focus,
          spacing: { before: 200, after: 400 }
        })
      );

      // Page 3: Brief Description
      children.push(
        new Paragraph({
          text: solarSystemDescription.heading,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: solarSystemDescription.definition,
          spacing: { after: 400 }
        })
      );

      // Page 4: System Comparison Table
      children.push(
        new Paragraph({
          text: "Solar System Comparison",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Table({
          rows: [
            new TableRow({
              children: systemComparison.columns.map(col =>
                new TableCell({ children: [new Paragraph(col)] })
              )
            }),
            ...systemComparison.rows.map(row =>
              new TableRow({
              children: [
                  new TableCell({ children: [new Paragraph(row.description)] }),
                  new TableCell({ children: [new Paragraph(row.onGrid)] }),
                  new TableCell({ children: [new Paragraph(row.hybrid)] }),
                  new TableCell({ children: [new Paragraph(row.offGrid)] })
                ]
              })
            )
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        })
      );

      // Page 5: Installation Pictures
      children.push(
        new Paragraph({
          text: "Installation Pictures for Client Awareness:",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 400 }
        })
      );

      // Page 6: Energy Production Table
      children.push(
        new Paragraph({
          text: "Energy Production Approx Unit",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Sr No")] }),
                new TableCell({ children: [new Paragraph("Mon")] }),
                new TableCell({ children: [new Paragraph("5 KW")] }),
                new TableCell({ children: [new Paragraph("10 KW")] }),
                new TableCell({ children: [new Paragraph("15 KW")] }),
                new TableCell({ children: [new Paragraph("20 KW")] })
              ]
            }),
            ...energyProductionData.monthly.map((month, idx) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((idx + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(month.month)] }),
                  new TableCell({ children: [new Paragraph(month['5KW'].toFixed(2))] }),
                  new TableCell({ children: [new Paragraph(month['10KW'].toFixed(2))] }),
                  new TableCell({ children: [new Paragraph(month['15KW'].toFixed(2))] }),
                  new TableCell({ children: [new Paragraph(month['20KW'].toFixed(2))] })
                ]
              })
            ),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Yearly (Units)")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph(energyProductionData.yearly['5KW'].toFixed(2))] }),
                new TableCell({ children: [new Paragraph(energyProductionData.yearly['10KW'].toFixed(2))] }),
                new TableCell({ children: [new Paragraph(energyProductionData.yearly['15KW'].toFixed(2))] }),
                new TableCell({ children: [new Paragraph(energyProductionData.yearly['20KW'].toFixed(2))] })
              ]
            })
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        })
      );

      // Page 7: Products Table
      children.push(
            new Paragraph({
          text: "Products & Components",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Product")] }),
                new TableCell({ children: [new Paragraph("Description")] }),
                new TableCell({ children: [new Paragraph("Item")] })
              ]
            }),
            ...productCatalog.map(product =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(product.product)] }),
                  new TableCell({ children: [new Paragraph(product.description)] }),
                  new TableCell({ children: [new Paragraph(product.item)] })
                ]
              })
            )
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        })
      );

      // Page 8: Terms & Conditions
      children.push(
            new Paragraph({
          text: "Terms & Conditions",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Price Validity")] }),
                new TableCell({ children: [new Paragraph(termsAndConditions.priceValidity)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Payment Terms")] }),
                new TableCell({
                  children: [
                    new Paragraph(`Advance: ${termsAndConditions.paymentTerms.advance}`),
                    new Paragraph(`Complete Installation: ${termsAndConditions.paymentTerms.installation}`),
                    new Paragraph(`Net Metering: ${termsAndConditions.paymentTerms.netMetering}`)
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Delivery Time")] }),
                new TableCell({ children: [new Paragraph(termsAndConditions.deliveryTime)] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Operation & Maintenance")] }),
                new TableCell({
                  children: termsAndConditions.operationMaintenance.map(item =>
                    new Paragraph(`• ${item}`)
                  )
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Net Metering")] }),
                new TableCell({
                  children: [
                    new Paragraph(termsAndConditions.netMetering.heading),
                    ...termsAndConditions.netMetering.documents.map(doc =>
                      new Paragraph(`• ${doc}`)
                    )
                  ]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Bahria Housing Society")] }),
                new TableCell({ children: [new Paragraph(termsAndConditions.bahriaHousing.document)] })
              ]
            })
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        })
      );

      // Page 9: Main Quotation Table
      children.push(
        new Paragraph({
          text: "Quotation Details",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
          text: `Quotation Number: ${quotationData.quotationNumber}`,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: `Date: ${quotationData.quotationDate}`,
              spacing: { after: 200 }
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                new TableCell({ children: [new Paragraph("Ser No")] }),
                new TableCell({ children: [new Paragraph("Description")] }),
                new TableCell({ children: [new Paragraph("QTY")] }),
                new TableCell({ children: [new Paragraph("UoM")] }),
                new TableCell({ children: [new Paragraph("Rate")] }),
                new TableCell({ children: [new Paragraph("Total (Rs)")] })
              ]
            }),
            ...quotationData.items.map((item, idx) =>
                  new TableRow({
                    children: [
                  new TableCell({ children: [new Paragraph((idx + 1).toString())] }),
                      new TableCell({ children: [new Paragraph(item.name)] }),
                      new TableCell({ children: [new Paragraph(item.quantity.toString())] }),
                      new TableCell({ children: [new Paragraph(item.unit)] }),
                      new TableCell({ children: [new Paragraph(item.rate.toLocaleString())] }),
                      new TableCell({ children: [new Paragraph(item.total.toLocaleString())] })
                    ]
                  })
            ),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Subtotal")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph(quotationData.subtotal.toLocaleString())] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Tax (5%)")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph(quotationData.tax.toLocaleString())] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Total")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph("")] }),
                new TableCell({ children: [new Paragraph(quotationData.total.toLocaleString())] })
              ]
            })
          ],
          width: { size: 100, type: WidthType.PERCENTAGE }
        }),
        new Paragraph({
          text: `Payment Plan: Advance ${termsAndConditions.paymentTerms.advance}, Installation ${termsAndConditions.paymentTerms.installation}, Net Metering ${termsAndConditions.paymentTerms.netMetering}`,
          spacing: { before: 200, after: 200 }
        }),
        new Paragraph({
          text: `Account: ${accountDetails.accountTitle}, ${accountDetails.bank}, A/C No: ${accountDetails.accountNumber}`,
          spacing: { after: 400 }
        })
      );

      // Page 10: Project Timeline & Contract
      children.push(
        new Paragraph({
          text: "Project Time Line",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("Ser")] }),
                new TableCell({ children: [new Paragraph("Task")] }),
                new TableCell({ children: [new Paragraph("Date")] })
              ]
            }),
            ...quotationData.timeline.map((item, idx) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph((idx + 1).toString())] }),
                  new TableCell({ children: [new Paragraph(item.task)] }),
                  new TableCell({ children: [new Paragraph(item.date || "")] })
                    ]
                  })
                )
              ],
              width: { size: 100, type: WidthType.PERCENTAGE }
            }),
            new Paragraph({
          text: "Signatures:",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 }
            }),
            new Paragraph({
          text: "Client/ Representative: _________________",
          spacing: { after: 200 }
            }),
            new Paragraph({
          text: "Al Muslim Engineering: _________________",
          spacing: { after: 400 }
            }),
            new Paragraph({
          text: "Project Contract Agreement",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: "I Mr./Mrs./Miss. __________, resident of __________, has agreed on all the terms and conditions provided by Al-Muslim Engineering.",
              spacing: { after: 200 }
            }),
              new Paragraph({
          text: "Inspection:",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 100 }
        }),
        ...contractClauses.inspection.map(clause =>
          new Paragraph({
            text: `• ${clause}`,
                spacing: { after: 100 }
              })
            ),
            new Paragraph({
          text: "Delivery:",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        new Paragraph({
          text: contractClauses.delivery,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: "Modifications or Improvement:",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: contractClauses.modifications,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: "Installation:",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 100 }
        }),
        new Paragraph({
          text: contractClauses.installation,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: companyInfo.address,
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 }
        })
      );

      const doc = new Document({
        sections: [{
          properties: {},
          children
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Quotation-${quotationData.quotationNumber}.docx`);
      alert('Word document exported successfully!');
    } catch (error) {
      console.error('Word export error:', error);
      alert('Failed to export Word document.');
    }
  };

  const handleSaveQuotation = async () => {
    if (!selectedKW) {
      alert('Please select a kW range first');
      return;
    }

    try {
      const systemSizeValue = parseFloat(quotationData.systemSize) || 0;
      const response = await fetch(getApiUrl('/api/admin/quotes/save-quotation'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          quoteId: quoteData?.id,
          quotationData: {
            ...quotationData,
            selectedKW: selectedKW || (systemSizeValue <= 25 ? '5-25' : '25+')
          }
        })
      });

      if (response.ok) {
        alert('Quotation saved successfully!');
        onClose();
      } else {
        throw new Error('Failed to save quotation');
      }
    } catch (error) {
      console.error('Error saving quotation:', error);
      alert('Failed to save quotation');
    }
  };

  if (!isOpen) return null;

  // Initial Selection Screen
  if (currentView === 'selection') {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Generate Quotation</h2>
              <p className="text-sm text-blue-100">Select system size range</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

          {/* Selection Content */}
          <div className="p-8">
            <label className="block text-lg font-semibold text-gray-700 mb-6 text-center">
              {t('quotationGenerator.selectSystemSize')}
            </label>
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => handleKWRangeSelection('5-25')}
                className="p-6 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
              >
                <div className="text-2xl font-bold text-gray-800">5-25 kW</div>
                <div className="text-sm text-gray-600 mt-2">Residential/Commercial</div>
                <div className="text-xs text-gray-500 mt-1">Most commonly used</div>
              </button>
              <button
                onClick={() => handleKWRangeSelection('25+')}
                className="p-6 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
              >
                <div className="text-2xl font-bold text-gray-800">More than 25 kW</div>
                <div className="text-sm text-gray-600 mt-2">Large Commercial/Industrial</div>
                <div className="text-xs text-gray-500 mt-1">Special cases</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // kW Selection Dropdown Screen (for 5-25 range)
  if (currentView === 'kwSelect') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-xl flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Select kW Size</h2>
              <p className="text-sm text-blue-100">{t('quotationGenerator.chooseSpecificSize')}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('selection')}
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition-colors text-sm"
                title="Back"
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                title="Close"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Dropdown Content */}
          <div className="p-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4 text-center">
              {t('quotationGenerator.selectKwSize')}
            </label>
            <div className="space-y-3">
              {[5, 10, 15, 20, 25].map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKWSelection(kw)}
                  className="w-full p-4 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-xl font-bold text-gray-800">{kw} kW</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {kw <= 10 ? 'Small Residential' : kw <= 15 ? 'Medium Residential' : kw <= 20 ? 'Large Residential' : 'Commercial'}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentView('selection')}
              className="mt-6 w-full p-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all text-center text-gray-700"
            >
              {t('quotationGenerator.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full Editor View with 10 Pages
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-xl flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">Generate Quotation - 10 Pages</h2>
            <p className="text-sm text-blue-100">Edit all fields before exporting</p>
              </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('selection')}
              className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              Change kW Range
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <FiX className="text-2xl" />
            </button>
          </div>
          </div>

        {/* Content - All 10 Pages */}
        <div className="p-6">
          <div id="quotation-content" className="space-y-8">
            {/* PAGE 1: Cover/Header Page */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#FFFFFF', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#FFFFFF', width: '100%', height: '100%' }}>
                <QuotationHeader />

              {/* PV SOLUTION PROPOSAL Banner - Yellow with black text */}
              <div className="text-center py-3 mb-6 rounded" style={{ backgroundColor: '#FFD700', border: '2px solid #000000' }}>
                <p className="text-xl font-bold" style={{ color: '#000000' }}>PV SOLUTION PROPOSAL</p>
              </div>

          <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project:</label>
                <input
                      type="text"
                      value={quotationData.projectTitle}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, projectTitle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 20kw solar system with Netmetreina"
                    />
              </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date:</label>
                <input
                      type="text"
                      value={quotationData.projectDate}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, projectDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: '#FFFFFF' }}
                    />
              </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name:</label>
                <input
                      type="text"
                      value={quotationData.customerName}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: '#FEF3C7' }}
                    />
              </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contact No:</label>
                <input
                      type="text"
                      value={quotationData.contactNo}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, contactNo: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: '#FEF3C7' }}
                    />
              </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Project Location:</label>
                    <input
                      type="text"
                      value={quotationData.projectLocation}
                      onChange={(e) => setQuotationData(prev => ({ ...prev, projectLocation: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: '#FEF3C7' }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valid:</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={quotationData.validity} 
                      onChange={(e) => setQuotationData(prev => ({ ...prev, validity: e.target.value }))} 
                      className="px-2 py-1 border border-gray-300 rounded w-20"
                      style={{ backgroundColor: '#FFFFFF' }}
                    />
                    <span className="text-sm text-gray-600">days</span>
                  </div>
                </div>
          </div>

              {/* LET SUNLIGHT ENLIGHTEN YOUR LIVES Slogan Banner - Yellow with black text */}
              <div className="mt-6 text-center py-3 mb-4 rounded" style={{ backgroundColor: '#FFD700', border: '2px solid #000000' }}>
                <p className="text-xl font-bold" style={{ color: '#000000' }}>LET SUNLIGHT ENLIGHTEN YOUR LIVES</p>
              </div>

              {/* Footer with Address */}
              <div className="mt-4 p-4 text-center text-sm" style={{ backgroundColor: '#FFD700', color: '#000000', border: '1px solid #000000' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 2: Company Vision */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              
              {/* OUR VISION Heading Bar */}
              <div className="bg-gray-700 p-4 mb-6 rounded">
                <h2 className="text-3xl font-bold text-white">{companyVision.heading}</h2>
                </div>

              <div style={{ color: '#FFFFFF' }}>
                <p className="mb-6 text-lg">{companyVision.statement}</p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  {companyVision.characteristics.map((char, idx) => (
                    <li key={idx} className="text-lg">{char}</li>
                  ))}
                </ul>
                <p className="italic text-lg">{companyVision.focus}</p>
                </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
                </div>
              </div>
            </div>

            {/* PAGE 3: Brief Description */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-2xl font-bold mb-4 underline" style={{ color: '#4A90E2' }}>{solarSystemDescription.heading}</h2>
              <p className="text-white text-lg">{solarSystemDescription.definition}</p>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
                </div>
              </div>
            </div>

            {/* PAGE 4: Solar System Comparison Table */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ backgroundColor: '#2D2D2D' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#4A90E2' }}>
                      {systemComparison.columns.map((col, idx) => (
                        <th key={idx} className="border border-white p-3 text-left text-white font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {systemComparison.rows.map((row, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#2D2D2D' : '#1A1A1A' }}>
                        <td className="border border-white p-3 font-semibold text-white">{row.description}</td>
                        <td className="border border-white p-3 text-white">{row.onGrid}</td>
                        <td className="border border-white p-3 text-white">{row.hybrid}</td>
                        <td className="border border-white p-3 text-white">{row.offGrid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 5: Installation Pictures */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#4A90E2' }}>Installation Pictures for Client Awareness:</h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="border-2 border-dashed border-gray-400 rounded-lg p-8 bg-gray-800 flex items-center justify-center" style={{ minHeight: '200px' }}>
                    <div className="text-center text-gray-400">
                      <FiFileText className="text-4xl mx-auto mb-2" />
                      <p className="text-sm">Installation Photo {num}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 6: Energy Production Table */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#4A90E2' }}>Energy Production Approx Unit</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ backgroundColor: '#2D2D2D' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#4A90E2' }}>
                      <th className="border border-white p-2 text-white">Sr No</th>
                      <th className="border border-white p-2 text-white">Mon</th>
                      <th className="border border-white p-2 text-white">5 KW</th>
                      <th className="border border-white p-2 text-white">10 KW</th>
                      <th className="border border-white p-2 text-white">15 KW</th>
                      <th className="border border-white p-2 text-white">20 KW</th>
                    </tr>
                  </thead>
                  <tbody>
                    {energyProductionData.monthly.map((month, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#2D2D2D' : '#1A1A1A' }}>
                        <td className="border border-white p-2 text-center text-white">{idx + 1}</td>
                        <td className="border border-white p-2 text-white">{month.month}</td>
                        <td className="border border-white p-2 text-right text-white">{month['5KW'].toFixed(2)}</td>
                        <td className="border border-white p-2 text-right text-white">{month['10KW'].toFixed(2)}</td>
                        <td className="border border-white p-2 text-right text-white">{month['15KW'].toFixed(2)}</td>
                        <td className="border border-white p-2 text-right text-white">{month['20KW'].toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ backgroundColor: '#4A90E2' }}>
                      <td colSpan="2" className="border border-white p-2 text-white font-bold">Yearly (Units)</td>
                      <td className="border border-white p-2 text-right text-white font-bold">{energyProductionData.yearly['5KW'].toFixed(2)}</td>
                      <td className="border border-white p-2 text-right text-white font-bold">{energyProductionData.yearly['10KW'].toFixed(2)}</td>
                      <td className="border border-white p-2 text-right text-white font-bold">{energyProductionData.yearly['15KW'].toFixed(2)}</td>
                      <td className="border border-white p-2 text-right text-white font-bold">{energyProductionData.yearly['20KW'].toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 7: Products/Components Table */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#4A90E2' }}>Products & Components</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ backgroundColor: '#2D2D2D' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#4A90E2' }}>
                      <th className="border border-white p-3 text-left text-white">Product</th>
                      <th className="border border-white p-3 text-left text-white">Description</th>
                      <th className="border border-white p-3 text-left text-white">Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCatalog.map((product, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#2D2D2D' : '#1A1A1A' }}>
                        <td className="border border-white p-3 font-semibold text-white">{product.product}</td>
                        <td className="border border-white p-3 text-white">{product.description}</td>
                        <td className="border border-white p-3">
                          <div className="w-20 h-20 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                            Image
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 8: Terms & Conditions */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-3xl font-bold mb-4 underline" style={{ color: '#4A90E2' }}>Terms & Conditions</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" style={{ backgroundColor: '#2D2D2D' }}>
                  <tbody>
                    <tr style={{ backgroundColor: '#1A1A1A' }}>
                      <td className="border border-white p-3 font-semibold w-1/3 text-white">Price Validity</td>
                      <td className="border border-white p-3 text-white">{termsAndConditions.priceValidity}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#2D2D2D' }}>
                      <td className="border border-white p-3 font-semibold text-white">Payment Terms</td>
                      <td className="border border-white p-3 text-white">
                        <p>Advance: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.advance}</span></p>
                        <p>Complete Installation: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.installation}</span></p>
                        <p>Net Metering: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.netMetering}</span></p>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#1A1A1A' }}>
                      <td className="border border-white p-3 font-semibold text-white">Delivery Time</td>
                      <td className="border border-white p-3 text-white">{termsAndConditions.deliveryTime}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#2D2D2D' }}>
                      <td className="border border-white p-3 font-semibold text-white">Operation & Maintenance</td>
                      <td className="border border-white p-3 text-white">
                        <ul className="list-disc list-inside space-y-1">
                          {termsAndConditions.operationMaintenance.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#1A1A1A' }}>
                      <td className="border border-white p-3 font-semibold text-white">Net Metering</td>
                      <td className="border border-white p-3 text-white">
                        <p className="font-semibold mb-2">{termsAndConditions.netMetering.heading}</p>
                        <ul className="list-disc list-inside space-y-1">
                          {termsAndConditions.netMetering.documents.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#2D2D2D' }}>
                      <td className="border border-white p-3 font-semibold text-white">Bahria Housing Society</td>
                      <td className="border border-white p-3 text-white">{termsAndConditions.bahriaHousing.document}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 9: Main Quotation Table */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#FFFFFF', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#FFFFFF', width: '100%', height: '100%' }}>
                <QuotationHeader />
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#4A90E2' }}>Quotation Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <strong>Quotation Number:</strong> {quotationData.quotationNumber}
                </div>
                <div>
                    <strong>Date:</strong> {quotationData.quotationDate}
                </div>
              </div>
            </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-800">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-800 p-2">Ser No</th>
                      <th className="border border-gray-800 p-2 text-left">Description</th>
                      <th className="border border-gray-800 p-2">QTY</th>
                      <th className="border border-gray-800 p-2">UoM</th>
                      <th className="border border-gray-800 p-2">Rate</th>
                      <th className="border border-gray-800 p-2">Total (Rs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.items.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-800 p-2 text-center">{index + 1}</td>
                        <td className="border border-gray-800 p-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="border border-gray-800 p-2">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-center"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                        </td>
                        <td className="border border-gray-800 p-2">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => updateItem(index, 'unit', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-center"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                        </td>
                        <td className="border border-gray-800 p-2">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-right"
                            style={{ backgroundColor: '#FFFFFF' }}
                          />
                        </td>
                        <td className="border border-gray-800 p-2 text-right">{item.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-200 font-bold">
                      <td colSpan="5" className="border border-gray-800 p-2 text-right">Subtotal:</td>
                      <td className="border border-gray-800 p-2 text-right">{quotationData.subtotal.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-gray-200">
                      <td colSpan="5" className="border border-gray-800 p-2 text-right">Tax (5%):</td>
                      <td className="border border-gray-800 p-2 text-right">{quotationData.tax.toLocaleString()}</td>
                      </tr>
                      <tr className="bg-blue-600 text-white font-bold text-lg">
                      <td colSpan="5" className="border border-gray-800 p-2 text-right">Total:</td>
                      <td className="border border-gray-800 p-2 text-right">{quotationData.total.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Payment Plan:</h3>
                  <p>Advance: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.advance}</span></p>
                  <p>Complete of Installation: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.installation}</span></p>
                  <p>Net Metering: <span className="font-bold" style={{ color: '#DC2626' }}>{termsAndConditions.paymentTerms.netMetering}</span></p>
              </div>
                <div>
                  <h3 className="font-bold mb-2">Account Details:</h3>
                  <p>Account Title: {accountDetails.accountTitle}</p>
                  <p>Bank: {accountDetails.bank}</p>
                  <p>A/C No: {accountDetails.accountNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-1">Received (1ST Inst):</label>
                  <input
                    type="number"
                    value={quotationData.received1st}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setQuotationData(prev => ({
                        ...prev,
                        received1st: val,
                        balance: prev.total - val - prev.received2nd
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Received (2nd Inst):</label>
                  <input
                    type="number"
                    value={quotationData.received2nd}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setQuotationData(prev => ({
                        ...prev,
                        received2nd: val,
                        balance: prev.total - prev.received1st - val
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    style={{ backgroundColor: '#FEF3C7' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Balance:</label>
                  <input
                    type="number"
                    value={quotationData.balance}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
              </div>

            <div className="mb-6">
                <h3 className="font-bold mb-2">Warranty:</h3>
                <p className="text-sm mb-2">A grade Solar Panels with documents</p>
                <table className="w-full border-collapse border border-gray-800">
                  <tbody>
                    <tr>
                      <td className="border border-gray-800 p-2">Comprehensive Warranty</td>
                      <td className="border border-gray-800 p-2">{warrantyInfo.comprehensive}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-800 p-2">Solar Panels Product</td>
                      <td className="border border-gray-800 p-2">{warrantyInfo.solarPanelsProduct}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 p-2">Solar Panels Performance Warranty</td>
                      <td className="border border-gray-800 p-2">{warrantyInfo.solarPanelsPerformance}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-800 p-2">Solar Inverter</td>
                      <td className="border border-gray-800 p-2">{warrantyInfo.solarInverter}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>

            {/* PAGE 10: Project Timeline & Contract */}
            <div className="page-break p-8 border-2 border-gray-200 rounded-lg" style={{ backgroundColor: '#2D2D2D', minHeight: '29.7cm' }}>
              <div style={{ backgroundColor: '#2D2D2D', width: '100%', height: '100%' }}>
                <QuotationHeader />
              <h2 className="text-2xl font-bold mb-4 underline" style={{ color: '#A0522D' }}>Project Time Line</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse" style={{ backgroundColor: '#FFFFFF' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#4A90E2' }}>
                      <th className="border border-gray-800 p-3 text-white">Ser</th>
                      <th className="border border-gray-800 p-3 text-left text-white">Task</th>
                      <th className="border border-gray-800 p-3 text-white">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationData.timeline.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-800 p-3 text-center">{index + 1}</td>
                        <td className="border border-gray-800 p-3">{item.task}</td>
                        <td className="border border-gray-800 p-3">
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => updateTimeline(index, 'date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Enter date"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-4 text-white">Signatures:</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="mb-2 text-white">Client/ Representative:</p>
                    <div className="border-b-2 border-gray-400 h-12"></div>
                  </div>
                  <div>
                    <p className="mb-2 text-white">Al Muslim Engineering:</p>
                    <div className="border-b-2 border-gray-400 h-12"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 underline" style={{ color: '#4A90E2' }}>Project Contract Agreement</h2>
                <p className="mb-4 text-white">
                  I Mr./Mrs./Miss. __________, resident of __________, has agreed on all the terms and conditions provided by Al-Muslim Engineering.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2 text-white">Inspection:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-white">
                      {contractClauses.inspection.map((clause, idx) => (
                        <li key={idx}>{clause}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white">Delivery:</h3>
                    <p className="text-sm text-white">{contractClauses.delivery}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white">Modifications or Improvement:</h3>
                    <p className="text-sm text-white">{contractClauses.modifications}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white">Installation:</h3>
                    <p className="text-sm text-white">{contractClauses.installation}</p>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-6 p-4 text-center text-sm text-white" style={{ backgroundColor: '#4A90E2' }}>
                {companyInfo.address}
              </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 p-4 flex flex-wrap gap-3 justify-end mt-8">
            <button
              onClick={handleSaveQuotation}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiCheckCircle />
              Save Quotation
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <FiDownload />
              Export PDF
            </button>
            <button
              onClick={exportToWord}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiDownload />
              Export Word
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationGenerator;
