import NavItem from "./NavItem";
import { navItems } from "../Constants";
import {  useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Recharge from "./Wallet/Recharge";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const API_URL = import.meta.env.VITE_APP_API_URL
const Header = () => {
  const navigate = useNavigate();
  const [showRecharge, setShowRecharge] = useState(false)
  const {authState, logout} = useAuth()
  const [balance, setBalance] = useState(0)
  const [isMenu,setIsMenu] = useState(false)

  const toggleMenu = () => {
    setIsMenu(!isMenu);
    }
  useEffect(()=>{
    const getBalance = async () => {
      if (authState?.verified){
        try{
          const response = await fetch(`${API_URL}/getBalance`, {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
              'Authorization' : localStorage.getItem('token')
            }
          })
          const responseData = await response.json();
          setBalance(responseData.balance);
        } catch(e){
          
        }
      }
    }
    getBalance();
  },[authState])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
    {showRecharge && <Recharge setShowRecharge={setShowRecharge}/>}
    
    <div className="fixed bg-bg-header bg-cover z-10 top-0 flex justify-center items-center w-full h-16 ">
    <div className="">
    <button onClick={toggleMenu} className={`fixed block md:hidden z-50 top-3 right-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-md`}>
        {isMenu ? 'X' : '☰'}
      </button>
      {isMenu && (
        <div className="fixed md:hidden z-10 py-8 top-16 items-center flex flex-col w-full h-full justify-center bg-slate-200 space-y-2">
          {authState?.authenticated &&<p className="text-sky-950 text-xl font-bold bg-[rgba(255,255,255,0.6)] px-5 py-2 rounded-xl" onClick={()=>navigate('/dashboard')}>{authState?.businessName}</p>}
          <Link to="/" className="text-sky-950 text-xl pt-4 font-bold">Home</Link>
          <Link to="/about" className="text-sky-950 text-xl pt-4 font-bold">About</Link>
          <Link to="/track" className="text-sky-950 text-xl pt-4 font-bold">Tracking</Link>
          <Link to="/blog" className="text-sky-950 text-xl pt-4 font-bold">Blogs</Link>
          <Link to="/pricing" onClick={{scrollToTop}}className="text-sky-950 text-xl pt-4 font-bold">Pricing</Link>
          <Link to="/contact" className="text-sky-950 text-xl pt-4 font-bold">Contact</Link>
          {authState?.authenticated && <p className="text-red-600 text-xl pt-4 font-bold" onClick={()=>{logout(); setIsOpen(false)}}>Logout</p>}
        </div>
      )}
      
        <Link to="/" className="flex md:items-center">
          <img src="images/logo2.png" alt="" className="h-14" />
        </Link>
        </div>
        <nav className="w-full relative z-3 lg:w-4/5 flex justify-evenly text-black items-center h-16">
        <div className="hidden md:flex justify-evenly items-center flex-1">
        {navItems.map((item, index) => (
          <NavItem key={index} name={item.name} url={item.url} isDropdown={item.isDropdown} options={item.options} />
        ))}
        </div>
        

        {authState?.authenticated && (
          <div className="h-16 flex space-x-3 items-center">
            {authState?.verified? (<>
              <div onClick={()=>setShowRecharge(true)} className={`relative bg-blue-600 ${balance < 250 ? "text-red-400" : "text-green-400"} flex items-center font-medium rounded-tl-xl rounded-br-xl px-3 min-w-14 py-2 cursor-pointer border-l-4 border-t-4 border-blue-900`}>
              {balance < 250 && <p className="absolute -mt-5 top-0 right-[2px] text-red-400 text-3xl">!</p>}
                <p><FontAwesomeIcon icon={'fa-solid fa-house'} />{`₹${balance}`}</p>
              </div>
              {/* <div className="bg-white flex items-center font-medium rounded-xl px-3 py-2 ">
                <p>R</p>
              </div> */}
              </>
            ):null}
            <div className="hidden md:flex space-x-4">
              <p className="bg-white text-black flex items-center font-medium rounded-xl px-2 py-2 cursor-pointer" onClick={()=>navigate('/dashboard')}>
                {authState?.businessName}
              </p>
              <p
                className="bg-red-400 text-white flex items-center font-medium rounded-xl px-2 py-2 cursor-pointer"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </p>
            </div>
          </div>
        )}
      </nav>
    </div>
    </>
  );
};

export default Header;
