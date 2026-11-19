import express from 'express';
import { addOrderItems, getOrders, updateOrderStatus, trackOrders } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getOrders);
router.route('/track').get(trackOrders);
router.route('/:id/status').put(updateOrderStatus);

export default router;
