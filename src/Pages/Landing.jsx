import React from 'react'
import Track from '../Components/Track'
import logo from '../assets/images/logo1.png'

const Landing = () => {

  return (
    <>
    <div>
    <body class="bg-bg-landing bg-cover flex items-center justify-center min-h-screen">

    <div class="container mx-auto ">

        <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">

          <div className=" flex flex-col justify-center items-center ">
            <img src={logo} alt="" className='lg:w-[200px] lg:h-[200px]  w-[160px] h-[120px] mb-5'></img>
            <div className="text-xl md:text-4xl italic font-bold text-sky-950 hover:text-sky-900">7D-24*7 On Time, Every Time</div>
          </div>
          
          <div className=" flex flex-col md:items-center justify-center m-auto md:m-7">
            <Track/>
          </div>

        </div>

    </div>
    </body>
    </div>
    </>
  )
}

export default Landing
