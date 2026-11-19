import express from 'express';
import {
  getDeliveryAreas,
  createDeliveryArea,
  updateDeliveryArea,
  deleteDeliveryArea
} from '../controllers/deliveryAreaController.js';

const router = express.Router();

router.route('/')
  .get(getDeliveryAreas)
  .post(createDeliveryArea);

router.route('/:id')
  .put(updateDeliveryArea)
  .delete(deleteDeliveryArea);

export default router;
