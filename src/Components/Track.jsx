// ./src/components/TrackParcel.jsx

import React from 'react';

const Track = () => {
  return (
    <div className="flex flex-col justify-center  bg-transparent ">
      {/*<div className="bg-white p-4 rounded-lg shadow-lg">*/}
        <h1 className="text-30px lg:text-xl text-sky-950 font-bold mb-5">Track Your Parcel</h1>
        <form className="flex">
          <input 
            type="text" 
            placeholder="Enter tracking number" 
            className="text-6px w-52 md:w-64 p-3 focus:outline-none rounded-l-lg focus:border-white  text-gray-900" 
          />
          <button 
            type="submit" 
            className="bg-sky-800 text-gray-300 text-bold p-3 rounded-r-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Track
          </button>
        </form>
      </div>
    
  );
};

export default Track;
