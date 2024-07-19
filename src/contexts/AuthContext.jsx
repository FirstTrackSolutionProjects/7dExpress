import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const INITIAL_AUTH = { authenticated: false, emailVerified: false, verified : false, admin : false, name : null, businessName : null, id : null, email : null}
  const getInitialAuthState =  () => {
    axios.get('/.netlify/functions/getTokenData', {headers : {'Authorization': localStorage.getItem('token')}}).then(response =>{
      try {
        return JSON.parse(response.data);
      } catch (e) {
        console.log(response.data);
        return INITIAL_AUTH;
      }
    })
  };

  const [authState, setAuthState] = useState(getInitialAuthState);
  const [message, setMessage] = useState(null)
  const clear = () => {
    setMessage(null)
  }
  const checkAuth = async () => {
    try {
      const response = await axios.post('/.netlify/functions/checkAuth');
      const {emailVerified, verified, admin, name, businessName, id, email} = response.data
      setAuthState({ authenticated: true,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
    } catch {
        setAuthState(INITIAL_AUTH)
        logout();
      // try {
      //   await axios.post('/.netlify/functions/refreshAuth');
      //   const response = await axios.post('/.netlify/functions/checkAuth');
      //   const {emailVerified, verified, admin, name, businessName, id, email} = response.data
      //   setAuthState({ authenticated: true,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
      // } catch (e) {
      //   if (authState.authenticated) {
      //     logout();
      //   }
      // }
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
      await axios.post('/.netlify/functions/logout');
      localStorage.removeItem('token');
      if (location.pathname == '/dashboard')
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
