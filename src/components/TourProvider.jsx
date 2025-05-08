import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function TourProvider({ children }) {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      // Start the tour after a short delay to let the page load
      const timer = setTimeout(() => {
        setIsTourActive(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const tourSteps = [
    {
      target: 'welcome',
      title: texts.tourWelcome,
      content: currentLanguage.code === 'en' 
        ? 'This guided tour will help you learn how to use the BMI Calculator.'
        : 'סיור מודרך זה יעזור לך ללמוד כיצד להשתמש במחשבון BMI.',
      placement: 'center'
    },
    {
      target: 'calculator',
      title: texts.tourCalculator,
      content: currentLanguage.code === 'en'
        ? 'Enter your weight and height here to calculate your BMI.'
        : 'הזן את המשקל והגובה שלך כאן כדי לחשב את ה-BMI שלך.',
      placement: 'bottom'
    },
    {
      target: 'results',
      title: texts.tourResults,
      content: currentLanguage.code === 'en'
        ? 'Your BMI results will be displayed here after calculation.'
        : 'תוצאות ה-BMI שלך יוצגו כאן לאחר החישוב.',
      placement: 'bottom'
    },
    {
      target: 'history',
      title: texts.tourHistory,
      content: currentLanguage.code === 'en'
        ? 'Your last 5 calculations will be saved here for easy reference.'
        : '5 החישובים האחרונים שלך יישמרו כאן לצורך התייחסות קלה.',
      placement: 'top'
    },
    {
      target: 'accessibility',
      title: texts.accessibility,
      content: currentLanguage.code === 'en'
        ? 'Access accessibility options by clicking this button.'
        : 'גש לאפשרויות נגישות על ידי לחיצה על כפתור זה.',
      placement: 'right'
    }
  ];
  
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };
  
  const skipTour = () => {
    endTour();
  };
  
  const endTour = () => {
    setIsTourActive(false);
    localStorage.setItem('hasSeenTour', 'true');
  };
  
  return (
    <>
      {children}
      
      <AnimatePresence>
        {isTourActive && (
          <>
            {/* Tour Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 pointer-events-none" />
            
            {/* Tour Step */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm ${
                tourSteps[currentStep].placement === 'center' 
                  ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' 
                  : tourSteps[currentStep].placement === 'bottom' 
                    ? 'bottom-20 left-1/2 transform -translate-x-1/2'
                    : tourSteps[currentStep].placement === 'top'
                      ? 'top-20 left-1/2 transform -translate-x-1/2'
                      : 'top-1/2 left-20 transform -translate-y-1/2'
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {tourSteps[currentStep].title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {tourSteps[currentStep].content}
              </p>
              
              <div className="flex justify-between">
                <button
                  onClick={skipTour}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {texts.skipTour}
                </button>
                
                <button
                  onClick={nextStep}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {currentStep === tourSteps.length - 1 ? texts.finishTour : texts.nextStep}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}