import React from 'react';
import { useLanguage } from './LanguageContext';
import { useAccessibility } from './AccessibilityContext';

export default function Header() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const { settings, toggleSetting } = useAccessibility();
  const { texts } = currentLanguage;
  
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-30 transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20"/>
                <path d="M12 2v20"/>
                <path d="m4.93 4.93 14.14 14.14"/>
                <path d="M19.07 4.93 4.93 19.07"/>
              </svg>
            </div>
            <h1 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-white ml-2">{texts.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => toggleSetting('darkMode')}
            aria-label={texts.toggleDarkMode}
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            {settings.darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2"/>
                <path d="M12 21v2"/>
                <path d="M4.22 4.22l1.42 1.42"/>
                <path d="M18.36 18.36l1.42 1.42"/>
                <path d="M1 12h2"/>
                <path d="M21 12h2"/>
                <path d="M4.22 19.78l1.42-1.42"/>
                <path d="M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>
          
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md text-gray-800 dark:text-white font-medium transition-colors"
          >
            {currentLanguage.code === 'en' ? 'עברית' : 'English'}
          </button>
          
          {/* Chat Button */}
          <button className="hidden md:flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/>
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
            {texts.chatWithUs}
          </button>
        </div>
      </div>
    </header>
  );
}