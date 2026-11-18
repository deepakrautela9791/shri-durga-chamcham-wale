import express from 'express';
import { addOrderItems, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(addOrderItems).get(getOrders);

export default router;
