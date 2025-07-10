#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🌌 Starting Zorax Cosmic Platform...');

// Start frontend
const frontend = spawn('npx', ['vite', '--port', '5173', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Start backend
const backend = spawn('npx', ['tsx', 'src/index.ts'], {
  stdio: 'inherit',
  cwd: path.join(process.cwd(), 'backend')
});

console.log('🚀 Frontend starting on port 5173');
console.log('⚡ Backend starting on port 3001');
console.log('✨ Cosmic platform ready!');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🌙 Shutting down cosmic platform...');
  frontend.kill();
  backend.kill();
  process.exit(0);
});

frontend.on('error', (err) => console.error('Frontend error:', err));
backend.on('error', (err) => console.error('Backend error:', err));