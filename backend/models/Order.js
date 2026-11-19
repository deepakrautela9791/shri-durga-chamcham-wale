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
  items: [
    {
      name: { type: String, required: true },
      weight: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Pending' },
  paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
