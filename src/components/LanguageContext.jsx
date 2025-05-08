import React, { createContext, useContext, useState, useEffect } from 'react';

// Translations
const translations = {
  en: {
    code: 'en',
    dir: 'ltr',
    texts: {
      // Header
      title: "BMI Calculator",
      toggleDarkMode: "Toggle dark mode",
      chatWithUs: "Chat with us",
      
      // Hero
      heroTitle: "Calculate Your Body Mass Index",
      heroSubtitle: "Track your health with our easy-to-use BMI calculator",
      
      // Calculator
      weight: "Weight (kg)",
      height: "Height (cm)",
      calculate: "Calculate BMI",
      yourBmi: "Your BMI",
      lastResults: "Previous Results",
      noResultsYet: "No results yet",
      enterValidWeight: "Please enter a valid weight",
      enterValidHeight: "Please enter a valid height",
      
      // BMI Categories
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
      
      // Info Cards
      whatIsBmi: "What is BMI?",
      whatIsBmiDesc: "Body Mass Index (BMI) is a measurement of body fat based on height and weight that applies to adult men and women.",
      howToUse: "How to Use",
      howToUseDesc: "Enter your weight and height accurately. The calculator will immediately show your BMI and the category it falls under.",
      limitations: "Limitations",
      limitationsDesc: "BMI doesn't account for muscle mass, age, sex, ethnicity, and body composition. Consult a healthcare professional for a complete assessment.",
      
      // Features
      offlineAccess: "Offline Access",
      offlineAccessDesc: "This calculator works offline as a Progressive Web App",
      addToHome: "Add to Home Screen",
      
      // Accessibility
      accessibility: "Accessibility",
      navigationFocus: "Navigation Focus",
      increaseText: "Increase Text Size",
      decreaseText: "Decrease Text Size",
      highlightLinks: "Highlight Links",
      largeCursor: "Large Cursor",
      darkMode: "Dark Mode",
      disableAnimations: "Disable Animations",
      
      // Tour
      nextStep: "Next",
      skipTour: "Skip",
      finishTour: "Finish",
      tourWelcome: "Welcome to BMI Calculator!",
      tourCalculator: "Enter your data here to calculate your BMI",
      tourResults: "Your results will appear here",
      tourHistory: "View your previous calculations here",
      tourAccessibility: "Access accessibility options here",
      
      // Footer
      backToTop: "Back to top",
      cookieMessage: "We use cookies to improve your experience",
      acceptCookies: "Accept",
      rejectCookies: "Reject",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      
      // Keyboard shortcuts
      keyboardShortcuts: "Keyboard Shortcuts",
      pressL: "Press L to switch language",
      pressA: "Press A to open accessibility menu",
      pressQuestion: "Press ? to show this help dialog",
      close: "Close",
      
      // PWA
      installApp: "Install BMI Calculator",
      installDesc: "Add to your home screen for quick access",
      install: "Install",
      cancel: "Not now"
    }
  },
  he: {
    code: 'he',
    dir: 'rtl',
    texts: {
      // Header
      title: "מחשבון BMI",
      toggleDarkMode: "החלף למצב כהה",
      chatWithUs: "דבר איתנו",
      
      // Hero
      heroTitle: "חשב את מדד מסת הגוף שלך",
      heroSubtitle: "עקוב אחר בריאותך עם מחשבון BMI קל לשימוש",
      
      // Calculator
      weight: "משקל (ק״ג)",
      height: "גובה (ס״מ)",
      calculate: "חשב BMI",
      yourBmi: "ה-BMI שלך",
      lastResults: "תוצאות קודמות",
      noResultsYet: "אין תוצאות עדיין",
      enterValidWeight: "אנא הכנס משקל תקף",
      enterValidHeight: "אנא הכנס גובה תקף",
      
      // BMI Categories
      underweight: "תת-משקל",
      normal: "משקל תקין",
      overweight: "עודף משקל",
      obese: "השמנת יתר",
      
      // Info Cards
      whatIsBmi: "מה זה BMI?",
      whatIsBmiDesc: "מדד מסת הגוף (BMI) הוא מדידה של שומן בגוף המבוססת על גובה ומשקל שחלה על גברים ונשים בוגרים.",
      howToUse: "איך להשתמש",
      howToUseDesc: "הכנס את המשקל והגובה שלך בצורה מדויקת. המחשבון יציג מיד את ה-BMI שלך ואת הקטגוריה שבה הוא נמצא.",
      limitations: "מגבלות",
      limitationsDesc: "BMI אינו מתחשב במסת שריר, גיל, מין, אתניות ומבנה גוף. התייעץ עם איש מקצוע בתחום הבריאות לקבלת הערכה מלאה.",
      
      // Features
      offlineAccess: "גישה במצב לא מקוון",
      offlineAccessDesc: "המחשבון פועל במצב לא מקוון כיישום מתקדם",
      addToHome: "הוסף למסך הבית",
      
      // Accessibility
      accessibility: "נגישות",
      navigationFocus: "מיקוד ניווט",
      increaseText: "הגדל טקסט",
      decreaseText: "הקטן טקסט",
      highlightLinks: "הדגש קישורים",
      largeCursor: "סמן גדול",
      darkMode: "מצב כהה",
      disableAnimations: "כבה אנימציות",
      
      // Tour
      nextStep: "הבא",
      skipTour: "דלג",
      finishTour: "סיים",
      tourWelcome: "ברוכים הבאים למחשבון BMI!",
      tourCalculator: "הכנס את הנתונים שלך כאן כדי לחשב את ה-BMI שלך",
      tourResults: "התוצאות שלך יופיעו כאן",
      tourHistory: "צפה בחישובים הקודמים שלך כאן",
      tourAccessibility: "גש לאפשרויות נגישות כאן",
      
      // Footer
      backToTop: "חזרה למעלה",
      cookieMessage: "אנו משתמשים בעוגיות כדי לשפר את החוויה שלך",
      acceptCookies: "אשר",
      rejectCookies: "דחה",
      privacyPolicy: "מדיניות פרטיות",
      termsOfService: "תנאי שימוש",
      
      // Keyboard shortcuts
      keyboardShortcuts: "קיצורי מקלדת",
      pressL: "לחץ L כדי להחליף שפה",
      pressA: "לחץ A כדי לפתוח את תפריט הנגישות",
      pressQuestion: "לחץ ? כדי להציג את תיבת הדו-שיח הזו",
      close: "סגור",
      
      // PWA
      installApp: "התקן את מחשבון BMI",
      installDesc: "הוסף למסך הבית לגישה מהירה",
      install: "התקן",
      cancel: "לא עכשיו"
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [direction, setDirection] = useState('ltr');
  
  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && translations[savedLang]) {
      setCurrentLanguage(translations[savedLang]);
      setDirection(translations[savedLang].dir);
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLang = currentLanguage.code === 'en' ? translations.he : translations.en;
    setCurrentLanguage(newLang);
    setDirection(newLang.dir);
    localStorage.setItem('language', newLang.code);
  };
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}