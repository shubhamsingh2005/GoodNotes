import React, { useEffect, useState } from 'react'; 
import NoteList from '../components/NoteList'; 
import Dashboard from '@/pages/SidebarComponents/Dashboard'; 
import { useNoteContext } from '../context/NoteContext'; 
import { Note } from '../types/Note'; 
import { useOutletContext } from 'react-router-dom';
import clsx from 'classnames';
import { getNoteColorClass } from '../utils/colorUtils';

const Home: React.FC = () => {
  // Use Context for Data
  const { notes, fetchNotes } = useNoteContext();
  
  // Get search term from Layout via Outlet Context
  const { searchTerm } = useOutletContext<{ searchTerm: string }>() || { searchTerm: '' };
  
  // Local state for UI
  const [activeNote, setActiveNote] = useState<Note | null>(null); 

  // Fetch notes from Backend on mount
  useEffect(() => { 
    fetchNotes(); 
  }, []);

  // Filter notes based on search
  const filteredNotes = notes.filter((note: any) =>
    (note.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (note.content?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Dashboard Stats / Overview */}
      <div className="flex-shrink-0">
        <Dashboard />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
        {/* Recent Notes List */}
        <div className="w-full md:w-1/3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Recent Notes</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            {filteredNotes.length > 0 ? (
               <NoteList
                 notes={filteredNotes}
                 activeNote={activeNote}
                 setActiveNote={setActiveNote}
               />
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                No notes found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
        
        {/* Quick View / Preview Area */}
        <div className={clsx(
            "hidden md:flex flex-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 items-center justify-center text-gray-400 p-8 text-center transition-colors",
            activeNote ? getNoteColorClass(activeNote.color || 'default') : "bg-white dark:bg-gray-800"
        )}>
            {activeNote ? (
              <div className="w-full h-full p-6 text-left overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">{activeNote.title}</h2>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: activeNote.content }} />
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium">Select a note to preview</p>
                <p className="text-sm mt-2">or create a new one to get started.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
