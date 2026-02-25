import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
const NotificationMenu = () => {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setOpen(!open), className: "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300", children: [_jsx(FaBell, { size: 22 }), " "] }), open && (_jsx("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50", children: _jsx("p", { className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-200", children: "No new notifications" }) }))] }));
};
export default NotificationMenu;
