import React, { useEffect, useState } from 'react';
import { useNoteContext } from '@/context/NoteContext';
import { motion } from 'framer-motion';
import '@/styles/dashboard.css';
import { MdNotificationsActive, MdOutlinePushPin, MdUpdate } from 'react-icons/md';

interface Note {
  id: string;
  title: string;
  subtitle?: string;
  reminder?: string | null;
  pinned?: boolean;
  updatedAt?: string;
  date?: string;
}

const Dashboard: React.FC = () => {
  const { notes, fetchNotes } = useNoteContext();
  const [reminders, setReminders] = useState<Note[]>([]);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);
  const [recentlyEdited, setRecentlyEdited] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes(); // Load all notes when Dashboard mounts
  }, []);

  useEffect(() => {
    setReminders(notes.filter(note => note.reminder != null));
    setPinnedNotes(notes.filter(note => note.pinned === true));
    setRecentlyEdited(
      notes.filter(note => {
        const time = new Date(note.updatedAt || note.date || '').getTime();
        return time > Date.now() - 1000 * 60 * 60 * 24; // last 24 hours
      })
    );
  }, [notes]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const Section = ({
    title,
    items,
    icon: Icon,
  }: {
    title: string;
    items: Note[];
    icon: React.ElementType;
  }) => (
    <motion.div
      className="flex-1 p-6 m-4 rounded-3xl shadow-2xl text-white min-w-[30%]"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center mb-6 border-b-2 border-white pb-3">
        <Icon className="text-3xl mr-3 animate-pulse" />
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>
      {items.length > 0 ? (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {items.map(note => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={note.id}
              className="bg-white bg-opacity-20 backdrop-blur-lg p-4 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              <h4 className="font-bold text-lg">{note.title}</h4>
              <p className="text-sm">{note.subtitle || 'No subtitle'}</p>
              {note.reminder && (
                <span className="text-xs block mt-1 text-yellow-200">
                  Reminder: {new Date(note.reminder).toLocaleString()}
                </span>
              )}
              <span className="text-xs text-gray-200 block mt-1">
                Updated: {new Date(note.updatedAt || note.date || '').toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-white opacity-70">No {title.toLowerCase()} found.</p>
      )}
    </motion.div>
  );

  return (
    <div className="flex flex-wrap justify-between w-full min-h-screen bg-gray-900 p-8">
      <Section title="Reminders" items={reminders} icon={MdNotificationsActive} />
      <Section title="Pinned Notes" items={pinnedNotes} icon={MdOutlinePushPin} />
      <Section title="Recently Edited" items={recentlyEdited} icon={MdUpdate} />
    </div>
  );
};

export default Dashboard;
