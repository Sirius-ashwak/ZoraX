import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import path from 'path';

// Import routes
import campaignsRouter from './routes/campaigns';
import creatorsRouter from './routes/creators';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root route - redirect to frontend
app.get('/', (_req, res) => {
  res.json({
    message: 'Zorax Cosmic Platform API',
    version: '1.0.0',
    frontend: env.FRONTEND_URL,
    endpoints: {
      health: '/api/health',
      campaigns: '/api/campaigns',
      creators: '/api/creators'
    }
  });
});

// Routes
app.use('/api/campaigns', campaignsRouter);
app.use('/api/creators', creatorsRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route not found`
  });
});

// Serve frontend static files in production
if (env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, '../../dist');
  app.use(express.static(frontendPath));
  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Start server
const server = app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`📱 Frontend URL: ${env.FRONTEND_URL}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;
