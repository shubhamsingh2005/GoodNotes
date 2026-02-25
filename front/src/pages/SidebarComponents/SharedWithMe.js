import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { FaShareAlt, FaSearch, FaRegFileAlt, FaSave } from 'react-icons/fa';
import clsx from 'classnames';
import { getNoteColorClass } from '../../utils/colorUtils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SharedWithMe = () => {
    const { getSharedNote, createNewNote } = useNoteContext();
    const [code, setCode] = useState('');
    const [note, setNote] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const handleFetch = async (e) => {
        e.preventDefault();
        if (!code || code.length !== 4) {
            setError("Please enter a valid 4-digit code.");
            return;
        }
        setError('');
        setLoading(true);
        setNote(null);
        try {
            const fetchedNote = await getSharedNote(code);
            setNote(fetchedNote);
        }
        catch (err) {
            setError(err.response?.data?.message || "Note not found or invalid code.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleSaveCopy = async () => {
        if (!note)
            return;
        setSaving(true);
        try {
            // Create a new note based on the shared note
            await createNewNote({
                title: `${note.title} (Shared Copy)`,
                subtitle: note.subtitle,
                content: note.content,
                tags: note.tags || [],
                color: note.color || 'default',
                // We don't copy isPinned, isStarred, etc.
            });
            toast.success("Note copied to your collection successfully!");
            // Optional: Navigate to home or my-notes
            setTimeout(() => navigate('/my-notes'), 1500);
        }
        catch (error) {
            toast.error("Failed to save copy.");
            console.error(error);
        }
        finally {
            setSaving(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col h-full w-full items-center p-6 overflow-y-auto scrollbar-thin", children: [_jsxs("div", { className: "text-center mb-8 max-w-lg animate-fade-in-down", children: [_jsx("div", { className: "bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600", children: _jsx(FaShareAlt, { size: 28 }) }), _jsx("h2", { className: "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2", children: "Shared Notes Access" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Enter the unique 4-digit code provided by the note owner to securely view their content." })] }), _jsx("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 w-full max-w-md animate-fade-in-up", children: _jsxs("form", { onSubmit: handleFetch, className: "flex flex-col gap-5", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Enter Share Code" }), _jsx("div", { className: "relative", children: _jsx("input", { type: "text", value: code, onChange: (e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4)), placeholder: "0000", className: "w-full text-center text-4xl font-mono font-bold tracking-[0.5em] py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-0 focus:outline-none transition-all placeholder-gray-300 dark:placeholder-gray-700" }) })] }), _jsx("button", { type: "submit", disabled: loading || code.length !== 4, className: "w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2", children: loading ? _jsx("span", { className: "animate-pulse", children: "Searching..." }) : (_jsxs(_Fragment, { children: [_jsx(FaSearch, { size: 18 }), " Fetch Note"] })) }), error && (_jsx("div", { className: "p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center font-medium animate-shake", children: error }))] }) }), note && (_jsxs("div", { className: "mt-12 w-full max-w-3xl animate-fade-in-up pb-10", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-bold text-gray-700 dark:text-gray-300", children: "Preview" }), _jsx("button", { onClick: handleSaveCopy, disabled: saving, className: "flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md disabled:opacity-70", children: saving ? 'Saving...' : _jsxs(_Fragment, { children: [_jsx(FaSave, {}), " Save Copy to My Notes"] }) })] }), _jsxs("div", { className: clsx("rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors relative", getNoteColorClass(note.color || 'default') // Apply Note Color
                        ), children: [_jsx("div", { className: "bg-gradient-to-r from-purple-600 to-blue-500 p-1" }), _jsxs("div", { className: "p-8 md:p-10", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6 text-purple-600 dark:text-purple-400 font-bold uppercase text-xs tracking-widest border-b border-gray-100 dark:border-gray-700 pb-4", children: [_jsx(FaRegFileAlt, {}), " Read-Only Mode"] }), _jsx("h1", { className: "text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight", children: note.title }), note.subtitle && _jsx("p", { className: "text-xl text-gray-500 dark:text-gray-400 mb-6 font-medium", children: note.subtitle }), _jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300", children: _jsx("div", { dangerouslySetInnerHTML: { __html: note.content } }) }), _jsxs("div", { className: "mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between text-sm text-gray-400 gap-2", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-green-500" }), "Shared by User ID: ", _jsx("span", { className: "font-mono text-gray-500 dark:text-gray-300", children: note.user })] }), _jsxs("span", { children: ["Shared on: ", new Date(note.createdAt).toLocaleDateString()] })] })] })] })] }))] }));
};
export default SharedWithMe;
