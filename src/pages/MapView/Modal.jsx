import React from "react";

const Modal = ({ selectedLocation, setSelectedLocation }) => {
  if (!selectedLocation) return null;

  return (
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
  );
};

export default Modal;
