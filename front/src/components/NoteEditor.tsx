import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useNoteContext } from '../context/NoteContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, 
    FaQuoteRight, FaUndo, FaRedo, FaSave, FaFolder, FaClock, FaChevronLeft, FaTag, FaTimes, FaStar
} from 'react-icons/fa';
import clsx from 'classnames';

interface NoteEditorProps {
  onSaveComplete?: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onSaveComplete }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const existingNote = state?.note; 

  const { createNewNote, updateNoteById, folders } = useNoteContext();

  const [title, setTitle] = useState(existingNote?.title || '');
  const [selectedFolder, setSelectedFolder] = useState(existingNote?.folder || '');
  
  // Reminder State
  const [isReminder, setIsReminder] = useState(existingNote?.isReminder || false);
  const [reminderDate, setReminderDate] = useState<Date | null>(
      existingNote?.reminderDate ? new Date(existingNote.reminderDate) : null
  );

  const [tags, setTags] = useState<string[]>(existingNote?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Star State (Share removed)
  const [isStarred, setIsStarred] = useState(existingNote?.isStarred || false);

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
        if(editor && !editor.isDestroyed) {
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
      date: new Date().toISOString(),
    };

    try {
      if (existingNote && (existingNote.id || existingNote._id)) {
        await updateNoteById(existingNote.id || existingNote._id, noteData);
      } else {
        await createNewNote(noteData);
      }
      
      if (onSaveComplete) onSaveComplete();
      else navigate('/my-notes'); 
      
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save note.");
    } finally {
        setIsSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag();
    }
  };

  const ToolbarButton = ({ onClick, isActive, icon, title }: any) => (
    <button
      onClick={onClick}
      className={clsx(
        "p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
        isActive ? "bg-gray-200 dark:bg-gray-700 text-purple-600" : "text-gray-600 dark:text-gray-300"
      )}
      title={title}
    >
      {icon}
    </button>
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors relative">
      {/* Top Bar */}
      <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4 flex-1">
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <FaChevronLeft />
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Untitled"
                    className="text-2xl font-bold bg-transparent border-none focus:outline-none text-gray-800 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 w-full"
                />
            </div>
            
            <div className="flex items-center gap-3">
                {/* Star Button */}
                <button 
                    onClick={() => setIsStarred(!isStarred)}
                    className={clsx("p-2 rounded-full transition-colors", isStarred ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400")}
                    title="Star Note"
                >
                    <FaStar size={20} />
                </button>

                {/* Share Button Removed from Here */}

                {/* Folder Select */}
                <div className="relative group hidden md:block">
                    <FaFolder className="text-gray-400 absolute top-3 left-3 pointer-events-none" />
                    <select 
                        value={selectedFolder} 
                        onChange={(e) => setSelectedFolder(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none appearance-none cursor-pointer text-gray-700 dark:text-gray-200"
                    >
                        <option value="">No Folder</option>
                        {folders.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                </div>

                {/* Reminder Date Picker */}
                <div className="relative group">
                    <FaClock className={clsx("absolute top-3 left-3 pointer-events-none z-10", reminderDate ? "text-purple-500" : "text-gray-400")} />
                    <input 
                        type="datetime-local"
                        value={reminderDate ? new Date(reminderDate.getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                        onChange={(e) => setReminderDate(e.target.value ? new Date(e.target.value) : null)}
                        className={clsx(
                            "pl-9 pr-2 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer w-40 sm:w-auto",
                            reminderDate ? "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-300" : "border-gray-200 bg-gray-50 text-gray-400 dark:bg-gray-800 dark:border-gray-700"
                        )}
                        title="Set Reminder"
                    />
                </div>

                <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                >
                    <FaSave /> {isSaving ? 'Saving...' : 'Save'}
                </button>
            </div>
          </div>

          {/* Tags Input Area */}
          <div className="flex flex-wrap items-center gap-2 px-4 pb-4 animate-fade-in-down">
             <FaTag className="text-gray-400 text-sm" />
             {tags.map(tag => (
                 <span key={tag} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700 shadow-sm">
                     {tag}
                     <button onClick={() => removeTag(tag)} className="hover:text-red-500"><FaTimes size={10} /></button>
                 </span>
             ))}
             <input 
                 type="text" 
                 value={tagInput}
                 onChange={(e) => setTagInput(e.target.value)}
                 onKeyDown={handleTagKeyDown}
                 placeholder="Type tag + Enter..."
                 className="bg-transparent text-sm focus:outline-none min-w-[120px] text-gray-600 dark:text-gray-300 placeholder-gray-400"
             />
          </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/90 backdrop-blur sticky top-[130px] z-10 overflow-x-auto">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={<FaBold />} title="Bold" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={<FaItalic />} title="Italic" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={<FaUnderline />} title="Underline" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={<FaStrikethrough />} title="Strike" />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={<FaListUl />} title="Bullet List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={<FaListOl />} title="Ordered List" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon={<FaQuoteRight />} title="Blockquote" />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<FaUndo />} title="Undo" />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<FaRedo />} title="Redo" />
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.chain().focus().run()}>
        <div className="max-w-4xl mx-auto py-8 px-6 md:px-10">
            <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
