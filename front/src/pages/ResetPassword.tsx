import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle } from 'react-icons/fa';

const ResetPassword: React.FC = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    setLoading(true);
    try {
      await api.put(`/reset-password/${resetToken}`, { password });
      setSuccess(true);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate('/signin'), 3000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password. Link may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up">
        
        {success ? (
            <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                    <FaCheckCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h2>
                <p className="text-gray-500 mb-6">Your password has been successfully updated.</p>
                <p className="text-sm text-gray-400">Redirecting to login...</p>
            </div>
        ) : (
            <>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <FaLock size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
                    <p className="text-gray-500">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors disabled:opacity-70"
                  >
                    {loading ? 'Resetting...' : 'Set New Password'}
                  </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
