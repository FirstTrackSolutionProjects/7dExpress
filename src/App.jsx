import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './Components/Header'
import Landing from './Pages/Landing'
import Contact from './Pages/Login'
import About from './Pages/About'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className=''>
      <Header/>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
