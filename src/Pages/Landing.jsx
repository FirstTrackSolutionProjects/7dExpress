import React from 'react'
import Track from '../Components/Track'

import Partner from '../Components/Partner'
import Pricing from './Pricing'
import { Link } from 'react-router-dom'
import ReasonCard from '../Components/ReasonCard'
import GridComponent from '../Components/GridComponent'

const Landing = () => {

  return (
    <>
    <div>
    <div class="bg-bg-landing bg-cover flex items-center justify-center min-h-screen">

    <div class="container mx-auto ">

        <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">

          <div className=" flex flex-col justify-center items-center ">
            <img src="/public/logo1.png" alt="" className='lg:w-[200px] lg:h-[200px]  w-[160px] h-[120px] mb-5'></img>
            <div className="text-xl md:text-4xl italic font-bold text-sky-950 hover:text-sky-800">7D-On Time, Every Time</div>
            
            {/*<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">
            7D-On Time, Every Time
      </h1>*/}
            
            <div className="flex p-10 space-x-10">
            <Link to="/signup" className=" text-center p-3 h-14 w-40 border-sky-950 rounded-md shadow-white shadow-md bg-sky-950 text-gray-300 font-bold">Signup for free</Link>
            <Link to="/login" className=" text-center p-3 h-14 w-20 border-sky-950 rounded-md shadow-white shadow-md bg-sky-950 text-gray-300 font-bold">Login</Link>
          </div>
          </div>
          
          
          <div className=" flex flex-col md:items-center justify-center -mt-8 md:m-7">
            <Track/>
          </div>

        </div>

    </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 my-4 ml-4 md:my-10 md:ml-24 ">
                <ReasonCard className="mt-2"  title={"Pan India Presence"} icon={'/public/india.png'}/>
                <ReasonCard  title={"Multimodal Logisitics Solution"} icon={'/public/image2.png'}/>
                <ReasonCard  title={"Door to Door pick up and delivery"} icon={'/public/image3.png'}/>
            </div>
    <div className="bg-slate-200 p-4">
    <Pricing/>
    </div>
    <GridComponent/>
   
    <Partner/>
    </div>
    </>
  )
}

export default Landing
