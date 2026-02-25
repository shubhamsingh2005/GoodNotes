import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNoteContext } from '@/context/NoteContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { FaStickyNote, FaBell, FaStar, FaClock, FaPlus } from 'react-icons/fa';
const Dashboard = () => {
    const { notes, fetchNotes } = useNoteContext();
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        fetchNotes();
        // Set greeting based on time
        const hour = new Date().getHours();
        if (hour < 12)
            setGreeting('Good Morning');
        else if (hour < 18)
            setGreeting('Good Afternoon');
        else
            setGreeting('Good Evening');
    }, []);
    // Calculate Stats
    // Support both property names (isPinned/pinned) just in case
    const pinnedCount = notes.filter((n) => n.isPinned || n.pinned).length;
    const reminderCount = notes.filter((n) => n.isReminder || n.reminder).length;
    // Recent edits: updated in last 24h
    const recentCount = notes.filter((n) => {
        const date = new Date(n.updatedAt || n.date || 0);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        return diff < 24 * 60 * 60 * 1000;
    }).length;
    return (_jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-800 dark:text-white", children: [greeting, ", ", _jsx("span", { className: "text-purple-600 dark:text-purple-400", children: user?.name || 'Friend' }), "!"] }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm mt-1", children: "Here is what's happening with your notes today." })] }), _jsxs(Link, { to: "/note-editor", className: "flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-all hover:scale-105", children: [_jsx(FaPlus, {}), " Create Note"] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400", children: _jsx(FaStickyNote, { size: 20 }) }), _jsx("span", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: notes.length })] }), _jsx("div", { children: _jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Total Notes" }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-500 dark:text-yellow-400", children: _jsx(FaStar, { size: 20 }) }), _jsx("span", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: pinnedCount })] }), _jsx("div", { children: _jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Pinned Notes" }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-500 dark:text-red-400", children: _jsx(FaBell, { size: 20 }) }), _jsx("span", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: reminderCount })] }), _jsx("div", { children: _jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Reminders" }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-500 dark:text-green-400", children: _jsx(FaClock, { size: 20 }) }), _jsx("span", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: recentCount })] }), _jsx("div", { children: _jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Edited Today" }) })] })] })] }));
};
export default Dashboard;
