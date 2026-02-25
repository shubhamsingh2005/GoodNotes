import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await API.post('/login', { email, password });
            if (response.data.success) {
                login(response.data.token, response.data.user);
                navigate('/home');
            }
            else {
                setError(response.data.message || 'Login failed');
            }
        }
        catch (err) {
            console.error('Login Error Object:', err);
            const serverMessage = err.response?.data?.message || err.message || 'Unknown Error';
            console.error('SERVER RESPONSE MESSAGE:', serverMessage);
            setError(serverMessage);
            // Force alert for debugging if it's a 500
            if (err.response?.status === 500) {
                alert(`Login Failed: ${serverMessage}`);
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: 'easeOut' }, className: "bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-md", children: [_jsxs("h2", { className: "text-3xl font-bold text-center mb-1", children: [_jsx("span", { className: "text-green-500 font-bold", children: "Good" }), _jsx("span", { className: "text-sky-500 font-bold", children: "Notes" })] }), _jsx("p", { className: "text-sm text-gray-600 text-center mb-6", children: "Your Personal Notes Manager." }), error && _jsx("div", { className: "bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-700 text-sm", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { className: "text-sm font-semibold text-gray-700 mb-1 block", children: "Email" }), _jsxs("div", { className: "relative mb-4", children: [_jsx(FaEnvelope, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm", required: true })] }), _jsx("label", { className: "text-sm font-semibold text-gray-700 mb-1 block", children: "Password" }), _jsxs("div", { className: "relative mb-2", children: [_jsx("div", { className: "absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-500 z-10", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(FaEyeSlash, {}) : _jsx(FaEye, {}) }), _jsx("input", { type: showPassword ? 'text' : 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm", required: true })] }), _jsx("div", { className: "text-right mb-4", children: _jsx(Link, { to: "/forgot-password", className: "text-xs text-purple-600 hover:underline", children: "Forgot Password?" }) }), _jsx(motion.button, { type: "submit", disabled: isLoading, whileTap: { scale: 0.95 }, whileHover: { scale: 1.03 }, className: `w-full text-white py-2 rounded-full transition-all text-sm font-semibold shadow-md ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'}`, children: isLoading ? 'Signing In...' : 'Sign In' })] }), _jsxs("div", { className: "flex items-center my-5", children: [_jsx("hr", { className: "flex-grow border-gray-300" }), _jsx("span", { className: "mx-2 text-gray-400 text-sm", children: "or" }), _jsx("hr", { className: "flex-grow border-gray-300" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("button", { className: "flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-full w-full hover:bg-red-600 transition-all text-sm font-semibold shadow-sm", children: [_jsx(FaGoogle, {}), " Google"] }), _jsxs("button", { className: "flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full w-full hover:bg-black transition-all text-sm font-semibold shadow-sm", children: [_jsx(FaGithub, {}), " GitHub"] })] }), _jsxs("p", { className: "text-center text-gray-600 mt-6 text-sm", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "text-purple-600 hover:underline font-medium", children: "Sign Up" })] })] }) }));
};
export default SignIn;
