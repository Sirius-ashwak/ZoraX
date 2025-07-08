# CredVault Development Guide

Complete guide for setting up and contributing to the CredVault development environment.

## Prerequisites

### Required Software
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn 3.x)
- **Git**: Latest version
- **PostgreSQL**: 14.x or higher
- **Redis**: 6.x or higher (optional, for caching)

### Recommended Tools
- **VS Code**: With recommended extensions
- **Hardhat**: For smart contract development
- **Metamask**: For Web3 testing
- **Postman/Insomnia**: For API testing

### Hardware Requirements
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 5GB free space
- **CPU**: 4 cores recommended for optimal build performance

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/credvault.git
cd credvault
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm install

# Install backend dependencies separately (if needed)
cd backend && npm install && cd ..

# Install dev tools globally (optional)
npm install -g @hardhat/cli typescript ts-node
```

### 3. Environment Configuration

Create environment files:
```bash
# Main environment file
cp .env.example .env

# Backend environment (if separate)
cp backend/.env.example backend/.env
```

#### Frontend Environment Variables
```env
# .env
# Blockchain Configuration
VITE_OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_OPTIMISM_GOERLI_RPC_URL=https://opt-goerli.g.alchemy.com/v2/YOUR_KEY
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Addresses
VITE_CREDVAULT_CONTRACT_ADDRESS=0x...
VITE_ZORA_COIN_FACTORY_ADDRESS=0x...

# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_FRAME_BASE_URL=http://localhost:3001/frames

# Farcaster Integration
VITE_FARCASTER_HUB_URL=https://hub.farcaster.standardcrypto.vc:2281

# Analytics
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn

# Development
VITE_DEBUG_MODE=true
VITE_SHOW_DEBUG_INFO=true
```

#### Backend Environment Variables
```env
# backend/.env
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/credvault_dev
DATABASE_URL_TEST=postgresql://username:password@localhost:5432/credvault_test

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Blockchain
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
OPTIMISM_GOERLI_RPC_URL=https://opt-goerli.g.alchemy.com/v2/YOUR_KEY
DEPLOYER_PRIVATE_KEY=your_deployer_private_key_for_testnet

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

# Farcaster
FARCASTER_API_KEY=your_farcaster_api_key
FARCASTER_HUB_URL=https://hub.farcaster.standardcrypto.vc:2281

# File Storage
IPFS_API_URL=https://api.pinata.cloud
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret

# Monitoring
SENTRY_DSN=your_sentry_backend_dsn
```

### 4. Database Setup

#### PostgreSQL Installation
```bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

#### Database Initialization
```bash
# Create database
createdb credvault_dev
createdb credvault_test

# Or using SQL
psql -U postgres -c "CREATE DATABASE credvault_dev;"
psql -U postgres -c "CREATE DATABASE credvault_test;"
```

#### Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed development data
npx prisma db seed
```

### 5. Smart Contract Setup

#### Hardhat Configuration
```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start local blockchain
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

#### Contract Deployment
```javascript
// scripts/deploy.js
async function main() {
  const CredVault = await ethers.getContractFactory("CredVault");
  const credvault = await CredVault.deploy();
  
  await credvault.deployed();
  
  console.log("CredVault deployed to:", credvault.address);
  
  // Update environment variable
  process.env.VITE_CREDVAULT_CONTRACT_ADDRESS = credvault.address;
}
```

## Development Workflow

### 1. Start Development Servers

#### Option A: Full Stack Development
```bash
# Start all services
npm run dev:full

# This runs:
# - Frontend dev server (Vite)
# - Backend API server
# - Database (if using Docker)
# - Local blockchain (Hardhat)
```

#### Option B: Individual Services
```bash
# Frontend only
npm run dev

# Backend only
npm run dev:backend

# Blockchain only
npm run dev:blockchain

# Database only
npm run dev:db
```

### 2. Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/docs
- **Database Admin**: http://localhost:5555 (Prisma Studio)
- **Local Blockchain**: http://localhost:8545

### 3. Hot Reload Setup
Both frontend and backend support hot reloading:
- **Frontend**: Vite HMR automatically reloads on changes
- **Backend**: Nodemon restarts server on file changes
- **Smart Contracts**: Manual recompilation and redeployment needed

## Code Standards

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Import Organization
```typescript
// Import order
import React from 'react';                    // 1. React
import { useState, useEffect } from 'react';  // 2. React hooks
import { ethers } from 'ethers';              // 3. External libraries
import { Button } from '@/components/ui';     // 4. Internal components
import { useCredVault } from '@/hooks';       // 5. Internal hooks
import { Campaign } from '@/types';           // 6. Types
import './component.css';                     // 7. Styles
```

## Testing Strategy

### Frontend Testing

#### Unit Tests (Jest + React Testing Library)
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test CampaignCard.test.tsx
```

#### Component Testing Example
```typescript
// src/components/__tests__/CampaignCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CampaignCard } from '../CampaignCard';
import { mockCampaign } from '../../test/mocks';

describe('CampaignCard', () => {
  it('renders campaign information', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    
    expect(screen.getByText(mockCampaign.title)).toBeInTheDocument();
    expect(screen.getByText(mockCampaign.description)).toBeInTheDocument();
  });

  it('handles mint button click', () => {
    const onMint = jest.fn();
    render(<CampaignCard campaign={mockCampaign} onMint={onMint} />);
    
    fireEvent.click(screen.getByText('Mint'));
    expect(onMint).toHaveBeenCalledWith(mockCampaign.id);
  });
});
```

#### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run specific test
npm run test:e2e -- --grep "campaign creation"
```

