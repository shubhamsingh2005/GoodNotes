import React, { useState, useMemo } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { Link } from 'react-router-dom';
import { FaTag, FaHashtag } from 'react-icons/fa';

const Tags: React.FC = () => {
  const { notes } = useNoteContext();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract unique tags and count usage
  const tagsMap = useMemo(() => {
    const map = new Map<string, number>();
    notes.forEach((note: any) => {
      if (note.tags && Array.isArray(note.tags)) {
        note.tags.forEach((tag: string) => {
          const normalizedTag = tag.trim(); 
          if(normalizedTag) {
              map.set(normalizedTag, (map.get(normalizedTag) || 0) + 1);
          }
        });
      }
    });
    return map;
  }, [notes]);

  const sortedTags = Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1]); // Sort by frequency

  // Filter notes by selected tag
  const filteredNotes = selectedTag 
    ? notes.filter((n: any) => n.tags?.includes(selectedTag))
    : [];

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
        <FaTag className="text-purple-600" /> Tags
      </h2>

      {/* Tags Cloud */}
      <div className="flex flex-wrap gap-3 mb-8">
        {sortedTags.length > 0 ? (
           sortedTags.map(([tag, count]) => (
             <button
               key={tag}
               onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                 selectedTag === tag 
                   ? 'bg-purple-600 text-white shadow-md scale-105' 
                   : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'
               }`}
             >
               <FaHashtag size={12} className="opacity-50" />
               {tag}
               <span className="ml-1 opacity-70 text-xs bg-black/10 dark:bg-white/10 px-1.5 rounded-full">{count}</span>
             </button>
           ))
        ) : (
           <div className="text-gray-500 italic">No tags found. Add tags to your notes to organize them here.</div>
        )}
      </div>

      {/* Filtered Notes */}
      {selectedTag && (
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin animate-fade-in">
          <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">
             Notes with <span className="text-purple-600">#{selectedTag}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {filteredNotes.map((note: any) => (
                <Link 
                   key={note.id || note._id}
                   to="/note-editor" 
                   state={{ note }}
                   className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group"
                >
                   <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-purple-600 transition-colors">{note.title}</h4>
                   <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: note.content || '' }} />
                   
                   <div className="flex gap-2 flex-wrap">
                      {note.tags?.slice(0, 3).map((t: string) => (
                          <span key={t} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded">#{t}</span>
                      ))}
                   </div>
                </Link>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
