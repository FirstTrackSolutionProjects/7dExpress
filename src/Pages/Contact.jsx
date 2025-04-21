import React, { useState } from 'react';
import sendContactEmailService from '../services/sendContactEmailService';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_APP_API_URL

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await sendContactEmailService(
        formData.name,
        formData.email,
        formData.mobile,
        formData.subject,
        formData.message
      );
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg-about bg-cover p-4">
      <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-sky-950 text-center">Contact Us</h2>
        {status === 'success' && <p className="text-green-600 mb-4 text-center">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-600 mb-4 text-center">Failed to send message. Please try again.</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Contact Number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message Subject"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-sky-900 text-white p-2 rounded-md hover:bg-sky-800 disabled:bg-sky-700"
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
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
          <strong>Email:</strong> 7dxpress@gmail.com
        </p>
        <p className="text-gray-700">
          <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 8:00 PM
        </p>
      </div>
    </div>
  );
};

export default Contact;
