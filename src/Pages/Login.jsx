import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmailOTPVerificationModal from '../Components/Modals/EmailOTPVerificationModal'
import { toast } from 'react-toastify';
import loginService from '../services/login'
const API_URL = import.meta.env.VITE_APP_API_URL

const LoginForm = () => {
  const { isAuthenticated, emailVerified ,login, verified } = useAuth();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const closeEmailModal = () => {
    setEmailModalOpen(false);
  }

  useEffect(()=>{
    if (isAuthenticated && verified){
      navigate('/dashboard')
    } else if(isAuthenticated && emailVerified){
      navigate('/verify')
    } else if (isAuthenticated){
      setEmailModalOpen(true)
    }
  },[isAuthenticated])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email,
        password
      }
      const loginResponse = await loginService(formData)
      if (loginResponse.success) {
        login(loginResponse.token)
        toast.success("Login Successfull")
      } else {
        toast.error(loginResponse.message)
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };
  return (
    <>
    {emailModalOpen && <EmailOTPVerificationModal open={emailModalOpen} onClose={closeEmailModal} />}
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-sky-950">Hello! Sign in to continue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700 text-[12px] md:text-[15px]">Keep me signed in</span>
                </label>
                <p  className="text-sky-900 hover:underline text-[12px] md:text-[15px] cursor-pointer" onClick={()=>setReset(true)}>
                  Forgot password?
                </p>
              </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-950 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          {/* <div className="mt-4 text-center">
              <button
                className="w-full flex justify-center text-gray-700 font-bold py-2 rounded-md border-gray-500 border-2"
              >
                Sign in with <img src='/src/assets/images/googlebg.png' className='w-6 h-6 ml-2 mt-0'/>
              </button>
            </div> */}
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <button
                  className="text-sky-900 hover:underline"
                  onClick={navigateToSignup}
                >
                  Sign up
                </button>
              </p>
            </div>
            
        </form>
      </div>
      </>
  )
}

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-login bg-cover">
      <LoginForm />
    </div>
  );
};

export default Login;
