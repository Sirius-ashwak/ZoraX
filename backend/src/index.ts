import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic campaigns endpoint
app.get('/api/campaigns', (req, res) => {
  res.json({
    success: true,
    campaigns: []
  });
});

// Basic profiles endpoint
app.get('/api/profiles/:address', (req, res) => {
  const { address } = req.params;
  res.json({
    success: true,
    profile: {
      address,
      name: 'Anonymous Creator',
      bio: 'Building the future of Web3',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${address}`,
      metrics: {
        totalContracts: 0,
        totalMints: 0,
        totalVolume: { eth: '0', usd: '0' },
        uniqueSupporters: 0,
        averageMintPrice: '0',
        firstCampaignDate: new Date(),
        successfulCampaigns: 0,
        activeContracts: 0,
      }
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

export default app;