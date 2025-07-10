#!/bin/bash

echo "🌌 Starting Zorax Cosmic Platform..."

# Kill any existing processes
pkill -f "vite" > /dev/null 2>&1 || true
pkill -f "tsx" > /dev/null 2>&1 || true
sleep 1

# Start both servers concurrently
npm run dev