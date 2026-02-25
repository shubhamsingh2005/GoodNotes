import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { Link } from 'react-router-dom';
import { FaTag, FaHashtag } from 'react-icons/fa';
const Tags = () => {
    const { notes } = useNoteContext();
    const [selectedTag, setSelectedTag] = useState(null);
    // Extract unique tags and count usage
    const tagsMap = useMemo(() => {
        const map = new Map();
        notes.forEach((note) => {
            if (note.tags && Array.isArray(note.tags)) {
                note.tags.forEach((tag) => {
                    const normalizedTag = tag.trim();
                    if (normalizedTag) {
                        map.set(normalizedTag, (map.get(normalizedTag) || 0) + 1);
                    }
                });
            }
        });
        return map;
    }, [notes]);
    const sortedTags = Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1]); // Sort by frequency
    // Filter notes by selected tag
    const filteredNotes = selectedTag
        ? notes.filter((n) => n.tags?.includes(selectedTag))
        : [];
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("h2", { className: "text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2", children: [_jsx(FaTag, { className: "text-purple-600" }), " Tags"] }), _jsx("div", { className: "flex flex-wrap gap-3 mb-8", children: sortedTags.length > 0 ? (sortedTags.map(([tag, count]) => (_jsxs("button", { onClick: () => setSelectedTag(tag === selectedTag ? null : tag), className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                        ? 'bg-purple-600 text-white shadow-md scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'}`, children: [_jsx(FaHashtag, { size: 12, className: "opacity-50" }), tag, _jsx("span", { className: "ml-1 opacity-70 text-xs bg-black/10 dark:bg-white/10 px-1.5 rounded-full", children: count })] }, tag)))) : (_jsx("div", { className: "text-gray-500 italic", children: "No tags found. Add tags to your notes to organize them here." })) }), selectedTag && (_jsxs("div", { className: "flex-1 overflow-y-auto pr-2 scrollbar-thin animate-fade-in", children: [_jsxs("h3", { className: "font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200", children: ["Notes with ", _jsxs("span", { className: "text-purple-600", children: ["#", selectedTag] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredNotes.map((note) => (_jsxs(Link, { to: "/note-editor", state: { note }, className: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group", children: [_jsx("h4", { className: "font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-purple-600 transition-colors", children: note.title }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3", dangerouslySetInnerHTML: { __html: note.content || '' } }), _jsx("div", { className: "flex gap-2 flex-wrap", children: note.tags?.slice(0, 3).map((t) => (_jsxs("span", { className: "text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded", children: ["#", t] }, t))) })] }, note.id || note._id))) })] }))] }));
};
export default Tags;
