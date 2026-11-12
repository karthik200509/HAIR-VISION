const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Explicitly load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '.env') });

const { connectDB, getDBStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const hairstyleRoutes = require('./routes/hairstyleRoutes');
const routineRoutes = require('./routes/routineRoutes');

// Initialize database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allow frontend client requests
  credentials: true,
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve uploaded image assets statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// System Health & Diagnostics endpoint
app.get('/api/health', (req, res) => {
  const dbInfo = getDBStatus();
  const geminiConfigured = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 10
  );

  res.json({
    status: 'healthy',
    application: 'HairVision API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbInfo,
    aiVision: {
      provider: geminiConfigured ? 'Google Gemini Vision AI' : 'Demo Mode (Intelligent Heuristic Simulator)',
      geminiKeyConfigured: geminiConfigured,
      demoModeActive: !geminiConfigured,
      note: geminiConfigured
        ? 'Live Gemini AI vision enabled'
        : 'Demo simulation mode enabled. Add GEMINI_API_KEY in .env for live AI.',
    },
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/hairstyles', hairstyleRoutes);
app.use('/api/routine', routineRoutes);

// Root greeting endpoint
app.get('/', (req, res) => {
  res.send('HairVision AI Backend is operating smoothly.');
});

// Centralized error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  HairVision Server listening on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Uploads Path: http://localhost:${PORT}/uploads/`);
  console.log(`=================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

module.exports = app;
