import React from 'react';
import { useLanguage } from './LanguageContext';
import { motion } from 'framer-motion';

export default function InfoCards() {
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {/* What is BMI */}
          <motion.div variants={item} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-600">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {texts.whatIsBmi}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {texts.whatIsBmiDesc}
            </p>
          </motion.div>
          
          {/* How to Use */}
          <motion.div variants={item} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-600">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {texts.howToUse}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {texts.howToUseDesc}
            </p>
          </motion.div>
          
          {/* Limitations */}
          <motion.div variants={item} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-600">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {texts.limitations}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {texts.limitationsDesc}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}