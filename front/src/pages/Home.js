import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import NoteList from '../components/NoteList';
import Dashboard from '@/pages/SidebarComponents/Dashboard';
import { useNoteContext } from '../context/NoteContext';
import { useOutletContext } from 'react-router-dom';
import clsx from 'classnames';
import { getNoteColorClass } from '../utils/colorUtils';
const Home = () => {
    // Use Context for Data
    const { notes, fetchNotes } = useNoteContext();
    // Get search term from Layout via Outlet Context
    const { searchTerm } = useOutletContext() || { searchTerm: '' };
    // Local state for UI
    const [activeNote, setActiveNote] = useState(null);
    // Fetch notes from Backend on mount
    useEffect(() => {
        fetchNotes();
    }, []);
    // Filter notes based on search
    const filteredNotes = notes.filter((note) => (note.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (note.content?.toLowerCase() || '').includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "flex flex-col h-full space-y-6", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Dashboard, {}) }), _jsxs("div", { className: "flex flex-1 gap-6 overflow-hidden min-h-0", children: [_jsxs("div", { className: "w-full md:w-1/3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50", children: _jsx("h3", { className: "font-semibold text-gray-700 dark:text-gray-200", children: "Recent Notes" }) }), _jsx("div", { className: "flex-1 overflow-y-auto p-2 scrollbar-thin", children: filteredNotes.length > 0 ? (_jsx(NoteList, { notes: filteredNotes, activeNote: activeNote, setActiveNote: setActiveNote })) : (_jsxs("div", { className: "p-8 text-center text-gray-500 text-sm", children: ["No notes found matching \"", searchTerm, "\""] })) })] }), _jsx("div", { className: clsx("hidden md:flex flex-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 items-center justify-center text-gray-400 p-8 text-center transition-colors", activeNote ? getNoteColorClass(activeNote.color || 'default') : "bg-white dark:bg-gray-800"), children: activeNote ? (_jsxs("div", { className: "w-full h-full p-6 text-left overflow-y-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100", children: activeNote.title }), _jsx("div", { className: "prose dark:prose-invert max-w-none", dangerouslySetInnerHTML: { __html: activeNote.content } })] })) : (_jsxs("div", { children: [_jsx("p", { className: "text-lg font-medium", children: "Select a note to preview" }), _jsx("p", { className: "text-sm mt-2", children: "or create a new one to get started." })] })) })] })] }));
};
export default Home;
