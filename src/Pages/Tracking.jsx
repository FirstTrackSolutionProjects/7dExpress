import React from 'react';
import Track from '../Components/Track';
const API_URL = import.meta.env.VITE_APP_API_URL
const Tracking =()=>{
    return(

        <div className=" mx-auto p-4 md:h-96 ">
        <div className="grid grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <div className="flex-col my-auto mx-auto">
            <div className='pt-10 md:pt-20 text-2xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500'>Track Your Order Easily</div>
            <div className='text-[14px] md:text-xl text-center mt-4'>Just enter your tracking number & it’s done</div>
            </div>
            <div className='pt-10 md:pt-20'>
            <h1 className="text-30px lg:text-xl text-sky-950 font-bold mb-5 text-center">Track Your Parcel</h1>
            <Track/>
            </div>

        </div>
        
       
        
      
    </div>


        
    )
}

export default Tracking;