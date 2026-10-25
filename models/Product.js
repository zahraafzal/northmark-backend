import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  comparePrice: Number,
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  category: {
    type: String,
    enum: [
      "t-shirts",
      "hoodies",
      "crewnecks",
      "pants",
      "shorts",
      "hats",
      "accessories",
    ],
    required: true,
  },
  audience: {
    type: String,
    enum: ["men", "women", "unisex"],
    default: "unisex",
  },
  collection: String,
  variants: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      },
      color: String,
      colorHex: String,
      stock: {
        type: Number,
        default: 0,
      },
    },
  ],
  fabric: String,
  care: String,
  sizeGuide: [
    {
      size: String,
      chest: String,
      length: String,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: Boolean,
  isNew: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto slug
productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.model("Product", productSchema);
