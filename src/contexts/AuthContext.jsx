import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_APP_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const INITIAL_AUTH = { authenticated: false, emailVerified: false, verified : false, admin : false, name : null, businessName : null, id : null, email : null}

  const [authState, setAuthState] = useState(localStorage.getItem('token')?jwtDecode(localStorage.getItem('token')):INITIAL_AUTH);

  const [message, setMessage] = useState(null)
  const clear = () => {
    setMessage(null)
  }
  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/checkAuth`, {
        method : 'POST',
        headers: { 'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : localStorage.getItem('token')
        },
      })
      const data = await response.json()
      console.log(data)
      if (data.status == 200){
        const {authenticated, emailVerified, verified, admin, name, businessName, id, email} = data
        setAuthState({ authenticated: authenticated,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
      } else if (data.status == 402){
        localStorage.removeItem('token');
        setAuthState(INITIAL_AUTH)
        // navigate('/')
      } else {
        setAuthState(INITIAL_AUTH)
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    clear()
    checkAuth();
  }, []);
  useEffect(() => {clear(); checkAuth()}, [navigate]);
  const login = async (email, password) => {
      try{
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.data.status == 200){
        localStorage.setItem('token', response.data.token);
        clear()
        await checkAuth();
      } else {
        setMessage(response.data.message);
        setAuthState(INITIAL_AUTH);
      }
      } catch (e) {
        console.error(e)
      }
  };

  const register = async (email, password, fullName, businessName, mobile) => {
    try{
      const response = await axios.post(`${API_URL}/register`, {  reg_password : password, reg_email : email, name : fullName, business_name : businessName, mobile });
      if (response.data.status == 200){
        localStorage.setItem('token', response.data.token);
        clear()
        await checkAuth();
      } else {
        setMessage(e.response.data.message);
        setAuthState(INITIAL_AUTH);
      }
      } catch (e) {
        console.error(e)
      }
  };

  const logout = async () => {
    try{
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setAuthState(INITIAL_AUTH);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
    setAuthState(INITIAL_AUTH);
  };

  return (
    <AuthContext.Provider value={{ authState, message ,login, logout, register, checkAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
