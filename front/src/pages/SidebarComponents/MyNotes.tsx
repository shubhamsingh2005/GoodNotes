import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext'; 
import { FaThLarge, FaList, FaMapPin, FaTrash, FaEdit, FaShareAlt } from 'react-icons/fa';
import ShareModal from '../../components/ShareModal';
import clsx from 'classnames';

const MyNotes: React.FC = () => {
  const { notes, pinNoteById, deleteNoteById, generateShareCode } = useNoteContext(); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Share State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentShareCode, setCurrentShareCode] = useState<string | null>(null);

  const pinnedNotes = notes.filter((note: any) => note.isPinned);
  const unPinnedNotes = notes.filter((note: any) => !note.isPinned);
  const displayNotes = [...pinnedNotes, ...unPinnedNotes];

  const handleShare = async (e: React.MouseEvent, note: any) => {
      e.preventDefault();
      e.stopPropagation(); 
      try {
          let code = note.shareCode;
          if (!code) {
              const data = await generateShareCode(note.id || note._id);
              code = data.shareCode;
          }
          setCurrentShareCode(code);
          setShareModalOpen(true);
      } catch (err) {
          alert("Failed to share note");
      }
  };

  return (
    <div className="flex flex-col h-full">
      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        shareCode={currentShareCode} 
      />

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Notes</h2>
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={clsx("p-2 rounded-md transition-all", viewMode === 'grid' ? "bg-white dark:bg-gray-600 shadow text-purple-600" : "text-gray-500")}
            title="Grid View"
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={clsx("p-2 rounded-md transition-all", viewMode === 'list' ? "bg-white dark:bg-gray-600 shadow text-purple-600" : "text-gray-500")}
            title="List View"
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {displayNotes.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-3'}>
            {displayNotes.map((note: any) => (
              <div 
                key={note.id || note._id} 
                className={clsx(
                    "group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all relative flex",
                    viewMode === 'grid' ? "flex-col h-48" : "flex-row items-center h-20 gap-4"
                )}
              >
                {/* Note Header / Title */}
                <div className={clsx("flex justify-between items-start", viewMode === 'grid' ? "w-full mb-2" : "w-1/4 mb-0")}>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 truncate">{note.title}</h4>
                  {note.isPinned && viewMode === 'grid' && <FaMapPin className="text-purple-500 flex-shrink-0" />}
                </div>

                {/* Note Content Preview */}
                <div 
                  className={clsx(
                      "text-gray-600 dark:text-gray-400 text-sm",
                      viewMode === 'grid' ? "mb-4 line-clamp-3 flex-1" : "line-clamp-1 flex-1 mb-0"
                  )}
                  dangerouslySetInnerHTML={{ __html: note.content || '' }} 
                />

                {/* Actions */}
                <div className={clsx(
                    "flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                    viewMode === 'grid' ? "justify-end mt-auto" : "justify-end"
                )}>
                   <button 
                     onClick={(e) => { e.preventDefault(); pinNoteById(note.id || note._id, !note.isPinned); }}
                     className={`text-sm hover:text-purple-600 ${note.isPinned ? 'text-purple-500' : 'text-gray-400'}`}
                     title={note.isPinned ? "Unpin" : "Pin"}
                   >
                     <FaMapPin />
                   </button>
                   
                   <button 
                     onClick={(e) => handleShare(e, note)}
                     className="text-gray-400 hover:text-green-500 text-sm"
                     title="Share"
                   >
                     <FaShareAlt />
                   </button>

                   <Link to="/note-editor" state={{ note }} className="text-gray-400 hover:text-blue-500 text-sm" title="Edit">
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
                
                {/* Link Overlay */}
                <Link to="/note-editor" state={{ note }} className="absolute inset-0 z-0" />
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
