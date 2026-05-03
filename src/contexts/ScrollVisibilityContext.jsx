/**
 * SCROLL VISIBILITY CONTEXT
 * 
 * Manages visibility of floating UI elements (chatbot, calculator)
 * based on scroll position - hides them during video section
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollVisibilityContext = createContext();

export const useScrollVisibility = () => {
  const context = useContext(ScrollVisibilityContext);
  if (!context) {
    throw new Error('useScrollVisibility must be used within ScrollVisibilityProvider');
  }
  return context;
};

export const ScrollVisibilityProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero/video section element
      const heroSection = document.querySelector('[data-hero-section]');
      if (!heroSection) {
        setIsVisible(true);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      // Hide buttons if still in video section, show after scrolling past
      setIsVisible(scrollPosition > heroBottom + 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollVisibilityContext.Provider value={{ isVisible }}>
      {children}
    </ScrollVisibilityContext.Provider>
  );
};

