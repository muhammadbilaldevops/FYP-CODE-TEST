import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { FiShield, FiLock, FiDatabase, FiServer, FiFileText } from 'react-icons/fi';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy | Al-Muslim Engineering";
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white py-16 mb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FiShield className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your privacy is our priority. Last updated: May 2026
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-gray-700 space-y-8">
          
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiFileText className="text-blue-600" />
              1. Introduction & 2026 Compliance
            </h2>
            <p className="leading-relaxed">
              Welcome to Al-Muslim Engineering. We are committed to protecting your personal information and your right to privacy. This Privacy Policy is fully compliant with the <strong>Prevention of Electronic Crimes Act (PECA) 2016</strong> and the <strong>current 2026 Personal Data Protection regulations of Pakistan</strong>. 
            </p>
            <p className="leading-relaxed">
              When you visit our website, use our Solar Calculator, or request a quotation, you trust us with your personal information. We take this responsibility very seriously.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiDatabase className="text-green-600" />
              2. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, particularly for solar installations and Net Metering.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Info:</strong> Full Name, Contact Numbers (Call/WhatsApp), Email Address.</li>
              <li><strong>Physical Address:</strong> Required for site surveys and installation logistics across Pakistan.</li>
              <li><strong>Utility Data:</strong> Electricity bills (WAPDA/IESCO/LESCO, etc.), required for accurately sizing your system and processing NEPRA/WAPDA net metering applications.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiServer className="text-purple-600" />
              3. How We Use Your Information 
            </h2>
            <p className="leading-relaxed">
              We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, and compliance with our legal obligations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Net Metering Processing:</strong> Sharing necessary documents (CNIC, Property papers, Bills) with WAPDA, NEPRA, and AEDB to facilitate your net metering approvals.</li>
              <li><strong>Quotations & Sizing:</strong> Using your bill details in our internal systems to recommend the optimal solar system capacity.</li>
              <li><strong>Communication:</strong> Reaching out to you regarding installation updates, maintenance schedules, or answering queries via our Chatbot or support staff.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <FiLock className="text-red-600" />
              4. Data Security & Storage
            </h2>
            <p className="leading-relaxed">
              As per 2026 data protection standards in Pakistan, we implement appropriate technical and organizational security measures designed to protect the security of any personal information we process.
            </p>
            <p className="leading-relaxed">
              We <strong>do not sell or rent</strong> your personal information or utility data to standard marketing agencies. Your CNIC and property data are strictly safeguarded and used exclusively for official government/WAPDA processing. 
            </p>
          </section>

          <section className="space-y-4 border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this privacy policy or your data rights under Pakistani law, you may email us at <strong>info@almuslimengineering.com</strong>, or contact our coordinators directly at:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mt-4 w-fit">
              <p><strong>Amir (Solar Manager):</strong> 0341 9231892</p>
              <p><strong>Mubashir (Solar Coordinator):</strong> 0331 8441722</p>
              <p><strong>Office:</strong> Al Muslim engineering solar system and cooling center, Rawalpindi</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
