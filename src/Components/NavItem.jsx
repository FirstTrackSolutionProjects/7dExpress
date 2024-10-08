
import { Link } from "react-router-dom"
import { useState } from "react"
const API_URL = import.meta.env.VITE_APP_API_URL
const NavItem2 = ({name,url}) => {
  return (
    <Link to={url} className="group relative cursor-pointer font-medium transition-all duration-300 hover:font-bold">
      {name}
      <div className=" underline z-0 border-white absolute bottom-0 left-0 h-0.5 bg-white underline-width-0 underline-transition group-hover:underline-width-full"></div>
    </Link>
  )
}

const NavItem = ({ url,  name , isDropdown, options}) => {
  const [isDropped, setIsDropped] = useState(false)
  const toggleDropped = () => {
    setIsDropped(!isDropped);  
  }
  return (
    <>
      <div className="relative" onClick={isDropdown?(toggleDropped):(()=>{})}>
        
      <Link to={url} className="group relative cursor-pointer font-medium transition-all duration-300 hover:font-bold">
      {`${name}${isDropdown?(isDropped?" ▲":" ▼"):""}`}
      <div className=" underline z-0 border-white absolute bottom-0 left-0 h-0.5 bg-white underline-width-0 underline-transition group-hover:underline-width-full"></div>
    </Link>
      {isDropped &&
        (<>
          <div className="absolute top-8 w-48 p-4  bg-gray-200 z-50 ">
            {options?.map((item, index) => (
              <div onClick={item.isDropdown?()=>{}:()=>{}} className="text-black py-2">
              <Link to={item.url} className="group relative cursor-pointer font-medium transition-all duration-300 hover:font-bold">
      {item.name}
      <div className=" underline z-0 border-white absolute bottom-0 left-0 h-0.5 bg-white underline-width-0 underline-transition group-hover:underline-width-full"></div>
    </Link>
              </div>
            ))}
          </div>
        </>)
      }
      </div>
      
    </>
  )
}

export default NavItem

