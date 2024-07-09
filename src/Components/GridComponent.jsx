import React from 'react';

const GridComponent = () => {
  return (
    <div className=" p-4">
        <div className="grid grid-cols-1  lg:grid-cols-2 lg:grid-rows-1">
            <div className="justify-center">
                <div className="text-3xl text-sky-950">Industry</div>
                <div className="text-6xl text-yellow-500">Expertise</div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-0 mt-5 ">
                <div className="flex items-center justify-center h-40 bg-blue-500 text-white">
                    <img src="images/bg1.jpg" alt='img' className="h-40 object-cover"/>
                </div>
                <div className="flex items-center justify-center h-40 bg-blue-500 text-white">Item 2</div>
                <div className="flex items-center justify-center h-40 bg-blue-500 text-white">Item 3</div>
                <div className="flex items-center justify-center h-40 bg-blue-500 text-white">
                <img src="images/bg1.jpg" alt='img' className="h-40 object-cover"/>
                </div>
            </div>

        </div>
        
       
        
      
    </div>
  );
};

export default GridComponent;
