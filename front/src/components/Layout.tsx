import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { useNoteContext } from '../context/NoteContext';
import { toast } from 'react-toastify';

const Layout: React.FC = () => {
  // We removed searchTerm state here because Header now handles it locally for Spotlight search
  const { notes } = useNoteContext();
  const navigate = useNavigate();

  // Reminders Logic (Polling)
  useEffect(() => {
    // Check every 10 seconds
    const interval = setInterval(() => {
        const now = new Date();
        
        notes.forEach(note => {
            if (note.isReminder && note.reminderDate) {
                const reminderTime = new Date(note.reminderDate);
                const diff = now.getTime() - reminderTime.getTime();
                
                // If due within last 20 seconds (and not future)
                if (diff >= 0 && diff < 20000) { 
                    try {
                        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
                        audio.play().catch(e => console.log("Audio blocked", e));
                    } catch(e) {}

                    toast.info(
                        <div onClick={() => navigate('/note-editor', { state: { note } })} className="cursor-pointer">
                            <p className="font-bold">🔔 Reminder Due!</p>
                            <p className="text-sm">{note.title}</p>
                        </div>
                    , {
                        position: "top-right",
                        autoClose: false,
                        closeOnClick: false,
                        draggable: true,
                    });
                }
            }
        });
    }, 10000); 

    return () => clearInterval(interval);
  }, [notes, navigate]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header no longer needs props for search as it handles it internally */}
        <Header />

        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
