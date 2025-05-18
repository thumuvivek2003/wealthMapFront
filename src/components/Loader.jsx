import React from 'react';
import image from '../assets/loader.gif'; 

function Loader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <img src={image} alt="Loading..." className="w-32 h-32" />
            <div className="text-xl font-semibold">Welcome to Wealth map</div>
        </div>
    );
}

export default Loader;
