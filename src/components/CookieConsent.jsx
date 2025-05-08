import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show the cookie banner after a short delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };
  
  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50"
        >
          <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-3 rounded-lg bg-blue-600 shadow-lg sm:p-5">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                      <path d="M8.5 8.5v.01"/>
                      <path d="M16 15.5v.01"/>
                      <path d="M12 12v.01"/>
                      <path d="M11 17v.01"/>
                      <path d="M7 14v.01"/>
                    </svg>
                  </div>
                  <p className="ml-3 font-medium text-white truncate">
                    <span>{texts.cookieMessage}</span>
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0 flex">
                  <button
                    onClick={handleAccept}
                    className="mr-2 bg-white px-4 py-2 rounded-md font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {texts.acceptCookies}
                  </button>
                  <button
                    onClick={handleReject}
                    className="bg-blue-500 px-4 py-2 rounded-md text-white font-medium hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {texts.rejectCookies}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}