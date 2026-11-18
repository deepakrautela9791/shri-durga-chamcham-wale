import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaMapMarkedAlt, FaSignOutAlt, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-brand-maroon text-white flex flex-col">
        <div className="p-4 border-b border-red-800">
          <h2 className="text-2xl font-bold text-brand-gold">Admin Panel</h2>
          <p className="text-sm opacity-80">Shri Durga Chamcham Wale</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-red-900 text-brand-gold' : 'hover:bg-red-800'}`}><FaBox /> Dashboard</button>
          <button onClick={() => setActiveTab('orders')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'orders' ? 'bg-red-900 text-brand-gold' : 'hover:bg-red-800'}`}><FaShoppingBag /> Orders</button>
          <button onClick={() => setActiveTab('products')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'products' ? 'bg-red-900 text-brand-gold' : 'hover:bg-red-800'}`}><FaBox /> Products</button>
          <button onClick={() => setActiveTab('delivery')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'delivery' ? 'bg-red-900 text-brand-gold' : 'hover:bg-red-800'}`}><FaMapMarkedAlt /> Delivery Areas</button>
          <button onClick={() => setActiveTab('customers')} className={`w-full text-left p-3 rounded flex items-center gap-3 ${activeTab === 'customers' ? 'bg-red-900 text-brand-gold' : 'hover:bg-red-800'}`}><FaUsers /> Customers</button>
        </nav>
        <div className="p-4 border-t border-red-800">
          <button onClick={handleLogout} className="w-full text-left p-3 rounded hover:bg-red-800 flex items-center gap-3 text-red-200"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 capitalize mb-8">{activeTab}</h1>
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-brand-maroon">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-900">₹45,200</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-brand-gold">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">128</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Pending Orders</h3>
              <p className="text-2xl font-bold text-gray-900">14</p>
            </div>
          </div>
        )}
        {activeTab !== 'dashboard' && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            <p className="text-xl">Backend API connection pending...</p>
            <p className="mt-2">This section will be populated once Node.js/MongoDB is connected.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
