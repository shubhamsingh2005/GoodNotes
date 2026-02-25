import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api/axios';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            // Backend expects: name, email, password
            const response = await API.post('/signup', { name, email, password });
            if (response.data.success) {
                // Redirect to Signin after success
                navigate('/signin');
            }
            else {
                setError(response.data.message || 'Signup failed');
            }
        }
        catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: 'easeOut' }, className: "bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-md", children: [_jsxs("h2", { className: "text-3xl font-bold text-center mb-1", children: [_jsx("span", { className: "text-purple-600", children: "Join " }), _jsx("span", { className: "text-sky-500", children: "Us" })] }), _jsx("p", { className: "text-sm text-gray-600 text-center mb-6", children: "Create your account to get started." }), error && _jsx("p", { className: "text-red-500 text-center mb-4 text-sm bg-red-50 p-2 rounded", children: error }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { className: "text-sm font-semibold text-gray-700 mb-1 block", children: "Full Name" }), _jsxs("div", { className: "relative mb-4", children: [_jsx(FaUser, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Enter your full name", className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm", required: true })] }), _jsx("label", { className: "text-sm font-semibold text-gray-700 mb-1 block", children: "Email" }), _jsxs("div", { className: "relative mb-4", children: [_jsx(FaEnvelope, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your email", className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm", required: true })] }), _jsx("label", { className: "text-sm font-semibold text-gray-700 mb-1 block", children: "Password" }), _jsxs("div", { className: "relative mb-6", children: [_jsx(FaLock, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: showPassword ? 'text' : 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Create a password", className: "w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm", required: true, minLength: 6 }), _jsx("div", { className: "absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500", onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(FaEyeSlash, {}) : _jsx(FaEye, {}) })] }), _jsx(motion.button, { type: "submit", disabled: isLoading, whileTap: { scale: 0.95 }, whileHover: { scale: 1.03 }, className: `w-full text-white py-2 rounded-full transition-all text-sm font-semibold shadow-md ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'}`, children: isLoading ? 'Creating Account...' : 'Sign Up' })] }), _jsxs("p", { className: "text-center text-gray-600 mt-6 text-sm", children: ["Already have an account?", ' ', _jsx(Link, { to: "/signin", className: "text-purple-600 hover:underline font-medium", children: "Sign In" })] })] }) }));
};
export default Signup;
