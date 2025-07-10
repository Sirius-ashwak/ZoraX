#!/usr/bin/env node

/**
 * ZoraX Production Server Startup
 * Handles both frontend and backend in production
 */

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// API routes - proxy to backend
app.use('/api', (req, res) => {
  // In production, the backend runs on the same server
  const backendUrl = `http://localhost:${PORT}${req.originalUrl}`;
  
  // Forward the request to backend
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: req.originalUrl,
    method: req.method,
    headers: req.headers
  };
  
  const proxy = require('http').request(options, (backendRes) => {
    res.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(res);
  });
  
  req.pipe(proxy);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start backend server
const backend = spawn('node', ['backend/dist/index.js'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: PORT }
});

// Start frontend server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ZoraX running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  backend.kill('SIGTERM');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  backend.kill('SIGINT');
  process.exit(0);
});