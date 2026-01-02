import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaMoon, FaSun, FaBell } from 'react-icons/fa';
import SearchBar from './SearchBar';
import AvatarMenu from './AvatarMenu';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300 z-10">
      {/* Left: Title (Visible on mobile if sidebar hidden, but mainly context) */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
          Welcome, <span className="text-purple-600 dark:text-purple-400">{user?.name || 'User'}</span>
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">Manage your notes efficiently</span>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-2xl px-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <FaBell size={20} />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <AvatarMenu />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
