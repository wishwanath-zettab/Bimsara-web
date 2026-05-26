import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_URL from '../../apiConfig';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        username,
        password
      });

      localStorage.setItem('adminToken', response.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden bg-[linear-gradient(135deg,#1e3c72_0%,#2a5298_50%,#1e3c72_100%)]">
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-move-bg"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      <div className="bg-white p-[45px] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[30%] max-w-[490px] min-w-[330px] relative z-10">
        <h1 className="text-[32px] font-bold text-center text-[#1e3c72] mb-[10px] mt-0">Admin Login</h1>
        <p className="text-[#666] text-center mb-[35px] text-[15px] font-medium">Bimsara Real Estate Admin Panel</p>

        <form onSubmit={handleSubmit} className="mb-[25px]">
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-[#1e3c72] font-semibold text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full py-[14px] px-4 border-2 border-[#e0e6ed] rounded-lg text-sm transition-all bg-[#f8f9fa] focus:outline-none focus:border-[#1e3c72] focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,60,114,0.1)]"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-[#1e3c72] font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full py-[14px] px-4 border-2 border-[#e0e6ed] rounded-lg text-sm transition-all bg-[#f8f9fa] focus:outline-none focus:border-[#1e3c72] focus:bg-white focus:shadow-[0_0_0_4px_rgba(30,60,114,0.1)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-[14px] bg-[linear-gradient(135deg,#1e3c72_0%,#2a5298_100%)] text-white border-none rounded-lg text-base font-bold cursor-pointer transition-all shadow-[0_4px_12px_rgba(30,60,114,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(30,60,114,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
