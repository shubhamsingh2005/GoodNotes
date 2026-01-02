import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Use Auth Context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await API.post('/login', { email, password });
      
      if (response.data.success) {
        // Save token and user info via Context
        login(response.data.token, response.data.user);
        navigate('/home');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
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
          <span className="text-green-500 font-bold">Good</span>
          <span className="text-sky-500 font-bold">Notes</span>
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Your Personal Notes Manager.
        </p>

        {error && <p className="text-red-500 text-center mb-4 text-sm bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit}>
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
          <div className="relative mb-2">
            <div
              className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-500 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
          </div>

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-xs text-purple-600 hover:underline">
              Forgot Password?
            </Link>
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex gap-4">
          <button
            className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-full w-full hover:bg-red-600 transition-all text-sm font-semibold shadow-sm"
          >
            <FaGoogle /> Google
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-full w-full hover:bg-black transition-all text-sm font-semibold shadow-sm"
          >
            <FaGithub /> GitHub
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
