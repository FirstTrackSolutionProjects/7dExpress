import React from 'react'
import Track from '../Components/Track'

import Partner from '../Components/Partner'
import Pricing from './Pricing'
import { Link } from 'react-router-dom'
import ReasonCard from '../Components/ReasonCard'
import GridComponent from '../Components/GridComponent'
import ReachCount from '../Components/ReachCount'
import Newsletter from '../Components/NewsLetter'

const Landing = () => {

  return (
    <>
    <div className='flex flex-col items-center w-full overflow-x-hidden'>
    <div class="bg-bg-landing bg-cover flex w-full items-center justify-center min-h-screen">

    <div class="container mx-auto ">

        <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">

          <div className=" flex flex-col justify-center items-center ">
            <img src="images/logo1.png" alt="" className='lg:w-[200px] lg:h-[200px]  w-[160px] h-[120px] mb-5'></img>
            <div className="text-xl md:text-4xl italic font-bold text-sky-950 hover:text-sky-800">7D-On Time, Every Time</div>
            <div className="text-[12px] md:text-xl italic font-bold text-black mt-4">Your Reliable Partner For Domestic Shipping Services.</div>
            {/*<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">
            7D-On Time, Every Time
      </h1>*/}
            
            <div className="flex p-10 space-x-10">
            <Link to="/signup" className=" text-center p-3 h-14 w-40 border-sky-950 rounded-md shadow-white shadow-md bg-sky-950 text-gray-300 font-semibold">Signup for Free</Link>
            <Link to="/login" className=" text-center p-3 h-14 w-20 border-sky-950 rounded-md shadow-white shadow-md bg-sky-950 text-gray-300 font-semibold">Login</Link>
          </div>
          </div>
          
          
          <div className=" flex flex-col md:items-center justify-center -mt-8 md:m-7">
          <h1 className="text-30px lg:text-xl text-sky-950 font-bold mb-5 text-center">Track Your Parcel</h1>
            <Track/>
          </div>

        </div>

    </div>
    </div>
    {/* <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 my-4 ml-4 md:my-10 md:ml-24 mb-8">
                <ReasonCard  title={"Pan India Presence"} icon={'images/india.png'}/>
                <ReasonCard  title={"Multimodal Logisitics Solution"} icon={'images/image2.png'}/>
                <ReasonCard  title={"Door to Door pick up and delivery"} icon={'images/image3.png'}/>
            </div> */}
            <div>
            <div className='text-4xl text-center text-sky-950 flex-col mt-8'>Why Choose Us?</div>
            
              <div className="grid grid-cols-1 w-full px-2 sm:px-8 lg:grid-cols-3 md:gap-8 my-8">
                
                <ReasonCard  title={"Pan India Presence"} icon={'images/india.png'}/>
                <ReasonCard  title={"Multimodal Logisitics Solution"} icon={'images/image2.png'}/>
                <ReasonCard  title={"Door to Door pick up and delivery"} icon={'images/image3.png'}/>
            </div>
            </div>

            <div className='mb-5'>
            <div className='text-4xl text-center text-sky-950 flex-col my-8'>7D Express Superiority</div>
              <ReachCount/>
            </div>
    
    <Pricing/>
    
    <GridComponent/>
      <Newsletter/>
    <Partner/>
    </div>
    </>
  )
}

export default Landing
