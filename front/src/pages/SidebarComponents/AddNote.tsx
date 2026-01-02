import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteEditor from '@/components/NoteEditor';

const AddNote: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
        {/* NoteEditor handles the logic. We just provide navigation on completion. */}
        <NoteEditor onSaveComplete={() => navigate('/my-notes')} />
    </div>
  );
};

export default AddNote;
