import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Filter from './Filter';
import Map2 from './Map';

const getRandomPosition = (baseLat, baseLng, range = 0.05) => {
  const randomLat = baseLat + (Math.random() * 2 - 1) * range;
  const randomLng = baseLng + (Math.random() * 2 - 1) * range;
  return [randomLat, randomLng];
};


const Map = () => {
  const position = [51.505, -0.09];
  const [showFilter, setShowFilter] = useState(false);
  const [locations, setLocations] = useState([]);

  const generateLocations = () => {
    const baseLat = 51.505;
    const baseLng = -0.09;
    const count = 5;

    const newLocations = [];
    for (let i = 0; i < count; i++) {
      newLocations.push({
        id: i + 1,
        position: getRandomPosition(baseLat, baseLng),
        name: "Property A",
      description: "A beautiful place to live.",
      link: "/property/1",
      address: "10 Southbank, London SE1 7SG, UK",
      propertySize: 80,
      });
    }
    setLocations(newLocations);
  };

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

      {/* <button 
        onClick={generateLocations}
        className="bg-blue-600 hover:bg-blue-700 text-white hover:text-black border border-gray-300 rounded-full px-5 py-1 text-sm shadow-sm transition-all duration-200"
      >
        Generate Random Locations
      </button> */}

      {/* <ul>
        {locations.map(({ id, position }) => (
          <li key={id}>
            Location {id}: Latitude {position[0].toFixed(4)}, Longitude {position[1].toFixed(4)}
          </li>
        ))}
      </ul> */}

      {/* Filter in Top Left Corner */}
      {showFilter && (
        <div className="absolute top-4 left-4 z-[1000]">
          <div className="relative">
            <Filter getLocations={generateLocations} />
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

      <Map2 locations={locations}/>
    </div>
  );
};

export default Map;
