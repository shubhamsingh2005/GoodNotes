import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext'; 
import { FaThLarge, FaList, FaMapPin, FaTrash, FaEdit, FaShareAlt, FaPalette } from 'react-icons/fa';
import ShareModal from '../../components/ShareModal';
import clsx from 'classnames';
import { getNoteColorClass, noteColors } from '../../utils/colorUtils';

const MyNotes: React.FC = () => {
  const { notes, pinNoteById, deleteNoteById, generateShareCode, updateNoteById } = useNoteContext(); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Share State
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [currentShareCode, setCurrentShareCode] = useState<string | null>(null);
  
  // Color Picker State
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

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

  const handleColorChange = async (e: React.MouseEvent, noteId: string, colorValue: string) => {
      e.preventDefault();
      e.stopPropagation();
      try {
          await updateNoteById(noteId, { color: colorValue });
          setActiveColorPicker(null);
      } catch (err) {
          console.error("Failed to update color", err);
      }
  };

  return (
    <div className="flex flex-col h-full" onClick={() => setActiveColorPicker(null)}>
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
                    "group p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all relative flex",
                    getNoteColorClass(note.color || 'default'), 
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
                      "text-gray-600 dark:text-gray-300 text-sm",
                      viewMode === 'grid' ? "mb-4 line-clamp-3 flex-1" : "line-clamp-1 flex-1 mb-0"
                  )}
                  dangerouslySetInnerHTML={{ __html: note.content || '' }} 
                />

                {/* Actions */}
                <div className={clsx(
                    "flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-10",
                    viewMode === 'grid' ? "justify-end mt-auto" : "justify-end"
                )}>
                   {/* Color Picker Button */}
                   <div className="relative">
                       <button
                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveColorPicker(activeColorPicker === (note.id || note._id) ? null : (note.id || note._id)); }}
                         className="text-gray-500/70 hover:text-purple-600 text-sm"
                         title="Change Color"
                       >
                         <FaPalette />
                       </button>
                       {/* Color Popup */}
                       {activeColorPicker === (note.id || note._id) && (
                           <div className="absolute bottom-full right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-5 gap-1 w-32 z-50 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                               {noteColors.map((c) => (
                                   <button
                                       key={c.value}
                                       onClick={(e) => handleColorChange(e, note.id || note._id, c.value)}
                                       className={clsx(
                                           "w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform",
                                           c.bg, c.darkBg,
                                           (note.color === c.value) && "ring-1 ring-purple-500"
                                       )}
                                       title={c.name}
                                   />
                               ))}
                           </div>
                       )}
                   </div>

                   <button 
                     onClick={(e) => { e.preventDefault(); pinNoteById(note.id || note._id, !note.isPinned); }}
                     className={`text-sm hover:text-purple-600 ${note.isPinned ? 'text-purple-500' : 'text-gray-500/70'}`}
                     title={note.isPinned ? "Unpin" : "Pin"}
                   >
                     <FaMapPin />
                   </button>
                   
                   <button 
                     onClick={(e) => handleShare(e, note)}
                     className="text-gray-500/70 hover:text-green-600 text-sm"
                     title="Share"
                   >
                     <FaShareAlt />
                   </button>

                   <Link to="/note-editor" state={{ note }} className="text-gray-500/70 hover:text-blue-600 text-sm" title="Edit">
                     <FaEdit />
                   </Link>
                   
                   <button 
                     onClick={(e) => { e.preventDefault(); deleteNoteById(note.id || note._id); }}
                     className="text-gray-500/70 hover:text-red-600 text-sm"
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
