import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import '@/style.css';
const NoteForm = ({ noteData, setNoteData, isEditing, handleFormSubmit, }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({ levels: [1, 2, 3] }),
            Blockquote,
        ],
        content: noteData?.content || '',
        onUpdate: ({ editor }) => {
            setNoteData({
                ...noteData,
                content: editor.getHTML(),
            });
        },
    });
    const handleButtonClick = (command) => {
        command();
    };
    return (_jsxs("form", { onSubmit: handleFormSubmit, children: [_jsx("input", { type: "text", placeholder: "Title", value: noteData?.title || '', onChange: (e) => setNoteData({ ...noteData, title: e.target.value }), className: "w-full mb-4 p-2 border rounded" }), editor && (_jsxs("div", { className: "flex flex-wrap gap-2 mb-2 border-b pb-2", children: [_jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleBold().run()), className: editor.isActive('bold') ? 'active-btn' : 'toolbar-btn', children: "Bold" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleItalic().run()), className: editor.isActive('italic') ? 'active-btn' : 'toolbar-btn', children: "Italic" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleUnderline().run()), className: editor.isActive('underline') ? 'active-btn' : 'toolbar-btn', children: "Underline" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run()), className: editor.isActive('heading', { level: 1 }) ? 'active-btn' : 'toolbar-btn', children: "H1" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run()), className: editor.isActive('heading', { level: 2 }) ? 'active-btn' : 'toolbar-btn', children: "H2" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleBulletList().run()), className: editor.isActive('bulletList') ? 'active-btn' : 'toolbar-btn', children: "Bullet List" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleOrderedList().run()), className: editor.isActive('orderedList') ? 'active-btn' : 'toolbar-btn', children: "Numbered List" }), _jsx("button", { type: "button", onClick: () => handleButtonClick(() => editor.chain().focus().toggleBlockquote().run()), className: editor.isActive('blockquote') ? 'active-btn' : 'toolbar-btn', children: "Quote" })] })), _jsx("div", { className: "editor-container border p-2 rounded mb-4", children: _jsx(EditorContent, { editor: editor }) }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white w-full p-2 rounded", children: isEditing ? 'Update Note' : 'Create Note' })] }));
};
export default NoteForm;
