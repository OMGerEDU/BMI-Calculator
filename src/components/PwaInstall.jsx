import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function PwaInstall() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show custom install UI
      setShowInstallPrompt(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  
  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Reset the deferredPrompt variable
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
    
    // Log the outcome
    console.log(`User response to install prompt: ${outcome}`);
  };
  
  const handleDismiss = () => {
    setShowInstallPrompt(false);
  };
  
  return (
    <section className="py-10 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-6 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="hidden md:block bg-blue-500 text-white rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/>
                <path d="M16 19h6"/>
                <path d="M19 16v6"/>
                <path d="M17.5 13.5c.83-1.5 2.2-2.5 3.5-2.5a2 2 0 0 1 2 2c0 2.21-2.79 4-6 4s-6-1.79-6-4a2 2 0 0 1 2-2c1.3 0 2.67 1 3.5 2.5"/>
              </svg>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {texts.offlineAccess}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {texts.offlineAccessDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Install PWA Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 inset-x-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40"
          >
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                      <path d="M9 22v-4h6v4"/>
                      <path d="M8 6h8"/>
                      <path d="M8 10h8"/>
                      <path d="M8 14h8"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{texts.installApp}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{texts.installDesc}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
                  >
                    {texts.cancel}
                  </button>
                  <button
                    onClick={handleInstall}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {texts.install}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}