import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaMapMarkedAlt, FaSignOutAlt, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'dashboard' || activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

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
              <p className="text-2xl font-bold text-gray-900">₹{totalSales}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-brand-gold">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-bold uppercase">Pending Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-brand-gold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Delivered' ? 'bg-green-100 text-green-800' : order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && !loading && (
              <div className="p-8 text-center text-gray-500">No orders found.</div>
            )}
            {loading && (
              <div className="p-8 text-center text-gray-500">Loading orders...</div>
            )}
          </div>
        )}

        {activeTab !== 'dashboard' && activeTab !== 'orders' && (
          <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
            <p className="text-xl">Section under development...</p>
            <p className="mt-2">More features coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
