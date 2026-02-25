import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';
const Navbar = () => {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };
    return (_jsxs("nav", { className: `flex items-center justify-between px-6 py-4 shadow-md mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`, children: [_jsx("div", { className: "text-2xl font-bold", children: "GoodNotes" }), _jsx("div", { className: "hidden sm:block text-sm", children: user?.email && _jsxs("span", { children: ["Welcome, ", user.email] }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(DarkModeToggle, {}), _jsx("button", { onClick: handleLogout, className: `px-3 py-1 rounded-md text-sm font-medium transition-colors ${darkMode
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-red-500 text-white hover:bg-red-600'}`, children: "Logout" })] })] }));
};
export default Navbar;
