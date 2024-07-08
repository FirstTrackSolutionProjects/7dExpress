import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTag, faPhone, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
    const [businessName, setBusinessName] = useState('');
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Email:', email, 'Password:', password);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-login bg-cover">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg my-3">
        <div className="text-3xl font-bold mb-5 text-sky-950">Sign Up</div>
        <div className="text-[14px] font-bold mb-5 text-sky-900">Signing up is easy. It only takes a few steps</div>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faUserTag} className=" justify-center mt-4 mr-2 text-sky-950" />
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder=""
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700"> Full Name</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faUser} className=" justify-center mt-4 mr-2 text-sky-950" />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faPhone} className=" justify-center mt-4 mr-2 text-sky-950" />
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faEnvelope} className=" justify-center mt-4 mr-2 text-sky-950" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className='flex justify-center'>
            <FontAwesomeIcon icon={faLock} className=" justify-center mt-4 mr-2 text-sky-950" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-sky-900 shadow-sky-900 rounded-md shadow-sm focus:outline-none focus:ring-sky-950 focus:border-sky-950 sm:text-sm"
            />
          </div></div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-950 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 text-center">
              <p className="text-gray-700">
                Already have an account?{' '}
                <button
                  className="text-sky-900 hover:underline"
                  onClick={navigateToLogin}
                >
                  Login
                </button>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
