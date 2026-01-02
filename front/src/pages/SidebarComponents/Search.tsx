import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaSearch } from 'react-icons/fa';

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

  // Real-time filtering
  const searchQuery = localSearchQuery;
  const searchResults = searchQuery.trim() === '' ? [] : notes.filter((note: any) =>
      (note.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (note.content?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <FaSearch /> Search
      </h2>

      <div className="mb-6">
        <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="Type to search..."
            className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-lg focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
            autoFocus
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {searchResults.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {searchResults.map((note: any) => (
               <Link 
                 to="/note-editor" 
                 state={{ note }} 
                 key={note.id || note._id}
                 className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 hover:border-purple-400 transition-colors"
               >
                 <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{note.title}</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: note.content }}></p>
               </Link>
             ))}
           </div>
        ) : (
           <div className="text-center text-gray-400 mt-10">
              {searchQuery ? 'No matches found.' : 'Enter a keyword to start searching.'}
           </div>
        )}
      </div>
    </div>
  );
};

export default Search;
