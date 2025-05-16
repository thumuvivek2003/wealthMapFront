import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import locations from './locations';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="relative">
      {/* Modal */}
      {selectedLocation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-[1000] w-96">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{selectedLocation.name}</h2>
            <button
              onClick={() => setSelectedLocation(null)}
              className="text-gray-500 hover:text-black text-xl leading-none"
            >
              ✕
            </button>
          </div>
          <p className="mb-4">{selectedLocation.description}</p>
          <p className="mb-4">{selectedLocation.address}</p>
          <p className="mb-4">{selectedLocation.propertySize} sq feet</p>
          <a
            href={selectedLocation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Open
          </a>
        </div>
      )}

      {/* Map with multiple markers */}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            eventHandlers={{
              click: () => setSelectedLocation(loc),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
