import React, { useEffect, useState } from 'react';
import { noteService } from '../../services/noteService';
import { FaShareAlt } from 'react-icons/fa';

const SharedWithMe = () => {
  const [sharedNotes, setSharedNotes] = useState<any[]>([]);

  useEffect(() => {
    const fetchSharedNotes = async () => {
      try {
        const notes = await noteService.getSharedNotes();
        setSharedNotes(notes);
      } catch (error) {
        console.error('Failed to fetch shared notes', error);
      }
    };
    fetchSharedNotes();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
         <FaShareAlt className="text-blue-500" /> Shared with Me
      </h2>
      
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {sharedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedNotes.map((note) => (
              <div key={note._id || note.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-100">{note.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{note.content}</p>
                <div className="text-xs text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit">
                    Shared by: {note.sharedBy || 'Unknown'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <FaShareAlt className="text-6xl text-gray-200 mx-auto mb-4" />
            <p className="text-lg">No notes shared with you yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedWithMe;
