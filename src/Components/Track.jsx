// ./src/components/TrackParcel.jsx

import React from 'react';

const Track = () => {
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Track Your Parcel</h1>
        <form className="flex">
          <input 
            type="text" 
            placeholder="Enter your tracking number" 
            className="w-full p-3 border  focus:outline-none focus:border-purple-500" 
          />
          <button 
            type="submit" 
            className="bg-purple-700 text-white p-3 rounded-r-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Track
          </button>
        </form>
      </div>
    </div>
  );
};

export default Track;
