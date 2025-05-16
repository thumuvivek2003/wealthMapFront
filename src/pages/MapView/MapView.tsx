import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Filter from './Filter';
import Map2 from './Map';

const Map = () => {
  const position = [51.505, -0.09];
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="relative">
      {/* Open Filter Button */}
      {!showFilter && (
        <button
          onClick={() => setShowFilter(true)}
          className="absolute top-10 left-10 z-[1000] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Open Filter
        </button>
      )}

      {/* Filter in Top Left Corner */}
      {showFilter && (
        <div className="absolute top-4 left-4 z-[1000]">
          <div className="relative">
            <Filter />
            <button
              onClick={() => setShowFilter(false)}
              className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full w-6 h-6 text-sm text-gray-600 hover:text-black"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Map */}
      {/* <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            asdfasdf
            <h1>asdfasdf</h1>
          </Popup>
        </Marker>
      </MapContainer> */}
      <Map2 />
    </div>
  );
};

export default Map;
