import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    navigationFocus: false,
    textSize: 0, // 0 = default, positive values = larger, negative = smaller
    highlightLinks: false,
    largeCursor: false,
    darkMode: false,
    disableAnimations: false
  });

  useEffect(() => {
    // Load saved accessibility settings from localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSettings(prev => ({...prev, darkMode: true}));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    
    // Apply text size
    let textSizePercent = 100 + (settings.textSize * 10); // Each step changes by 10%
    document.documentElement.style.fontSize = `${textSizePercent}%`;
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply navigation focus
    if (settings.navigationFocus) {
      document.documentElement.classList.add('focus-navigation');
    } else {
      document.documentElement.classList.remove('focus-navigation');
    }
    
    // Apply link highlighting
    if (settings.highlightLinks) {
      document.documentElement.classList.add('highlight-links');
    } else {
      document.documentElement.classList.remove('highlight-links');
    }
    
    // Apply large cursor
    if (settings.largeCursor) {
      document.documentElement.classList.add('large-cursor');
    } else {
      document.documentElement.classList.remove('large-cursor');
    }
    
    // Apply animations
    if (settings.disableAnimations) {
      document.documentElement.classList.add('disable-animations');
    } else {
      document.documentElement.classList.remove('disable-animations');
    }
  }, [settings]);

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const increaseTextSize = () => {
    setSettings(prev => ({
      ...prev,
      textSize: Math.min(prev.textSize + 1, 5) // Max 5 steps larger
    }));
  };

  const decreaseTextSize = () => {
    setSettings(prev => ({
      ...prev,
      textSize: Math.max(prev.textSize - 1, -3) // Min 3 steps smaller
    }));
  };

  return (
    <AccessibilityContext.Provider value={{
      isOpen,
      setIsOpen,
      settings,
      toggleSetting,
      increaseTextSize,
      decreaseTextSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}