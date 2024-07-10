import React from 'react';
import AutoSlider from './AutoSlider';

const GridComponent = () => {
  return (
    <div className=" mx-auto p-4 ">
        <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex-col my-auto mx-auto">
                <div className="text-3xl text-sky-950">Industry</div>
                <div className="text-5xl md:text-6xl text-yellow-500">Expertise</div>
                <div className="text-xl md:text-2xl text-sky-950 mt-5">We are logistic experts in your industry through<br/>our in-depth experience.</div>
            </div>
            <AutoSlider/>
            

        </div>
        
       
        
      
    </div>
  );
};

export default GridComponent;
