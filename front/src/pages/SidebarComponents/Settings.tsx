import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import API from '../../api/axios';
import { FaMoon, FaSun, FaUser, FaLock, FaSave } from 'react-icons/fa';

const Settings: React.FC = () => {
  const { user, login } = useAuth(); // login handles updating user state in context
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsSaving(true);
    try {
      const response = await API.put('/me', {
        name,
        email,
        password: password || undefined,
      });

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        login(response.data.token, response.data.user); // Update context
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
            Appearance
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Toggle application theme</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}
              />
              <span className="absolute left-2 text-xs text-yellow-500 opacity-0 dark:opacity-100 transition-opacity pointer-events-none">
                 <FaMoon size={10} />
              </span>
              <span className="absolute right-2 text-xs text-yellow-500 dark:opacity-0 transition-opacity pointer-events-none">
                 <FaSun size={12} />
              </span>
            </button>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
            Profile Settings
          </h3>

          {message && (
             <div className={`p-3 rounded mb-4 text-sm ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                 {message}
             </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                 <FaUser className="absolute top-3 left-3 text-gray-400" />
                 <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                 />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                 <span className="absolute top-3 left-3 text-gray-400">@</span>
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                 />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password (Optional)</label>
              <div className="relative">
                 <FaLock className="absolute top-3 left-3 text-gray-400" />
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Leave blank to keep current"
                   className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                 />
              </div>
            </div>
            
            {password && (
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : <><FaSave /> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
