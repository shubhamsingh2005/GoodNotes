import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useNoteContext } from '../context/NoteContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo, FaSave, FaFolder, FaClock, FaChevronLeft, FaTag, FaTimes, FaStar, FaPalette } from 'react-icons/fa';
import clsx from 'classnames';
import { noteColors, getNoteColorClass } from '../utils/colorUtils';
const NoteEditor = ({ onSaveComplete }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const existingNote = state?.note;
    const { createNewNote, updateNoteById, folders } = useNoteContext();
    const [title, setTitle] = useState(existingNote?.title || '');
    const [selectedFolder, setSelectedFolder] = useState(existingNote?.folder || '');
    // Reminder State
    const [isReminder, setIsReminder] = useState(existingNote?.isReminder || false);
    const [reminderDate, setReminderDate] = useState(existingNote?.reminderDate ? new Date(existingNote.reminderDate) : null);
    const [tags, setTags] = useState(existingNote?.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    // Star & Color
    const [isStarred, setIsStarred] = useState(existingNote?.isStarred || false);
    const [color, setColor] = useState(existingNote?.color || 'default');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: 'Start typing your note here...' }),
        ],
        content: existingNote?.content || '',
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-4',
            },
        },
    });
    // Sync state if props change
    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title || '');
            setSelectedFolder(existingNote.folder || '');
            setReminderDate(existingNote.reminderDate ? new Date(existingNote.reminderDate) : null);
            setTags(existingNote.tags || []);
            setIsStarred(existingNote.isStarred || false);
            setColor(existingNote.color || 'default');
            if (editor && !editor.isDestroyed) {
                editor.commands.setContent(existingNote.content || '');
            }
        }
    }, [existingNote, editor]);
    const handleSave = async () => {
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }
        setIsSaving(true);
        const noteData = {
            title,
            content: editor?.getHTML() || '',
            folder: selectedFolder || null,
            tags: tags,
            isReminder: !!reminderDate,
            reminderDate: reminderDate ? reminderDate.toISOString() : null,
            isStarred: isStarred,
            color: color,
            date: new Date().toISOString(),
        };
        try {
            if (existingNote && (existingNote.id || existingNote._id)) {
                await updateNoteById(existingNote.id || existingNote._id, noteData);
            }
            else {
                await createNewNote(noteData);
            }
            if (onSaveComplete)
                onSaveComplete();
            else
                navigate('/my-notes');
        }
        catch (error) {
            console.error("Save failed", error);
            alert("Failed to save note.");
        }
        finally {
            setIsSaving(false);
        }
    };
    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };
    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };
    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    };
    const ToolbarButton = ({ onClick, isActive, icon, title }) => (_jsx("button", { onClick: onClick, className: clsx("p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors", isActive ? "bg-gray-200 dark:bg-gray-700 text-purple-600" : "text-gray-600 dark:text-gray-300"), title: title, children: icon }));
    if (!editor) {
        return null;
    }
    const bgClass = getNoteColorClass(color);
    return (_jsxs("div", { className: clsx("flex flex-col h-full transition-colors relative", bgClass), children: [_jsxs("div", { className: clsx("flex flex-col border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 transition-colors", bgClass), children: [_jsxs("div", { className: "flex justify-between items-center p-4", children: [_jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx("button", { onClick: () => navigate(-1), className: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: _jsx(FaChevronLeft, {}) }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Untitled", className: "text-2xl font-bold bg-transparent border-none focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 w-full" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowColorPicker(!showColorPicker), className: "p-2 rounded-full text-gray-500 hover:bg-black/5 dark:hover:bg-white/10 transition-colors", title: "Change Color", children: _jsx(FaPalette, { size: 18 }) }), showColorPicker && (_jsx("div", { className: "absolute top-full right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-5 gap-2 z-30 w-48 animate-scale-in", children: noteColors.map((c) => (_jsx("button", { onClick: () => { setColor(c.value); setShowColorPicker(false); }, className: clsx("w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform", c.bg, c.darkBg, color === c.value ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800" : ""), title: c.name }, c.value))) }))] }), _jsx("button", { onClick: () => setIsStarred(!isStarred), className: clsx("p-2 rounded-full transition-colors", isStarred ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"), title: "Star Note", children: _jsx(FaStar, { size: 20 }) }), _jsxs("div", { className: "relative group hidden md:block", children: [_jsx(FaFolder, { className: "text-gray-400 absolute top-3 left-3 pointer-events-none" }), _jsxs("select", { value: selectedFolder, onChange: (e) => setSelectedFolder(e.target.value), className: "pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 text-sm focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer text-gray-700 dark:text-gray-200", children: [_jsx("option", { value: "", children: "No Folder" }), folders.map((f) => _jsx("option", { value: f.id, children: f.name }, f.id))] })] }), _jsxs("div", { className: "relative group", children: [_jsx(FaClock, { className: clsx("absolute top-3 left-3 pointer-events-none z-10", reminderDate ? "text-purple-500" : "text-gray-400") }), _jsx("input", { type: "datetime-local", value: reminderDate ? new Date(reminderDate.getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : '', onChange: (e) => setReminderDate(e.target.value ? new Date(e.target.value) : null), className: clsx("pl-9 pr-2 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer w-40 sm:w-auto", reminderDate ? "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300" : "border-gray-200 bg-white/50 dark:bg-black/20 text-gray-400 dark:border-gray-700"), title: "Set Reminder" })] }), _jsxs("button", { onClick: handleSave, disabled: isSaving, className: "flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg", children: [_jsx(FaSave, {}), " ", isSaving ? 'Saving...' : 'Save'] })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 px-4 pb-4 animate-fade-in-down", children: [_jsx(FaTag, { className: "text-gray-400 text-sm" }), tags.map(tag => (_jsxs("span", { className: "flex items-center gap-1 bg-white/60 dark:bg-black/30 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 shadow-sm", children: [tag, _jsx("button", { onClick: () => removeTag(tag), className: "hover:text-red-500", children: _jsx(FaTimes, { size: 10 }) })] }, tag))), _jsx("input", { type: "text", value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: handleTagKeyDown, placeholder: "Type tag + Enter...", className: "bg-transparent text-sm focus:outline-none min-w-[120px] text-gray-600 dark:text-gray-300 placeholder-gray-400" })] })] }), _jsxs("div", { className: clsx("flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 sticky top-[130px] z-10 overflow-x-auto transition-colors backdrop-blur-md bg-white/30 dark:bg-black/30"), children: [_jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), icon: _jsx(FaBold, {}), title: "Bold" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), icon: _jsx(FaItalic, {}), title: "Italic" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive('underline'), icon: _jsx(FaUnderline, {}), title: "Underline" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), icon: _jsx(FaStrikethrough, {}), title: "Strike" }), _jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), icon: _jsx(FaListUl, {}), title: "Bullet List" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), icon: _jsx(FaListOl, {}), title: "Ordered List" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), icon: _jsx(FaQuoteRight, {}), title: "Blockquote" }), _jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().undo().run(), icon: _jsx(FaUndo, {}), title: "Undo" }), _jsx(ToolbarButton, { onClick: () => editor.chain().focus().redo().run(), icon: _jsx(FaRedo, {}), title: "Redo" })] }), _jsx("div", { className: "flex-1 overflow-y-auto cursor-text", onClick: () => editor.chain().focus().run(), children: _jsx("div", { className: "max-w-4xl mx-auto py-8 px-6 md:px-10", children: _jsx(EditorContent, { editor: editor }) }) })] }));
};
export default NoteEditor;
