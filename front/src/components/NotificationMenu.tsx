import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
      >
        <FaBell size={22} /> {/* You can adjust size to 26 or 28 if you want even bigger */}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
          <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
