import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center justify-center w-8 h-8 text-gray-700 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300 leading-none"
    >
      <span className="block">
        {isDark ? <FaSun size={26} /> : <FaMoon size={26} />}
      </span>
    </button>
  );
};

export default DarkModeToggle;
