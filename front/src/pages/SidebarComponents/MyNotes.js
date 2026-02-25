import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaThLarge, FaList, FaMapPin, FaTrash, FaEdit, FaShareAlt, FaPalette } from 'react-icons/fa';
import ShareModal from '../../components/ShareModal';
import clsx from 'classnames';
import { getNoteColorClass, noteColors } from '../../utils/colorUtils';
const MyNotes = () => {
    const { notes, pinNoteById, deleteNoteById, generateShareCode, updateNoteById } = useNoteContext();
    const [viewMode, setViewMode] = useState('grid');
    // Share State
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [currentShareCode, setCurrentShareCode] = useState(null);
    // Color Picker State
    const [activeColorPicker, setActiveColorPicker] = useState(null);
    const pinnedNotes = notes.filter((note) => note.isPinned);
    const unPinnedNotes = notes.filter((note) => !note.isPinned);
    const displayNotes = [...pinnedNotes, ...unPinnedNotes];
    const handleShare = async (e, note) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            let code = note.shareCode;
            if (!code) {
                const data = await generateShareCode(note.id || note._id);
                code = data.shareCode;
            }
            setCurrentShareCode(code);
            setShareModalOpen(true);
        }
        catch (err) {
            alert("Failed to share note");
        }
    };
    const handleColorChange = async (e, noteId, colorValue) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await updateNoteById(noteId, { color: colorValue });
            setActiveColorPicker(null);
        }
        catch (err) {
            console.error("Failed to update color", err);
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-full", onClick: () => setActiveColorPicker(null), children: [_jsx(ShareModal, { isOpen: shareModalOpen, onClose: () => setShareModalOpen(false), shareCode: currentShareCode }), _jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-gray-100", children: "My Notes" }), _jsxs("div", { className: "flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1", children: [_jsx("button", { onClick: () => setViewMode('grid'), className: clsx("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white dark:bg-gray-600 shadow text-purple-600" : "text-gray-500"), title: "Grid View", children: _jsx(FaThLarge, {}) }), _jsx("button", { onClick: () => setViewMode('list'), className: clsx("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white dark:bg-gray-600 shadow text-purple-600" : "text-gray-500"), title: "List View", children: _jsx(FaList, {}) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto pr-2 scrollbar-thin", children: displayNotes.length > 0 ? (_jsx("div", { className: viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-3', children: displayNotes.map((note) => (_jsxs("div", { className: clsx("group p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all relative flex", getNoteColorClass(note.color || 'default'), viewMode === 'grid' ? "flex-col h-48" : "flex-row items-center h-20 gap-4"), children: [_jsxs("div", { className: clsx("flex justify-between items-start", viewMode === 'grid' ? "w-full mb-2" : "w-1/4 mb-0"), children: [_jsx("h4", { className: "text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 truncate", children: note.title }), note.isPinned && viewMode === 'grid' && _jsx(FaMapPin, { className: "text-purple-500 flex-shrink-0" })] }), _jsx("div", { className: clsx("text-gray-600 dark:text-gray-300 text-sm", viewMode === 'grid' ? "mb-4 line-clamp-3 flex-1" : "line-clamp-1 flex-1 mb-0"), dangerouslySetInnerHTML: { __html: note.content || '' } }), _jsxs("div", { className: clsx("flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10", viewMode === 'grid' ? "justify-end mt-auto" : "justify-end"), children: [_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: (e) => { e.preventDefault(); e.stopPropagation(); setActiveColorPicker(activeColorPicker === (note.id || note._id) ? null : (note.id || note._id)); }, className: "text-gray-500/70 hover:text-purple-600 text-sm", title: "Change Color", children: _jsx(FaPalette, {}) }), activeColorPicker === (note.id || note._id) && (_jsx("div", { className: "absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-5 gap-1 w-32 z-50 animate-scale-in", onClick: (e) => e.stopPropagation(), children: noteColors.map((c) => (_jsx("button", { onClick: (e) => handleColorChange(e, note.id || note._id, c.value), className: clsx("w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform", c.bg, c.darkBg, (note.color === c.value) && "ring-1 ring-purple-500"), title: c.name }, c.value))) }))] }), _jsx("button", { onClick: (e) => { e.preventDefault(); pinNoteById(note.id || note._id, !note.isPinned); }, className: `text-sm hover:text-purple-600 ${note.isPinned ? 'text-purple-500' : 'text-gray-500/70'}`, title: note.isPinned ? "Unpin" : "Pin", children: _jsx(FaMapPin, {}) }), _jsx("button", { onClick: (e) => handleShare(e, note), className: "text-gray-500/70 hover:text-green-600 text-sm", title: "Share", children: _jsx(FaShareAlt, {}) }), _jsx(Link, { to: "/note-editor", state: { note }, className: "text-gray-500/70 hover:text-blue-600 text-sm", title: "Edit", children: _jsx(FaEdit, {}) }), _jsx("button", { onClick: (e) => { e.preventDefault(); deleteNoteById(note.id || note._id); }, className: "text-gray-500/70 hover:text-red-600 text-sm", title: "Delete", children: _jsx(FaTrash, {}) })] }), _jsx(Link, { to: "/note-editor", state: { note }, className: "absolute inset-0 z-0" })] }, note.id || note._id))) })) : (_jsxs("div", { className: "text-center text-gray-500 mt-20", children: [_jsx("p", { className: "text-lg", children: "No notes found." }), _jsx(Link, { to: "/note-editor", className: "text-purple-600 hover:underline mt-2 inline-block", children: "Create your first note" })] })) })] }));
};
export default MyNotes;
