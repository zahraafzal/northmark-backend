import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('📦 Database:', db.databaseName);
    console.log('📊 Total Collections:', collections.length);
    console.log('━'.repeat(50));

    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      console.log(`\n📁 ${collectionName}`);
      console.log(`   Documents: ${count}`);

      if (count > 0 && count <= 10) {
        const docs = await db.collection(collectionName).find({}).limit(3).toArray();
        console.log(`   Sample data:`);
        docs.forEach((doc, i) => {
          const preview = JSON.stringify(doc, null, 2).substring(0, 200);
          console.log(`   ${i + 1}. ${preview}...`);
        });
      }
    }

    console.log('\n' + '━'.repeat(50));
    console.log('✅ Database check complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
