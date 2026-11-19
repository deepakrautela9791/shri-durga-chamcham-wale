import React, { useState } from 'react';
import { FaSearch, FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import { API_URL } from '../api';

const TrackOrder = () => {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`${API_URL}/api/orders/track?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error tracking order:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaCheckCircle /> Delivered</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaTimesCircle /> Cancelled</span>;
      case 'Out for Delivery':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaTruck /> Out for Delivery</span>;
      case 'Processing':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaBox /> Processing</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><FaClock /> {status || 'Pending'}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-brand-maroon mb-2">Track Your Order</h1>
      <p className="text-center text-gray-600 mb-8">Enter your Order ID or Phone Number to check live status.</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-10 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Enter Order ID or Phone Number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 shadow-sm"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <FaSearch />
          <span>{loading ? 'Searching...' : 'Track'}</span>
        </button>
      </form>

      {searched && !loading && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center border">
              <p className="text-gray-500 font-medium">No orders found matching "{query}". Please check your Order ID or Phone Number.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md border overflow-hidden">
                <div className="bg-red-50 p-4 border-b flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <span className="text-xs text-gray-500 block">Order ID</span>
                    <span className="font-mono text-sm font-bold text-gray-800">{order._id}</span>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border-b pb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Customer Name</p>
                      <p className="font-semibold">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Phone Number</p>
                      <p className="font-semibold">{order.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Order Date</p>
                      <p className="font-semibold">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Payment Details</p>
                      <p className="font-semibold">
                        {order.paymentMethod || 'COD'} ({order.paymentStatus || 'Pending'})
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Ordered Items</h3>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b last:border-0 pb-1 last:pb-0">
                          <span>{item.quantity} x {item.name} ({item.weight})</span>
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-bold text-gray-700">Total Amount</span>
                    <span className="text-xl font-bold text-red-800">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
