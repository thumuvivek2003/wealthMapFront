import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';

const Map = ({locations}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="relative">
      {selectedLocation && (
        <Modal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      )}
      
      <MapContainer center={selectedLocation?.position || [51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
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
