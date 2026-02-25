import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import API from '../../api/axios';
import { FaMoon, FaSun, FaUser, FaLock, FaSave, FaCamera } from 'react-icons/fa';
const Settings = () => {
    const { user, login } = useAuth();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState(user?.pic || '');
    const [message, setMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');
        if (password && password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        setIsSaving(true);
        try {
            const response = await API.put('/me', {
                name,
                email,
                password: password || undefined,
                pic,
            });
            if (response.data.success) {
                setMessage('Profile updated successfully!');
                login(response.data.token, response.data.user);
                setPassword('');
                setConfirmPassword('');
            }
        }
        catch (error) {
            setMessage(error.response?.data?.message || 'Failed to update profile');
        }
        finally {
            setIsSaving(false);
        }
    };
    const postDetails = (pics) => {
        if (!pics)
            return;
        const picFile = pics[0];
        if (picFile.type === "image/jpeg" || picFile.type === "image/png") {
            const data = new FormData();
            data.append("file", picFile);
            data.append("upload_preset", "note-app"); // Requires Cloudinary setup usually, but we use Base64 for now
            // Convert to Base64
            const reader = new FileReader();
            reader.readAsDataURL(picFile);
            reader.onloadend = () => {
                if (reader.result) {
                    setPic(reader.result.toString());
                }
            };
            reader.onerror = () => {
                setMessage("Failed to read file!");
            };
        }
        else {
            setMessage("Please select an image (jpeg or png)");
        }
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto h-full overflow-y-auto pr-2 scrollbar-thin", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8", children: "Settings" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-8", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit", children: [_jsx("h3", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700", children: "Appearance" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-700 dark:text-gray-300", children: "Dark Mode" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Toggle application theme" })] }), _jsxs("button", { onClick: toggleDarkMode, className: `relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`, children: [_jsx("span", { className: `inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}` }), _jsx("span", { className: "absolute left-2 text-xs text-yellow-500 opacity-0 dark:opacity-100 transition-opacity pointer-events-none", children: _jsx(FaMoon, { size: 10 }) }), _jsx("span", { className: "absolute right-2 text-xs text-yellow-500 dark:opacity-0 transition-opacity pointer-events-none", children: _jsx(FaSun, { size: 12 }) })] })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700", children: "Profile Settings" }), message && (_jsx("div", { className: `p-3 rounded mb-4 text-sm ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`, children: message })), _jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col items-center mb-6", children: [_jsxs("div", { className: "relative w-24 h-24 mb-2", children: [_jsx("img", { src: pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", alt: "Profile", className: "w-24 h-24 rounded-full object-cover border-2 border-purple-200" }), _jsx("label", { htmlFor: "pic-upload", className: "absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 shadow-md", children: _jsx(FaCamera, { size: 14 }) }), _jsx("input", { id: "pic-upload", type: "file", accept: "image/*", className: "hidden", onChange: (e) => postDetails(e.target.files) })] }), _jsx("span", { className: "text-xs text-gray-500", children: "Click camera icon to upload" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(FaUser, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), className: "w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute top-3 left-3 text-gray-400", children: "@" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "New Password (Optional)" }), _jsxs("div", { className: "relative", children: [_jsx(FaLock, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Leave blank to keep current", className: "w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" })] })] }), password && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(FaLock, { className: "absolute top-3 left-3 text-gray-400" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" })] })] })), _jsx("button", { type: "submit", disabled: isSaving, className: "w-full flex justify-center items-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 mt-4", children: isSaving ? 'Saving...' : _jsxs(_Fragment, { children: [_jsx(FaSave, {}), " Save Changes"] }) })] })] })] })] }));
};
export default Settings;
