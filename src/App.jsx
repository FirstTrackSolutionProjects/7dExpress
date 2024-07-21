import React, { useEffect } from 'react'

import {Routes, Route, useLocation} from 'react-router-dom'
import Landing from './Pages/Landing'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Track from './Components/Track'
import Pricing from './Pages/Pricing'
import FAQs from './Components/FAQs'
import PrivacyPolicy from './Components/PrivacyPolicy'
import Blogs from './Pages/Blogs'
import TermsOfUse from './Components/TermsOfUse'
import SignupForm from './Pages/SignupForm'
import HeaderTemp from './Components/HeaderTemp'
import Tracking from './Pages/Tracking'
import Dashboard from './Pages/Dashboard'
import { useAuth } from './contexts/AuthContext'
import Verify from './Pages/Verify'
import Header from './Components/Header'
const App = () => {
  const { authState } = useAuth()
  const location= useLocation()
  useEffect(()=> { 
    console.log(authState)
  },[authState])
  return (
    <>
      {location.pathname != '/dashboard' ? <HeaderTemp/> : <Header/>}
      <div className={location.pathname!='/dashboard'?`h-[72px]`:'h-16'}></div>
    <div >
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignupForm/>} />
        <Route path='/about' element={<About/>}></Route>
        <Route path='/track' element={<Tracking/>}></Route>
        <Route path='/blog' element={<Blogs/>}></Route>
        <Route path='/pricing' element={<Pricing/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/faq' element={<FAQs/>}></Route>
        <Route path='/terms' element={<TermsOfUse/>}></Route>
        <Route path='/privacy' element={<PrivacyPolicy/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
      </Routes>
      
    </div>
      {location.pathname != '/dashboard' && <Footer/>}
      </>
  )
}

export default App
