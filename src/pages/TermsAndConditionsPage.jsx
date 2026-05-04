import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiFileText } from 'react-icons/fi';

const TermsAndConditionsPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions | Al-Muslim Engineering";
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-16 mb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FiFileText className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-gray-700 space-y-8">
          


          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiCheckCircle className="text-blue-600" />
              1. Quotation Validity & Pricing
            </h2>
            <p className="leading-relaxed">
              Due to fluctuations in the Pakistani currency (PKR) and global solar panel market rates, <strong>all quotations provided are strictly valid for 7-14 days</strong> from the date of issuance unless explicitly stated otherwise.
            </p>
            <p className="leading-relaxed">
              We utilize Tier-1 brands (e.g., Longi, Jinko, JA Solar) for panels and high-quality inverters (e.g., Growatt, Huawei, Sungrow). Final pricing is subject to the exact physical site conditions evaluated during our engineer's survey.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiCheckCircle className="text-green-600" />
              2. Payment Terms & Financing Options
            </h2>
            <p className="leading-relaxed">
              Standard cash payment terms require a <strong>50% advance payment</strong> upon signing the agreement, 40% upon equipment delivery at the site, and the remaining 10% upon successful installation and testing.
            </p>
            <p className="leading-relaxed">
              If utilizing our 0% markup EMI plans or Bank Financing (such as the SBP Green Scheme), terms are strictly dictated by the respective financial institution. Al-Muslim Engineering coordinates the process but holds no liability for bank approvals or delays.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiCheckCircle className="text-purple-600" />
              3. Processing Timelines & WAPDA / NEPRA Dependencies
            </h2>
            <p className="leading-relaxed">
              Our standard physical installation timeline spans <strong>1-2 weeks</strong> from equipment delivery. However, for <strong>On-Grid and Hybrid systems</strong>, net metering is entirely dependent on government departments.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Net Metering Delays:</strong> Under 2026 operational standards, WAPDA/NEPRA processing can take <strong>4 to 8 weeks</strong>.</li>
              <li>Al-Muslim Engineering processes all net-metering applications efficiently on your behalf but cannot be held legally liable for delays caused by WAPDA, LESCO/IESCO, NEPRA, or load extension issues from the grid side.</li>
              <li>Clients are responsible for ensuring correct property ownership documents, recent bills, and CNIC are provided as requested.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiCheckCircle className="text-red-600" />
              4. Warranties & Guarantee
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Solar Panels:</strong> Upto 25 Years linear performance warranty by the manufacturer.</li>
              <li><strong>Inverters:</strong> Standard 5 to 10 Years warranty depending strictly on the manufacturer.</li>
              <li><strong>Workmanship & Structure:</strong> 1-year free workmanship guarantee and 10-years structure warranty provided directly by Al-Muslim Engineering.</li>
            </ul>
            <p className="leading-relaxed text-sm text-gray-500 mt-2">
              * Note: Warranties are void if the system is tampered with by unauthorized personnel, affected by acts of God (natural disasters), or subjected to extreme undervoltage/overvoltage from the utility grid bypassing safety breakers.
            </p>
          </section>

          <section className="space-y-4 border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900">5. Contact Information</h2>
            <p className="leading-relaxed">
              For any disputes, clarifications on terms, or to request a site survey:
            </p>
            <p className="font-semibold mt-2">Email: info@almuslimengineering.com</p>
            <p className="font-semibold">Office: Al Muslim engineering solar system and cooling center, Rawalpindi</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
