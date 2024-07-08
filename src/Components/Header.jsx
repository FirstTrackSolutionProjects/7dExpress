import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {

  
  return (
    <div>
      <div className="bg-bg-header bg-cover px-4 md:px-2">
          <div className="text-[10px] md:text-xl flex justify-evenly h-14 lg:h-20 md:flex items-center space-x-4 font-bold">
            <img src="/public/logo1.png" alt="" className='lg:w-[90px] lg:h-[65px]  w-[45px] h-[28px]'></img>
            <Link to="/" className="text-gray-700 hover:text-orange-100">HOME</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-100">ABOUT</Link>
            <Link to="/track" className="text-gray-700 hover:text-orange-100">TRACKING</Link>
            <Link to="/blog" className="text-gray-700 hover:text-orange-100">BLOGS</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-orange-100">PRICING</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-100">CONTACT</Link>
          </div>

          

        </div>
      </div>
  )
}

export default Header
