import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const GreetingMessage = () => {
  const { business_name, name } = useAuth(); // Get business_name and name from auth context
  const [greeting, setGreeting] = useState('');
  const [greetingIcon, setGreetingIcon] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayDate = now.toLocaleDateString('en-US', dateOptions);

    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);

    setCurrentDateTime(`${todayDate} | ${currentTime}`);

    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
      setGreetingIcon('🌅');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
      setGreetingIcon('☀️');
    } else if (hour >= 18 && hour < 24) {
      setGreeting('Good evening');
      setGreetingIcon('🌆');
    } else {
      setGreeting('Enjoy your night');
      setGreetingIcon('🌙');
    }
  };

  useEffect(() => {
    updateGreeting(); // Set initial greeting
    const intervalId = setInterval(updateGreeting, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Use business_name if available, otherwise fallback to name, then 'User'
  const displayName = business_name || name || 'User';

  return (
    <div className="w-full max-w-[1220px] mx-auto px-4 py-6">
      <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-lg">
        {/* Decorative Accent Bar */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* REMOVED 'hidden' class to make emoji visible on mobile */}
            <div className="flex-none sm:flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-2xl">
              {greetingIcon}
            </div>
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {greeting}, <span className="text-blue-600">{displayName}</span>!
              </h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {currentDateTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Status
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingMessage;