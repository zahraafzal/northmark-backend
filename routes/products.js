import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { category, audience, collection, sort, limit } = req.query;
    
    let query = {};
    if (category) query.category = category;
    if (audience) query.audience = audience;
    if (collection) query.collection = collection;

    let products = Product.find(query);
    
    if (sort === 'price_low') products = products.sort({ price: 1 });
    if (sort === 'price_high') products = products.sort({ price: -1 });
    if (sort === 'newest') products = products.sort({ createdAt: -1 });
    if (sort === 'rating') products = products.sort({ rating: -1 });
    
    if (limit) products = products.limit(parseInt(limit));

    const result = await products;
    res.json({ success: true, count: result.length, products: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products - Create product (admin only - can add auth later)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
