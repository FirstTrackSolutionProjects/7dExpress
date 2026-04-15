import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const GreetingMessage = () => {
  const { business_name, name } = useAuth();
  const [greeting, setGreeting] = useState('');
  const [greetingIcon, setGreetingIcon] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [theme, setTheme] = useState({
    bg: 'bg-white',
    border: 'border-gray-100',
    accent: 'bg-blue-600',
    nameText: 'text-blue-600',
    iconBg: 'bg-blue-50',
    timeIcon: 'text-blue-500'
  });

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const todayDate = now.toLocaleDateString('en-US', dateOptions);
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);

    setCurrentDateTime(`${todayDate} | ${currentTime}`);

    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
      setGreetingIcon('🌅');
      setTheme({ bg: 'bg-amber-50', border: 'border-amber-200', accent: 'bg-amber-500', nameText: 'text-amber-700', iconBg: 'bg-amber-200', timeIcon: 'text-amber-500' });
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good Afternoon');
      setGreetingIcon('☀️');
      setTheme({ bg: 'bg-orange-50', border: 'border-orange-200', accent: 'bg-orange-500', nameText: 'text-orange-700', iconBg: 'bg-orange-200', timeIcon: 'text-orange-500' });
    } else if (hour >= 18 && hour < 24) {
      setGreeting('Good Evening');
      setGreetingIcon('🌆');
      setTheme({ bg: 'bg-indigo-50', border: 'border-indigo-200', accent: 'bg-indigo-500', nameText: 'text-indigo-700', iconBg: 'bg-indigo-200', timeIcon: 'text-indigo-500' });
    } else {
      setGreeting('Enjoy Your Night');
      setGreetingIcon('🌙');
      setTheme({ bg: 'bg-slate-100', border: 'border-slate-300', accent: 'bg-slate-600', nameText: 'text-slate-700', iconBg: 'bg-slate-200', timeIcon: 'text-slate-500' });
    }
  };

  useEffect(() => {
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);

  const displayName = business_name || name || 'User';

  return (
    <div className="w-full max-w-[1220px] mx-auto px-4 py-4 md:py-8">
      <div className={`relative overflow-hidden ${theme.bg} rounded-2xl md:rounded-3xl shadow-sm border ${theme.border} p-5 md:p-8 transition-all duration-500`}>
        {/* Decorative Accent Bar */}
        <div className={`absolute top-0 left-0 w-1.5 md:w-2.5 h-full ${theme.accent}`}></div>

        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            {/* Icon Box - Smaller on mobile */}
            <div className={`flex-none flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl ${theme.iconBg} text-3xl md:text-5xl shadow-sm`}>
              {greetingIcon}
            </div>
            
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {greeting}, <br className="md:hidden" /> 
                <span className={`${theme.nameText}`}>{displayName}</span>!
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm md:text-lg font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 md:h-5 md:w-5 ${theme.timeIcon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentDateTime}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default GreetingMessage;