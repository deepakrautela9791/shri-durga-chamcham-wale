import DeliveryArea from '../models/DeliveryArea.js';

// GET /api/delivery-areas
export const getDeliveryAreas = async (req, res) => {
  try {
    const areas = await DeliveryArea.find({}).sort({ createdAt: -1 });
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/delivery-areas
export const createDeliveryArea = async (req, res) => {
  try {
    const { pincode, areaName, isActive } = req.body;
    const existingArea = await DeliveryArea.findOne({ pincode });
    if (existingArea) {
      return res.status(400).json({ message: 'Pincode already exists' });
    }
    const area = new DeliveryArea({
      pincode,
      areaName,
      isActive: isActive !== undefined ? isActive : true
    });
    const createdArea = await area.save();
    res.status(201).json(createdArea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/delivery-areas/:id
export const updateDeliveryArea = async (req, res) => {
  try {
    const { pincode, areaName, isActive } = req.body;
    const area = await DeliveryArea.findById(req.params.id);
    if (area) {
      if (pincode !== undefined) area.pincode = pincode;
      if (areaName !== undefined) area.areaName = areaName;
      if (isActive !== undefined) area.isActive = isActive;
      const updatedArea = await area.save();
      res.json(updatedArea);
    } else {
      res.status(404).json({ message: 'Delivery area not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/delivery-areas/:id
export const deleteDeliveryArea = async (req, res) => {
  try {
    const area = await DeliveryArea.findById(req.params.id);
    if (area) {
      await DeliveryArea.deleteOne({ _id: req.params.id });
      res.json({ message: 'Delivery area removed' });
    } else {
      res.status(404).json({ message: 'Delivery area not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
