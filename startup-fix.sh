#!/bin/bash

echo "========================================"
echo "ZoraX Application Startup Fix Script"
echo "========================================"
echo

echo "Step 1: Cleaning up previous installations..."
rm -rf node_modules backend/node_modules backend/dist
rm -f package-lock.json backend/package-lock.json
echo "Cleanup completed."
echo

echo "Step 2: Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Root npm install failed!"
    exit 1
fi
echo "Root dependencies installed successfully."
echo

echo "Step 3: Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Backend npm install failed!"
    exit 1
fi
echo "Backend dependencies installed successfully."
echo

echo "Step 4: Building backend..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Backend build failed!"
    echo "This might be due to TypeScript errors."
    exit 1
fi
echo "Backend built successfully."
cd ..
echo

echo "Step 5: Starting the application..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend will be available at: http://localhost:3001"
echo
echo "Press Ctrl+C to stop the servers when done."
echo
npm run dev
