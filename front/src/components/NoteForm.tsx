import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';

import '@/style.css';
 // ✅ Add your own styles here

interface NoteFormProps {
  noteData: { title: string; content: string } | undefined;
  setNoteData: (data: { title: string; content: string }) => void;
  isEditing: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  noteData,
  setNoteData,
  isEditing,
  handleFormSubmit,
}) => {
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
        ...noteData!,
        content: editor.getHTML(),
      });
    },
  });

  const handleButtonClick = (command: () => void) => {
    command();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        value={noteData?.title || ''}
        onChange={(e) =>
          setNoteData({ ...noteData!, title: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />

      {/* Toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleBold().run())}
            className={editor.isActive('bold') ? 'active-btn' : 'toolbar-btn'}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
            className={editor.isActive('italic') ? 'active-btn' : 'toolbar-btn'}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
            className={editor.isActive('underline') ? 'active-btn' : 'toolbar-btn'}
          >
            Underline
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run())}
            className={editor.isActive('heading', { level: 1 }) ? 'active-btn' : 'toolbar-btn'}
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}
            className={editor.isActive('heading', { level: 2 }) ? 'active-btn' : 'toolbar-btn'}
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
            className={editor.isActive('bulletList') ? 'active-btn' : 'toolbar-btn'}
          >
            Bullet List
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
            className={editor.isActive('orderedList') ? 'active-btn' : 'toolbar-btn'}
          >
            Numbered List
          </button>
          <button
            type="button"
            onClick={() => handleButtonClick(() => editor.chain().focus().toggleBlockquote().run())}
            className={editor.isActive('blockquote') ? 'active-btn' : 'toolbar-btn'}
          >
            Quote
          </button>
        </div>
      )}

      {/* Editor */}
      <div className="editor-container border p-2 rounded mb-4">
        <EditorContent editor={editor} />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        {isEditing ? 'Update Note' : 'Create Note'}
      </button>
    </form>
  );
};

export default NoteForm;
