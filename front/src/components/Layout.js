import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNoteContext } from '../context/NoteContext';
import { toast } from 'react-toastify';
const Layout = () => {
    // We removed searchTerm state here because Header now handles it locally for Spotlight search
    const { notes } = useNoteContext();
    const navigate = useNavigate();
    // Reminders Logic (Polling)
    useEffect(() => {
        // Check every 10 seconds
        const interval = setInterval(() => {
            const now = new Date();
            notes.forEach(note => {
                if (note.isReminder && note.reminderDate) {
                    const reminderTime = new Date(note.reminderDate);
                    const diff = now.getTime() - reminderTime.getTime();
                    // If due within last 20 seconds (and not future)
                    if (diff >= 0 && diff < 20000) {
                        try {
                            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                            audio.play().catch(e => console.log("Audio blocked", e));
                        }
                        catch (e) { }
                        toast.info(_jsxs("div", { onClick: () => navigate('/note-editor', { state: { note } }), className: "cursor-pointer", children: [_jsx("p", { className: "font-bold", children: "\uD83D\uDD14 Reminder Due!" }), _jsx("p", { className: "text-sm", children: note.title })] }), {
                            position: "top-right",
                            autoClose: false,
                            closeOnClick: false,
                            draggable: true,
                        });
                    }
                }
            });
        }, 10000);
        return () => clearInterval(interval);
    }, [notes, navigate]);
    return (_jsxs("div", { className: "flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600", children: _jsx(Outlet, {}) })] })] }));
};
export default Layout;
