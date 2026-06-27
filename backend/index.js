import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Local dev + Vercel production dono allow hain
// Deploy karne ke baad apna actual Vercel URL neeche add karo
app.use(cors({
  origin: [
    'http://localhost:5173',                        // local development
    'https://internship-frontend.vercel.app',       // ← apna Vercel URL yahan
    /\.vercel\.app$/,                               // sab Vercel preview URLs
  ],
  credentials: true,
}));

app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'WEbsite running' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});