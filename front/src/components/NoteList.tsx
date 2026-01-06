import React from 'react';
import { Note } from '../types/Note';
import { FaMapPin } from 'react-icons/fa';
import clsx from 'classnames';
import { getNoteColorClass } from '../utils/colorUtils';

interface NoteListProps {
  notes: any[]; // Use relaxed type to match backend
  activeNote: any | null;
  setActiveNote: (note: any) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, activeNote, setActiveNote }) => {
  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  const NoteItem = ({ note }: { note: any }) => {
    const isActive = activeNote?._id === note._id || activeNote?.id === note.id;
    const colorClass = getNoteColorClass(note.color || 'default');
    
    // If active, we might want to highlight it differently, or just use a border.
    // Let's use the note color as base, and add border if active.
    
    return (
        <div
          onClick={() => setActiveNote(note)}
          className={clsx(
            "p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors relative",
            colorClass, // Apply the note's color
            isActive ? "ring-2 ring-inset ring-purple-600 z-10" : "hover:brightness-95 dark:hover:brightness-110"
          )}
        >
          <div className="flex justify-between items-start">
            <h4 className={clsx("font-semibold text-sm mb-1 line-clamp-1 text-gray-800 dark:text-gray-100")}>
                {note.title || 'Untitled'}
            </h4>
            {note.isPinned && <FaMapPin className="text-xs text-purple-600 flex-shrink-0 ml-2" />}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2" dangerouslySetInnerHTML={{ __html: note.content || '' }} />
          <span className="text-[10px] text-gray-500 mt-2 block">
            {new Date(note.updatedAt || note.date).toLocaleDateString()}
          </span>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Pinned Section */}
      {pinnedNotes.length > 0 && (
        <div className="mb-2">
           <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0 z-20">
             Pinned
           </div>
           {pinnedNotes.map(note => <NoteItem key={note._id || note.id} note={note} />)}
        </div>
      )}

      {/* Others Section */}
      {otherNotes.length > 0 && (
        <div>
           {pinnedNotes.length > 0 && (
             <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 sticky top-0 z-20">
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
