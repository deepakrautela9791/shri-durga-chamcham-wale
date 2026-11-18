import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'durga123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border-t-4 border-brand-maroon">
        <h2 className="text-center text-3xl font-extrabold text-brand-maroon mb-6">Admin Panel Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm font-bold">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Username</label>
            <input type="text" name="username" onChange={handleChange} required className="w-full border rounded p-3 focus:ring-brand-gold" placeholder="Enter admin username" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full border rounded p-3 focus:ring-brand-gold" placeholder="Enter password" />
          </div>
          <button type="submit" className="w-full bg-brand-maroon text-white font-bold py-3 rounded hover:bg-red-900 transition-colors">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
