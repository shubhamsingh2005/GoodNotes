import React, { useState, useEffect, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaSearch, FaRegFileAlt } from 'react-icons/fa';

const Search: React.FC = () => {
  const { notes } = useNoteContext();
  
  // Get search term from Header via Layout
  const { searchTerm: headerSearchTerm } = useOutletContext<{ searchTerm: string }>() || { searchTerm: '' };
  
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  
  // Sync header search with local search
  useEffect(() => {
    if (headerSearchTerm) {
        setLocalSearchQuery(headerSearchTerm);
    }
  }, [headerSearchTerm]);

  // Safe Filter Logic with Memoization
  const searchResults = useMemo(() => {
      if (!localSearchQuery.trim()) return [];
      
      const query = localSearchQuery.toLowerCase();
      
      // Ensure notes is an array and filter safely
      return (Array.isArray(notes) ? notes : []).filter((note: any) => {
          if (!note) return false;
          const title = note.title ? note.title.toLowerCase() : '';
          const content = note.content ? note.content.toLowerCase() : '';
          const tags = note.tags && Array.isArray(note.tags) ? note.tags.join(' ').toLowerCase() : '';
          
          return title.includes(query) || content.includes(query) || tags.includes(query);
      });
  }, [notes, localSearchQuery]);

  // Helper to highlight text
  const HighlightedText = ({ text, highlight }: { text: string, highlight: string }) => {
      if (!highlight.trim()) return <span>{text}</span>;
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      return (
        <span>
            {parts.map((part, i) => 
                part.toLowerCase() === highlight.toLowerCase() ? <span key={i} className="bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white px-0.5 rounded">{part}</span> : part
            )}
        </span>
      );
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <FaSearch className="text-purple-600" /> Search Results
      </h2>

      {/* Local Input (Optional, syncs with header usually) */}
      <div className="mb-6">
        <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="Type to search notes..."
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition-all"
            autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {searchResults.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up">
             {searchResults.map((note: any) => (
               <Link 
                 to="/note-editor" 
                 state={{ note }} 
                 key={note.id || note._id}
                 className="block p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all group"
               >
                 <div className="flex items-center gap-2 mb-2 text-gray-400 group-hover:text-purple-500 transition-colors">
                    <FaRegFileAlt />
                    <span className="text-xs font-semibold uppercase tracking-wider">Note</span>
                 </div>
                 <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 truncate">
                    <HighlightedText text={note.title || 'Untitled'} highlight={localSearchQuery} />
                 </h4>
                 {/* Strip HTML tags for preview */}
                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {note.content?.replace(/<[^>]+>/g, '') || ''}
                 </p>
                 
                 {note.tags && note.tags.length > 0 && (
                     <div className="flex gap-2 mt-3 flex-wrap">
                         {note.tags.map((t: string) => (
                             <span key={t} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">#{t}</span>
                         ))}
                     </div>
                 )}
               </Link>
             ))}
           </div>
        ) : (
           <div className="flex flex-col items-center justify-center mt-20 opacity-50">
              <FaSearch size={48} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">
                  {localSearchQuery ? `No matches for "${localSearchQuery}"` : 'Start typing to find notes'}
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Search;
