import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const showAllData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n✅ Connected to MongoDB Atlas\n');
    console.log('='.repeat(60));

    const db = mongoose.connection.db;

    // Products
    console.log('\n📦 PRODUCTS:');
    console.log('-'.repeat(60));
    const products = await db.collection('products').find({}).toArray();
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - $${p.price}`);
      console.log(`   Category: ${p.category || 'N/A'}`);
      console.log(`   ID: ${p._id}`);
    });
    console.log(`\nTotal Products: ${products.length}`);

    // Orders
    console.log('\n\n📋 ORDERS:');
    console.log('-'.repeat(60));
    const orders = await db.collection('orders').find({}).toArray();
    orders.forEach((o, i) => {
      console.log(`${i + 1}. ${o.name} - ${o.phone}`);
      console.log(`   Address: ${o.address}`);
      console.log(`   Items: ${o.items?.length || 0} item(s)`);
      console.log(`   Total: $${o.total || 'N/A'}`);
      console.log(`   Order ID: ${o._id}`);
      console.log();
    });
    console.log(`Total Orders: ${orders.length}`);

    // Users
    console.log('\n\n👤 USERS:');
    console.log('-'.repeat(60));
    const users = await db.collection('users').find({}).toArray();
    if (users.length === 0) {
      console.log('No users registered yet.');
    } else {
      users.forEach((u, i) => {
        console.log(`${i + 1}. ${u.name} - ${u.email}`);
      });
    }
    console.log(`Total Users: ${users.length}`);

    // Reviews
    console.log('\n\n⭐ REVIEWS:');
    console.log('-'.repeat(60));
    const reviews = await db.collection('reviews').find({}).toArray();
    if (reviews.length === 0) {
      console.log('No reviews yet.');
    }
    console.log(`Total Reviews: ${reviews.length}`);

    // Newsletter
    console.log('\n\n📧 NEWSLETTER SUBSCRIBERS:');
    console.log('-'.repeat(60));
    const subscribers = await db.collection('newsletters').find({}).toArray();
    if (subscribers.length === 0) {
      console.log('No subscribers yet.');
    } else {
      subscribers.forEach((s, i) => {
        console.log(`${i + 1}. ${s.email}`);
      });
    }
    console.log(`Total Subscribers: ${subscribers.length}`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ All data fetched successfully!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

showAllData();
