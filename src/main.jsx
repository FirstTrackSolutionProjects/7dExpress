import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { WalletProvider } from './context/WalletContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  {/* <React.StrictMode> */}
    <AuthProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </AuthProvider>
  {/* </React.StrictMode> */}
  </BrowserRouter> ,
)
