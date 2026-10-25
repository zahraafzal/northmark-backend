import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zip: String,
    country: { type: String, default: "Pakistan" },
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      image: String,
      size: String,
      color: String,
      quantity: Number,
      price: Number,
    },
  ],
  subtotal: Number,
  shippingCost: {
    type: Number,
    default: 0,
  },
  discount: {
    code: String,
    amount: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "bank_transfer"],
    default: "cod",
  },
  status: {
    type: String,
    enum: ["received", "processing", "shipped", "delivered", "cancelled"],
    default: "received",
  },
  trackingNumber: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto generate order number
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `NM${String(count + 1001).padStart(6, "0")}`;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
