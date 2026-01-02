import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNoteContext } from '../../context/NoteContext';
import { FaFolder, FaPlus, FaTrash, FaThLarge, FaList } from 'react-icons/fa';

const Folders: React.FC = () => {
  const { folders, createNewFolder, deleteFolderById } = useNoteContext();
  const [newFolderName, setNewFolderName] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      await createNewFolder({ name: newFolderName });
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Folders</h2>
        
        <div className="flex gap-4">
            <button 
                onClick={() => setIsCreating(!isCreating)}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow"
            >
                <FaPlus />
                <span>New Folder</span>
            </button>

            <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
                title="Grid View"
            >
                <FaThLarge />
            </button>
            <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow text-purple-600' : 'text-gray-500'}`}
                title="List View"
            >
                <FaList />
            </button>
            </div>
        </div>
      </div>

      {/* Create Folder Input (Expandable) */}
      {isCreating && (
          <form onSubmit={handleCreateFolder} className="mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-900 flex gap-2 animate-fade-in">
              <input 
                type="text" 
                autoFocus
                placeholder="Folder Name" 
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create</button>
              <button type="button" onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700 px-4">Cancel</button>
          </form>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
        {folders.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-3'}>
            {folders.map((folder: any) => (
              <div 
                key={folder.id || folder._id} 
                className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900 transition-all flex flex-col justify-between h-32"
              >
                  <Link to={`/folder/${folder.id || folder._id}`} className="flex-1 flex flex-col items-center justify-center text-center">
                    <FaFolder className="text-4xl text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{folder.name}</h4>
                    <span className="text-xs text-gray-400 mt-1">{folder.notes?.length || 0} notes</span>
                  </Link>

                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => deleteFolderById(folder.id || folder._id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Delete Folder"
                     >
                         <FaTrash size={14} />
                     </button>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <FaFolder className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-lg">No folders yet.</p>
            <button onClick={() => setIsCreating(true)} className="text-purple-600 hover:underline mt-2">Create one now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folders;
