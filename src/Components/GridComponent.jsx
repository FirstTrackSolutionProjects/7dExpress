import React from 'react';

const GridComponent = () => {
  return (
    <div className=" mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex-col my-auto mx-auto">
                <div className="text-3xl text-sky-950">Industry</div>
                <div className="text-6xl text-yellow-500">Expertise</div>
                <div className="text-2xl text-sky-950 mt-5">We are logistic experts in your industry through<br/>our in-depth experience.</div>
            </div>
            <div className="grid grid-cols-2 gap-0 mt-5 md:-mt-5">
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                    <img src="images/bg1.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
                <div className="flex-col  justify-center h-36 md:h-52">
                <div className="text-lg text-sky-950 my-5 text-center">Streamlining Textile and Garment Logistics with Precision, Efficiency, and Industry Expertise</div>
                <div className="text-3xl text-yellow-500 text-center">Textile & Garments</div>
                </div>
                <div className="flex-col justify-center h-36 md:h-52">
                <div className="text-lg text-sky-950 my-5 text-center">Reliable pharmaceutical logistics ensuring safe, timely, and efficient delivery of critical medications</div>
                <div className="text-3xl text-yellow-500 text-center">Pharmaceuticals</div>
                </div>
                <div className="flex items-center justify-center h-36 md:h-52 bg-blue-500 text-white">
                <img src="images/bg1.jpg" alt='img' className="h-36 md:h-52 w-full object-cover"/>
                </div>
            </div>

        </div>
        
       
        
      
    </div>
  );
};

export default GridComponent;
