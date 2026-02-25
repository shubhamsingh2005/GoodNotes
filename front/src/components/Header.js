import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaMoon, FaSun, FaBell, FaSearch, FaRegFileAlt, FaTimes, FaBars } from 'react-icons/fa'; // Added FaBars
import AvatarMenu from './AvatarMenu';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import { useNoteContext } from '../context/NoteContext';
import { useSidebar } from '../context/SidebarContext'; // Import Sidebar Context
const Header = () => {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { logout, user } = useAuth();
    const { notes } = useNoteContext();
    const { toggleSidebar } = useSidebar(); // Use Context
    // Local Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    // Notifications State
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);
    const handleLogout = () => {
        logout();
        navigate('/signin');
    };
    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Filter Notes for Spotlight Search
    const searchResults = useMemo(() => {
        if (!searchTerm.trim())
            return [];
        const lower = searchTerm.toLowerCase();
        return notes.filter((n) => (n.title?.toLowerCase() || '').includes(lower) ||
            (n.content?.toLowerCase() || '').includes(lower) ||
            (n.tags?.join(' ').toLowerCase() || '').includes(lower)).slice(0, 5); // Limit to top 5
    }, [searchTerm, notes]);
    // Active Reminders
    const activeReminders = useMemo(() => {
        const now = new Date();
        return notes.filter((n) => (n.isReminder || n.reminder) &&
            n.reminderDate &&
            new Date(n.reminderDate) > now).sort((a, b) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime());
    }, [notes]);
    return (_jsxs("header", { className: "flex items-center justify-between px-4 md:px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300 z-30 sticky top-0", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggleSidebar, className: "md:hidden text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: _jsx(FaBars, { size: 20 }) }), _jsxs("div", { className: "flex flex-col cursor-pointer", onClick: () => navigate('/home'), children: [_jsxs("h2", { className: "text-xl font-bold text-gray-800 dark:text-white tracking-tight hidden sm:block", children: ["Welcome, ", _jsx("span", { className: "text-purple-600 dark:text-purple-400", children: user?.name || 'User' })] }), _jsxs("h2", { className: "text-xl font-bold text-gray-800 dark:text-white tracking-tight sm:hidden", children: [_jsx("span", { className: "text-purple-600", children: "G" }), _jsx("span", { className: "text-sky-500", children: "N" })] }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400 hidden sm:block", children: "GoodNotes Manager" })] })] }), _jsxs("div", { className: "flex-1 max-w-xl px-2 md:px-4 relative z-50", ref: searchRef, children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: searchTerm, onChange: (e) => { setSearchTerm(e.target.value); setIsSearchOpen(true); }, onFocus: () => setIsSearchOpen(true), placeholder: "Search...", className: "w-full py-2.5 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none border border-transparent dark:border-gray-600 transition-all text-sm md:text-base" }), _jsx(FaSearch, { className: "absolute left-3.5 top-3 text-gray-400" }), searchTerm && (_jsx("button", { onClick: () => setSearchTerm(''), className: "absolute right-3 top-3 text-gray-400 hover:text-gray-600", children: _jsx(FaTimes, {}) }))] }), isSearchOpen && searchTerm && (_jsx("div", { className: "absolute top-full left-4 right-4 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in-up", children: searchResults.length > 0 ? (_jsxs("ul", { children: [searchResults.map((note) => (_jsx("li", { children: _jsxs("button", { onClick: () => { navigate('/note-editor', { state: { note } }); setIsSearchOpen(false); }, className: "w-full text-left px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors", children: [_jsx("div", { className: "p-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-600 dark:text-purple-300", children: _jsx(FaRegFileAlt, {}) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-semibold text-gray-800 dark:text-gray-100 truncate", children: note.title }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: note.content?.replace(/<[^>]+>/g, '') })] })] }) }, note.id || note._id))), _jsx("li", { className: "p-2 text-center bg-gray-50 dark:bg-gray-900/50", children: _jsx("button", { onClick: () => { navigate('/search'); setIsSearchOpen(false); }, className: "text-xs text-purple-600 font-medium hover:underline", children: "View all results" }) })] })) : (_jsx("div", { className: "p-6 text-center text-gray-500 dark:text-gray-400", children: "No results found." })) }))] }), _jsxs("div", { className: "flex items-center gap-2 md:gap-4 relative", children: [_jsx("button", { onClick: toggleDarkMode, className: "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", title: "Toggle Theme", children: darkMode ? _jsx(FaSun, { size: 20, className: "text-yellow-400" }) : _jsx(FaMoon, { size: 20 }) }), _jsxs("div", { className: "relative", ref: notifRef, children: [_jsxs("button", { onClick: () => setShowNotifications(!showNotifications), className: "p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative", children: [_jsx(FaBell, { size: 20, className: activeReminders.length > 0 ? "text-purple-600" : "" }), activeReminders.length > 0 && (_jsx("span", { className: "absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" }))] }), showNotifications && (_jsxs("div", { className: "absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-fade-in-up origin-top-right", children: [_jsxs("div", { className: "px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50", children: [_jsx("h3", { className: "font-bold text-gray-800 dark:text-white text-sm", children: "Reminders" }), _jsxs("span", { className: "text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full", children: [activeReminders.length, " Active"] })] }), _jsx("div", { className: "max-h-64 overflow-y-auto", children: activeReminders.length > 0 ? (activeReminders.map((note) => (_jsxs("button", { onClick: () => { navigate('/note-editor', { state: { note } }); setShowNotifications(false); }, className: "w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors group", children: [_jsxs("div", { className: "flex justify-between items-start mb-1", children: [_jsx("p", { className: "font-semibold text-gray-800 dark:text-gray-200 text-sm group-hover:text-purple-600 transition-colors", children: note.title }), _jsx("span", { className: "text-[10px] text-gray-400 whitespace-nowrap ml-2", children: new Date(note.reminderDate).toLocaleDateString() })] }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1", children: [_jsx(FaBell, { size: 10, className: "text-purple-400" }), new Date(note.reminderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })] })] }, note.id || note._id)))) : (_jsxs("div", { className: "p-8 text-center", children: [_jsx(FaBell, { size: 24, className: "mx-auto text-gray-300 mb-2" }), _jsx("p", { className: "text-sm text-gray-500", children: "No active reminders" })] })) })] }))] }), _jsx(AvatarMenu, {}), _jsxs("button", { onClick: handleLogout, className: "hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors", children: [_jsx(FaSignOutAlt, {}), "Logout"] })] })] }));
};
export default Header;
