#!/bin/bash

echo "🌌 Starting Zorax Cosmic Platform..."

# Start backend
cd backend && npm start &
BACKEND_PID=$!

# Start frontend  
cd .. && npx vite --port 5173 --host 0.0.0.0 &
FRONTEND_PID=$!

echo "🚀 Backend running on port 3001 (PID: $BACKEND_PID)"
echo "✨ Frontend running on port 5173 (PID: $FRONTEND_PID)"
echo "🌟 Cosmic platform ready at http://localhost:5173"

# Keep script running
wait