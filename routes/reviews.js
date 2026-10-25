import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/reviews/product/:productId - Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reviews - Create a review (requires login)
router.post('/', protect, async (req, res) => {
  try {
    const { product, rating, title, comment } = req.body;

    // Check if already reviewed
    const exists = await Review.findOne({ product, user: req.user.id });
    if (exists) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await Review.create({
      product,
      user: req.user.id,
      rating,
      title,
      comment
    });

    // Update product rating
    const reviews = await Review.find({ product });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    
    await Product.findByIdAndUpdate(product, {
      rating: avgRating,
      numReviews: reviews.length
    });

    res.status(201).json({ success: true, message: 'Review added', review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
