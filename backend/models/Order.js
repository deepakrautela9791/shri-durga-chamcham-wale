import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shippingAddress: {
    googleMapsLink: { type: String, required: true },
    pincode: { type: String, required: true },
    cityVillage: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    postOffice: String,
    tehsil: String,
    houseNo: String,
    street: String,
    landmark: String
  },
  orderItems: [{
    name: { type: String, required: true },
    weight: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
