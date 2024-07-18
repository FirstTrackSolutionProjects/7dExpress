import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const INITIAL_AUTH = { authenticated: false, emailVerified: false, verified : false, admin : false, name : null, businessName : null, id : null, email : null}
  const [authState, setAuthState] = useState(INITIAL_AUTH);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const clear = () => {
    setMessage(null)
    setError(null)
  }
  const checkAuth = async () => {
    try {
      const response = await axios.post('/.netlify/functions/checkAuth');
      const {emailVerified, verified, admin, name, businessName, id, email} = response.data
      setAuthState({ authenticated: true,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
    } catch {
      try {
        await axios.post('/.netlify/functions/refreshAuth');
        const response = await axios.post('/.netlify/functions/checkAuth');
        const {emailVerified, verified, admin, name, businessName, id, email} = response.data
        setAuthState({ authenticated: true,  emailVerified : emailVerified, verified : verified, admin : admin, name : name, businessName : businessName, id : id, email : email});
      } catch (e) {
        logout();
      }
    }
  };
  useEffect(() => {
    clear()
    checkAuth();
  }, []);
  useEffect(() => {clear()}, [navigate]);
  const login = async (email, password) => {
      try{
      await axios.post('/.netlify/functions/login', { email, password });
      clear()
      await checkAuth();
      } catch (e) {
        setMessage(e.response.data.message);
        setError(e.message.data.error);
        setAuthState(INITIAL_AUTH);
      }
  };

  const register = async (email, password, fullName, businessName, mobile) => {
    try{
      await axios.post('/.netlify/functions/register', {  reg_password : password, reg_email : email, name : fullName, business_name : businessName, mobile });;
      clear()
      await checkAuth();
      } catch (e) {
        setMessage(e.response.data.message);
        setError(e.message.data.error);
        setAuthState(INITIAL_AUTH);
      }
  };

  const logout = async () => {
    await axios.post('/.netlify/functions/logout');
    if (location.pathname == '/dashboard')
      navigate('/');
    setAuthState(INITIAL_AUTH);
  };

  return (
    <AuthContext.Provider value={{ authState, message, error ,login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
