import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Simple newsletter schema
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  subscribed: {
    type: Boolean,
    default: true
  },
  discountSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if already subscribed
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      if (exists.subscribed) {
        return res.status(400).json({ message: 'Already subscribed!' });
      } else {
        // Resubscribe
        exists.subscribed = true;
        await exists.save();
        return res.json({
          success: true,
          message: 'Welcome back! Check your email for discount code.',
          discountCode: 'WELCOME10'
        });
      }
    }

    // New subscriber
    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your email for 10% off.',
      discountCode: 'WELCOME10'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/newsletter - Get all subscribers (admin)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ subscribed: true });
    res.json({ success: true, count: subscribers.length, subscribers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
