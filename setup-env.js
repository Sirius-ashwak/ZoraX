const fs = require('fs');
const path = require('path');

console.log('🔧 ZoraX Environment Setup');
console.log('==========================\n');

// Default environment variables
const rootEnvContent = `# ZoraX Frontend Environment Variables
# Get your WalletConnect Project ID from: https://cloud.walletconnect.com/
VITE_WALLET_CONNECT_PROJECT_ID=bc8552ee128eb75bef290f9ed41f7f41

# Optimism RPC URLs (you can use these defaults or get your own from Alchemy/Infura)
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io

# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_ZORA_API_BASE_URL=https://api.zora.co

# Optional: Analytics and monitoring
# VITE_ANALYTICS_ID=your_analytics_id
`;

const backendEnvContent = `# ZoraX Backend Environment Variables
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173

# Blockchain Configuration
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io

# Security (change in production)
JWT_SECRET=your-development-jwt-secret-change-in-production

# Optional: API Keys and Database
# ZORA_API_KEY=your_zora_api_key
# DATABASE_URL=postgresql://user:password@localhost:5432/zorax
`;

// Check and create root .env file
const rootEnvPath = path.join(__dirname, '.env');
if (!fs.existsSync(rootEnvPath)) {
    fs.writeFileSync(rootEnvPath, rootEnvContent);
    console.log('✅ Created root .env file');
} else {
    console.log('ℹ️  Root .env file already exists');
}

// Check and create backend .env file
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
    // Ensure backend directory exists
    const backendDir = path.join(__dirname, 'backend');
    if (!fs.existsSync(backendDir)) {
        fs.mkdirSync(backendDir, { recursive: true });
    }
    
    fs.writeFileSync(backendEnvPath, backendEnvContent);
    console.log('✅ Created backend .env file');
} else {
    console.log('ℹ️  Backend .env file already exists');
}

console.log('\n📋 Environment Setup Complete!');
console.log('\n🔗 Next Steps:');
console.log('1. Get a WalletConnect Project ID from: https://cloud.walletconnect.com/');
console.log('2. Update VITE_WALLET_CONNECT_PROJECT_ID in .env file');
console.log('3. (Optional) Get RPC URLs from Alchemy or Infura for better performance');
console.log('4. Run: npm run dev');

console.log('\n🚀 Quick Start:');
console.log('   npm run dev');
console.log('\n📖 For troubleshooting, see: STARTUP_TROUBLESHOOTING_GUIDE.md');
