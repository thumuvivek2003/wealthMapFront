import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from './Modal';

const FlyToLocation = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo(position, 14, {
      duration: 1.25,
    });
  }

  return null;
};

const Map = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();

  return (
    <div className="relative">
      {selectedLocation && (
        <Modal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      )}

      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100vh', width: '100%' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            eventHandlers={{
              click: () => {
                setSelectedLocation(loc);
              },
            }}
          />
        ))}

        {selectedLocation && <FlyToLocation position={selectedLocation.position} />}
      </MapContainer>
    </div>
  );
};

export default Map;
