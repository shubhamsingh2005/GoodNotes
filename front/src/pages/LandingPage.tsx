import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="landing-page">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-300 via-pink-200 to-purple-200 text-center p-6">
        
        <motion.h1
          className="text-6xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <span className="text-black-500 font-bold">Welcome to GoodNotes</span><span></span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your personal notes manager built with ❤️ using the MERN Stack.
          <br />
          Organize, Create, and Manage your notes securely and beautifully.
        </motion.p>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/Signin')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold"
          >
            Signin
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/signup')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition font-semibold"
          >
            Signup
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
