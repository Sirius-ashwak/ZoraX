#!/bin/bash

echo "🚀 Starting ZoraX Development Servers..."

# Kill any existing processes
pkill -f "tsx server/index.ts" 2>/dev/null
pkill -f "vite" 2>/dev/null

# Wait a moment for processes to stop
sleep 2

# Start backend server
echo "📡 Starting backend server on port 3001..."
NODE_ENV=development npx tsx server/index.ts &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend server  
echo "🎨 Starting frontend server on port 5173..."
npx vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

# Wait for both servers to start
sleep 5

echo "🌟 Both servers should now be running:"
echo "   Backend:  http://localhost:3001/health"
echo "   Frontend: http://localhost:5173"

# Test backend health
echo "🔍 Testing backend health..."
curl -s http://localhost:3001/health || echo "❌ Backend not responding"

echo "✅ ZoraX development environment ready!"
echo "💡 Use Ctrl+C to stop both servers"

# Keep script running
wait