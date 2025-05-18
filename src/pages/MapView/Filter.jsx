import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Filter = ({ getLocations }) => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [propertySize, setPropertySize] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [location, setLocation] = useState('');
  const [ownerWorth, setOwnerWorth] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleShow = () => {
    
    const filters = {
      propertyValue,
      propertySize,
      selectedTypes,
      location,
      ownerWorth,
    };

    console.log('Selected Filters:', filters);
    getLocations(filters); // pass filters to parent function
  };

  const resetFilters = () => {
    setPropertyValue(0);
    setPropertySize(1);
    setSelectedTypes([]);
    setLocation('');
    setOwnerWorth('');
  };

  // Expand animation when component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 100);
  }, []);

  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed Use'];
  
  return (
    <motion.div 
      className="w-80 bg-white rounded-xl shadow-lg text-sm overflow-hidden p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <h3 className="font-bold text-lg">Property Filters</h3>
      </div>
      
      <div className="p-5">
        {/* Property Value */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <label className="font-semibold text-gray-700">Property Value</label>
            <span className="text-blue-600 font-medium">{formatCurrency(propertyValue)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000000"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$0</span>
            <span>$5M</span>
          </div>
        </div>

        {/* Property Size */}
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <label className="font-semibold text-gray-700">Property Size</label>
            <span className="text-blue-600 font-medium">{formatNumber(propertySize)} sq ft</span>
          </div>
          <input
            type="range"
            min="1"
            max="10000"
            value={propertySize}
            onChange={(e) => setPropertySize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 sq ft</span>
            <span>10,000 sq ft</span>
          </div>
        </div>

        {/* Property Type - Multi-select */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 text-gray-700">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => (
              <motion.div 
                key={type}
                whileTap={{ scale: 0.95 }}
              >
                <label 
                  className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedTypes.includes(type) 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="sr-only"
                  />
                  {selectedTypes.includes(type) && (
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {!selectedTypes.includes(type) && <div className="w-4 h-4 mr-2"></div>}
                  <span className="text-sm">{type}</span>
                </label>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 text-gray-700">Location</label>
          <div className="relative">
            <select
              className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All States</option>
              <option>California</option>
              <option>Texas</option>
              <option>New York</option>
              <option>Florida</option>
              <option>Illinois</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Owner Net Worth */}
        <div className="mb-6">
          <label className="font-semibold block mb-2 text-gray-700">Owner Net Worth</label>
          <div className="relative">
            <select
              className="w-full p-4 rounded-lg border border-gray-300 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={ownerWorth}
              onChange={(e) => setOwnerWorth(e.target.value)}
            >
              <option value="">Any</option>
              <option>Less than $1M</option>
              <option>$1M - $5M</option>
              <option>$5M - $10M</option>
              <option>Above $10M</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
            onClick={handleShow}
          >
            Show Results
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
            onClick={resetFilters}
          >
            Reset
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Filter;