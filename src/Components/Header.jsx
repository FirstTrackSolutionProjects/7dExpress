import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo1.png'

const Header = () => {
  return (
    <div>
      <div className="bg-bg-header bg-cover px-3 sm:px-6 lg:px-2">
          <div className="text-xs md:text-xl flex justify-evenly h-14 lg:h-20 md:flex items-center space-x-4 font-bold">
            <img src={logo} alt="" className='lg:w-[90px] lg:h-[65px]  w-[45px] h-[28px]'></img>
            <Link to="/" className="text-gray-700 hover:text-orange-100">HOME</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-100">ABOUT</Link>
            <Link to="/services" className="text-gray-700 hover:text-orange-100">SERVICES</Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-100">LOGIN</Link>
          </div>
        </div>
      </div>
  )
}

export default Header