### Backend Testing

#### API Testing
```bash
# Run backend tests
npm run test:backend

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:backend:coverage
```

#### API Test Example
```typescript
// backend/tests/campaigns.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { setupTestDB, teardownTestDB } from './helpers/database';

describe('Campaigns API', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });

  describe('POST /api/campaigns', () => {
    it('creates a new campaign', async () => {
      const campaignData = {
        title: 'Test Campaign',
        description: 'Test Description',
        price: '0.05',
        maxSupply: 1000
      };

      const response = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${testToken}`)
        .send(campaignData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(campaignData.title);
    });
  });
});
```

### Smart Contract Testing
```bash
# Run contract tests
npx hardhat test

# Run specific test file
npx hardhat test test/CredVault.test.js

# Run with gas reporting
npx hardhat test --gas-report
```

## Debugging

### Frontend Debugging

#### Browser DevTools
- Use React Developer Tools extension
- Enable Redux DevTools for state inspection
- Use console.log and debugger statements strategically

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["dev"],
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

#### Web3 Debugging
```typescript
// Enable detailed logging
const provider = new ethers.providers.JsonRpcProvider(RPC_URL, {
  name: 'optimism',
  chainId: 10,
  _defaultProvider: () => new ethers.providers.JsonRpcProvider(RPC_URL),
});

// Log all transactions
provider.on('block', (blockNumber) => {
  console.log('New block:', blockNumber);
});

// Debug contract calls
const contract = new ethers.Contract(address, abi, provider);
contract.on('*', (event) => {
  console.log('Contract event:', event);
});
```

### Backend Debugging

#### Node.js Debugging
```bash
# Debug mode
npm run dev:debug

# VS Code debugging
node --inspect-brk server.js
```

#### Database Debugging
```bash
# Prisma Studio for database inspection
npx prisma studio

# Query logging
DATABASE_URL="postgresql://...?schema=public&connection_limit=1&socket_timeout=60&log=query"
```

#### API Debugging
```typescript
// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Error handling
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ 
    success: false, 
    error: error.message 
  });
});
```

## Performance Optimization

### Frontend Performance

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Measure build performance
npm run build -- --profile
```

#### Component Optimization
```typescript
// Lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Memoization
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return processData(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});

// Virtual scrolling for large lists
import { VirtualizedList } from './components/VirtualizedList';
```

### Backend Performance

#### Database Optimization
```sql
-- Add indexes for frequent queries
CREATE INDEX idx_campaigns_creator ON campaigns(creator_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_transactions_campaign ON transactions(campaign_id);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM campaigns WHERE creator_id = $1;
```

#### Caching Strategy
```typescript
// Redis caching
const cacheKey = `campaign:${id}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

const campaign = await db.campaign.findUnique({ where: { id } });
await redis.setex(cacheKey, 3600, JSON.stringify(campaign));

return campaign;
```

## Git Workflow

### Branch Strategy
```bash
# Main branches
main        # Production-ready code
develop     # Development integration
staging     # Pre-production testing

# Feature branches
feature/campaign-analytics
feature/farcaster-frames
bugfix/mint-button-loading
hotfix/security-patch
```

### Commit Convention
```bash
# Format: <type>(<scope>): <description>
feat(campaigns): add campaign analytics dashboard
fix(auth): resolve wallet connection timeout
docs(api): update campaign endpoints documentation
test(components): add CampaignCard unit tests
refactor(hooks): optimize useCredVault performance
style(ui): update button hover states
chore(deps): update dependencies to latest versions
```

### Pull Request Process
1. Create feature branch from `develop`
2. Implement changes with tests
3. Run full test suite
4. Update documentation if needed
5. Create PR with detailed description
6. Code review and approval
7. Merge to `develop`
8. Deploy to staging for testing
9. Merge to `main` for production

## Deployment

### Development Deployment
```bash
# Build for development
npm run build:dev

# Start production server locally
npm run start
```

### Staging Deployment
```bash
# Deploy to staging
npm run deploy:staging

# Run staging tests
npm run test:staging
```

### Production Deployment
```bash
# Build optimized production bundle
npm run build:prod

# Deploy to production
npm run deploy:prod

# Monitor deployment
npm run monitor:prod
```

## Troubleshooting

### Common Issues

#### Web3 Connection Issues
```typescript
// Check network configuration
if (window.ethereum?.networkVersion !== '10') {
  throw new Error('Please switch to Optimism network');
}

// Handle connection errors
try {
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xA' }], // Optimism
  });
} catch (error) {
  console.error('Network switch failed:', error);
}
```

#### Database Connection Issues
```bash
# Check database status
pg_isready -h localhost -p 5432

# Reset database
npm run db:reset

# View logs
npm run logs:db
```

#### Build Issues
```bash
# Clear cache
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for conflicting versions
npm ls
```

### Getting Help

1. **Documentation**: Check README and docs folder
2. **Issues**: Search existing GitHub issues
3. **Discussions**: Use GitHub Discussions for questions
4. **Code Review**: Request help in PR reviews
5. **Team Chat**: Use development Slack/Discord

## VS Code Setup

### Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-eslint",
    "Prisma.prisma",
    "nomicfoundation.hardhat-solidity",
    "ms-playwright.playwright"
  ]
}
```

### Workspace Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}
```

This development guide provides everything needed to set up and contribute to CredVault effectively. Follow these guidelines to maintain code quality and development efficiency.
