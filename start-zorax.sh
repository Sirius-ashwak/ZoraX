#!/bin/bash
# ZoraX Application Startup Script for Replit

echo "🚀 Starting ZoraX Application..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Start the application
echo "▶️ Starting development servers..."
npm run dev