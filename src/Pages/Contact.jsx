import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg-about bg-cover p-4">
      {/* Contact Form */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-sky-950 text-center">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="number"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Contact Number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-900 text-white p-2 rounded-md hover:bg-sky-800"
          >
            Send
          </button>
        </form>
      </div>

      {/* Contact Details */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-sky-950 text-center">Contact Details</h2>
        <p className="text-gray-700 mb-2">
          <strong>Address:</strong> Room No 356, Floor -G, Shahid Bhagat Singh Nagar, Sant Gora, Kumbhar Road, 5th Kumbharwada, Sec 2, Dharavi, Mumbai, Maharashtra,<br/>India-400017
        </p>
        
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> info@7dexpress.com 
        </p>
        <p className="text-gray-700">
          <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM
        </p>
      </div>
    </div>
  );
};

export default Contact;
