import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaSearch, FaRegFileAlt } from 'react-icons/fa';
const Search = () => {
    const { notes } = useNoteContext();
    // Get search term from Header via Layout
    const { searchTerm: headerSearchTerm } = useOutletContext() || { searchTerm: '' };
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    // Sync header search with local search
    useEffect(() => {
        if (headerSearchTerm) {
            setLocalSearchQuery(headerSearchTerm);
        }
    }, [headerSearchTerm]);
    // Safe Filter Logic with Memoization
    const searchResults = useMemo(() => {
        if (!localSearchQuery.trim())
            return [];
        const query = localSearchQuery.toLowerCase();
        // Ensure notes is an array and filter safely
        return (Array.isArray(notes) ? notes : []).filter((note) => {
            if (!note)
                return false;
            const title = note.title ? note.title.toLowerCase() : '';
            const content = note.content ? note.content.toLowerCase() : '';
            const tags = note.tags && Array.isArray(note.tags) ? note.tags.join(' ').toLowerCase() : '';
            return title.includes(query) || content.includes(query) || tags.includes(query);
        });
    }, [notes, localSearchQuery]);
    // Helper to highlight text
    const HighlightedText = ({ text, highlight }) => {
        if (!highlight.trim())
            return _jsx("span", { children: text });
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (_jsx("span", { children: parts.map((part, i) => part.toLowerCase() === highlight.toLowerCase() ? _jsx("span", { className: "bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white px-0.5 rounded", children: part }, i) : part) }));
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("h2", { className: "text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2", children: [_jsx(FaSearch, { className: "text-purple-600" }), " Search Results"] }), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "text", value: localSearchQuery, onChange: (e) => setLocalSearchQuery(e.target.value), placeholder: "Type to search notes...", className: "w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition-all", autoFocus: true }) }), _jsx("div", { className: "flex-1 overflow-y-auto pr-2 scrollbar-thin", children: searchResults.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up", children: searchResults.map((note) => (_jsxs(Link, { to: "/note-editor", state: { note }, className: "block p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all group", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2 text-gray-400 group-hover:text-purple-500 transition-colors", children: [_jsx(FaRegFileAlt, {}), _jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: "Note" })] }), _jsx("h4", { className: "text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 truncate", children: _jsx(HighlightedText, { text: note.title || 'Untitled', highlight: localSearchQuery }) }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 line-clamp-3", children: note.content?.replace(/<[^>]+>/g, '') || '' }), note.tags && note.tags.length > 0 && (_jsx("div", { className: "flex gap-2 mt-3 flex-wrap", children: note.tags.map((t) => (_jsxs("span", { className: "text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300", children: ["#", t] }, t))) }))] }, note.id || note._id))) })) : (_jsxs("div", { className: "flex flex-col items-center justify-center mt-20 opacity-50", children: [_jsx(FaSearch, { size: 48, className: "mb-4 text-gray-300" }), _jsx("p", { className: "text-lg font-medium text-gray-500", children: localSearchQuery ? `No matches for "${localSearchQuery}"` : 'Start typing to find notes' })] })) })] }));
};
export default Search;
