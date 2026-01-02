import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api/axios';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Backend expects: name, email, password
      const response = await API.post('/signup', { name, email, password });

      if (response.data.success) {
        // Redirect to Signin after success
        navigate('/signin');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-1">
          <span className="text-purple-600">Join </span>
          <span className="text-sky-500">Us</span>
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Create your account to get started.
        </p>

        {error && <p className="text-red-500 text-center mb-4 text-sm bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
          <div className="relative mb-4">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <label className="text-sm font-semibold text-gray-700 mb-1 block">Email</label>
          <div className="relative mb-4">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <label className="text-sm font-semibold text-gray-700 mb-1 block">Password</label>
          <div className="relative mb-6">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
              minLength={6}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className={`w-full text-white py-2 rounded-full transition-all text-sm font-semibold shadow-md ${
              isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="text-purple-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
