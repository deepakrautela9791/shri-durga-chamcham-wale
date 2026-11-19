import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_URL } from '../api';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    googleMapsLink: '',
    pincode: '',
    cityVillage: '',
    district: '',
    state: '',
    postOffice: '',
    tehsil: '',
    houseNo: '',
    street: '',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [mapUrlError, setMapUrlError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    const fetchDeliveryAreas = async () => {
      try {
        const res = await fetch(`${API_URL}/api/delivery-areas`);
        const data = await res.json();
        setDeliveryAreas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching delivery areas:', err);
      }
    };
    fetchDeliveryAreas();
  }, []);

  const validateGoogleMapsUrl = (url) => {
    if (!url) return false;
    const regex = /^(https?:\/\/)?(www\.)?(maps\.google\.com|goo\.gl\/maps|maps\.app\.goo\.gl)\/.+/i;
    return regex.test(url.trim());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'pincode') {
      if (value.trim().length === 6) {
        const activeAreas = deliveryAreas.filter(a => a.isActive);
        const match = activeAreas.find(a => a.pincode === value.trim());
        if (match) {
          setPincodeStatus({ available: true, message: `Delivery available for ${match.areaName}!` });
        } else {
          setPincodeStatus({ available: false, message: 'Delivery not available for this pincode.' });
        }
      } else {
        setPincodeStatus(null);
      }
    }

    if (name === 'googleMapsLink') {
      if (value.trim() && !validateGoogleMapsUrl(value)) {
        setMapUrlError('Please provide a valid Google Maps link (maps.google.com, goo.gl/maps, or maps.app.goo.gl)');
      } else {
        setMapUrlError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateGoogleMapsUrl(formData.googleMapsLink)) {
      setMapUrlError('Please provide a valid Google Maps link (maps.google.com, goo.gl/maps, or maps.app.goo.gl)');
      return;
    }

    if (pincodeStatus && !pincodeStatus.available) {
      alert('Delivery is not available in your area.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        shippingAddress: {
          googleMapsLink: formData.googleMapsLink,
          pincode: formData.pincode,
          cityVillage: formData.cityVillage,
          district: formData.district,
          state: formData.state,
          postOffice: formData.postOffice,
          tehsil: formData.tehsil,
          houseNo: formData.houseNo,
          street: formData.street,
          landmark: formData.landmark
        },
        orderItems: cart.map(item => ({
          name: item.name,
          weight: item.weight,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'Online' ? 'Paid' : 'Pending',
        totalAmount: getCartTotal()
      };

      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();

      if (res.ok) {
        setOrderSuccess(data);
        if (clearCart) clearCart();
      } else {
        alert(data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('An error occurred while placing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-600">
          <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. We will process it shortly.</p>
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6 font-mono text-sm">
            <p><strong>Order ID:</strong> {orderSuccess._id}</p>
            <p><strong>Total Amount:</strong> ₹{orderSuccess.totalAmount}</p>
            <p><strong>Payment Method:</strong> {orderSuccess.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {orderSuccess.paymentStatus}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-900 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-brand-maroon mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Customer & Shipping Info</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">Customer Name *</label>
            <input
              type="text"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Google Maps Location Link *</label>
            <input
              type="url"
              name="googleMapsLink"
              required
              placeholder="https://maps.app.goo.gl/..."
              value={formData.googleMapsLink}
              onChange={handleInputChange}
              className={`w-full border rounded px-3 py-2 text-sm focus:outline-none ${mapUrlError ? 'border-red-500' : 'focus:border-red-500'}`}
            />
            {mapUrlError && <p className="text-red-500 text-xs mt-1">{mapUrlError}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Pincode *</label>
              <input
                type="text"
                name="pincode"
                required
                maxLength="6"
                value={formData.pincode}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">City / Village *</label>
              <input
                type="text"
                name="cityVillage"
                required
                value={formData.cityVillage}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          {pincodeStatus && (
            <div className={`p-3 rounded text-sm flex items-center space-x-2 ${pincodeStatus.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {pincodeStatus.available ? <FaCheckCircle /> : <FaTimesCircle />}
              <span>{pincodeStatus.message}</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">District *</label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">House / Flat No.</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Street / Colony</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.quantity} x {item.name} ({item.weight})</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-red-800">₹{getCartTotal()}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="font-semibold text-sm">Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online"
                  checked={paymentMethod === 'Online'}
                  onChange={() => setPaymentMethod('Online')}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="font-semibold text-sm">Online Payment / UPI</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (pincodeStatus && !pincodeStatus.available) || !!mapUrlError}
            className="w-full bg-red-800 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-900 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
