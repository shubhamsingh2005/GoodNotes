import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/forgot-password', { email });
            setEmailSent(true);
            toast.success("Password reset email sent!");
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4", children: _jsxs("div", { className: "bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up", children: [_jsxs(Link, { to: "/signin", className: "flex items-center text-gray-500 hover:text-purple-600 mb-6 transition-colors", children: [_jsx(FaArrowLeft, { className: "mr-2" }), " Back to Login"] }), _jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Forgot Password?" }), _jsx("p", { className: "text-gray-500 mb-8", children: "Enter your email and we'll send you instructions to reset your password." }), emailSent ? (_jsxs("div", { className: "text-center p-6 bg-green-50 rounded-xl border border-green-100", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600", children: _jsx(FaEnvelope, { size: 30 }) }), _jsx("h3", { className: "text-xl font-bold text-green-800 mb-2", children: "Check your mail" }), _jsxs("p", { className: "text-green-600", children: ["We have sent a password reset link to ", _jsx("span", { className: "font-bold", children: email }), "."] }), _jsx("button", { onClick: () => setEmailSent(false), className: "mt-4 text-sm text-green-700 underline", children: "Resend Email" })] })) : (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }), _jsx("input", { type: "email", id: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all", placeholder: "name@example.com" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-70 flex items-center justify-center", children: loading ? _jsx("span", { className: "animate-pulse", children: "Sending..." }) : 'Send Reset Link' })] }))] }) }));
};
export default ForgotPassword;
