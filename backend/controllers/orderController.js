import Order from '../models/Order.js';
import mongoose from 'mongoose';

// Create a new order
export const addOrderItems = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      shippingAddress,
      orderItems,
      paymentMethod,
      paymentStatus,
      totalAmount
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      customerName,
      phoneNumber,
      shippingAddress,
      items: orderItems,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentStatus || 'Pending',
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (for Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track orders by Order ID or Phone Number
export const trackOrders = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const cleanQuery = query.trim();
    let filter = {};

    if (mongoose.Types.ObjectId.isValid(cleanQuery)) {
      filter = { _id: cleanQuery };
    } else {
      const allOrders = await Order.find({}).sort({ createdAt: -1 });
      const matchedOrders = allOrders.filter(order => {
        const orderIdStr = order._id.toString();
        const phone = order.phoneNumber || '';
        return (
          phone.includes(cleanQuery) ||
          orderIdStr.includes(cleanQuery) ||
          orderIdStr.endsWith(cleanQuery) ||
          orderIdStr.startsWith(cleanQuery)
        );
      });
      return res.json(matchedOrders);
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
