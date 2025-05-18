import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Filter from './Filter';
import Map2 from './Map';

const getRandomPosition = (baseLat, baseLng, range = 0.05) => {
  const randomLat = baseLat + (Math.random() * 2 - 1) * range;
  const randomLng = baseLng + (Math.random() * 2 - 1) * range;
  return [randomLat, randomLng];
};

const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Mixed Use'];
const propertyImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1554435493-93422e8d1a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1622015663084-307d19eabbbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
];

const generateDescription = () => {
  const descriptions = [
    "A stunning property featuring modern architecture and premium finishes throughout.",
    "This exceptional property offers panoramic views and state-of-the-art amenities.",
    "An investment opportunity with excellent potential for growth in a prime location.",
    "A beautifully maintained property with sophisticated design and luxurious features."
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const Map = () => {
  const position = [39.8283, -98.5795]; // Center of US
  const [showFilter, setShowFilter] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateLocations = (filters = {}) => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const baseLat = 39.8283;
      const baseLng = -98.5795;
      const count = 35;
      
      const newLocations = [];
      for (let i = 0; i < count; i++) {
        const randomPropertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
        const randomPropertySize = Math.floor(Math.random() * 9000) + 1000;
        const randomPropertyValue = Math.floor(Math.random() * 4500000) + 500000;
        
        newLocations.push({
          id: i + 1,
          position: getRandomPosition(baseLat, baseLng, 0.1),
          name: `${randomPropertyType} Property ${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) + 1}`,
          description: generateDescription(),
          link: `/property/${i + 1}`,
          address: `${Math.floor(Math.random() * 9000) + 1000} ${['Main St', 'Broadway', 'Park Ave', 'Ocean Dr'][Math.floor(Math.random() * 4)]}, ${['New York', 'Los Angeles', 'Chicago', 'Miami', 'Dallas'][Math.floor(Math.random() * 5)]}`,
          propertySize: randomPropertySize,
          propertyValue: randomPropertyValue,
          propertyType: randomPropertyType,
          image: propertyImages[Math.floor(Math.random() * propertyImages.length)],
        });
      }
      
      setLocations(newLocations);
      setIsLoading(false);
    }, 800);
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading Indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2000] bg-white bg-opacity-90 p-6 rounded-xl shadow-lg flex flex-col items-center"
          >
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700 font-medium">Loading properties...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Button */}
      <motion.button
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={toggleFilter}
        className={`absolute top-4 left-4 z-[1000] bg-white hover:bg-gray-50 ${showFilter ? 'text-red-600' : 'text-blue-600'} font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2`}
      >
        {showFilter ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Close Filters</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Open Filters</span>
          </>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-4 z-[1000]"
          >
            <Filter getLocations={generateLocations} />
          </motion.div>
        )}
      </AnimatePresence>

      

      {/* Map Component */}
      <Map2 locations={locations} />
    </div>
  );
};

export default Map;