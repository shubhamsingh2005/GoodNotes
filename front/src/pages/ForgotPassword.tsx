import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/forgot-password', { email });
      setEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up">
        <Link to="/signin" className="flex items-center text-gray-500 hover:text-purple-600 mb-6 transition-colors">
            <FaArrowLeft className="mr-2" /> Back to Login
        </Link>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-500 mb-8">Enter your email and we'll send you instructions to reset your password.</p>

        {emailSent ? (
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <FaEnvelope size={30} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Check your mail</h3>
                <p className="text-green-600">We have sent a password reset link to <span className="font-bold">{email}</span>.</p>
                <button onClick={() => setEmailSent(false)} className="mt-4 text-sm text-green-700 underline">Resend Email</button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? <span className="animate-pulse">Sending...</span> : 'Send Reset Link'}
              </button>
            </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
