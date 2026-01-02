import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaStickyNote,
  FaPlus,
  FaFolder,
  FaStar,
  FaTags,
  FaShareAlt,
  FaTrash,
  FaCog,
  FaQuestionCircle,
  FaBars,
  FaChevronLeft
} from 'react-icons/fa';
import clsx from 'classnames';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { section: 'Main', items: [
      { icon: <FaHome />, text: 'Dashboard', path: '/home' },
      { icon: <FaStickyNote />, text: 'My Notes', path: '/my-notes' },
      { icon: <FaPlus />, text: 'Create Note', path: '/note-editor' }, // Linked to Editor
    ]},
    { section: 'Organize', items: [
      { icon: <FaFolder />, text: 'Folders', path: '/folders' },
      { icon: <FaTags />, text: 'Tags', path: '/tags' },
    ]},
    { section: 'Filters', items: [
      { icon: <FaStar />, text: 'Starred', path: '/starred-notes' },
      { icon: <FaShareAlt />, text: 'Shared', path: '/shared-with-me' },
      { icon: <FaTrash />, text: 'Trash', path: '/trash' },
    ]},
    { section: 'System', items: [
      { icon: <FaCog />, text: 'Settings', path: '/settings' },
      { icon: <FaQuestionCircle />, text: 'Help', path: '/help' },
    ]}
  ];

  return (
    <aside
      className={clsx(
        "h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 z-20 shadow-sm relative",
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
        {isCollapsed ? (
          <span className="text-2xl font-bold text-purple-600">G</span>
        ) : (
          <h1 className="text-xl font-bold flex items-center gap-1">
            <span className="text-purple-600">Good</span>
            <span className="text-sky-500">Notes</span>
          </h1>
        )}
      </div>

      {/* Collapse Toggle (Floating) */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-purple-600 text-white p-1 rounded-full shadow-md hover:bg-purple-700 transition-transform hover:scale-110 z-30"
      >
        {isCollapsed ? <FaBars size={12} /> : <FaChevronLeft size={12} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        {menuItems.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            {!isCollapsed && (
              <h3 className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.section}
              </h3>
            )}
            <div className="space-y-1 px-3">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.text}
                    to={item.path}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                    title={isCollapsed ? item.text : ''}
                  >
                    <span className={clsx("text-lg", isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300")}>
                      {item.icon}
                    </span>
                    
                    {!isCollapsed && (
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.text}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        {!isCollapsed && (
           <div className="text-xs text-center text-gray-400">
             v1.0.0
           </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
