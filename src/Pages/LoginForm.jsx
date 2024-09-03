// ./src/components/Login.jsx

import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL
const LoginForm = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="bg-bg-login bg-cover flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!showSignUp ? (
          <>
            <h2 className="text-2xl font-bold mb-2">Hello! Lets Get Started</h2>
            <h3 className="text-xl font-bold mb-6">Sign In to continue</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-gray-700 text-[12px] md:text-[15px]">Keep me signed in</span>
                </label>
                <a href="#" className="text-sky-900 hover:underline text-[12px] md:text-[15px]">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-800"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                className="w-full flex justify-center text-gray-700 font-bold py-2 rounded-md border-gray-500 border-2"
              >
                Sign in with <img src='/src/assets/images/googlebg.png' className='w-6 h-6 ml-2 mt-0'/>
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <button
                  className="text-sky-900 hover:underline"
                  onClick={() => setShowSignUp(true)}
                >
                  Sign up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-900"
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-900"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-700">
                Already have an account?{' '}
                <button
                  className="text-sky-900 hover:underline"
                  onClick={() => setShowSignUp(false)}
                >
                  Login
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
