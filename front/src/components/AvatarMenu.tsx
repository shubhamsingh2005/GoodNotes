import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AvatarMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
      >
        <FaUserCircle size={22} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
          <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">John Doe</p>
          <p className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">johndoe@example.com</p>
          <hr className="my-1 border-gray-300 dark:border-gray-700" />
          <button
            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
