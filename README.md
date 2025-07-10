# ZoraX - Web3 Creator Economy Platform

**A revolutionary Web3 platform connecting creators and supporters through transparent reputation systems and seamless blockchain interactions on Optimism.**

[![Deploy to Render](https://img.shields.io/badge/Deploy%20to-Render-46E3B7.svg)](https://render.com)
[![Deploy to Vercel](https://img.shields.io/badge/Deploy%20to-Vercel-000000.svg)](https://vercel.com)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7.svg)](https://netlify.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🌟 Overview

ZoraX transforms how creators and supporters interact by introducing a transparent reputation system built on Zora's infrastructure. Creators can launch campaigns, supporters can mint tokens, and everyone benefits from a trust-based ecosystem that rewards genuine engagement and quality content.

### 🎯 Key Features

- **🚀 Creator Campaign Management**: One-click campaign creation with Zora CoinV4 integration
- **🏆 ZoraCred Reputation System**: Dynamic reputation tracking and beautiful aura visualizations
- **📱 Farcaster Integration**: Social sharing through Farcaster Frames
- **🦄 Uniswap V4 Ready**: Built for future trading integration
- **🔒 Web3 Native**: Full wallet integration with RainbowKit and Wagmi
- **⚡ Lightning Fast**: Built with Vite and optimized for performance

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Framer Motion animations
- **Build Tool**: Vite for fast development and production builds
- **Web3**: Wagmi v2, Viem, and RainbowKit for wallet connections
- **UI**: Modern cosmic-themed design inspired by Reflect.app

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with strict type checking
- **API**: RESTful API with proper error handling
- **Services**: Modular service architecture

### Blockchain
- **Network**: Optimism (Layer 2 Ethereum)
- **Protocol**: Zora Protocol V3 with CoinV4 integration
- **Standards**: ERC-1155 for creator tokens
- **Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet, and more

### Deployment
- **Platform**: Render.com with automatic deployments
- **Container**: Docker support for flexible deployment
- **CI/CD**: GitHub Actions ready configuration
- **Monitoring**: Health checks and error logging

## 🚀 Deployment Options

### 🟢 Option 1: Render (Recommended)

**One-Click Deployment**:
1. Fork this repository to your GitHub account
2. Go to [Render.com](https://render.com) and connect your GitHub
3. Create a new "Web Service" from your forked repository
4. Configure the deployment:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node
   - **Plan**: Starter ($7/month)

**Environment Variables**:
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secure-jwt-secret-here
ZORA_API_KEY=your-zora-api-key
VITE_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
```

### 🟡 Option 2: Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will automatically detect the configuration from `vercel.json`
4. Add environment variables in Vercel dashboard
5. Deploy with one click

### 🔵 Option 3: Netlify

1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Configuration is automatically loaded from `netlify.toml`
3. Set environment variables in Netlify dashboard
4. Deploy automatically on every push

### 🐳 Option 4: Docker

**Local Docker Deployment**:
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t zorax-app .
docker run -p 3001:3001 -p 5173:5173 zorax-app
```

**Production Docker**:
```bash
# Use the deployment script
./deploy.sh
```

### ⚡ Option 5: Quick Deploy Script

For any platform with shell access:
```bash
# Clone and deploy
git clone https://github.com/yourusername/zorax.git
cd zorax
chmod +x deploy.sh
./deploy.sh
```

## 🔧 Local Development

### Prerequisites

- **Node.js** 18.x or higher
- **npm** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zorax.git
cd zorax

# Install dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys and configuration

# Start development servers
npm run dev
```

### Development Commands

```bash
# Development (runs both frontend and backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🌍 Environment Variables

### Required for Production

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-secure-jwt-secret-here
FRONTEND_URL=https://your-domain.com
```

### Optional Services

```env
# Zora Protocol
ZORA_API_KEY=your-zora-api-key

# Blockchain RPCs
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io

# Database (for production)
DATABASE_URL=postgresql://user:password@localhost:5432/zorax

# Redis (for session management)
REDIS_URL=redis://localhost:6379

# WalletConnect (for frontend)
VITE_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
```

## 🚀 Production Deployment Checklist

### Before Deployment

- [ ] Set all required environment variables
- [ ] Update `FRONTEND_URL` to your production domain
- [ ] Generate a secure `JWT_SECRET`
- [ ] Obtain API keys for Zora and WalletConnect
- [ ] Test the build process locally: `npm run build`
- [ ] Run tests: `npm test`

### After Deployment

- [ ] Verify health endpoint: `https://your-domain.com/api/health`
- [ ] Test wallet connection functionality
- [ ] Verify campaign creation flow
- [ ] Check Farcaster Frame integration
- [ ] Monitor application logs
- [ ] Set up monitoring and alerts

## 🔧 Platform-Specific Deployment

### Render.com

1. **Connect Repository**: Link your GitHub repository
2. **Service Configuration**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node
3. **Environment Variables**: Add all required env vars
4. **Auto-Deploy**: Enable automatic deployments from main branch

### Vercel

1. **Import Project**: Connect your repository
2. **Framework**: Vercel auto-detects configuration
3. **Environment Variables**: Set in Vercel dashboard
4. **Deployment**: Automatic on every push

### Netlify

1. **Site Configuration**: Uses `netlify.toml` automatically
2. **Build Settings**: Automatically configured
3. **Environment Variables**: Set in Netlify dashboard
4. **Deploy**: Automatic on every commit

### Docker

**Development**:
```bash
docker-compose up -d
```

**Production**:
```bash
# Build production image
docker build -t zorax-app:latest .

# Run with production environment
docker run -p 3001:3001 \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-secret \
  zorax-app:latest
```

## 📊 Monitoring and Maintenance

### Health Checks

The application provides several health check endpoints:

- **API Health**: `GET /api/health`
- **System Status**: `GET /api/status`
- **Database Health**: `GET /api/db-health` (when database is configured)

### Logging

- **Development**: Console logging with detailed output
- **Production**: Structured JSON logging
- **Error Tracking**: Automatic error capture and reporting

### Performance

- **Frontend**: Vite with optimized production builds
- **Backend**: Express with compression and caching
- **Database**: Connection pooling and query optimization
- **CDN**: Static asset optimization

## 🔐 Security Considerations

### Production Security

- **Environment Variables**: Never commit secrets to version control
- **JWT Secret**: Use a cryptographically secure random string
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure proper CORS policies
- **Headers**: Security headers configured with Helmet.js

### Web3 Security

- **Wallet Integration**: Uses secure wallet connection protocols
- **Transaction Safety**: Proper gas estimation and validation
- **Smart Contract**: Audited Zora Protocol integration
- **Network Security**: Optimism L2 for reduced fees and faster transactions

## 🆘 Troubleshooting

### Common Issues

**Build Failures**:
- Ensure Node.js version is 18.x or higher
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for missing environment variables

**Deployment Issues**:
- Verify all environment variables are set correctly
- Check that build command completes successfully
- Ensure start command is configured properly

**Web3 Connection Issues**:
- Verify WalletConnect Project ID is valid
- Check that users are on the correct network (Optimism)
- Ensure proper RPC URLs are configured

### Support

For additional support:
- Check the [Issues](https://github.com/yourusername/zorax/issues) page
- Review the [Documentation](./docs/) folder
- Contact the development team

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📈 Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] Redis caching layer
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-chain support
- [ ] Enhanced reputation algorithms
- [ ] Creator tools expansion

---

**Built with ❤️ for the Web3 Creator Economy**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/credvault.git
   cd credvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Frontend Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
VITE_ZORA_API_BASE_URL=https://api.zora.co
VITE_API_BASE_URL=http://localhost:3001

# Backend Configuration  
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
JWT_SECRET=your-jwt-secret-for-development

# Optional
ZORA_API_KEY=your_zora_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/credvault
```

## 📚 Usage

### For Creators

1. **Connect Your Wallet**: Use any Ethereum wallet to sign in
2. **Complete Onboarding**: Follow the cosmic-themed onboarding flow
3. **Create a Campaign**: Define your project, set pricing, and deploy to Zora
4. **Share & Promote**: Generate Farcaster Frames for viral promotion
5. **Monitor Performance**: Track supporters, volume, and reputation growth

### For Supporters

1. **Explore Campaigns**: Browse active creator campaigns
2. **Connect Wallet**: Sign in with your preferred wallet
3. **Support Creators**: Mint creator tokens to show support
4. **Build Network**: Follow creators and discover new talent
5. **Track Portfolio**: Monitor your supporter activity and reputation

## 🧪 Testing

### Unit Tests
```bash
npm run test
npm run test:watch
npm run test:coverage
```

### End-to-End Tests
```bash
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:headed
```

### Type Checking
```bash
npm run type-check
```

## 📊 Performance & Monitoring

- **Health Checks**: Built-in health monitoring at `/api/health`
- **Error Logging**: Comprehensive error tracking and reporting
- **Performance Metrics**: Real-time performance monitoring
- **Uptime Monitoring**: Automatic service health checks

## 🔒 Security

- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Helmet.js**: Security headers and protection
- **Environment Variables**: Secure configuration management
- **Input Validation**: Zod-powered request validation
- **Rate Limiting**: Built-in API rate limiting (configurable)

## 🚀 Production Deployment

### Environment Variables for Production

Set these in your Render Dashboard:

#### Backend Service
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-frontend-url.onrender.com
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
JWT_SECRET=your-very-secure-jwt-secret
ZORA_API_KEY=your-production-zora-api-key
```

#### Frontend Service
```
VITE_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
VITE_ZORA_API_BASE_URL=https://api.zora.co
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t credvault .

# Run the container
docker run -p 10000:10000 \
  -e NODE_ENV=production \
  -e PORT=10000 \
  -e JWT_SECRET=your-jwt-secret \
  credvault
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [credvault.onrender.com](https://credvault.onrender.com) (Coming Soon)
- **Documentation**: [docs/TECHNICAL_DOCUMENTATION.md](docs/TECHNICAL_DOCUMENTATION.md)
- **API Docs**: [Backend API Documentation](docs/API.md)
- **Zora Protocol**: [docs.zora.co](https://docs.zora.co)
- **Optimism**: [optimism.io](https://optimism.io)

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/credvault/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/credvault/discussions)
- **Discord**: [CredVault Community](https://discord.gg/credvault) (Coming Soon)

---

**Built with ❤️ for the Zora Coinathon and the creator economy.**
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and production builds
- **Web3**: Wagmi v2, Viem, and RainbowKit for wallet connections

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful API with TypeScript
- **Services**: Modular service architecture

### Blockchain
- **Network**: Optimism (Layer 2 Ethereum)
- **Protocol**: Zora Protocol V3 with CoinV4 integration
- **Standards**: ERC-1155 for creator tokens
- **Wallet Support**: MetaMask, WalletConnect, Coinbase Wallet

### Integrations
- **Social**: Farcaster Protocol for Frame generation
- **Trading**: Uniswap V4 compatibility layer
- **Analytics**: Custom event tracking and metrics

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **PostgreSQL** database (for backend)
- **Optimism RPC endpoint** (Alchemy, Infura, or local node)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/credvault.git
   cd credvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:setup
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Blockchain Configuration
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_ZORA_API_URL=https://api.zora.co/graphql
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/credvault

# Farcaster Integration
FARCASTER_API_KEY=your_farcaster_api_key
FARCASTER_HUB_URL=https://hub.farcaster.standardcrypto.vc:2281

# Analytics & Monitoring
VITE_ANALYTICS_ID=your_analytics_id

# Development
NODE_ENV=development
PORT=3001
```

## 📚 Usage

### For Creators

1. **Connect Your Wallet**: Use any Ethereum wallet to sign in
2. **Create a Campaign**: Define your project, set pricing, and deploy
3. **Share on Social**: Generate Farcaster Frames for viral promotion
4. **Monitor Performance**: Track supporters, volume, and reputation

### For Supporters

1. **Explore Campaigns**: Browse trending and featured creator campaigns
2. **Check Creator Reputation**: View ZoraCred scores and achievement badges
3. **Mint Directly**: Support creators by minting their tokens
4. **Share & Earn**: Amplify campaigns through social sharing

### For Developers

1. **Fork the Repository**: Start with our comprehensive codebase
2. **Read the Documentation**: Explore our detailed technical docs
3. **Run Tests**: Ensure everything works with our test suite
4. **Contribute**: Submit PRs to improve the platform

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Unit Tests
```bash
npm run test:unit
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test Suites
```bash
# React components
npm run test:components

# Hooks and utilities
npm run test:hooks

# API endpoints
npm run test:api
```

## � Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm run deploy:vercel
```

### Deploy to Netlify
```bash
npm run deploy:netlify
```

For detailed deployment instructions, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## � Documentation

- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System design and component structure
- **[API Reference](./docs/API.md)** - Complete API documentation with examples
- **[Development Guide](./docs/DEVELOPMENT.md)** - Setup and development workflow
- **[User Guide](./docs/USER_GUIDE.md)** - End-user documentation
- **[Creator Guide](./docs/CREATOR_GUIDE.md)** - Creator onboarding and best practices
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment procedures
- **[Security Guidelines](./docs/SECURITY.md)** - Security considerations and best practices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- **TypeScript**: All code must be TypeScript with strict mode
- **ESLint**: Follow our ESLint configuration
- **Prettier**: Code formatting is enforced
- **Testing**: Maintain >90% test coverage

## � Roadmap

### Phase 1: Foundation ✅
- [x] Core platform architecture
- [x] Zora protocol integration
- [x] Basic creator dashboard
- [x] Wallet connection system

### Phase 2: Social & Reputation ✅
- [x] ZoraCred reputation system
- [x] Farcaster Frame integration
- [x] Social sharing features
- [x] Creator profile pages

### Phase 3: Advanced Features ✅
- [x] Campaign analytics
- [x] Frame management system
- [x] Uniswap V4 compatibility
- [x] Comprehensive testing

### Phase 4: Scale & Optimize 🚧
- [ ] Advanced analytics dashboard
- [ ] Creator monetization tools
- [ ] Mobile app development
- [ ] Enterprise features

### Phase 5: Ecosystem Expansion 📋
- [ ] Multi-chain support
- [ ] DAO governance integration
- [ ] Creator marketplace
- [ ] Advanced trading features

## 🏆 Achievements

- **Zora Coinathon Participant**: Built with Zora's cutting-edge infrastructure
- **Full-Stack Implementation**: Complete frontend and backend solution
- **Social Integration**: Native Farcaster Protocol support
- **Future-Ready**: Designed for upcoming Web3 innovations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **Zora Team**: For providing the robust protocol infrastructure
- **Farcaster**: For enabling social Web3 experiences
- **Optimism**: For scalable Layer 2 blockchain technology
- **Open Source Community**: For the amazing tools and libraries

## 📞 Support

- **Documentation**: Check our comprehensive docs
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join our GitHub Discussions
- **Email**: support@credvault.io

---

**Built with ❤️ for the Zora Coinathon**

*CredVault represents the future of creator-supporter relationships in Web3, where transparency, reputation, and seamless interactions create value for everyone.*