import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShoppingBag, FaMapMarkedAlt, FaSignOutAlt, FaUsers, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { API_URL } from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({ name: '', description: '', pricePerKg: '', inStock: true, category: '', image: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  // Delivery area form state
  const [areaForm, setAreaForm] = useState({ pincode: '', areaName: '', isActive: true });
  const [editingAreaId, setEditingAreaId] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    } else {
      fetchOrders();
      fetchProducts();
      fetchDeliveryAreas();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  const fetchDeliveryAreas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/delivery-areas`);
      const data = await res.json();
      setDeliveryAreas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching delivery areas:', err);
      setDeliveryAreas([]);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  // Product CRUD
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProductId ? `${API_URL}/api/products/${editingProductId}` : `${API_URL}/api/products`;
      const method = editingProductId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          pricePerKg: Number(productForm.pricePerKg)
        })
      });
      if (res.ok) {
        setProductForm({ name: '', description: '', pricePerKg: '', inStock: true, category: '', image: '' });
        setEditingProductId(null);
        fetchProducts();
      }
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleEditProduct = (prod) => {
    setEditingProductId(prod._id);
    setProductForm({
      name: prod.name || '',
      description: prod.description || '',
      pricePerKg: prod.pricePerKg || '',
      inStock: prod.inStock !== undefined ? prod.inStock : true,
      category: prod.category || '',
      image: prod.image || ''
    });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Delivery Area CRUD
  const handleAreaSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingAreaId ? `${API_URL}/api/delivery-areas/${editingAreaId}` : `${API_URL}/api/delivery-areas`;
      const method = editingAreaId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(areaForm)
      });
      if (res.ok) {
        setAreaForm({ pincode: '', areaName: '', isActive: true });
        setEditingAreaId(null);
        fetchDeliveryAreas();
      }
    } catch (err) {
      console.error('Error saving delivery area:', err);
    }
  };

  const handleEditArea = (area) => {
    setEditingAreaId(area._id);
    setAreaForm({ pincode: area.pincode, areaName: area.areaName, isActive: area.isActive });
  };

  const handleToggleAreaStatus = async (area) => {
    try {
      const res = await fetch(`${API_URL}/api/delivery-areas/${area._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !area.isActive })
      });
      if (res.ok) fetchDeliveryAreas();
    } catch (err) {
      console.error('Error toggling area status:', err);
    }
  };

  const handleDeleteArea = async (id) => {
    if (!window.confirm('Delete this pincode/area?')) return;
    try {
      const res = await fetch(`${API_URL}/api/delivery-areas/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDeliveryAreas();
    } catch (err) {
      console.error('Error deleting delivery area:', err);
    }
  };

  // Calculations
  const totalOrders = Array.isArray(orders) ? orders.length : 0;
  const totalSales = Array.isArray(orders)
    ? orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    : 0;
  const pendingOrders = Array.isArray(orders) ? orders.filter(o => o.status === 'Pending').length : 0;

  // Customers grouping
  const customerMap = {};
  if (Array.isArray(orders)) {
    orders.forEach(order => {
      const phone = order.phoneNumber || 'Unknown';
      if (!customerMap[phone]) {
        customerMap[phone] = {
          name: order.customerName || 'N/A',
          phone: phone,
          totalOrders: 0,
          totalSpent: 0
        };
      }
      customerMap[phone].totalOrders += 1;
      customerMap[phone].totalSpent += order.totalAmount || 0;
    });
  }
  const customers = Object.values(customerMap);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-red-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-yellow-400 border-b border-red-800 pb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-red-800 text-yellow-400' : 'hover:bg-red-800/50'}`}
            >
              <FaShoppingBag /> <span>Orders ({totalOrders})</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'products' ? 'bg-red-800 text-yellow-400' : 'hover:bg-red-800/50'}`}
            >
              <FaBox /> <span>Products ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'delivery' ? 'bg-red-800 text-yellow-400' : 'hover:bg-red-800/50'}`}
            >
              <FaMapMarkedAlt /> <span>Delivery Areas ({deliveryAreas.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === 'customers' ? 'bg-red-800 text-yellow-400' : 'hover:bg-red-800/50'}`}
            >
              <FaUsers /> <span>Customers ({customers.length})</span>
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-950 hover:bg-black transition text-red-200 mt-6 md:mt-0"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-semibold">Total Delivered Sales</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">₹{totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-semibold">Total Orders</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-semibold">Pending Orders</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{pendingOrders}</p>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === 'dashboard' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
            {loading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50 text-sm">
                        <td className="p-3 font-mono text-xs">{order._id}</td>
                        <td className="p-3">
                          <div className="font-semibold">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.phoneNumber}</div>
                        </td>
                        <td className="p-3">
                          {order.items && order.items.length > 0 ? (
                            <ul className="list-disc list-inside text-xs space-y-1">
                              {order.items.map((item, idx) => (
                                <li key={idx}>
                                  {item.quantity} x {item.name} ({item.weight})
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400 text-xs">No items</span>
                          )}
                        </td>
                        <td className="p-3 font-semibold">₹{order.totalAmount}</td>
                        <td className="p-3">
                          <div className="flex flex-col gap-1">
                            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700 w-fit">
                              {order.paymentMethod || 'COD'}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold w-fit ${
                              order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.paymentStatus || 'Pending'}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-xs text-gray-500 whitespace-nowrap">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="border rounded px-2 py-1 text-xs bg-white focus:outline-none border-gray-300"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Price Per Kg (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.pricePerKg}
                    onChange={(e) => setProductForm({ ...productForm, pricePerKg: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">Description *</label>
                  <textarea
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                    rows="2"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="inStock" className="text-sm font-semibold">In Stock</label>
                </div>
                <div className="md:col-span-2 flex space-x-2">
                  <button
                    type="submit"
                    className="bg-red-800 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-900 transition flex items-center space-x-2"
                  >
                    <FaPlus /> <span>{editingProductId ? 'Update Product' : 'Add Product'}</span>
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProductId(null);
                        setProductForm({ name: '', description: '', pricePerKg: '', inStock: true, category: '', image: '' });
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">All Products</h2>
              {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                        <th className="p-3">Name</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Price/Kg</th>
                        <th className="p-3">Stock Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => (
                        <tr key={prod._id} className="border-b hover:bg-gray-50 text-sm">
                          <td className="p-3 font-semibold">{prod.name}</td>
                          <td className="p-3 text-xs text-gray-600 max-w-xs truncate">{prod.description}</td>
                          <td className="p-3 font-semibold">₹{prod.pricePerKg}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              prod.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {prod.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditProduct(prod)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod._id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delivery Areas Tab */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {editingAreaId ? 'Edit Delivery Area' : 'Add New Pincode/Area'}
              </h2>
              <form onSubmit={handleAreaSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={areaForm.pincode}
                    onChange={(e) => setAreaForm({ ...areaForm, pincode: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Area Name *</label>
                  <input
                    type="text"
                    required
                    value={areaForm.areaName}
                    onChange={(e) => setAreaForm({ ...areaForm, areaName: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={areaForm.isActive}
                    onChange={(e) => setAreaForm({ ...areaForm, isActive: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold">Active</label>
                </div>
                <div className="md:col-span-2 flex space-x-2">
                  <button
                    type="submit"
                    className="bg-red-800 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-900 transition flex items-center space-x-2"
                  >
                    <FaPlus /> <span>{editingAreaId ? 'Update Area' : 'Add Delivery Area'}</span>
                  </button>
                  {editingAreaId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAreaId(null);
                        setAreaForm({ pincode: '', areaName: '', isActive: true });
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Delivery Areas / Pincodes</h2>
              {deliveryAreas.length === 0 ? (
                <p className="text-gray-500">No delivery areas found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                        <th className="p-3">Pincode</th>
                        <th className="p-3">Area Name</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryAreas.map((area) => (
                        <tr key={area._id} className="border-b hover:bg-gray-50 text-sm">
                          <td className="p-3 font-mono font-semibold">{area.pincode}</td>
                          <td className="p-3">{area.areaName}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleToggleAreaStatus(area)}
                              className={`px-3 py-1 rounded text-xs font-semibold ${
                                area.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {area.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditArea(area)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteArea(area._id)}
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Customer Records</h2>
            {customers.length === 0 ? (
              <p className="text-gray-500">No customer records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Phone Number</th>
                      <th className="p-3">Total Orders</th>
                      <th className="p-3">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((cust, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 text-sm">
                        <td className="p-3 font-semibold">{cust.name}</td>
                        <td className="p-3 font-mono text-gray-600">{cust.phone}</td>
                        <td className="p-3 font-semibold">{cust.totalOrders}</td>
                        <td className="p-3 font-semibold text-green-700">₹{cust.totalSpent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
