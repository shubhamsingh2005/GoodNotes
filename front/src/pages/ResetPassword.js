import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle } from 'react-icons/fa';
const ResetPassword = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            await api.put(`/reset-password/${resetToken}`, { password });
            setSuccess(true);
            toast.success("Password reset successfully!");
            setTimeout(() => navigate('/signin'), 3000);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Link may be invalid or expired.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4", children: _jsx("div", { className: "bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up", children: success ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce", children: _jsx(FaCheckCircle, { size: 40 }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-2", children: "Password Reset!" }), _jsx("p", { className: "text-gray-500 mb-6", children: "Your password has been successfully updated." }), _jsx("p", { className: "text-sm text-gray-400", children: "Redirecting to login..." })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600", children: _jsx(FaLock, { size: 28 }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-800", children: "Reset Password" }), _jsx("p", { className: "text-gray-500", children: "Enter your new password below." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "New Password" }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", minLength: 6 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm Password" }), _jsx("input", { type: "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", minLength: 6 })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-70", children: loading ? 'Resetting...' : 'Set New Password' })] })] })) }) }));
};
export default ResetPassword;
