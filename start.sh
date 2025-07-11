#!/bin/bash

# ZoraX Application Startup Script
echo "🚀 Starting ZoraX Application..."

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Start both frontend and backend servers
echo "🔄 Starting development servers..."
npm run dev