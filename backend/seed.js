import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Cleared old products');

    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        price: 4999,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 4999 },
          { minQty: 10, maxQty: 49, price: 4499 },
          { minQty: 50, maxQty: null, price: 3999 },
        ],
        image: 'https://via.placeholder.com/300x300?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        category: 'Electronics',
        stock: 50,
      },
      {
        name: 'Laptop Stand',
        price: 1999,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 1999 },
          { minQty: 10, maxQty: 49, price: 1799 },
          { minQty: 50, maxQty: null, price: 1599 },
        ],
        image: 'https://via.placeholder.com/300x300?text=Laptop+Stand',
        description: 'Adjustable aluminum laptop stand for better posture',
        category: 'Accessories',
        stock: 75,
      },
      {
        name: 'USB-C Cable',
        price: 499,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 499 },
          { minQty: 10, maxQty: 49, price: 449 },
          { minQty: 50, maxQty: null, price: 399 },
        ],
        image: 'https://via.placeholder.com/300x300?text=USB+Cable',
        description: 'Durable USB-C charging cable, 2 meters long',
        category: 'Cables',
        stock: 200,
      },
      {
        name: 'Mechanical Keyboard',
        price: 7999,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 7999 },
          { minQty: 10, maxQty: 49, price: 7199 },
          { minQty: 50, maxQty: null, price: 6399 },
        ],
        image: 'https://via.placeholder.com/300x300?text=Keyboard',
        description: 'RGB Mechanical Keyboard with custom switches',
        category: 'Electronics',
        stock: 40,
      },
      {
        name: 'Wireless Mouse',
        price: 2499,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 2499 },
          { minQty: 10, maxQty: 49, price: 2249 },
          { minQty: 50, maxQty: null, price: 1999 },
        ],
        image: 'https://via.placeholder.com/300x300?text=Mouse',
        description: 'Ergonomic wireless mouse with precision tracking',
        category: 'Electronics',
        stock: 100,
      },
      {
        name: 'Phone Case',
        price: 799,
        bulkPrices: [
          { minQty: 1, maxQty: 9, price: 799 },
          { minQty: 10, maxQty: 49, price: 699 },
          { minQty: 50, maxQty: null, price: 599 },
        ],
        image: 'https://via.placeholder.com/300x300?text=Phone+Case',
        description: 'Protective phone case with shock absorption',
        category: 'Accessories',
        stock: 150,
      },
    ];

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ ${inserted.length} products added to database!`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();