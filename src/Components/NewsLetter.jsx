// Newsletter.js
import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex items-center justify-center max-w-2xl w-full rounded-2xl bg-gradient-to-r from-cyan-300  to-yellow-200 py-10 my-5">
      <div className="w-full max-w-xl bg-white bg-opacity-35 rounded-lg p-4">
        <h2 className="text-2xl text-sky-950 font-semibold text-center mb-4">Subscribe to our Newsletter</h2>
        <p className="text-center mb-6">Stay updated with the latest news and special offers!</p>
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 "
          />
          <button
            type="submit"
            className="w-full md:w-auto p-3 bg-sky-950  text-white font-semibold rounded-lg  focus:outline-none focus:ring-2 "
          >
            Subscribe
          </button>
        </form>
      </div>
      </div>
  );
};

export default Newsletter;
