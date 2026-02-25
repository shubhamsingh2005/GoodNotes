import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const LandingPage = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (_jsx("div", { className: "landing-page", children: _jsxs("div", { className: "min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 text-center p-6", children: [_jsxs(motion.h1, { className: "text-6xl font-bold text-gray-800 mb-4", initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx("span", { className: "text-black-500 font-bold", children: "Welcome to GoodNotes" }), _jsx("span", {})] }), _jsxs(motion.p, { className: "text-lg text-gray-700 mb-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4, duration: 0.8 }, children: ["Your personal notes manager built with \u2764\uFE0F using the MERN Stack.", _jsx("br", {}), "Organize, Create, and Manage your notes securely and beautifully."] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: () => handleNavigation('/signin'), className: "bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold", children: "Signin" }), _jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: () => handleNavigation('/signup'), className: "bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold", children: "Signup" })] })] }) }));
};
export default LandingPage;
