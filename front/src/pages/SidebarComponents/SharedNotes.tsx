import React, { useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { FaShareAlt, FaSearch, FaRegFileAlt } from 'react-icons/fa';

const SharedNotes: React.FC = () => {
  const { getSharedNote } = useNoteContext();
  const [code, setCode] = useState('');
  const [note, setNote] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 4) {
        setError("Please enter a valid 4-digit code.");
        return;
    }
    setError('');
    setLoading(true);
    setNote(null);
    try {
        const fetchedNote = await getSharedNote(code);
        setNote(fetchedNote);
    } catch (err: any) {
        setError(err.response?.data?.message || "Note not found or invalid code.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-10 mt-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center justify-center gap-3">
            <FaShareAlt className="text-purple-600" /> Shared Notes Access
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
              Enter the 4-digit code provided by the owner to view the note.
          </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto w-full">
          <form onSubmit={handleFetch} className="flex flex-col gap-4">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Share Code</label>
              <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="0000"
                    className="flex-1 text-center text-3xl tracking-[0.5em] font-mono p-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || code.length !== 4}
                    className="bg-purple-600 text-white px-6 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
                  >
                    {loading ? '...' : <FaSearch />}
                  </button>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </form>
      </div>

      {note && (
          <div className="mt-10 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  
                  <div className="flex items-center gap-2 mb-4 text-purple-600 font-bold uppercase text-xs tracking-wider">
                      <FaRegFileAlt /> Shared Note Preview
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{note.title}</h1>
                  {note.subtitle && <h3 className="text-xl text-gray-500 dark:text-gray-400 mb-6">{note.subtitle}</h3>}
                  
                  <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-6" dangerouslySetInnerHTML={{ __html: note.content }} />
                  
                  <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-400 flex justify-between">
                      <span>Owner ID: {note.user}</span>
                      <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SharedNotes;
