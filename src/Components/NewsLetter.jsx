// Newsletter.js
import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Subscribe to our Newsletter</h2>
        <p className="text-center mb-6">Stay updated with the latest news and special offers!</p>
        <form className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full md:w-auto p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
