import React from 'react';
import { useLanguage } from './LanguageContext';

export default function KeyboardShortcutsHelp({ onClose }) {
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {texts.keyboardShortcuts}
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">{texts.pressL}</span>
            <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">L</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">{texts.pressA}</span>
            <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">A</kbd>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">{texts.pressQuestion}</span>
            <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">?</kbd>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
        >
          {texts.close}
        </button>
      </div>
    </div>
  );
}