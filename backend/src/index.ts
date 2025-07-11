import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { env } from './config/env';

// Import routes
import campaignsRouter from './routes/campaigns';
import creatorsRouter from './routes/creators';
import monitoringRouter from './routes/monitoring';

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.github.com", "wss:", "https:"],
    },
  },
}));
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the frontend build (for production)
if (env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../dist');
  app.use(express.static(frontendPath));
  console.log(`📁 Serving static files from: ${frontendPath}`);
}

// Routes
app.use('/api/campaigns', campaignsRouter);
app.use('/api/creators', creatorsRouter);
app.use('/api', monitoringRouter);

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

// 404 handler - serve React app for client-side routing
app.use('*', (req, res) => {
  if (env.NODE_ENV === 'production' && req.accepts('html')) {
    const indexPath = path.join(__dirname, '../../dist/index.html');
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      error: 'Not found',
      message: `Route ${req.originalUrl} not found`
    });
  }
});

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
