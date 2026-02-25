import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const AvatarMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const menuRef = useRef(null);
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = () => {
        logout();
        navigate('/signin');
    };
    return (_jsxs("div", { className: "relative", ref: menuRef, children: [_jsx("button", { onClick: () => setOpen(!open), className: "flex items-center gap-2 focus:outline-none", children: user?.pic ? (_jsx("img", { src: user.pic, alt: "Profile", className: "w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-purple-500 transition-all" })) : (_jsx(FaUserCircle, { size: 32, className: "text-gray-400 hover:text-purple-600 transition-colors" })) }), open && (_jsxs("div", { className: "absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl py-2 z-50 border border-gray-100 dark:border-gray-700 animate-fade-in-up", children: [_jsxs("div", { className: "px-4 py-3 border-b border-gray-100 dark:border-gray-700", children: [_jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-white truncate", children: user?.name || 'User' }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: user?.email })] }), _jsxs("div", { className: "py-1", children: [_jsxs("button", { className: "w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 flex items-center gap-2 transition-colors", onClick: () => { setOpen(false); navigate('/settings'); }, children: [_jsx(FaCog, { size: 14 }), " Settings"] }), _jsxs("button", { className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors", onClick: handleLogout, children: [_jsx(FaSignOutAlt, { size: 14 }), " Logout"] })] })] }))] }));
};
export default AvatarMenu;
