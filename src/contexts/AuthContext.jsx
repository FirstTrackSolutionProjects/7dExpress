import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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
      const response = await axios.get('/.netlify/functions/checkAuth', {headers : {'Authorization': localStorage.getItem('token')}});
      const {emailVerified, verified, admin, name, businessName, id, email} = response.data
      setAuthState({ authenticated: true,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
    } catch (e) {
      if (e.response.status == 402){
        localStorage.removeItem('token');
        navigate('/')
      }
        setAuthState(INITIAL_AUTH)
    }
  };
  useEffect(() => {
    clear()
    checkAuth();
  }, []);
  useEffect(() => {clear(); checkAuth()}, [navigate]);
  const login = async (email, password) => {
      try{
      const response = await axios.post('/.netlify/functions/login', { email, password });
      localStorage.setItem('token', response.data.token);
      clear()
      await checkAuth();
      } catch (e) {
        setMessage(e.response.data.message);
        setAuthState(INITIAL_AUTH);
      }
  };

  const register = async (email, password, fullName, businessName, mobile) => {
    try{
      const response = await axios.post('/.netlify/functions/register', {  reg_password : password, reg_email : email, name : fullName, business_name : businessName, mobile });
      localStorage.setItem('token', response.data.token);
      clear()
      await checkAuth();
      } catch (e) {
        setMessage(e.response.data.message);
        setAuthState(INITIAL_AUTH);
      }
  };

  const logout = async () => {
    try{
      localStorage.removeItem('token');
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
