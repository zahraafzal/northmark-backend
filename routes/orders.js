import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST /api/orders - Create new order (Guest checkout allowed)
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // Populate product details
    await order.populate("items.product", "name images");

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/orders - Get all orders (admin) or user orders
router.get("/", protect, async (req, res) => {
  try {
    let query = {};

    // If not admin, only show user's orders
    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    const orders = await Order.find(query)
      .populate("items.product", "name images")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id - Get single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name images",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (admin)
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, trackingNumber },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ success: true, message: "Order updated", order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/orders/track/:orderNumber - Track order by order number
router.get("/track/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt,
        total: order.total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
