import mongoose from 'mongoose';

const deliveryAreaSchema = new mongoose.Schema({
  pincode: { type: String, required: true, unique: true },
  areaName: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const DeliveryArea = mongoose.model('DeliveryArea', deliveryAreaSchema);
export default DeliveryArea;
