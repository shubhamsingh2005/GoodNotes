import React, { useState } from 'react';
import { FaPlus, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Tag {
  id: string;
  name: string;
}

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]); // To store tags
  const [newTag, setNewTag] = useState(''); // To store input value for the new tag
  const [isAddingTag, setIsAddingTag] = useState(false); // To toggle add tag form

  // Handle adding a new tag
  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObject = {
        id: Date.now().toString(), // Unique id for each tag
        name: newTag.trim(),
      };
      setTags((prevTags) => [...prevTags, newTagObject]);
      setNewTag('');
      setIsAddingTag(false);
    }
  };

  // Handle deleting a tag
  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="flex flex-col w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Tags</h2>

      {/* Display tags */}
      <div className="flex flex-wrap gap-4 mb-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            <FaTag className="mr-2" />
            <span>{tag.name}</span>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTag(tag.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Add new tag button */}
      {!isAddingTag ? (
        <button
          onClick={() => setIsAddingTag(true)}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Add New Tag
        </button>
      ) : (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tag Name"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full"
          />
          <button
            onClick={handleAddTag}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add
          </button>
          <button
            onClick={() => setIsAddingTag(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Optional: Link to a page for managing or viewing notes by tags */}
      <div className="mt-6">
        <Link
          to="/tags"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
        >
          Manage tags
        </Link>
      </div>
    </div>
  );
};

export default Tags;
