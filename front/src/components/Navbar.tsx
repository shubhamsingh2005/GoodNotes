// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav
      className={`flex items-center justify-between px-6 py-4 shadow-md mb-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* App Name */}
      <div className="text-2xl font-bold">
        GoodNotes
      </div>

      {/* Center user info */}
      <div className="hidden sm:block text-sm">
        {user?.email && <span>Welcome, {user.email}</span>}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1">
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            darkMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
