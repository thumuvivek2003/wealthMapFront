import React, { useState } from 'react';

const Filter = ({ getLocations }) => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [propertySize, setPropertySize] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [location, setLocation] = useState('');
  const [ownerWorth, setOwnerWorth] = useState('');

  const handleTypeChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedTypes(selected);
  };

  const handleShow = () => {
    const filters = {
      propertyValue,
      propertySize,
      selectedTypes,
      location,
      ownerWorth,
    };

    console.log('Selected Filters:', filters);
    getLocations(filters); // pass filters to parent function
  };

  return (
    <div className="w-72 p-4 bg-white rounded-xl shadow-md text-sm">
      {/* Property Value */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Property Value</label>
        <input
          type="range"
          min="0"
          max="5000000"
          value={propertyValue}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>$0M</span>
          <span>$5M</span>
        </div>
      </div>

      {/* Property Size */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Property Size</label>
        <input
          type="range"
          min="1"
          max="10000"
          value={propertySize}
          onChange={(e) => setPropertySize(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-xs text-gray-600">{propertySize} sq ft</div>
      </div>

      {/* Property Type - Multi-select */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {['Residential', 'Commercial', 'Industrial', 'Mixed Use'].map((type) => (
            <label key={type} className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTypes([...selectedTypes, type]);
                  } else {
                    setSelectedTypes(selectedTypes.filter((t) => t !== type));
                  }
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>


      {/* Location */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Location</label>
        <select
          className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All States</option>
          <option>California</option>
          <option>Texas</option>
          <option>New York</option>
          <option>Florida</option>
          <option>Illinois</option>
        </select>
      </div>

      {/* Owner Net Worth */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Owner Net Worth</label>
        <select
          className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          value={ownerWorth}
          onChange={(e) => setOwnerWorth(e.target.value)}
        >
          <option value="">Any</option>
          <option>Less than $1M</option>
          <option>$1M - $5M</option>
          <option>$5M - $10M</option>
          <option>Above $10M</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="text-right gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded m-2"
          onClick={handleShow}
        >
          Show
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded m-2"
          onClick={() => {
            setPropertyValue(0);
            setPropertySize(1);
            setSelectedTypes([]);
            setLocation('');
            setOwnerWorth('');
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
