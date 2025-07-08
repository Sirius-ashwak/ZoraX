# CredVault - Creator-Supporter Economic Platform

![CredVault Logo](./docs/images/credvault-logo.png)

**A revolutionary platform connecting creators and supporters through transparent reputation systems and seamless blockchain interactions.**

[![Built for Zora Coinathon](https://img.shields.io/badge/Built%20for-Zora%20Coinathon-blue)](https://zora.co/coinathon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🌟 Overview

CredVault transforms how creators and supporters interact by introducing a transparent reputation system built on Zora's infrastructure. Creators can launch campaigns, supporters can mint tokens, and everyone benefits from a trust-based ecosystem that rewards genuine engagement and quality content.

### 🎯 Key Value Propositions

- **Trust Through Transparency**: ZoraCred reputation system builds verifiable creator credibility
- **Seamless Web3 Integration**: Native Zora protocol and Optimism blockchain support
- **Social Amplification**: Farcaster Frames enable viral campaign sharing
- **Future-Ready**: Designed for Uniswap V4 trading integration

## ✨ Features

### 🚀 Creator Campaign Management
- **One-Click Campaign Creation**: Deploy Zora CoinV4 tokens effortlessly
- **Comprehensive Dashboard**: Track supporters, volume, and engagement metrics
- **Flexible Pricing Models**: Set custom mint prices and supply limits
- **Real-time Analytics**: Monitor campaign performance and supporter behavior

### 🏆 ZoraCred Reputation System
- **Dynamic Aura Visualization**: Beautiful, animated reputation displays
- **Multi-metric Scoring**: Combines volume, supporters, consistency, and engagement
- **Transparent Calculations**: Open-source reputation algorithms
- **Achievement Badges**: Milestone rewards for creator accomplishments

### 📱 Farcaster Integration
- **Frame Generation**: Auto-create shareable campaign Frames
- **Social Minting**: Direct minting from Farcaster posts
- **Viral Sharing**: One-click campaign promotion to social networks
- **Frame Analytics**: Track Frame performance and engagement

### 🦄 Uniswap V4 Compatibility
- **Future Trading Integration**: Built for upcoming Uniswap V4 hooks
- **Compatibility Badges**: Clear indication of trading-ready tokens
- **Educational Resources**: Help users understand trading opportunities

## 🛠 Tech Stack

### Frontend
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