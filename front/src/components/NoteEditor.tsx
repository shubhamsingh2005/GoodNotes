import React, { useState, useRef, useEffect } from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaSuperscript, FaSubscript, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListUl, FaListOl, FaSave } from 'react-icons/fa';
import { useNoteContext } from '../context/NoteContext'; // Use Note Context

interface NoteEditorProps {
  existingNote?: any; // Optional prop to edit an existing note
  onSaveComplete?: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ existingNote, onSaveComplete }) => {
  // Use Context instead of Redux
  const { createNewNote, folders, createNewFolder, updateNoteById } = useNoteContext();

  const [title, setTitle] = useState(existingNote?.title || '');
  const [subtitle, setSubtitle] = useState(existingNote?.subtitle || '');
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCommands, setActiveCommands] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>(existingNote?.folder || '');
  const [currentDateTime, setCurrentDateTime] = useState<string>(new Date().toLocaleString());
  const [reminder, setReminder] = useState(existingNote?.isReminder || false);

  // Initialize content
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = existingNote?.content || '';
    }
  }, [existingNote]);

  useEffect(() => {
    formatText('justifyLeft');
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSave = async () => {
    const content = contentRef.current?.innerHTML || '';

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    // Ensure folder selection or creation
    let folderIdToSave = selectedFolder;

    if (!folderIdToSave) {
      // Logic to handle empty folder if needed, or prompt creation
      // For now, backend allows empty folder (Uncategorized)
    }

    const noteData = {
      title,
      subtitle,
      content,
      folder: folderIdToSave,
      isReminder: reminder,
      date: currentDateTime, // Backend will use createdAt, but good to send if needed
    };

    try {
      if (existingNote && existingNote.id) {
        await updateNoteById(existingNote.id, noteData);
        alert('Note Updated Successfully!');
      } else {
        await createNewNote(noteData);
        alert('Note Saved Successfully!');
      }

      // Clear fields if creating new
      if (!existingNote) {
        setTitle('');
        setSubtitle('');
        if (contentRef.current) contentRef.current.innerHTML = '';
        setSelectedFolder('');
      }
      
      if (onSaveComplete) onSaveComplete();
      
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save note.");
    }
  };

  const formatText = (command: string, value?: string) => {
    if (document.queryCommandSupported(command)) {
      document.execCommand(command, false, value);
    }
    updateActiveCommands();
  };

  const updateActiveCommands = () => {
    const commands = [
      'bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript',
      'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
      'insertUnorderedList', 'insertOrderedList'
    ];
    const active: string[] = [];
    commands.forEach((cmd) => {
      if (document.queryCommandState(cmd)) {
        active.push(cmd);
      }
    });
    setActiveCommands(active);
  };

  const IconButton = ({ icon, action, command, title }: { icon: React.ReactElement, action: () => void, command: string, title: string }) => (
    <button
      onClick={action}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ${activeCommands.includes(command) ? 'shadow-lg border border-gray-400' : ''}`}
    >
      {icon}
    </button>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="text-sm text-gray-600 dark:text-gray-300 text-right">{currentDateTime}</div>

      <input
        type="text"
        placeholder="Enter your note title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 text-xl font-semibold bg-white dark:bg-gray-700 rounded shadow focus:outline-none"
      />

      <input
        type="text"
        placeholder="Optional: Enter a subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="w-full p-3 text-md bg-white dark:bg-gray-700 rounded shadow focus:outline-none mt-4"
      />

      <div className="flex gap-2 items-center mt-4">
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="p-2 rounded shadow bg-white dark:bg-gray-700"
        >
          <option value="">Select Folder</option>
          {folders.length > 0 ? (
            folders.map((folder: any) => (
              <option key={folder._id || folder.id} value={folder._id || folder.id}>
                {folder.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No folders available</option>
          )}
        </select>
        
        <button
          onClick={async () => {
            const newFolderName = prompt('Enter new folder name:');
            if (newFolderName) {
              await createNewFolder({ name: newFolderName });
              // The folders list will update automatically via context
            }
          }}
          className="p-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Create New Folder
        </button>
      </div>

      {/* Formatting toolbar */}
      <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-700 p-3 rounded shadow items-center mt-4">
        <div className="flex gap-2 flex-wrap">
          <IconButton icon={<FaBold />} action={() => formatText('bold')} command="bold" title="Bold" />
          <IconButton icon={<FaItalic />} action={() => formatText('italic')} command="italic" title="Italic" />
          <IconButton icon={<FaUnderline />} action={() => formatText('underline')} command="underline" title="Underline" />
          <IconButton icon={<FaStrikethrough />} action={() => formatText('strikeThrough')} command="strikeThrough" title="Strikethrough" />
          <IconButton icon={<FaSuperscript />} action={() => formatText('superscript')} command="superscript" title="Superscript" />
          <IconButton icon={<FaSubscript />} action={() => formatText('subscript')} command="subscript" title="Subscript" />
          <IconButton icon={<FaAlignLeft />} action={() => formatText('justifyLeft')} command="justifyLeft" title="Left Align" />
          <IconButton icon={<FaAlignCenter />} action={() => formatText('justifyCenter')} command="justifyCenter" title="Center Align" />
          <IconButton icon={<FaAlignRight />} action={() => formatText('justifyRight')} command="justifyRight" title="Right Align" />
          <IconButton icon={<FaAlignJustify />} action={() => formatText('justifyFull')} command="justifyFull" title="Justify" />
          <IconButton icon={<FaListUl />} action={() => formatText('insertUnorderedList')} command="insertUnorderedList" title="Unordered List" />
          <IconButton icon={<FaListOl />} action={() => formatText('insertOrderedList')} command="insertOrderedList" title="Ordered List" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        contentEditable
        className="mt-4 p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow min-h-80vh"
        onInput={updateActiveCommands}
      />

      <div className="mt-4 flex items-center">
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={reminder}
            onChange={() => setReminder(!reminder)}
            className="mr-2 h-4 w-4"
          />
          Set as reminder
        </label>
        <button
          onClick={handleSave}
          className="ml-4 p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 flex items-center"
        >
          <FaSave className="mr-2" />
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
