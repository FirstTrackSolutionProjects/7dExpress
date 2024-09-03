// Import React and necessary modules
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const API_URL = import.meta.env.VITE_APP_API_URL
// Your component
const ClientDiv = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="client aos-init aos-animate">
      {/* Your content here */}
    </div>
  );
};

export default ClientDiv;
