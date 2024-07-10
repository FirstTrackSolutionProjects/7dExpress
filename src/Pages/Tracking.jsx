import React from 'react';
import Track from '../Components/Track';

const Tracking =()=>{
    return(
        <div className=' min-h-72  '>
            <div className='grid grid-cols-2 px-20'>
                <div>
                <div className='pt-20 text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500'>Track Your Order Easily</div>
                <div className='text-xl text-center mt-4'>Just enter your tracking number & it’s done</div>
                </div>

                <div className='py-16'>
                    <Track/>
                </div>
            </div>
        </div>
    )
}

export default Tracking;