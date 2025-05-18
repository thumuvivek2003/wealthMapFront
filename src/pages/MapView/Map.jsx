import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';

// Fix for Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color = 'blue') => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to handle map position changes
const FlyToLocation = ({ position, zoom = 14 }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom, {
        duration: 1.5,
        easeLinearity: 0.5,
      });
    }
  }, [position, map, zoom]);
  
  return null;
};

// Component for map controls
const MapControls = ({ mapType, setMapType, resetView }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-2"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')}
        className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-lg flex items-center justify-center space-x-2 font-medium hover:bg-gray-50 transition-all duration-200"
      >
        {mapType === 'street' ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            <span>Satellite View</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Street View</span>
          </>
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetView}
        className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-lg flex items-center justify-center space-x-2 font-medium hover:bg-gray-50 transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span>Reset View</span>
      </motion.button>
    </motion.div>
  );
};

const Map2 = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapType, setMapType] = useState('street');
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]);
  const [mapZoom, setMapZoom] = useState(4);

  const resetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([39.8283, -98.5795], 4, {
        duration: 1.5,
        easeLinearity: 0.5,
      });
    }
  };
  
  const tileLayers = {
    street: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  };

  // Get property type color
  const getPropertyTypeColor = (type) => {
    switch(type) {
      case 'Residential': return '#4F46E5'; // indigo
      case 'Commercial': return '#16A34A'; // green
      case 'Industrial': return '#DC2626'; // red
      case 'Mixed Use': return '#D97706'; // amber
      default: return '#2563EB'; // blue
    }
  };
  
  // Set reference to map
  const handleMapCreated = (map) => {
    mapRef.current = map;
    map.on('zoom', () => {
      setMapZoom(map.getZoom());
    });
    map.on('moveend', () => {
      setMapCenter(map.getCenter());
    });
  };

  return (
    <div className="relative h-full w-full">
      {/* Modal for selected location */}
      <AnimatePresence>
        {selectedLocation && (
          <Modal 
            selectedLocation={selectedLocation} 
            setSelectedLocation={setSelectedLocation} 
          />
        )}
      </AnimatePresence>

      {/* Map Controls */}
      <MapControls 
        mapType={mapType} 
        setMapType={setMapType}
        resetView={resetView}
      />
      
      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        whenCreated={handleMapCreated}
        zoomControl={false}
      >
        <TileLayer
          url={tileLayers[mapType].url}
          attribution={tileLayers[mapType].attribution}
        />
        
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            icon={createCustomIcon(getPropertyTypeColor(loc.propertyType))}
            eventHandlers={{
              click: () => setSelectedLocation(loc),
            }}
          />
        ))}
        
        {selectedLocation && (
          <FlyToLocation position={selectedLocation.position} />
        )}
      </MapContainer>
      
      {/* Legend */}
      {locations.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]"
        >
          <h4 className="text-sm font-semibold mb-2">Property Types</h4>
          <div className="flex flex-col gap-1.5">
            {['Residential', 'Commercial', 'Industrial', 'Mixed Use'].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getPropertyTypeColor(type) }}
                ></div>
                <span className="text-xs">{type}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Map2;