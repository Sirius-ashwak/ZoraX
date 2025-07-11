#!/bin/bash

# Production start script for Render deployment
echo "🚀 Starting ZoraX in production mode..."

# Set environment
export NODE_ENV=production

# Check if frontend build exists
if [ ! -d "dist" ]; then
  echo "❌ Frontend build not found. Running build..."
  npm run build:frontend
fi

# Check if backend build exists
if [ ! -d "backend/dist" ]; then
  echo "❌ Backend build not found. Running build..."
  npm run build:backend
fi

# Start the application
echo "🌟 Starting server..."
npm run start:backend
