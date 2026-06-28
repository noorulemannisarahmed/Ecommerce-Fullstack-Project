import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    await Product.deleteMany({});
    console.log('Cleared old products');

    const makeupProducts = [
      {
        name: 'Matte Lipstick - Ruby Red',
        price: 1299,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 1299 },
          { minQty: 10, maxQty: 49,   price: 1099 },
          { minQty: 50, maxQty: null, price: 899  },
        ],
        image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2f9a?w=600&h=600&fit=crop',
        description: 'Long-lasting matte lipstick in bold ruby red. Smooth formula, full coverage, stays up to 12 hours without touch-ups.',
        category: 'Lips',
        stock: 120,
      },
      {
        name: 'Hydrating Foundation SPF 30',
        price: 2499,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 2499 },
          { minQty: 10, maxQty: 49,   price: 2199 },
          { minQty: 50, maxQty: null, price: 1899 },
        ],
        image: 'https://images.unsplash.com/photo-1631214524020-3c69b2232f90?w=600&h=600&fit=crop',
        description: 'Lightweight liquid foundation with SPF 30 protection. Gives a dewy, natural finish while keeping skin hydrated all day.',
        category: 'Face',
        stock: 85,
      },
      {
        name: 'Volumizing Mascara - Blackest Black',
        price: 999,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 999 },
          { minQty: 10, maxQty: 49,   price: 849 },
          { minQty: 50, maxQty: null, price: 699 },
        ],
        image: 'https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=600&h=600&fit=crop',
        description: 'Dramatic volumizing mascara that lifts and separates every lash. Waterproof formula for smudge-free wear.',
        category: 'Eyes',
        stock: 200,
      },
      {
        name: 'Pressed Powder Blush - Peach Glow',
        price: 1599,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 1599 },
          { minQty: 10, maxQty: 49,   price: 1399 },
          { minQty: 50, maxQty: null, price: 1199 },
        ],
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
        description: 'Silky pressed blush in a warm peach tone. Buildable color that blends effortlessly for a natural, flushed look.',
        category: 'Face',
        stock: 95,
      },
      {
        name: 'Eyeshadow Palette - Nude & Smoky',
        price: 3499,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 3499 },
          { minQty: 10, maxQty: 49,   price: 3099 },
          { minQty: 50, maxQty: null, price: 2699 },
        ],
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
        description: '12-shade eyeshadow palette with matte and shimmer finishes. Perfect for everyday nude looks or bold smoky eyes.',
        category: 'Eyes',
        stock: 60,
      },
      {
        name: 'Setting Spray - 24HR Hold',
        price: 1799,
        bulkPrices: [
          { minQty: 1,  maxQty: 9,    price: 1799 },
          { minQty: 10, maxQty: 49,   price: 1549 },
          { minQty: 50, maxQty: null, price: 1299 },
        ],
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop',
        description: 'Makeup setting spray that locks your look in place for up to 24 hours. Lightweight, non-sticky mist with a refreshing finish.',
        category: 'Face',
        stock: 150,
      },
    ];

    const inserted = await Product.insertMany(makeupProducts);
    console.log(`✅ ${inserted.length} makeup products added!`);

    mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedProducts();