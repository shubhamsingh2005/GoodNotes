import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

const Help = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
        <FaQuestionCircle className="text-3xl text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Help & Support</h2>
      </div>
      
      <div className="prose dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome to GoodNotes! Here is how you can get the most out of your experience.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">Getting Started</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
          <li><strong>Create Notes:</strong> Click on the "+" button in the sidebar or "Create Note" to start writing.</li>
          <li><strong>Folders:</strong> Organize your thoughts by creating folders in the "Folders" section.</li>
          <li><strong>Starring:</strong> Mark important notes with a Star to access them quickly in "Starred Notes".</li>
          <li><strong>Search:</strong> Use the search bar at the top or the Search page to find notes instantly.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-white">Trash Management</h3>
        <p className="text-gray-600 dark:text-gray-400">
            Deleted notes are moved to the <strong>Trash</strong>. You can restore them or permanently delete them from there.
        </p>

        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-bold text-purple-700 dark:text-purple-300">Need more help?</h4>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                Contact our support team at <a href="mailto:support@goodnotes.app" className="underline">support@goodnotes.app</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
