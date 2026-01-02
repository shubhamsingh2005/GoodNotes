import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';
import { useNoteContext } from '../context/NoteContext';
import { toast } from 'react-toastify';

const Layout: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { notes, fetchNotes } = useNoteContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Search Logic: Redirect to /search if typing (unless on Home)
  useEffect(() => {
    if (searchTerm.trim() !== '' && location.pathname !== '/search' && location.pathname !== '/home') {
        navigate('/search');
    }
  }, [searchTerm, navigate, location.pathname]);

  // Reminders Logic (Polling)
  useEffect(() => {
    const interval = setInterval(() => {
        const now = new Date();
        notes.forEach(note => {
            if (note.isReminder && note.reminderDate) {
                const reminderTime = new Date(note.reminderDate);
                // Check if reminder is due (within last minute)
                const diff = now.getTime() - reminderTime.getTime();
                if (diff >= 0 && diff < 60000) { // If due within last 60 seconds
                    toast.info(`🔔 Reminder: ${note.title}`, {
                        autoClose: false,
                        onClick: () => navigate('/note-editor', { state: { note } })
                    });
                    // Optional: Mark reminder as done in backend to avoid repeat
                }
            }
        });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [notes, navigate]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Sidebar - Fixed Left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Fixed Top */}
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Dynamic Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <Outlet context={{ searchTerm }} /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
