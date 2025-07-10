#!/bin/bash

# ZoraX Development Workflow
echo "Starting ZoraX Development Environment..."

# Kill any existing processes
pkill -f "vite" 2>/dev/null || true
pkill -f "tsx" 2>/dev/null || true

# Start backend server
echo "Starting backend server on port 3001..."
cd backend && npx tsx src/index.ts &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server on port 5173..."
cd .. && npx vite --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

# Wait for servers to start
sleep 3

echo "✓ Backend running (PID: $BACKEND_PID)"
echo "✓ Frontend running (PID: $FRONTEND_PID)"
echo "✓ Application available at: http://localhost:5173"
echo "✓ API available at: http://localhost:3001"

# Keep script running
wait