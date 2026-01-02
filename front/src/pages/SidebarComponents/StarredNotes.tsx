import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaStar, FaThLarge, FaList } from 'react-icons/fa';

const StarredNotes: React.FC = () => {
  const { notes, starNoteById } = useNoteContext();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter for Starred Notes
  // Support both 'isStarred' (backend) and 'starred' (legacy types) just in case
  const starredNotes = notes.filter((note: any) => note.isStarred || note.starred);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Starred Notes
        </h2>
        
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {starredNotes.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {starredNotes.map((note: any) => (
              <div 
                key={note.id || note._id} 
                className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all relative flex flex-col h-48"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1">{note.title}</h4>
                  <button 
                    onClick={(e) => { e.preventDefault(); starNoteById(note.id || note._id, false); }}
                    className="text-yellow-400 hover:text-yellow-600"
                    title="Remove Star"
                  >
                    <FaStar />
                  </button>
                </div>

                <div 
                  className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1"
                  dangerouslySetInnerHTML={{ __html: note.content || '' }} 
                />

                <div className="mt-auto text-xs text-gray-400">
                    {new Date(note.updatedAt || note.date).toLocaleDateString()}
                </div>
                
                <Link to="/note-editor" state={{ note }} className="absolute inset-0 z-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <FaStar className="text-6xl text-gray-200 mx-auto mb-4" />
            <p className="text-lg">No starred notes found.</p>
            <p className="text-sm">Star important notes to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarredNotes;
