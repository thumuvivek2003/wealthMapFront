import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Map2 from './Map';

const getRandomPosition = (baseLat, baseLng, range = 0.05) => {
  const randomLat = baseLat + (Math.random() * 2 - 1) * range;
  const randomLng = baseLng + (Math.random() * 2 - 1) * range;
  return [randomLat, randomLng];
};


const Map = () => {
  const position = [39,-98];
  const [locations, setLocations] = useState([]);

  const generateLocations = () => {
    const baseLat = 39.8283;
    const baseLng = -98.5795;
    const count = 35;

    const newLocations = [];
    for (let i = 0; i < count; i++) {
      newLocations.push({
        id: i + 1,
        position: getRandomPosition(baseLat, baseLng),
        name: "Property A" + i,
      description: "A beautiful place to live." + 1,
      link: "/property/1",
      address: "10 Southbank, London SE1 7SG, UK" + 1,
      propertySize: 80, 
      });
    }
    setLocations(newLocations);
  };

  return (
    <div className="relative h-screen w-screen">
      <Map2 locations={locations} generateLocations={generateLocations} />
    </div>
  );
};

export default Map;
