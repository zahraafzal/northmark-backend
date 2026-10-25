# 🚀 NORTHMARK Backend - Node.js

Full-featured e-commerce backend built with Node.js, Express, and MongoDB.

## ✨ Features

- ✅ User Authentication (JWT)
- ✅ Products Management (CRUD)
- ✅ Orders System (COD)
- ✅ Reviews & Ratings
- ✅ Newsletter Subscriptions
- ✅ Cart Management
- ✅ Multi-variant Products (Size, Color)
- ✅ Inventory Tracking
- ✅ Order Tracking
- ✅ Security (Helmet, Rate Limiting)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend-node
npm install
```

### 2. Setup Environment

Copy `.env` file and add your MongoDB URI (already configured)

### 3. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on: **http://localhost:5000**

## 📋 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (user's or all if admin)
- `GET /api/orders/:id` - Get single order
- `GET /api/orders/track/:orderNumber` - Track order
- `PUT /api/orders/:id/status` - Update order status (admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review (requires login)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers

## 🔐 Authentication

Use JWT token in headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📦 Product Data Model

```javascript
{
  name: "Premium Black Tee",
  price: 45,
  images: [{ url: "...", alt: "..." }],
  category: "t-shirts",
  audience: "men",
  variants: [
    { size: "M", color: "Black", stock: 10 }
  ]
}
```

## 🎯 Order Flow

1. Customer browses products
2. Adds to cart (frontend state)
3. Fills shipping info
4. Submits order via `POST /api/orders`
5. Order gets unique order number (e.g., NM001001)
6. Status tracking available

## 🔥 Payment

- Currently: **Cash on Delivery (COD)** only
- No payment gateway integration needed
- Simple order confirmation

## 📝 Notes

- MongoDB Atlas connection already configured
- CORS enabled for frontend
- Rate limiting: 100 requests per 15 minutes
- All passwords hashed with bcrypt
- JWT expires in 30 days

## 🚀 Deployment

Can deploy to:
- **Render.com** (Free tier available)
- **Railway.app**
- **Heroku**
- **DigitalOcean**

---

Made with ❤️ by Zahra Afzal
