import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CredVault Backend API',
    version: '0.1.0'
  });
});

// Detailed health check
router.get('/detailed', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CredVault Backend API',
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      database: 'pending', // Will be updated in later tasks
      blockchain: 'pending', // Will be updated in later tasks
      external_apis: 'pending' // Will be updated in later tasks
    }
  });
});

export { router as healthRoutes };
