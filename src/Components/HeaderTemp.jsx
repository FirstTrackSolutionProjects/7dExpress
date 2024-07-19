import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
const HeaderTemp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {authState, logout} = useAuth()
  const [balance, setBalance] = useState(0)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    const getBalance = async () => {
      if (authState.verified){
        try{
          const response = await axios.get('/.netlify/functions/getBalance')
          setBalance(response.data.balance);
        } catch(e){
          
        }
      }
    }
    getBalance();
  },[authState])
  return (
    <header className="fixed z-50 w-full bg-bg-header bg-cover p-4">
      <div className="container h-10 mx-auto flex items-center justify-between">
      <Link to="/"><img src="images/logo1.png" onClick="" alt="" className='lg:w-[90px] lg:h-[65px]  w-16 h-14'></img></Link>
        <div className="hidden md:flex space-x-10">
        <Link to="/" className="text-sky-950 font-bold">Home</Link>
          <Link to="/about" className="text-sky-950 font-bold">About</Link>
          <Link to="/track" className="text-sky-950 font-bold">Tracking</Link>
          <Link to="/blog" className="text-sky-950 font-bold">Blogs</Link>
          <Link to="/pricing" className="text-sky-950 font-bold">Pricing</Link>
          <Link to="/contact" className="text-sky-950 font-bold">Contact</Link>
          {authState.authenticated &&<p className="text-sky-950 font-bold" onClick={()=>navigate('/dashboard')}>{authState.businessName}{authState.verified &&<span className="mx-2 text-sky-950 font-bold" >₹{balance}</span>}</p>}
          
          {authState.authenticated && <p className="text-sky-950 font-bold" onClick={()=>{logout();}}>Logout</p>}
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
          {authState.authenticated && <p className="text-sky-950 font-bold" onClick={()=>{logout(); setIsOpen(false)}}>Logout</p>}
        </div>
      )}
    </header>
  );
};

export default HeaderTemp;
