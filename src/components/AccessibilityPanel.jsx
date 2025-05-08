import React from 'react';
import { useAccessibility } from './AccessibilityContext';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccessibilityPanel() {
  const { isOpen, setIsOpen, settings, toggleSetting, increaseTextSize, decreaseTextSize } = useAccessibility();
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  return (
    <>
      {/* Accessibility toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label={texts.accessibility}
        className="fixed bottom-6 left-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>
        </svg>
      </button>
      
      {/* Accessibility side panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: currentLanguage.dir === 'ltr' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: currentLanguage.dir === 'ltr' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${currentLanguage.dir === 'ltr' ? 'left-0' : 'right-0'} h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {texts.accessibility}
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label={texts.close}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Navigation Focus */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="navigation-focus" className="text-gray-700 dark:text-gray-200">
                      {texts.navigationFocus}
                    </label>
                    <div className="relative inline-block w-12 align-middle">
                      <input
                        type="checkbox"
                        id="navigation-focus"
                        checked={settings.navigationFocus}
                        onChange={() => toggleSetting('navigationFocus')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                      <div className="absolute top-[2px] left-[2px] bg-white dark:bg-gray-600 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  
                  {/* Text Size */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-200">{texts.increaseText}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={decreaseTextSize}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          aria-label={texts.decreaseText}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                        <span className="text-gray-700 dark:text-gray-200 w-8 text-center">
                          {settings.textSize}
                        </span>
                        <button
                          onClick={increaseTextSize}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          aria-label={texts.increaseText}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14"/>
                            <path d="M5 12h14"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Highlight Links */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="highlight-links" className="text-gray-700 dark:text-gray-200">
                      {texts.highlightLinks}
                    </label>
                    <div className="relative inline-block w-12 align-middle">
                      <input
                        type="checkbox"
                        id="highlight-links"
                        checked={settings.highlightLinks}
                        onChange={() => toggleSetting('highlightLinks')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                      <div className="absolute top-[2px] left-[2px] bg-white dark:bg-gray-600 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  
                  {/* Large Cursor */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="large-cursor" className="text-gray-700 dark:text-gray-200">
                      {texts.largeCursor}
                    </label>
                    <div className="relative inline-block w-12 align-middle">
                      <input
                        type="checkbox"
                        id="large-cursor"
                        checked={settings.largeCursor}
                        onChange={() => toggleSetting('largeCursor')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                      <div className="absolute top-[2px] left-[2px] bg-white dark:bg-gray-600 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  
                  {/* Dark Mode */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="dark-mode" className="text-gray-700 dark:text-gray-200">
                      {texts.darkMode}
                    </label>
                    <div className="relative inline-block w-12 align-middle">
                      <input
                        type="checkbox"
                        id="dark-mode"
                        checked={settings.darkMode}
                        onChange={() => toggleSetting('darkMode')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                      <div className="absolute top-[2px] left-[2px] bg-white dark:bg-gray-600 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  
                  {/* Disable Animations */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="disable-animations" className="text-gray-700 dark:text-gray-200">
                      {texts.disableAnimations}
                    </label>
                    <div className="relative inline-block w-12 align-middle">
                      <input
                        type="checkbox"
                        id="disable-animations"
                        checked={settings.disableAnimations}
                        onChange={() => toggleSetting('disableAnimations')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                      <div className="absolute top-[2px] left-[2px] bg-white dark:bg-gray-600 w-5 h-5 rounded-full transition-all peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}