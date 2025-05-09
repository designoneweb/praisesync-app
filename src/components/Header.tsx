
'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
  toggleTheme: () => void; // Add prop for toggling theme
  currentTheme: string; // Add prop for current theme (to display correct icon)
}

const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-15.66l-.707.707M4.04 19.96l-.707.707M21 12h-1M4 12H3m15.66 8.66l-.707-.707M4.04 4.04l-.707-.707" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar, toggleTheme, currentTheme }) => {
  return (
    <header className="bg-praise-bg dark:bg-praise-dark-card-bg shadow-sm p-4 sticky top-0 z-10 flex items-center justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-md text-praise-text-dark dark:text-praise-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-praise-accent"
        >
          <HamburgerIcon />
        </button>
        <h1 className="text-xl font-semibold text-praise-text-dark dark:text-praise-dark-text">{title}</h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md text-praise-text-dark dark:text-praise-dark-text hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-praise-accent"
      >
        {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </header>
  );
};

export default Header;
