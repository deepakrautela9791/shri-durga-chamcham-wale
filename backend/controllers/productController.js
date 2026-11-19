import Product from '../models/Product.js';

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, pricePerKg, inStock, category, image } = req.body;
    const product = new Product({
      name,
      description,
      pricePerKg,
      inStock: inStock !== undefined ? inStock : true,
      category,
      image
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { name, description, pricePerKg, inStock, category, image } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      if (name !== undefined) product.name = name;
      if (description !== undefined) product.description = description;
      if (pricePerKg !== undefined) product.pricePerKg = pricePerKg;
      if (inStock !== undefined) product.inStock = inStock;
      if (category !== undefined) product.category = category;
      if (image !== undefined) product.image = image;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
