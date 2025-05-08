
import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AccessibilityPanel from './components/AccessibilityPanel';
import { AccessibilityProvider } from './components/AccessibilityContext';
import CookieConsent from './components/CookieConsent';
import TourProvider from './components/TourProvider';
import { KeyboardShortcutsProvider } from './components/KeyboardShortcutsContext';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';

export default function Layout({ children }) {
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <KeyboardShortcutsProvider setShowHelp={setShowHelp}>
          <TourProvider>
            <LayoutContent 
              showHelp={showHelp}
              setShowHelp={setShowHelp}
            >
              {children}
            </LayoutContent>
          </TourProvider>
        </KeyboardShortcutsProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

function LayoutContent({ children, showHelp, setShowHelp }) {
  const { direction, currentLanguage } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div dir={direction} lang={currentLanguage.code} className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <AccessibilityPanel />
      <Footer />
      <CookieConsent />
      
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label={currentLanguage.texts.backToTop}
          className="fixed bottom-24 right-6 bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </button>
      )}
      
      {showHelp && (
        <KeyboardShortcutsHelp onClose={() => setShowHelp(false)} />
      )}
    </div>
  );
}
