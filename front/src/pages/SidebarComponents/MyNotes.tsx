import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext'; // Use Context, not Redux
import { FaThLarge, FaList, FaMapPin, FaTrash, FaEdit } from 'react-icons/fa';

const MyNotes: React.FC = () => {
  const { notes, pinNoteById, deleteNoteById } = useNoteContext(); // Get data/actions from Context
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter out trashed notes (assuming backend handles trash or we filter here)
  // Current context implementation might rely on backend to not return trashed notes, 
  // or we filter by `isTrashed` if the model has it.
  // The updated NoteModel didn't strictly have "isTrashed", so delete usually means DELETE.
  // However, users expect "Move to Trash". 
  // For now, let's assume 'deleteNoteById' does the deletion/trash logic.
  
  const pinnedNotes = notes.filter((note: any) => note.isPinned);
  const unPinnedNotes = notes.filter((note: any) => !note.isPinned);
  
  // Combine: Pinned first
  const displayNotes = [...pinnedNotes, ...unPinnedNotes];

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Notes</h2>
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
            title="Grid View"
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {displayNotes.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {displayNotes.map((note: any) => (
              <div 
                key={note.id || note._id} 
                className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all relative flex flex-col h-48"
              >
                {/* Note Header */}
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1">{note.title}</h4>
                  {note.isPinned && <FaMapPin className="text-purple-500 flex-shrink-0" />}
                </div>

                {/* Note Content Preview */}
                <div 
                  className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1"
                  dangerouslySetInnerHTML={{ __html: note.content || '' }} 
                />

                {/* Actions (visible on hover) */}
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                   <button 
                     onClick={(e) => { e.preventDefault(); pinNoteById(note.id || note._id, !note.isPinned); }}
                     className={`text-sm hover:text-purple-600 ${note.isPinned ? 'text-purple-500' : 'text-gray-400'}`}
                     title={note.isPinned ? "Unpin" : "Pin"}
                   >
                     <FaMapPin />
                   </button>
                   
                   <Link to={`/note-editor`} state={{ note }} className="text-gray-400 hover:text-blue-500 text-sm" title="Edit">
                     <FaEdit />
                   </Link>
                   
                   <button 
                     onClick={(e) => { e.preventDefault(); deleteNoteById(note.id || note._id); }}
                     className="text-gray-400 hover:text-red-500 text-sm"
                     title="Delete"
                   >
                     <FaTrash />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No notes found.</p>
            <Link to="/note-editor" className="text-purple-600 hover:underline mt-2 inline-block">Create your first note</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotes;
