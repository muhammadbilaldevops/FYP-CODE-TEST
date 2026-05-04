/**
 * ENHANCED CHATBOT COMPONENT
 * 
 * Interactive chatbot for customer support with bilingual support.
 * 
 * Student Note: This component provides:
 * - Interactive chat interface for customer queries
 * - Bilingual support (Urdu/English)
 * - Smart responses based on user input
 * - Contact and visit options
 * - Navigation to contact page
 * - Real-life Pakistani context responses
 * 
 * Key Features:
 * - Floating chat button (always visible)
 * - Expandable chat window
 * - Message history
 * - Auto-scroll to latest message
 * - Pattern matching for user queries
 * - Context-aware responses
 * 
 * Technical Concepts:
 * - useState: Manages chat state (open/close, messages, options)
 * - useRef: References DOM element for scrolling
 * - useEffect: Auto-scroll and delayed messages
 * - useNavigate: Programmatic navigation
 * - Pattern matching: Regular expressions for query detection
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiX, FiSend, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

/**
 * Chatbot Component
 * 
 * Renders an interactive chat widget for customer support.
 * 
 * @param {boolean} isVisible - Controls visibility of chatbot button (default: true)
 * @returns {JSX.Element} The chatbot component
 */
const Chatbot = ({ isVisible = true, onChatbotStateChange }) => {
  // Translation and language hooks
  const { t, language } = useTranslation()
  
  // State to track if chat window is open
  // Student Note: false = closed (only button visible), true = open (full chat window)
  const [isOpen, setIsOpen] = useState(false);

  // Notify parent of state changes
  useEffect(() => {
    if (onChatbotStateChange) {
      onChatbotStateChange(isOpen);
    }
  }, [isOpen, onChatbotStateChange]);
  
  // State to track if contact option has been shown
  // Student Note: Prevents showing contact option multiple times
  const [showContactOption, setShowContactOption] = useState(false);
  
  // State to track if visit option has been shown
  // Student Note: Prevents showing visit option multiple times
  const [showVisitOption, setShowVisitOption] = useState(false);
  
  // Navigation hook for programmatic routing
  const navigate = useNavigate();
  
  // State to store all chat messages
  // Student Note: Array of message objects with id, text, sender, timestamp, type
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'ur' 
        ? "Assalam-o-Alaikum! 👋\n\nMain Al-Muslim Engineering ka solar assistant hoon."
        : "Hello! 👋\n\nI'm Al-Muslim Engineering's solar assistant.",
      sender: 'bot',
      timestamp: new Date(),
      type: 'greeting'
    }
  ]);
  
  // State to store user input text
  // Student Note: Current text in input field
  const [inputText, setInputText] = useState('');
  
  // Ref to scroll to bottom of messages
  // Student Note: useRef provides direct access to DOM element
  const messagesEndRef = useRef(null);

  /**
   * Auto Scroll to Bottom Effect
   * 
   * Student Note: This effect automatically scrolls to the bottom
   * of the messages container whenever new messages are added.
   * This ensures users always see the latest message.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Re-run when messages array changes

  /**
   * Scroll to Bottom Function
   * 
   * Student Note: Scrolls the messages container to show the latest message.
   * Uses smooth scrolling for better UX.
   */
  const scrollToBottom = () => {
    // Optional chaining (?.) safely accesses ref if it exists
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Show Contact Option Effect
   * 
   * Student Note: This effect shows a contact question after the initial greeting.
   * It waits 1.5 seconds after the greeting message to create a natural conversation flow.
   * 
   * Fix: Added useRef to prevent duplicate messages by tracking if question was already added.
   */
  const contactQuestionAdded = useRef(false);
  
  useEffect(() => {
    // Only show if there's one message (greeting) and contact option hasn't been shown
    // AND question hasn't been added yet (prevent duplicates)
    if (messages.length === 1 && !showContactOption && !contactQuestionAdded.current) {
      const timeoutId = setTimeout(() => {
        // Check again to prevent race conditions
        if (!contactQuestionAdded.current) {
          const contactQuestion = {
            id: 2,
            text: language === 'ur' 
              ? "Kya aap humse contact karna chahte hain apne solar installation ya inspection ke liye? Ya phir aap details ke liye call karna chahte hain?"
              : "Would you like to contact us for your solar installation or inspection? Or would you like to call us for further details?",
            sender: 'bot',
            timestamp: new Date(),
            type: 'contact_question',
            showOptions: true
          };
          // Add new message to messages array
          setMessages(prev => [...prev, contactQuestion]);
          setShowContactOption(true);
          contactQuestionAdded.current = true; // Mark as added
        }
      }, 1500); // Wait 1.5 seconds before showing
      
      // Cleanup timeout if component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, showContactOption, language]);

  /**
   * Get Language-Appropriate Text from Bilingual Strings
   * 
   * Student Note: This helper function extracts the correct language
   * from bilingual strings that use "|" as a separator.
   * 
   * Format: "Urdu text | English text"
   * 
   * @param {string} bilingualText - Text with both languages separated by "|"
   * @returns {string} Text in current language
   */
  const getLanguageText = (bilingualText) => {
    if (!bilingualText) return '';
    // Split by "|" separator
    const parts = bilingualText.split('|');
    if (language === 'ur') {
      // Return Urdu part (before |) or full text if no separator
      return parts[0]?.trim() || bilingualText;
    } else {
      // Return English part (after |) or full text if no separator
      return parts[1]?.trim() || parts[0]?.trim() || bilingualText;
    }
  };

  /**
   * Get Bot Response Based on User Message
   * 
   * Student Note: This function analyzes user input and returns appropriate responses.
   * It uses pattern matching (regular expressions) to detect user intent.
   * 
   * How it works:
   * 1. Converts user message to lowercase for case-insensitive matching
   * 2. Checks message against various patterns (keywords)
   * 3. Returns appropriate response based on matched pattern
   * 4. Handles bilingual queries (Urdu and English)
   * 
   * Pattern Matching Strategy:
   * - Uses .match() with regular expressions
   * - Checks for keywords related to different topics
   * - Returns contextually relevant responses
   * - Provides real-life Pakistani examples
   * 
   * Response Types:
   * - 'text': Simple text response
   * - 'redirect': Redirects to contact page
   * - 'location': Shows office location
   * - 'pricing': Shows pricing information
   * - 'system_type': Explains system types
   * - 'installation': Installation timeline
   * - 'savings': Savings calculations
   * 
   * @param {string} userMessage - The user's input message
   * @returns {Object} Response object with text and type
   */
  const getBotResponse = (userMessage) => {
    // Convert to lowercase for case-insensitive matching
    // Student Note: This ensures "Hello", "HELLO", "hello" all match
    const lowerMessage = userMessage.toLowerCase();
    
    // Exit/Close commands
    if (lowerMessage.match(/bye|goodbye|exit|close|quit|khuda hafiz|allah hafiz|leave|stop|band|rukna|bas/)) {
      const exitText = language === 'ur'
        ? `Shukriya! 🙏\n\nAgar future mein koi help chahiye to:\n• Call: 0341 9231892 (Amir Solar Manager)\n• WhatsApp: 0331 8441722 (Mubashir Solar Coordinator)\n• Office: Al Muslim engineering solar system and cooling center, Rawalpindi\n\nAllah aapko khush rakhe! ☀️`
        : `Thank you! 🙏\n\nFor future help:\n• Call: 0341 9231892 (Amir Solar Manager)\n• WhatsApp: 0331 8441722 (Mubashir Solar Coordinator)\n• Office: Al Muslim engineering solar system and cooling center, Rawalpindi\n\nMay Allah bless you! ☀️`;
      return {
        text: exitText,
        type: 'text'
      };
    }
    
    // Yes responses for contact
    if (lowerMessage.match(/^haan|^yes|^bilkul|^zaroor|^theek|^ok|^okay|^contact|^call|^installation|^inspection|^lagwana|^lagana|^karwana/)) {
      if (!showVisitOption) {
        // First yes - redirect to contact
        setTimeout(() => {
          navigate('/contact');
          setIsOpen(false);
        }, 500);
        const redirectText = language === 'ur'
          ? `Bilkul! ✅\n\nMain aapko Contact page pe le ja raha hoon jahan aap:\n• Direct call kar sakte hain\n• WhatsApp kar sakte hain\n• Office address dekh sakte hain\n• Free consultation request kar sakte hain`
          : `Perfect! ✅\n\nI'm taking you to the Contact page where you can:\n• Make a direct call\n• Send WhatsApp\n• See office address\n• Request free consultation`;
        return {
          text: redirectText,
          type: 'redirect',
          redirect: true
        };
      }
    }
    
    // No responses - Directly show office location and redirect
    if (lowerMessage.match(/^nahi|^no|^na|^mat|^nhi|^not/)) {
      if (showContactOption && !showVisitOption) {
        // First no - directly show office location and redirect to contact page
        setShowVisitOption(true); // Mark as shown to prevent duplicate
        
        // Navigate to contact page with office location anchor
        setTimeout(() => {
          navigate('/contact#office-location');
          setIsOpen(false);
        }, 1500);
        
        // Return office location message
        return {
          text: language === 'ur'
            ? `Bilkul! ✅\n\n📍 Hamara Office:\n\nAl Muslim engineering solar system and cooling center\nRawalpindi, Pakistan\n\n📞 Contact:\n• Amir Solar Manager: 0341 9231892\n• Mubashir Solar Coordinator: 0331 8441722\n\n⏰ Office Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\n\n🚗 Home visit bhi available hai! Call karke appointment lein.\n\n📍 Main aapko Contact page pe le ja raha hoon jahan detailed address aur map milega!`
            : `Perfect! ✅\n\n📍 Our Office:\n\nAl Muslim engineering solar system and cooling center\nRawalpindi, Pakistan\n\n📞 Contact:\n• Amir Solar Manager: 0341 9231892\n• Mubashir Solar Coordinator: 0331 8441722\n\n⏰ Office Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\n\n🚗 Home visits also available! Call to book an appointment.\n\n📍 I'm taking you to the Contact page where you'll find detailed address and map!`,
          type: 'location',
          showContactLink: true,
          redirect: true,
          redirectToOffice: true // Flag to redirect to office section
        };
      }
    }
    
    // Yes for visit
    if (lowerMessage.match(/^haan|^yes|^bilkul|^zaroor|^theek|^ok|^okay|^visit|^aana|^janna|^office|^location|^address/) && showVisitOption) {
      return {
        text: `Bilkul! ✅\n\n📍 Hamara Office:\n\nAl Muslim engineering solar system and cooling center\nRawalpindi, Pakistan\n\n📞 Contact:\n• Amir Solar Manager: 0341 9231892\n• Mubashir Solar Coordinator: 0331 8441722\n\n⏰ Office Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\n\n🚗 Home visit bhi available hai! Call karke appointment lein.\n\n📍 Detailed address aur map ke liye Contact page visit karein!\n\n| Perfect! Our office:\n\nAl Muslim engineering solar system and cooling center\nRawalpindi, Pakistan\n\nContact:\n• Amir: 0341 9231892\n• Mubashir: 0331 8441722\n\nOffice Hours: Mon-Fri 9AM-5PM, Sat 10AM-2PM\n\nFor detailed address and map, visit Contact page!`,
        type: 'location',
        showContactLink: true
      };
    }
    
    // Greetings - More varied
    if (lowerMessage.match(/hello|hi|hey|salam|assalam|adaab|salam.*alaikum|namaste|kaise|how/)) {
      const greetings = language === 'ur' ? [
        "Wa-Alaikum-Salam! 😊 Kaise hain aap? Main aapki solar system ke baare mein kisi bhi sawaal ka jawab de sakta hoon.",
        "Salam! 👋 Aapko solar system ke baare mein kya jaanna hai? Main detailed information de sakta hoon.",
        "Adaab! 😊 Kaise madad kar sakta hoon? Aap solar system ke baare mein kuch bhi puchh sakte hain."
      ] : [
        "Hello! 😊 How are you? I can answer any questions about solar systems.",
        "Hello! 👋 What would you like to know about solar systems?",
        "Welcome! 😊 How can I help? You can ask anything about solar systems."
      ];
      return {
        text: greetings[Math.floor(Math.random() * greetings.length)],
        type: 'text'
      };
    }
    
    // Cost/Price queries - Real-life Pakistani context
    if (lowerMessage.match(/cost|price|expensive|cheap|budget|kitna|qemat|rate|charges|paisa|amount|rupees|kharcha|lagat/)) {
      const responses = [
        `Solar system ki qemat system size aur type ke mutabiq hoti hai:\n\n💰 Approximate Prices (PKR):\n• 3KW On-Grid: Rs. 3-3.5 lakh\n• 5KW On-Grid: Rs. 4.5-5.5 lakh\n• 10KW On-Grid: Rs. 9-11 lakh\n• 15KW Hybrid: Rs. 18-22 lakh\n• 20KW Hybrid: Rs. 24-28 lakh\n\n💡 Price depend karta hai:\n• System type (On-Grid/Hybrid/Off-Grid)\n• Panel brand (Longi, Jinko, JA, etc.)\n• Inverter quality (Growatt, Huawei, Sungrow)\n• Battery (agar hybrid/off-grid ho)\n• Installation location\n• Roof type aur structure\n\n📞 Exact quote ke liye:\n• Call: 0341 9231892\n• WhatsApp: 0331 8441722\n\n| Solar prices vary by size and type. For exact quote, call or WhatsApp us!`,
        `Qemat system ke size pe depend karti hai. Main aapko approximate idea deta hoon:\n\n💵 Price Range:\n• Chota (3-5KW): Rs. 3-5 lakh\n• Medium (10-15KW): Rs. 9-18 lakh\n• Bara (20KW+): Rs. 20+ lakh\n\n✅ Hum flexible payment options bhi dete hain:\n• Bank financing (SBP Green Scheme)\n• 0% markup EMI plans\n• 50% down payment\n\nAapka monthly bill kitna hai? Uske hisaab se main exact system suggest kar sakta hoon.\n\n| Prices vary by size. We offer flexible payment options. What's your monthly bill?`,
        `Solar system ki qemat aapke monthly bill aur zarurat ke mutabiq hoti hai.\n\n💡 Example:\n• Agar aapka bill Rs. 15,000/month hai → 5KW system → Rs. 4.5-5.5 lakh\n• Agar aapka bill Rs. 30,000/month hai → 10KW system → Rs. 9-11 lakh\n• Agar aapka bill Rs. 50,000/month hai → 15KW system → Rs. 18-22 lakh\n\n📊 Benefits:\n• 3-5 saal mein paisa wapas\n• 25+ saal tak free electricity\n• Load shedding se freedom\n\nAapka current monthly bill kitna hai?\n\n| Solar prices depend on your monthly bill. What's your current monthly bill?`
      ];
      return {
        text: responses[Math.floor(Math.random() * responses.length)],
        type: 'pricing',
        showPricingOptions: true
      };
    }
    
    // System types - Real-life explanations
    if (lowerMessage.match(/on-grid|on grid|grid.*tied|net.*metering|wapda.*sell|grid.*connect|net.*meter/)) {
      return {
        text: `🌞 On-Grid Solar System (Net Metering):\n\n✅ Kya Hota Hai:\n• WAPDA grid se connected\n• Excess units WAPDA ko bech sakte hain\n• Electricity bill zero ho sakta hai\n• Batteries ki zarurat nahi\n• Net metering approved\n\n💡 Real-Life Example:\n• Din mein: Solar se 50 units generate\n• Apne use: 30 units\n• WAPDA ko sell: 20 units (credit milta hai)\n• Raat mein: WAPDA se 30 units lete hain\n• Result: Bill zero! ✅\n\n📊 Savings:\n• Up to 100% bill reduction\n• 3-5 years payback period\n• 25+ years system life\n\n🏠 Best For:\n• Stable grid areas (load shedding kam)\n• Maximum savings chahiye\n• WAPDA connection strong hai\n\nAapke area mein load shedding kitni hoti hai?\n\n| On-Grid connects to WAPDA. Excess units sold back. Up to 100% bill reduction. Best for stable grid areas.`,
        type: 'system_type',
        showSystemTypeOptions: true
      };
    }
    
    if (lowerMessage.match(/hybrid|backup|battery|load.*shedding|loadshedding|bijli.*cut|power.*cut|backup.*chahiye/)) {
      return {
        text: `🔋 Hybrid Solar System (With Backup):\n\n✅ Kya Hota Hai:\n• Solar panels + Battery storage\n• Grid se bhi connected\n• Load shedding mein backup power\n• Excess units WAPDA ko bech sakte hain\n• 24/7 power availability\n\n💡 Real-Life Example:\n• Din mein: Solar se charge + use\n• Load shedding: Battery se backup (2-4 hours)\n• Excess: WAPDA ko sell\n• Raat: Battery ya grid se\n• Result: 60-70% bill kam + backup! ✅\n\n📊 Savings:\n• 60-70% bill reduction\n• Complete backup during load shedding\n• 4-6 years payback period\n\n🏠 Best For:\n• Frequent load shedding areas\n• Backup chahiye (fridge, fans, lights)\n• Bill bhi kam karna hai\n\nAapke area mein load shedding kitni hoti hai? (2-4 hours daily?)\n\n| Hybrid provides backup during load shedding + 60-70% bill reduction. Best for areas with frequent power cuts.`,
        type: 'system_type',
        showSystemTypeOptions: true
      };
    }
    
    if (lowerMessage.match(/off-grid|off grid|independent|remote|grid.*nahi|standalone|alag/)) {
      return {
        text: `⚡ Off-Grid Solar System (Complete Independence):\n\n✅ Kya Hota Hai:\n• Grid se bilkul alag\n• Complete energy independence\n• Battery storage included\n• 24/7 power availability\n• Zero electricity bills\n\n💡 Real-Life Example:\n• Solar panels se charge\n• Battery mein store (enough for 2-3 days)\n• Direct use from battery\n• Grid ki zarurat nahi\n• Result: 100% independent! ✅\n\n📊 Benefits:\n• 100% energy independence\n• No WAPDA dependency\n• Zero electricity bills\n• Perfect for remote areas\n\n🏠 Best For:\n• Remote areas (grid nahi hai)\n• Farms, factories, remote locations\n• Complete independence chahiye\n• WAPDA connection nahi hai\n\nKya aapke area mein grid connection available hai?\n\n| Off-Grid provides complete independence. No grid needed. Perfect for remote areas, farms, factories.`,
        type: 'system_type',
        showSystemTypeOptions: true
      };
    }
    
    // Installation timeline - Real-life timeline
    if (lowerMessage.match(/install|installation|kitne.*din|time|duration|kab.*lag|lag.*sakta|when|timeline|kab|kaise/)) {
      return {
        text: `⏱️ Installation Process & Timeline:\n\n📅 Step-by-Step (Real-Life):\n1️⃣ Site Survey: 1-2 din (free, engineer aata hai)\n2️⃣ Proposal & Quotation: 2-3 din (detailed quote)\n3️⃣ Equipment Delivery: 3-14 din (location ke hisaab se)\n4️⃣ Installation: 3-7 din (system size ke mutabiq)\n   • 5KW: 3-4 din\n   • 10KW: 4-5 din\n   • 15KW+: 5-7 din\n5️⃣ Testing & Commissioning: 1-2 din\n6️⃣ Net Metering Application: Hum karte hain\n7️⃣ WAPDA Approval: 15-30 din (WAPDA process)\n\n⏰ Total Timeline:\n• Installation: 1-2 weeks\n• Complete (with net metering): 4-8 weeks\n\n✅ Hum Sab Handle Karte Hain:\n• Free site survey (engineer aata hai)\n• Equipment procurement\n• Professional installation\n• WAPDA coordination\n• Net metering documentation\n• Follow-up aur support\n\n📞 Free site survey ke liye:\n• Call: 0341 9231892\n• WhatsApp: 0331 8441722\n\n| Installation takes 1-2 weeks. Complete process with net metering takes 4-8 weeks. We handle everything!`,
        type: 'installation',
        showInstallationOptions: true
      };
    }
    
    // Savings - Real-life examples
    if (lowerMessage.match(/save|saving|savings|benefit|advantage|kitna.*bach|bach.*sakta|profit|faida|munafa/)) {
      const savingsExamples = [
        `💰 Solar System Savings (Real-Life Examples):\n\n📊 Bill Reduction:\n• On-Grid: Up to 100% (net metering se)\n• Hybrid: 60-70% + backup power\n• Off-Grid: 100% bill elimination\n\n💡 Real Example:\nAgar aapka monthly bill Rs. 20,000 hai:\n• 10KW On-Grid system: ~Rs. 18,000/month savings\n• Yearly: ~Rs. 216,000 savings\n• 5 years: ~Rs. 1,080,000 savings\n• System cost: ~Rs. 1,000,000\n• Net profit 5 years mein: ~Rs. 80,000\n• 25 years mein: ~Rs. 5,400,000 total savings! 🎉\n\n⏰ Payback Period:\n• On-Grid: 3-4 years\n• Hybrid: 4-6 years\n• Off-Grid: 5-7 years\n\n📱 Apne exact savings calculate karne ke liye hamara calculator use karein!\n\n| Solar can save you 60-100% on bills. Real example: Rs. 20,000/month bill → Save ~Rs. 18,000/month. Payback in 3-6 years!`,
        `Bachat ka hisaab aapke current bill pe depend karta hai:\n\n💵 Monthly Bill vs Savings:\n• Rs. 10,000/month → 5KW system → Save ~Rs. 9,000/month\n• Rs. 20,000/month → 10KW system → Save ~Rs. 18,000/month\n• Rs. 30,000/month → 15KW system → Save ~Rs. 25,000/month\n• Rs. 50,000/month → 20KW system → Save ~Rs. 40,000/month\n\n📊 5 Years Mein Total Savings:\n• 5KW: ~Rs. 540,000\n• 10KW: ~Rs. 1,080,000\n• 15KW: ~Rs. 1,500,000\n• 20KW: ~Rs. 2,400,000\n\n✅ Plus Benefits:\n• Load shedding se freedom\n• WAPDA rate increase se bachao (rates barhte hain)\n• Environment friendly\n• Property value increase\n\nAapka current monthly bill kitna hai? Main exact savings calculate kar sakta hoon.\n\n| Savings depend on your current bill. What's your monthly bill? I can calculate exact savings!`
      ];
      return {
        text: savingsExamples[Math.floor(Math.random() * savingsExamples.length)],
        type: 'savings',
        showSavingsOptions: true
      };
    }
    
    // Location/Office - With contact page link
    if (lowerMessage.match(/location|address|where|office|visit|kahan|address.*kya|dafan|jagah|place|map/)) {
      return {
        text: `📍 Hamara Office Location:\n\n🏢 Al-Muslim Engineering\nAl Muslim engineering solar system and cooling center\nRawalpindi, Pakistan\n\n📞 Contact Numbers:\n• Amir Solar Manager: 0341 9231892\n• Mubashir Solar Coordinator: 0331 8441722\n• Office: 0346-51 88 458\n\n📧 Email: info@almuslimengineering.com\n\n⏰ Office Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed\n\n🚗 Home visit bhi available hai! Call karke appointment lein.\n\n📍 Detailed address aur Google Maps ke liye Contact page visit karein!\n\n| Our office: Al Muslim engineering solar system and cooling center, Rawalpindi. Contact: 0341 9231892. Visit Contact page for detailed address and map!`,
        type: 'location',
        showContactLink: true
      };
    }
    
    // Contact - Enhanced with call/WhatsApp options
    if (lowerMessage.match(/contact|call|phone|email|reach|number|mobile|whatsapp|baat|connect|baat.*karni/)) {
      return {
        text: `📞 Contact Al-Muslim Engineering:\n\n📱 Phone Numbers:\n• Amir Solar Manager: 0341 9231892\n• Mubashir Solar Coordinator: 0331 8441722\n• Office: 0346-51 88 458\n\n📧 Email: info@almuslimengineering.com\n\n📍 Office:\nAl Muslim engineering solar system and cooling center\nRawalpindi\n\n⏰ Available:\nMon-Fri: 9AM-5PM\nSat: 10AM-2PM\n\n💬 WhatsApp pe bhi contact kar sakte hain!\n\nKya aapko free consultation chahiye?\n\n| Contact us: Call 0341 9231892 or WhatsApp 0331 8441722. Office in Rawalpindi. Available Mon-Fri 9AM-5PM.`,
        type: 'contact_options',
        showCallWhatsApp: true
      };
    }
    
    // Warranty - Real-life warranty info
    if (lowerMessage.match(/warranty|guarantee|maintenance|warranty.*kitna|guarantee.*kya|support|service/)) {
      return {
        text: `🛡️ Warranty & Support:\n\n✅ Warranty Coverage:\n• Solar Panels: 25 years performance warranty\n• Inverter: 5-10 years (brand ke hisaab se)\n• Structure: 10 years\n• Installation: 1 year workmanship warranty\n• Battery: 3-5 years (agar included ho)\n\n🔧 Maintenance Packages:\n• Annual maintenance available\n• 24/7 support hotline\n• Performance monitoring\n• Emergency repairs\n• Cleaning services\n\n💡 Quality Assurance:\n• Hum Tier-1 brands use karte hain (Longi, Jinko, JA)\n• NEPRA approved systems\n• ISO certified installation\n• All products genuine aur reliable\n• Local warranty support\n\n📞 Maintenance ke liye:\n• Call: 0341 9231892\n• WhatsApp: 0331 8441722\n\n| We provide 25 years panel warranty, 5-10 years inverter warranty. 24/7 support available! All Tier-1 brands with local warranty.`,
        type: 'text'
      };
    }
    
    // Net metering documents - Real-life documents
    if (lowerMessage.match(/document|paper|required|need.*net.*metering|documents.*kya|papers|doc|kaagaz/)) {
      return {
        text: `📄 Net Metering Documents (Real Requirements):\n\nRequired Documents:\n✓ Latest Electric Bill (WAPDA/IESCO/LESCO) - original copy\n✓ CNIC Copy (front & back) - attested\n✓ Extension of Load (agar needed) - WAPDA se\n✓ Allotment Letter/Registry - property proof\n✓ Completion Certificate (if applicable) - new construction\n✓ NOC (if required by society) - society approval\n✓ Property ownership proof - registry/lease\n\n✅ Hum Aapki Madad Karte Hain:\n• Complete document list provide karte hain\n• Document preparation guidance\n• WAPDA coordination (hum karte hain)\n• Application submission (hum karte hain)\n• Follow-up aur updates (regular)\n• Approval tak complete support\n\n📞 Document assistance ke liye:\n• Call: 0341 9231892\n• WhatsApp: 0331 8441722\n\n| We help with all net metering documentation. We handle WAPDA coordination and application submission. Call or WhatsApp for assistance!`,
        type: 'text'
      };
    }
    
    // Calculator
    if (lowerMessage.match(/calculator|calculate|estimate|size|kitna.*kw|system.*size|measure|hisab/)) {
      return {
        text: `🧮 Solar Calculator:\n\nHamare calculator se aap:\n✓ Apne liye sahi system size find kar sakte hain\n✓ Cost & savings estimate kar sakte hain\n✓ Payback period calculate kar sakte hain\n✓ Environmental impact dekh sakte hain\n✓ Monthly generation estimate\n\n📱 Use Karne Ka Tarika:\n1. Quote page pe jayein (/quote)\n2. Calculator section mein apni details enter karein:\n   • Monthly electricity bill (kitna aata hai)\n   • Electricity rate per unit (bill pe likha hota hai)\n   • System type preference (On-Grid/Hybrid)\n   • Available roof space (kitna jagah hai)\n3. Instant results dekhein\n\n💡 Ya directly hamse call karein for free consultation:\n• 0341 9231892\n• WhatsApp: 0331 8441722\n\n| Use our calculator on Quote page to find your perfect system size and savings! Or call for free consultation.`,
        type: 'text'
      };
    }
    
    // Financing options
    if (lowerMessage.match(/financing|loan|emi|installment|qist|bank|financing.*options|payment.*plan/)) {
      return {
        text: `💳 Financing Options:\n\n✅ Hum Do Options Dete Hain:\n\n1️⃣ Bank Financing (SBP Green Scheme):\n• Sab banks se loan available\n• 5KW se 100KW tak\n• Low interest rates\n• Easy approval process\n\n2️⃣ 0% Markup EMI Plan:\n• 0% markup (koi interest nahi)\n• 50% down payment\n• 6-12 months easy installments\n• Bank ki zarurat nahi\n• Up to 20KW systems\n\n💡 Example:\nAgar system Rs. 10 lakh ka hai:\n• Down payment: Rs. 5 lakh\n• Remaining: Rs. 5 lakh\n• 12 months: ~Rs. 41,666/month\n\n📞 Financing ke liye:\n• Call: 0341 9231892\n• WhatsApp: 0331 8441722\n\n| We offer bank financing (SBP Green Scheme) and 0% markup EMI plans. Call for details!`,
        type: 'text'
      };
    }
    
    // Thanks - More varied
    if (lowerMessage.match(/thank|thanks|appreciate|shukriya|jazakallah|meherbani|dhanyawad/)) {
      const thanks = [
        `Aapka bohat shukriya! 😊\n\nHum aapki madad ke liye hamesha available hain. Koi aur sawaal ho to zaroor puchhein!\n\n📞 Call: 0341 9231892\n💬 WhatsApp: 0331 8441722\n🌐 Free quote ke liye Contact page visit karein\n\nAllah aapko khush rakhe! ☀️\n\n| Thank you! We're always here to help. Call, WhatsApp, or visit Contact page for free quote!`,
        `JazakAllah Khair! 🙏\n\nHum aapki service mein hamesha ready hain.\n\nKya aap free quote ya site survey chahte hain?\n\n📞 0341 9231892\n💬 0331 8441722\n\nLet sunlight enlighten your life! ☀️\n\n| Thank you! Would you like a free quote or site survey? Call or WhatsApp us!`,
        `Shukriya! 😊\n\nAgar aapko koi aur information chahiye ya free consultation, to:\n• Call karein: 0341 9231892\n• WhatsApp: 0331 8441722\n• Office visit karein: Rawalpindi\n• Contact page visit karein\n\nHum aapke liye hamesha available hain! ☀️\n\n| Thank you! Call, WhatsApp, visit office, or check Contact page for more information!`
      ];
      return {
        text: thanks[Math.floor(Math.random() * thanks.length)],
        type: 'text'
      };
    }
    
    // Default response - More helpful and genuine
    const suggestions = [
      `Main aapki madad kar sakta hoon! 😊\n\nYe kuch topics hain jo main explain kar sakta hoon:\n\n• System types (On-Grid, Hybrid, Off-Grid)\n• Costs aur savings (real examples)\n• Installation process (step-by-step)\n• Net metering information\n• Warranty information\n• Financing options\n• Office location\n\nKya aapko in mein se kisi ke baare mein jaanna hai?\n\n| I can help with system types, costs, installation, net metering, warranty, financing, and office location!`,
      `Bilkul! Main aapki madad ke liye yahan hoon. 😊\n\nAap ye puchh sakte hain:\n\n💰 System ki qemat kitni hai? (real prices)\n🔋 Kaunsa system best hai? (On-Grid/Hybrid)\n⏱️ Installation kitne din mein ho jayega? (real timeline)\n📄 Net metering ke liye kya documents chahiye? (complete list)\n📞 Kaise contact kar sakte hain? (call/WhatsApp)\n🏠 Office kahan hai? (address)\n💳 Financing options kya hain? (bank/EMI)\n\nKya aapko koi specific sawaal hai?\n\n| I can answer questions about prices, system types, installation, documents, contact, office, and financing!`,
      `Main aapki madad karne ke liye yahan hoon! 😊\n\nAap mujhse puchh sakte hain:\n• Solar system ki complete information\n• Real price estimates (Pakistani market)\n• Installation timeline (real experience)\n• Savings calculation (real examples)\n• Contact details (call/WhatsApp)\n• Office address (with map)\n• Financing options (bank/EMI)\n\nKya aapko kisi specific topic pe information chahiye?\n\n| I'm here to help! Ask me about solar systems, prices, installation, savings, contact, office, or financing!`
    ];
    return {
      text: suggestions[Math.floor(Math.random() * suggestions.length)],
      type: 'default',
      showTopicButtons: true
    };
  };

  /**
   * Handle Send Message
   * 
   * Student Note: This function handles when user sends a message.
   * It:
   * 1. Prevents form default submission
   * 2. Validates input (not empty)
   * 3. Adds user message to chat
   * 4. Gets bot response
   * 5. Adds bot response after delay (simulates typing)
   * 6. Handles redirects if needed
   * 
   * @param {Event} e - Form submit event
   */
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Don't send empty messages
    if (inputText.trim() === '') return;
    
    // Create user message object
    // Student Note: Message structure includes id, text, sender, timestamp
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add user message to messages array
    setMessages([...messages, userMessage]);
    
    // Store input before clearing (needed for bot response)
    const currentInput = inputText;
    setInputText(''); // Clear input field
    
    // Simulate bot typing delay (1 second)
    // Student Note: setTimeout creates realistic conversation flow
    setTimeout(() => {
      // Get bot response based on user input
      const response = getBotResponse(currentInput);
      
      // Handle redirect to contact page
      // Student Note: Some responses trigger navigation
      if (response.redirect) {
        setTimeout(() => {
          navigate('/contact');
          setIsOpen(false); // Close chat window
        }, 2000); // Wait 2 seconds before redirect
      }
      
      // Create bot response message
      const botResponse = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type || 'text',
        showCallWhatsApp: response.showCallWhatsApp,
        showContactLink: response.showContactLink,
        showPricingOptions: response.showPricingOptions,
        showSystemTypeOptions: response.showSystemTypeOptions,
        showInstallationOptions: response.showInstallationOptions,
        showSavingsOptions: response.showSavingsOptions,
        showTopicButtons: response.showTopicButtons
      };
      
      // Add bot response to messages
      // Student Note: Using prev => [...prev, new] ensures we have latest state
      setMessages(prev => [...prev, botResponse]);
    }, 1000); // 1 second delay
  };

  /**
   * Handle Quick Reply
   * 
   * Student Note: This function handles quick reply button clicks.
   * It's similar to handleSendMessage but takes a predefined reply text.
   * Used for button-based interactions (e.g., "Yes", "No", topic buttons).
   * 
   * @param {string} reply - The quick reply text to send
   */
  const handleQuickReply = (reply) => {
    // Create user message from quick reply
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add user message to chat
    setMessages([...messages, userMessage]);
    
    // Simulate bot typing delay
    setTimeout(() => {
      // Get bot response
      const response = getBotResponse(reply);
      
      // Handle redirect if needed
      if (response.redirect) {
        // Check if redirect should go to office location
        const redirectPath = response.redirectToOffice ? '/contact#office-location' : '/contact';
        setTimeout(() => {
          navigate(redirectPath);
          setIsOpen(false);
          // Scroll to office location after navigation if needed
          if (response.redirectToOffice) {
            setTimeout(() => {
              const officeSection = document.getElementById('office-location');
              if (officeSection) {
                officeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 500);
          }
        }, 2000);
      }
      
      // Create bot response
      const botResponse = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type || 'text',
        showCallWhatsApp: response.showCallWhatsApp,
        showContactLink: response.showContactLink,
        showPricingOptions: response.showPricingOptions,
        showSystemTypeOptions: response.showSystemTypeOptions,
        showInstallationOptions: response.showInstallationOptions,
        showSavingsOptions: response.showSavingsOptions,
        showTopicButtons: response.showTopicButtons
      };
      
      // Add bot response
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  // Quick reply suggestions - Pakistan-focused
  const quickReplies = [
    "Kitna kharcha aayega?",
    "Net metering kya hai?",
    "Kitne din mein lag jayega?",
    "Office address?",
    "System size calculate karein"
  ];

  return (
    <>
      {/* Floating Chat Button - Mobile Responsive */}
      {!isOpen && isVisible && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40 animate-bounce"
          aria-label="Open chat"
        >
          <FiMessageSquare className="text-3xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            1
          </span>
        </button>
      )}

      {/* Chat Window - Mobile Responsive */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-3rem)] h-[calc(100vh-4rem)] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <FiMessageSquare className="text-blue-600 text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm md:text-base truncate">{t('chatbot.title')}</h3>
                <p className="text-xs text-blue-100 truncate">{t('chatbot.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowContactOption(false);
                  setShowVisitOption(false);
                  setMessages([{
                    id: 1,
                    text: language === 'ur' 
                      ? "Assalam-o-Alaikum! 👋\n\nMain Al-Muslim Engineering ka solar assistant hoon."
                      : "Hello! 👋\n\nI'm Al-Muslim Engineering's solar assistant.",
                    sender: 'bot',
                    timestamp: new Date(),
                    type: 'greeting'
                  }]);
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors flex-shrink-0"
                aria-label="Close chat"
                title="Close chat"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex items-center mb-1">
                        <FiMessageSquare className="text-blue-600 mr-1 text-sm" />
                        <span className="text-xs font-semibold text-blue-600">Solar Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Show Contact Options */}
                {message.showOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => {
                        navigate('/contact');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm w-full"
                    >
                      <FiPhone /> {language === 'ur' ? 'Haan, Contact Karein' : 'Yes, Contact Us'}
                    </button>
                    <button
                      onClick={() => handleQuickReply('nahi')}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm w-full"
                    >
                      <FiMapPin /> {language === 'ur' ? 'Nahi, Office Aana Hai' : 'No, I Want to Visit the Office'}
                    </button>
                  </div>
                )}

                {/* Show Visit Options */}
                {message.showVisitOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => handleQuickReply('haan office aana hai')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      <FiMapPin /> {language === 'ur' ? 'Haan, Office Aana Hai' : 'Yes, Visit Office'}
                    </button>
                    <button
                      onClick={() => handleQuickReply('nahi sawaal puchhna hai')}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm w-full"
                    >
                      {language === 'ur' ? 'Nahi, Sawaal Puchhna Hai' : 'No, Ask Questions'}
                    </button>
                  </div>
                )}

                {/* Show Call/WhatsApp Options */}
                {message.showCallWhatsApp && (
                  <div className="flex gap-2 mt-2 justify-start">
                    <a
                      href="tel:+923419231892"
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <FiPhone /> {t('chatbot.buttons.call')}
                    </a>
                    <a
                      href="https://wa.me/923318441722"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      <FiMessageSquare /> WhatsApp
                    </a>
                  </div>
                )}

                {/* Show Contact Page Link for Office Address */}
                {message.showContactLink && (
                  <div className="mt-2">
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm inline-block"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiMapPin /> {t('chatbot.buttons.officeAddress')}
                    </Link>
                  </div>
                )}

                {/* Show Pricing Options */}
                {message.showPricingOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => handleQuickReply('5kw system kitna hoga')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      💰 {t('chatbot.buttons.price5kw')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('10kw system kitna hoga')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm w-full"
                    >
                      💰 {t('chatbot.buttons.price10kw')}
                    </button>
                    <button
                      onClick={() => {
                        navigate('/quote');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      📊 {t('chatbot.buttons.quoteCalculator')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('financing options')}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm w-full"
                    >
                      💳 {t('chatbot.buttons.financing')}
                    </button>
                  </div>
                )}

                {/* Show System Type Options */}
                {message.showSystemTypeOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => handleQuickReply('on-grid system details')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      🌞 {t('chatbot.buttons.onGrid')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('hybrid system details')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm w-full"
                    >
                      🔋 {t('chatbot.buttons.hybrid')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('off-grid system details')}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm w-full"
                    >
                      ⚡ {t('chatbot.buttons.offGrid')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('kaunsa system best hai')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      ❓ {t('chatbot.buttons.whichSystem')}
                    </button>
                  </div>
                )}

                {/* Show Installation Options */}
                {message.showInstallationOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => handleQuickReply('free site survey')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm w-full"
                    >
                      📋 {t('chatbot.buttons.siteSurvey')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('installation timeline')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      ⏱️ {t('chatbot.buttons.installationTimeline')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('net metering documents')}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm w-full"
                    >
                      📄 {t('chatbot.buttons.netMeteringDocs')}
                    </button>
                    <a
                      href="tel:+923419231892"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full text-center"
                    >
                      📞 {t('chatbot.buttons.callInstallation')}
                    </a>
                  </div>
                )}

                {/* Show Savings Options */}
                {message.showSavingsOptions && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => handleQuickReply('savings calculation')}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm w-full"
                    >
                      💰 {t('chatbot.buttons.calculateSavings')}
                    </button>
                    <button
                      onClick={() => {
                        navigate('/quote');
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      📊 {t('chatbot.buttons.savingsCalculator')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('payback period')}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm w-full"
                    >
                      ⏰ {t('chatbot.buttons.paybackPeriod')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('monthly bill savings')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full"
                    >
                      📉 {t('chatbot.buttons.billReduction')}
                    </button>
                  </div>
                )}

                {/* Show Topic Selection Buttons */}
                {message.showTopicButtons && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickReply('kitna kharcha aayega')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      💰 {t('chatbot.buttons.pricing')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('on-grid system')}
                      className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs"
                    >
                      🌞 {t('chatbot.buttons.systemTypes')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('installation kitne din')}
                      className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs"
                    >
                      ⏱️ {t('chatbot.buttons.installation')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('kitna bach sakta hai')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs"
                    >
                      💵 {t('chatbot.buttons.savings')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('net metering')}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-xs"
                    >
                      📄 {t('chatbot.buttons.netMetering')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('financing')}
                      className="flex items-center gap-2 bg-pink-600 text-white px-3 py-2 rounded-lg hover:bg-pink-700 transition-colors text-xs"
                    >
                      💳 {t('chatbot.buttons.financing')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('warranty')}
                      className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors text-xs"
                    >
                      🛡️ {t('chatbot.buttons.warranty')}
                    </button>
                    <button
                      onClick={() => handleQuickReply('office location')}
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs"
                    >
                      📍 {t('chatbot.buttons.office')}
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length > 2 && !showContactOption && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">{t('chatbot.quickQuestions')}:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white border border-blue-300 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('chatbot.inputPlaceholder')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Send message"
              >
                <FiSend className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
