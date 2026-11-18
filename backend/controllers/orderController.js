import Order from '../models/Order.js';

// Create a new order
export const addOrderItems = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      shippingAddress,
      orderItems,
      paymentMethod,
      totalAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      customerName,
      phoneNumber,
      shippingAddress,
      orderItems,
      paymentMethod,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (For Admin Dashboard)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
