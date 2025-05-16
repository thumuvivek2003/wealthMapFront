import React, { useState } from 'react';

const Filter = () => {
  const [propertyValue, setPropertyValue] = useState(0);
  const [propertySize, setPropertySize] = useState(1);

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
          onChange={(e) => setPropertyValue(e.target.value)}
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
          onChange={(e) => setPropertySize(e.target.value)}
          className="w-full"
        />
        <div className="text-xs text-gray-600">{propertySize} sq ft</div>
      </div>

      {/* Property Type */}
      <div className="mb-4">
            <label className="font-semibold block mb-1">Property Type</label>
            <button className="w-full text-left px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
            All Types
            </button>
        </div>

        <div className="mb-4">
            <label className="font-semibold block mb-1">Location</label>
            <select className="w-full px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
                <option>All States</option>
                <option>California</option>
                <option>Texas</option>
                <option>New York</option>
                <option>Florida</option>
                <option>Illinois</option>
                {/* Add more states as needed */}
            </select>
        </div>

    <div className="mb-4">
        <label className="font-semibold block mb-1">Owner Net Worth</label>
        <select className="w-full px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
            <option>Any</option>
            <option>Less than $1M</option>
            <option>$1M - $5M</option>
            <option>$5M - $10M</option>
            <option>Above $10M</option>
        </select>
    </div>


      {/* Reset Button */}
      <div className="text-right">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
          onClick={() => {
            setPropertyValue(0);
            setPropertySize(1);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
