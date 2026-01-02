// src/components/NoteCard.tsx

import React from 'react';

interface NoteCardProps {
  note: { id: number; text: string };
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col justify-between">
      <p className="text-gray-800 dark:text-gray-200">{note.text}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
          onClick={() => onEdit(note.id, note.text)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
