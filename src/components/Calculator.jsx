import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Calculator() {
  const { currentLanguage } = useLanguage();
  const { texts } = currentLanguage;
  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [history, setHistory] = useState([]);
  const [weightError, setWeightError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  const calculateBmi = async () => {
    // Validate inputs
    let isValid = true;
    
    if (!weight || isNaN(weight) || weight <= 0 || weight > 500) {
      setWeightError(texts.enterValidWeight);
      isValid = false;
    } else {
      setWeightError('');
    }
    
    if (!height || isNaN(height) || height <= 0 || height > 300) {
      setHeightError(texts.enterValidHeight);
      isValid = false;
    } else {
      setHeightError('');
    }
    
    if (!isValid) return;
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // In a real app, this would be a fetch call to '/api/bmi'
      // Here we'll simulate a network delay and calculate locally
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate BMI: weight / (height/100)^2
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(bmiValue.toFixed(1));
      
      // Determine BMI category
      let bmiCategory;
      if (bmiValue < 18.5) bmiCategory = 'underweight';
      else if (bmiValue < 25) bmiCategory = 'normal';
      else if (bmiValue < 30) bmiCategory = 'overweight';
      else bmiCategory = 'obese';
      
      setBmi(roundedBmi);
      setCategory(bmiCategory);
      
      // Add to history (max 5 entries)
      const date = new Date().toISOString();
      const newEntry = { date, weight, height, bmi: roundedBmi, category: bmiCategory };
      const updatedHistory = [newEntry, ...history.slice(0, 4)];
      setHistory(updatedHistory);
      localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error calculating BMI', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // BMI category colors
  const categoryColors = {
    underweight: 'bg-blue-500',
    normal: 'bg-green-500',
    overweight: 'bg-yellow-500',
    obese: 'bg-red-500'
  };
  
  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(currentLanguage.code === 'en' ? 'en-US' : 'he-IL', options);
  };
  
  return (
    <section id="calculator" className="py-12 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {currentLanguage.code === 'en' ? 'Calculate BMI' : 'חישוב BMI'}
              </h2>
              
              <div className="space-y-4">
                {/* Weight Input */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {texts.weight}
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="1"
                    max="500"
                    placeholder={currentLanguage.code === 'en' ? 'Enter weight' : 'הכנס משקל'}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-colors"
                    aria-invalid={weightError ? 'true' : 'false'}
                  />
                  {weightError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {weightError}
                    </p>
                  )}
                </div>
                
                {/* Height Input */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {texts.height}
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="1"
                    max="300"
                    placeholder={currentLanguage.code === 'en' ? 'Enter height' : 'הכנס גובה'}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-colors"
                    aria-invalid={heightError ? 'true' : 'false'}
                  />
                  {heightError && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {heightError}
                    </p>
                  )}
                </div>
                
                {/* Calculate Button */}
                <button
                  onClick={calculateBmi}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {currentLanguage.code === 'en' ? 'Calculating...' : 'מחשב...'}
                    </span>
                  ) : (
                    texts.calculate
                  )}
                </button>
              </div>
            </motion.div>
            
            {/* Results Display */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                id="results"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {texts.yourBmi}
                </h2>
                
                <div className="flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {bmi ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center"
                      >
                        <div className="relative w-40 h-40 mx-auto mb-4">
                          <div className={`absolute inset-0 rounded-full ${categoryColors[category]} opacity-20`}></div>
                          <div className="flex items-center justify-center h-full">
                            <span className="text-5xl font-bold text-gray-900 dark:text-white">{bmi}</span>
                          </div>
                        </div>
                        
                        <div className={`inline-block px-4 py-2 rounded-full ${categoryColors[category]} text-white font-medium`}>
                          {texts[category]}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-gray-500 dark:text-gray-400 py-12"
                      >
                        {currentLanguage.code === 'en' 
                          ? 'Enter your weight and height to calculate BMI' 
                          : 'הכנס את המשקל והגובה שלך כדי לחשב BMI'
                        }
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              
              {/* History Display */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                id="history"
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {texts.lastResults}
                </h2>
                
                {history.length > 0 ? (
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 flex justify-between items-center"
                      >
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {formatDate(item.date)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">{item.bmi}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[item.category]} text-white`}>
                              {texts[item.category]}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.weight} kg, {item.height} cm
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                    {texts.noResultsYet}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}