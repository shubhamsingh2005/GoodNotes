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
  FaChevronLeft,
  FaInfoCircle
} from 'react-icons/fa';
import clsx from 'classnames';
import { useSidebar } from '../context/SidebarContext';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar(); // Mobile Context

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleMobileLinkClick = () => {
      // Close sidebar on mobile when a link is clicked
      if (window.innerWidth < 768) {
          closeSidebar();
      }
  };

  const menuItems = [
    { section: 'Main', items: [
      { icon: <FaHome />, text: 'Dashboard', path: '/home' },
      { icon: <FaStickyNote />, text: 'My Notes', path: '/my-notes' },
      { icon: <FaPlus />, text: 'Create Note', path: '/note-editor' }, 
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
      { icon: <FaInfoCircle />, text: 'About', path: '/about' }, // Added About
    ]}
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={closeSidebar}
        />
      )}

      <aside
        className={clsx(
          "h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 z-40 shadow-xl md:shadow-none",
          // Mobile Styles: Fixed, Transform based on isOpen
          "fixed inset-y-0 left-0 w-64 transform transition-transform ease-in-out duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop Styles: Relative, Always visible (translate-x-0), Width based on collapse
          "md:relative md:translate-x-0",
          isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        {/* Brand Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 dark:border-gray-700 relative">
          {isCollapsed ? (
            <span className="text-2xl font-bold text-purple-600 hidden md:block">G</span>
          ) : (
            <h1 className="text-xl font-bold flex items-center gap-1">
              <span className="text-purple-600">Good</span>
              <span className="text-sky-500">Notes</span>
            </h1>
          )}
          
          {/* Mobile Close Button (inside sidebar) */}
          <button 
            onClick={closeSidebar} 
            className="absolute right-4 md:hidden text-gray-500 hover:text-red-500"
          >
             <FaChevronLeft />
          </button>
        </div>

        {/* Desktop Collapse Toggle (Floating) */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-20 bg-purple-600 text-white p-1 rounded-full shadow-md hover:bg-purple-700 transition-transform hover:scale-110 z-50 hidden md:flex"
        >
          {isCollapsed ? <FaBars size={12} /> : <FaChevronLeft size={12} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
          {menuItems.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              {/* Show Section Title if NOT collapsed (Desktop) OR always on Mobile */}
              {(!isCollapsed || window.innerWidth < 768) && (
                <h3 className={clsx(
                    "px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider",
                    isCollapsed ? "md:hidden" : ""
                )}>
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
                      onClick={handleMobileLinkClick}
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
                      
                      {/* Show Text if NOT collapsed (Desktop) OR always on Mobile */}
                      <span className={clsx(
                          "whitespace-nowrap overflow-hidden text-ellipsis",
                          isCollapsed ? "md:hidden" : "block"
                      )}>
                        {item.text}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User / Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
           {/* Show Version if NOT collapsed (Desktop) OR always on Mobile */}
           <div className={clsx("text-xs text-center text-gray-400", isCollapsed ? "md:hidden" : "")}>
             v1.0.0
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
