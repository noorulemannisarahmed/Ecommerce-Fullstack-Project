import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();
console.log('1. Env loaded');
console.log('2. MONGO_URI:', process.env.MONGO_URI);

const seedProducts = async () => {
  try {
    console.log('3. Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('4. Mongo data bse connected');

    await Product.deleteMany({});
    console.log('5. Old products cleared');

    const sampleProducts = [
      {
        name: 'Test Product',
        price: 999,
        image: 'https://via.placeholder.com/300',
        description: 'Test',
        category: 'Test',
        stock: 10,
      }
    ];

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`6. ${inserted.length} products added!`);

    await mongoose.connection.close();
    console.log('7. Done!');
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
};

seedProducts()