import React from 'react';
import { Note } from '../types/Note';
import { FaMapPin } from 'react-icons/fa';

interface NoteListProps {
  notes: any[]; // Use relaxed type to match backend
  activeNote: any | null;
  setActiveNote: (note: any) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, activeNote, setActiveNote }) => {
  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  const NoteItem = ({ note }: { note: any }) => (
    <div
      onClick={() => setActiveNote(note)}
      className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
        activeNote?._id === note._id || activeNote?.id === note.id ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-500' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <h4 className={`font-semibold text-sm mb-1 line-clamp-1 ${activeNote?._id === note._id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-800 dark:text-gray-200'}`}>
            {note.title || 'Untitled'}
        </h4>
        {note.isPinned && <FaMapPin className="text-xs text-purple-500 flex-shrink-0 ml-2" />}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: note.content || '' }} />
      <span className="text-[10px] text-gray-400 mt-2 block">
        {new Date(note.updatedAt || note.date).toLocaleDateString()}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div className="mb-2">
           <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0">
             Pinned
           </div>
           {pinnedNotes.map(note => <NoteItem key={note._id || note.id} note={note} />)}
        </div>
      )}

      {/* Others Section */}
      {otherNotes.length > 0 && (
        <div>
           {pinnedNotes.length > 0 && (
             <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0">
               Others
             </div>
           )}
           {otherNotes.map(note => <NoteItem key={note._id || note.id} note={note} />)}
        </div>
      )}
    </div>
  );
};

export default NoteList;
