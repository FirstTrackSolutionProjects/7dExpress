import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/ftlogo.png'

const Header = () => {
  return (
    <div>
      <div className="bg-gray-400 shadow-md px-4 sm:px-6 lg:px-8">
          <div className="text-md flex justify-evenly h-8 lg:h-16 md:flex items-center space-x-4 font-bold">
            <img src={logo} alt="" className='lg:w-[90px] lg:h-[65px]  w-[50px] h-[25px]'></img>
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
