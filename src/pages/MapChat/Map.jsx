import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Modal from '../MapView/Modal';
import ChatWrapper from './ChatWrapper';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const FlyToLocation = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo(position, 14, {
      duration: 1.25,
    });
  }

  return null;
};


const Map = ({ locations,generateLocations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();
  return (
    <div className="relative h-screen w-screen">
      {selectedLocation && (
        <Modal selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      )}
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
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
              click: () => setSelectedLocation(loc),
            }}
          />
        ))}
        {selectedLocation && <FlyToLocation position={selectedLocation.position} />}
      </MapContainer>
      <ChatWrapper generateLocations={generateLocations} />
    </div>
  );
};

export default Map;
