import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PROPERTIES } from './queries';

const PropertiesList = () => {
  const { loading, error, data } = useQuery(GET_ALL_PROPERTIES);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>All Properties</h2>
      <ul>
        {data.getAllProperties.map((property) => (
          <li key={property.id}>
            <p><strong>Address:</strong> {property.address}</p>
            <p><strong>Owner:</strong> {property.owner}</p>
            <p><strong>Lot Area:</strong> {property.lotarea}</p>
            <p><strong>Property Size:</strong> {property.property_size}</p>
            <p><strong>Floors:</strong> {property.numfloors}</p>
            <p><strong>Year Built:</strong> {property.building_year}</p>
            <p><strong>Valuation:</strong> {property.valuation}</p>
            <p><strong>Property Type:</strong> {property.property_type}</p>
            <p><strong>Location:</strong> Lat: {property.lat}, Lon: {property.lon}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertiesList;
