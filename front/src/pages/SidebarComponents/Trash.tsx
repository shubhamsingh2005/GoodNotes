import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { FaTrash, FaTrashRestore, FaExclamationTriangle } from 'react-icons/fa';

const Trash: React.FC = () => {
  const { trashedNotes, fetchTrashedNotes, restoreNoteById, permanentlyDeleteNoteById } = useNoteContext();

  useEffect(() => {
    fetchTrashedNotes();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaTrash className="text-red-500" />
            Trash
        </h2>
        <span className="text-sm text-gray-500">Items are safe here until permanently deleted.</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {trashedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trashedNotes.map((note: any) => (
              <div 
                key={note.id || note._id} 
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30 relative flex flex-col h-48 opacity-75 hover:opacity-100 transition-opacity"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 strike-through decoration-gray-400">
                    {note.title}
                  </h4>
                  <span className="text-xs text-red-400 border border-red-200 px-2 py-0.5 rounded-full">Deleted</span>
                </div>

                <div className="text-gray-500 dark:text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                   {/* Remove HTML tags for preview in trash */}
                   {note.content?.replace(/<[^>]+>/g, '') || '(No content)'}
                </div>

                <div className="flex justify-end gap-3 mt-auto border-t border-gray-100 dark:border-gray-700 pt-3">
                   <button 
                     onClick={() => restoreNoteById(note.id || note._id)}
                     className="text-blue-500 hover:text-blue-600 text-sm flex items-center gap-1"
                     title="Restore"
                   >
                     <FaTrashRestore /> Restore
                   </button>
                   
                   <button 
                     onClick={() => {
                        if(window.confirm('Are you sure you want to permanently delete this note? This cannot be undone.')) {
                            permanentlyDeleteNoteById(note.id || note._id);
                        }
                     }}
                     className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                     title="Permanently Delete"
                   >
                     <FaExclamationTriangle /> Delete Forever
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <FaTrash className="text-6xl text-gray-200 mx-auto mb-4" />
            <p className="text-lg">Trash is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trash;
