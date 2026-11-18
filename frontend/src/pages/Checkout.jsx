import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '', phoneNumber: '',
    googleMapsLink: '', pincode: '', cityVillage: '', district: '', state: '',
    postOffice: '', tehsil: '', houseNo: '', street: '', landmark: ''
  });
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceablePincodes = ['202124', '202123', '202125', '202001', '202002'];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (formData.pincode.length !== 6) {
      alert('Please enter a valid 6-digit PIN code.');
      return;
    }
    if (serviceablePincodes.includes(formData.pincode)) {
      setDeliveryStatus('available');
    } else {
      setDeliveryStatus('unavailable');
    }
  };

  const placeOrder = async () => {
    if (!formData.customerName || !formData.phoneNumber || !formData.googleMapsLink) {
      alert('Please fill all mandatory fields (*)');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const orderData = {
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
        orderItems: cart,
        paymentMethod: paymentMethod,
        totalAmount: getCartTotal()
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Order placed successfully! Your Order ID is ${data._id}`);
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Something went wrong! Please make sure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-maroon text-center mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Address</h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                <input type="text" name="customerName" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" placeholder="Enter your full name" required />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Phone Number *</label>
                <input type="tel" name="phoneNumber" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" placeholder="10-digit mobile number" required />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Google Maps Location Link *</label>
                <input type="text" name="googleMapsLink" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" placeholder="Paste your map link here" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">PIN Code *</label>
                <input type="text" name="pincode" onChange={handleInputChange} maxLength="6" className="w-full border rounded p-2 focus:ring-brand-gold" placeholder="6-digit PIN" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Village / City Name *</label>
                <input type="text" name="cityVillage" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">District *</label>
                <input type="text" name="district" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">State *</label>
                <input type="text" name="state" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" required />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Post Office (Optional)</label>
                <input type="text" name="postOffice" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Tehsil / Block (Optional)</label>
                <input type="text" name="tehsil" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">House Number (Optional)</label>
                <input type="text" name="houseNo" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" placeholder="Leave empty for village" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Street / Mohalla (Optional)</label>
                <input type="text" name="street" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Landmark (Optional)</label>
                <input type="text" name="landmark" onChange={handleInputChange} className="w-full border rounded p-2 focus:ring-brand-gold" />
              </div>
            </div>
            <button onClick={checkDelivery} className="bg-gray-800 text-white font-bold py-3 px-6 rounded-md hover:bg-gray-900 w-full mb-4">
              Check Delivery Availability
            </button>
          </form>

          {deliveryStatus === 'available' && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded flex items-center gap-3">
              <FaCheckCircle className="text-xl" />
              <p className="font-bold">Great! Delivery is available at your location.</p>
            </div>
          )}
          {deliveryStatus === 'unavailable' && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
              <div className="flex items-center gap-3 mb-2">
                <FaTimesCircle className="text-xl" />
                <p className="font-bold">Sorry! Delivery service is not available at your location.</p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-brand-maroon mb-4">Order Summary</h2>
            <div className="border-b pb-4 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-2">
                  <span>{item.qty}x {item.name} ({item.weight})</span>
                  <span className="font-bold">₹{item.price}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>₹{getCartTotal()}</span>
            </div>
          </div>

          {deliveryStatus === 'available' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-brand-maroon mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-brand-maroon" />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={(e) => setPaymentMethod(e.target.value)} className="text-brand-maroon" />
                  <span>Online UPI / Card</span>
                </label>
              </div>
              <button onClick={placeOrder} disabled={isSubmitting} className="bg-brand-maroon text-brand-gold font-bold py-3 px-6 rounded-md hover:bg-red-800 w-full text-lg shadow-lg disabled:opacity-50">
                {isSubmitting ? 'Placing Order...' : `Place Order (₹${getCartTotal()})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Checkout;
