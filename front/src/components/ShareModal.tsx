import React from 'react';
import { FaTimes, FaCopy } from 'react-icons/fa';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareCode: string | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareCode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Share Note</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <FaTimes />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Use this 4-digit code to let another user access this note.
        </p>

        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-3 rounded-lg mb-4">
          <span className="text-3xl font-mono font-bold text-purple-600 tracking-widest flex-1 text-center">
            {shareCode || '....'}
          </span>
          <button 
            onClick={() => { navigator.clipboard.writeText(shareCode || ''); alert("Copied!"); }}
            className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
            title="Copy Code"
          >
            <FaCopy />
          </button>
        </div>

        <button 
          onClick={onClose} 
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
