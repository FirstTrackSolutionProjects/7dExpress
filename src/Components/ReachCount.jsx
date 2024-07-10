import React from 'react';

const ReachCount = () =>{
    return(
        <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex py-2 md:py-4 items-center justify-evenly md:mb-8">
                    <div className="w-28 md:w-44 h-28 rounded-3xl bg-red-500 bg-opacity-40 md:mx-2">
                        <div className='justify-center items-center text-center p-4'>
                        <div className='text-2xl text-red-800'>20K+</div>
                        <div className='text-lg md:text-xl text-red-800'>Trusted Clients</div>
                        </div>
                    </div>
                    <div className=" w-32 md:w-36 h-28 rounded-3xl bg-blue-500 bg-opacity-40  md:mx-2">
                    <div className='justify-center items-center text-center p-2'>
                        <div className='text-2xl text-blue-800'>10K+</div>
                        <div className='text-lg md:text-xl text-blue-800'>Orders Delivered</div>
                        </div>
                    </div>
                    </div>
                    <div className="flex py-2 md:py-4 items-center justify-evenly md:mb-8">

                    <div className="w-28 md:w-44 h-28 rounded-3xl bg-green-500 bg-opacity-40  md:mx-2">
                    <div className='justify-center items-center text-center p-5'>
                        <div className='text-2xl text-green-900'>30K+</div>
                        <div className='text-lg md:text-xl text-green-900'>Sellers</div>
                        </div>
                    </div>
                    <div className=" w-32 md:w-36 h-28 rounded-3xl bg-yellow-500 bg-opacity-40  md:mx-2">
                    <div className='justify-center items-center text-center p-2'>
                        <div className='text-2xl text-yellow-800'>25+</div>
                        <div className='text-lg md:text-xl text-yellow-800'>Trusted Partners</div>
                        </div>
                    </div>
                    
                    
     
                    </div>


                </div>
            
           
            
          
    )
}

export default ReachCount;