# ZoraX - Creator Economy Platform

![ZoraX Banner](../public/assets/zorax-banner.png)

ZoraX is the most elegant way for Web3 creators to build reputation, launch NFT campaigns, and connect with supporters. Built on Optimism and powered by Zora Protocol V3, ZoraX provides creators with comprehensive tools to succeed in the decentralized creator economy.

## 🌟 Key Features

### For Creators
- **Campaign Creation**: Launch NFT campaigns with customizable pricing, supply, and duration
- **ZoraCred Reputation**: Build transparent onchain reputation through activity metrics
- **Analytics Dashboard**: Comprehensive insights into campaign performance and supporter engagement
- **Supporter Management**: Tiered relationship system with badges and rewards
- **Farcaster Integration**: Auto-generated social frames for viral campaign sharing

### For Supporters
- **Discover Campaigns**: Browse and filter campaigns by category, popularity, and creator
- **Support Creators**: Mint NFTs and build relationships with favorite creators
- **Tier System**: Earn badges and unlock exclusive perks based on support level
- **Social Proof**: Showcase support history and build your own supporter reputation

## 🚀 Quick Start

### Prerequisites
- Modern web browser with wallet extension
- Wallet connected to Optimism network
- Small amount of ETH for transaction fees

### Getting Started
1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Complete Profile**: Add display name, bio, and social links
3. **Create Campaign**: Use the step-by-step campaign creation wizard
4. **Launch & Share**: Generate Farcaster frames and share across social platforms

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with TypeScript for type safety
- **Vite**: Fast build tool with optimized development experience
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and transitions
- **Wouter**: Lightweight client-side routing

### Blockchain Integration
- **Optimism L2**: Primary deployment network for fast, cheap transactions
- **Zora Protocol V3**: Core NFT infrastructure and campaign management
- **Wagmi v2**: Type-safe Ethereum library for wallet connections
- **Viem**: Low-level Ethereum interactions and contract calls

### Backend Services
- **Node.js/Express**: RESTful API server with TypeScript
- **In-Memory Storage**: Development-ready with PostgreSQL migration path
- **IPFS Integration**: Decentralized file storage for campaign assets
- **Zod Validation**: Runtime type checking and API validation

## 📖 Documentation

### User Guides
- [Creating Your First Campaign](./guides/first-campaign.md)
- [Understanding ZoraCred](./guides/zoracred-system.md)
- [Supporter Engagement](./guides/supporter-engagement.md)
- [Analytics & Insights](./guides/analytics.md)

### Developer Resources
- [API Reference](./api/README.md)
- [Smart Contract Integration](./contracts/README.md)
- [Deployment Guide](./deployment/README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

## 🔧 Development Setup

### Local Development
```bash
# Clone repository
git clone https://github.com/zorax-platform/zorax-mvp.git
cd zorax-mvp

# Install dependencies
npm install

# Start development servers
npm run dev
```

### Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Required variables
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_ZORA_API_KEY=your_zora_api_key
```

### Testing
```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

## 🌍 Deployment

### Supported Platforms
- **Render**: Automatic deployments with Docker support
- **Vercel**: Optimized for frontend with serverless functions
- **Netlify**: Static site deployment with form handling

### Production Checklist
- [ ] Set production environment variables
- [ ] Configure custom domain
- [ ] Set up monitoring and analytics
- [ ] Enable error tracking
- [ ] Configure backup strategies

## 🤝 Community & Support

### Getting Help
- **Documentation**: [docs.zorax.app](https://docs.zorax.app)
- **Discord**: [Join our community](https://discord.gg/zorax)
- **Twitter**: [@ZoraxPlatform](https://twitter.com/ZoraxPlatform)
- **GitHub Issues**: Report bugs and feature requests

### Contributing
We welcome contributions! Please read our [Contributing Guidelines](../CONTRIBUTING.md) before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- **Zora Team**: For providing robust protocol infrastructure
- **Optimism**: For scalable L2 blockchain infrastructure
- **Farcaster**: For enabling decentralized social integration
- **Open Source Community**: For the amazing tools and libraries

---

Built with ❤️ by the ZoraX team for the creator economy revolution.