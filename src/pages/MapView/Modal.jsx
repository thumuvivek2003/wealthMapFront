import React, { useEffect, useState } from "react";

const Modal = ({ selectedLocation, setSelectedLocation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setIsVisible(true);
    }
  }, [selectedLocation]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedLocation(null), 300); // Match animation duration
  };

  if (!selectedLocation && !isVisible) return null;

  return (
    <div
      className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-[1000] w-96 transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{selectedLocation?.name}</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-black text-xl leading-none"
        >
          ✕
        </button>
      </div>
      <p className="mb-4">{selectedLocation?.description}</p>
      <p className="mb-4">{selectedLocation?.address}</p>
      <p className="mb-4">{selectedLocation?.propertySize} sq feet</p>
      <a
        href={selectedLocation?.link}
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
