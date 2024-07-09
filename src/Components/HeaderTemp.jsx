import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'

const HeaderTemp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-bg-header bg-cover p-4">
      <div className="container h-10 mx-auto flex items-center justify-between">
      <img src="images/logo1.png" alt="" className='lg:w-[90px] lg:h-[65px]  w-16 h-14'></img>
        <div className="hidden md:flex space-x-10">
        <Link to="/" className="text-sky-950 font-bold">Home</Link>
          <Link to="/about" className="text-sky-950 font-bold">About</Link>
          <Link to="/track" className="text-sky-950 font-bold">Tracking</Link>
          <Link to="/blog" className="text-sky-950 font-bold">Blogs</Link>
          <Link to="/pricing" className="text-sky-950 font-bold">Pricing</Link>
          <Link to="/contact" className="text-sky-950 font-bold">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-sky-950 focus:outline-none">
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden items-center flex flex-col space-y-2 mt-2">
          <Link to="/" className="text-sky-950 font-bold">Home</Link>
          <Link to="/about" className="text-sky-950 font-bold">About</Link>
          <Link to="/track" className="text-sky-950 font-bold">Tracking</Link>
          <Link to="/blog" className="text-sky-950 font-bold">Blogs</Link>
          <Link to="/pricing" className="text-sky-950 font-bold">Pricing</Link>
          <Link to="/contact" className="text-sky-950 font-bold">Contact</Link>
        </div>
      )}
    </header>
  );
};

export default HeaderTemp;
