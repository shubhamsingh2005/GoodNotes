import React, { useEffect, useState } from 'react';
import { useNoteContext } from '@/context/NoteContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { FaStickyNote, FaBell, FaStar, FaClock, FaPlus } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const { notes, fetchNotes } = useNoteContext();
  const { user } = useAuth();
  
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchNotes();
    
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Calculate Stats
  // Support both property names (isPinned/pinned) just in case
  const pinnedCount = notes.filter((n: any) => n.isPinned || n.pinned).length;
  const reminderCount = notes.filter((n: any) => n.isReminder || n.reminder).length;
  
  // Recent edits: updated in last 24h
  const recentCount = notes.filter((n: any) => {
      const date = new Date(n.updatedAt || n.date || 0);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      return diff < 24 * 60 * 60 * 1000; 
  }).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header / Greeting */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {greeting}, <span className="text-purple-600 dark:text-purple-400">{user?.name || 'Friend'}</span>!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Here is what's happening with your notes today.
          </p>
        </div>
        <Link 
            to="/note-editor" 
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
        >
            <FaPlus /> Create Note
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Notes */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <FaStickyNote size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{notes.length}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Notes</p>
            </div>
        </div>

        {/* Pinned */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-500 dark:text-yellow-400">
                    <FaStar size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{pinnedCount}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pinned Notes</p>
            </div>
        </div>

        {/* Reminders */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-500 dark:text-red-400">
                    <FaBell size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{reminderCount}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reminders</p>
            </div>
        </div>

        {/* Recently Edited */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-32 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-500 dark:text-green-400">
                    <FaClock size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{recentCount}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Edited Today</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
