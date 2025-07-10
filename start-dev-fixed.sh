#!/bin/bash

# Start development servers with proper host configuration for Replit
echo "🚀 Starting Zorax Cosmic Platform Development Servers..."

# Kill any existing processes on these ports
pkill -f "vite" 2>/dev/null || true
pkill -f "backend" 2>/dev/null || true

# Start backend
echo "📡 Starting backend server on port 3001..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend with proper host configuration
echo "🌟 Starting frontend with cosmic glassmorphism on port 5173..."
cd ..
npx vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

# Wait for user interrupt
echo "✨ Cosmic platform is starting up..."
echo "🌐 Frontend: http://localhost:5173"
echo "📡 Backend: http://localhost:3001"
echo "🛑 Press Ctrl+C to stop all servers"

# Wait for processes
wait $FRONTEND_PID $BACKEND_PID