import React, { useState, useMemo, useRef, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaMoon, FaSun, FaBell, FaSearch, FaRegFileAlt, FaTimes, FaBars } from 'react-icons/fa'; // Added FaBars
import AvatarMenu from './AvatarMenu';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import { useNoteContext } from '../context/NoteContext';
import { useSidebar } from '../context/SidebarContext'; // Import Sidebar Context

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { logout, user } = useAuth();
  const { notes } = useNoteContext();
  const { toggleSidebar } = useSidebar(); // Use Context
  
  // Local Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Notes for Spotlight Search
  const searchResults = useMemo(() => {
      if (!searchTerm.trim()) return [];
      const lower = searchTerm.toLowerCase();
      return notes.filter((n: any) => 
          (n.title?.toLowerCase() || '').includes(lower) || 
          (n.content?.toLowerCase() || '').includes(lower) ||
          (n.tags?.join(' ').toLowerCase() || '').includes(lower)
      ).slice(0, 5); // Limit to top 5
  }, [searchTerm, notes]);

  // Active Reminders
  const activeReminders = useMemo(() => {
      const now = new Date();
      return notes.filter((n: any) => 
          (n.isReminder || n.reminder) && 
          n.reminderDate && 
          new Date(n.reminderDate) > now
      ).sort((a: any, b: any) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime());
  }, [notes]);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300 z-30 sticky top-0">
      
      {/* Left: Mobile Toggle & Welcome */}
      <div className="flex items-center gap-4">
          <button 
             onClick={toggleSidebar} 
             className="md:hidden text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
             <FaBars size={20} />
          </button>

          <div className="flex flex-col cursor-pointer" onClick={() => navigate('/home')}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight hidden sm:block">
              Welcome, <span className="text-purple-600 dark:text-purple-400">{user?.name || 'User'}</span>
            </h2>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight sm:hidden">
              <span className="text-purple-600">G</span><span className="text-sky-500">N</span>
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">GoodNotes Manager</span>
          </div>
      </div>

      {/* Center: Spotlight Search Bar */}
      <div className="flex-1 max-w-xl px-2 md:px-4 relative z-50" ref={searchRef}>
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setIsSearchOpen(true); }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search..."
                className="w-full py-2.5 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none border border-transparent dark:border-gray-600 transition-all text-sm md:text-base"
            />
            <FaSearch className="absolute left-3.5 top-3 text-gray-400" />
            {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                    <FaTimes />
                </button>
            )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchTerm && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up">
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map((note: any) => (
                            <li key={note.id || note._id}>
                                <button
                                    onClick={() => { navigate('/note-editor', { state: { note } }); setIsSearchOpen(false); }}
                                    className="w-full text-left px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                                >
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-300">
                                        <FaRegFileAlt />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{note.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{note.content?.replace(/<[^>]+>/g, '')}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                        <li className="p-2 text-center bg-gray-50 dark:bg-gray-900/50">
                            <button onClick={() => { navigate('/search'); setIsSearchOpen(false); }} className="text-xs text-purple-600 font-medium hover:underline">
                                View all results
                            </button>
                        </li>
                    </ul>
                ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                        No results found.
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4 relative">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} />}
        </button>

        {/* Notifications Bell with Dropdown */}
        <div className="relative" ref={notifRef}>
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            >
                <FaBell size={20} className={activeReminders.length > 0 ? "text-purple-600" : ""} />
                {activeReminders.length > 0 && (
                    <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in-up origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm">Reminders</h3>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">{activeReminders.length} Active</span>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                        {activeReminders.length > 0 ? (
                            activeReminders.map((note: any) => (
                                <button
                                    key={note.id || note._id}
                                    onClick={() => { navigate('/note-editor', { state: { note } }); setShowNotifications(false); }}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-purple-600 transition-colors">{note.title}</p>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                            {new Date(note.reminderDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <FaBell size={10} className="text-purple-400" />
                                        {new Date(note.reminderDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </button>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <FaBell size={24} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-sm text-gray-500">No active reminders</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>

        <AvatarMenu />
        
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
