import React, { createContext, useContext, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useAccessibility } from './AccessibilityContext';

const KeyboardShortcutsContext = createContext();

export function KeyboardShortcutsProvider({ children, setShowHelp }) {
  const { toggleLanguage } = useLanguage();
  const { setIsOpen } = useAccessibility();
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger shortcuts if not in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // 'L' key for language switch
      if (e.key === 'l' || e.key === 'L') {
        toggleLanguage();
      }
      
      // 'A' key for accessibility panel
      if (e.key === 'a' || e.key === 'A') {
        setIsOpen(true);
      }
      
      // '?' key for help modal
      if (e.key === '?') {
        setShowHelp(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleLanguage, setIsOpen, setShowHelp]);

  return (
    <KeyboardShortcutsContext.Provider value={{}}>
      {children}
    </KeyboardShortcutsContext.Provider>
  );
}

export function useKeyboardShortcuts() {
  return useContext(KeyboardShortcutsContext);
}