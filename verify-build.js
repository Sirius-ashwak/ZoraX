#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔧 ZoraX Build & Test Verification');
console.log('===================================');

const projectRoot = process.cwd();
console.log(`Project root: ${projectRoot}`);

// Check if key files exist
const keyFiles = [
  'package.json',
  'tsconfig.json', 
  'jest.config.cjs',
  'src/test/setup.ts',
  'src/test/jest.test.ts'
];

console.log('\n📁 Checking key files...');
keyFiles.forEach(file => {
  const exists = fs.existsSync(path.join(projectRoot, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check TypeScript compilation
console.log('\n🔍 TypeScript compilation check...');
try {
  execSync('npx tsc --noEmit', { 
    stdio: 'pipe',
    cwd: projectRoot 
  });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation failed:');
  console.log(error.stdout?.toString() || error.stderr?.toString() || error.message);
}

// Check Jest configuration
console.log('\n🧪 Jest configuration check...');
try {
  execSync('npx jest --passWithNoTests --verbose', { 
    stdio: 'pipe',
    cwd: projectRoot 
  });
  console.log('✅ Jest configuration successful');
} catch (error) {
  console.log('❌ Jest configuration failed:');
  console.log(error.stdout?.toString() || error.stderr?.toString() || error.message);
}

// Check Vite build
console.log('\n🏗️ Vite build check...');
try {
  execSync('npx vite build', { 
    stdio: 'pipe',
    cwd: projectRoot 
  });
  console.log('✅ Vite build successful');
} catch (error) {
  console.log('❌ Vite build failed:');
  console.log(error.stdout?.toString() || error.stderr?.toString() || error.message);
}

console.log('\n✨ Verification complete!');
