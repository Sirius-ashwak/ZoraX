#!/bin/bash

# ZoraX Deployment Script
echo "🚀 Starting ZoraX deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker found. Building container..."
    docker build -t zorax-app:latest .
    
    echo "🎯 Starting application with Docker..."
    docker-compose up -d
    
    echo "✅ ZoraX deployed successfully!"
    echo "🌐 Application: http://localhost"
    echo "📊 API: http://localhost/api"
else
    echo "⚠️ Docker not found. Starting production server..."
    npm run start
fi