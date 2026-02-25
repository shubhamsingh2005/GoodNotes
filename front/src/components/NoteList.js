import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaMapPin } from 'react-icons/fa';
import clsx from 'classnames';
import { getNoteColorClass } from '../utils/colorUtils';
const NoteList = ({ notes, activeNote, setActiveNote }) => {
    const pinnedNotes = notes.filter(n => n.isPinned);
    const otherNotes = notes.filter(n => !n.isPinned);
    const NoteItem = ({ note }) => {
        const isActive = activeNote?._id === note._id || activeNote?.id === note.id;
        const colorClass = getNoteColorClass(note.color || 'default');
        // If active, we might want to highlight it differently, or just use a border.
        // Let's use the note color as base, and add border if active.
        return (_jsxs("div", { onClick: () => setActiveNote(note), className: clsx("p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors relative", colorClass, // Apply the note's color
            isActive ? "ring-2 ring-inset ring-purple-600 z-10" : "hover:brightness-95 dark:hover:brightness-110"), children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h4", { className: clsx("font-semibold text-sm mb-1 line-clamp-1 text-gray-800 dark:text-gray-100"), children: note.title || 'Untitled' }), note.isPinned && _jsx(FaMapPin, { className: "text-xs text-purple-600 flex-shrink-0 ml-2" })] }), _jsx("div", { className: "text-xs text-gray-600 dark:text-gray-300 line-clamp-2", dangerouslySetInnerHTML: { __html: note.content || '' } }), _jsx("span", { className: "text-[10px] text-gray-500 mt-2 block", children: new Date(note.updatedAt || note.date).toLocaleDateString() })] }));
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [pinnedNotes.length > 0 && (_jsxs("div", { className: "mb-2", children: [_jsx("div", { className: "px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0 z-20", children: "Pinned" }), pinnedNotes.map(note => _jsx(NoteItem, { note: note }, note._id || note.id))] })), otherNotes.length > 0 && (_jsxs("div", { children: [pinnedNotes.length > 0 && (_jsx("div", { className: "px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0 z-20", children: "Others" })), otherNotes.map(note => _jsx(NoteItem, { note: note }, note._id || note.id))] }))] }));
};
export default NoteList;
