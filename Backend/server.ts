import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Import routes
import authRoutes from './src/routes/auth.js';
import walletRoutes from './src/routes/walletRoutes.js';
import transactionRoutes from './src/routes/transactionRoutes.js';
import alertRoutes from './src/routes/alertRoutes.js';

dotenv.config({ path: './.env' });
console.log("MONGO_URL:", process.env.MONGO_URL);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/alerts", alertRoutes);

app.get('/', (req, res) => {
  res.send('Web 3 Terminal Backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
