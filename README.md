# CredVault - Web3 Creator Platform

CredVault is a decentralized platform that empowers creators to monetize their work and build verifiable onchain reputation through supporter NFT campaigns.

## 🌟 Features

### For Creators
- **Campaign Creation**: Launch supporter NFT campaigns with custom goals and perks
- **Direct Funding**: Receive ETH directly from supporters as they mint NFTs
- **Reputation Building**: Automatically generate ZoraCred profiles based on onchain activity
- **Token-Gated Content**: Offer exclusive perks to supporters

### For Supporters
- **NFT Passes**: Mint unique supporter pass NFTs to back creators
- **Exclusive Access**: Unlock special content and early access
- **Community Voting**: Influence project direction and decisions
- **Recognition**: Build your own supporter history and reputation

## 🏗️ Architecture

### Smart Contracts
- **CredVault.sol**: Main contract handling campaigns, NFT minting, and reputation
- Built on **Optimism L2** for low-cost transactions
- Integrates with **Zora Protocol** for NFT infrastructure

### Frontend
- **React + TypeScript** with modern UI/UX
- **Wagmi + RainbowKit** for Web3 integration
- **Tailwind CSS** for responsive design
- Real-time campaign tracking and profile management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/credvault.git
cd credvault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Compile smart contracts:
```bash
npx hardhat compile
```

5. Run tests:
```bash
npx hardhat test
```

6. Deploy contracts (local):
```bash
npx hardhat run scripts/deploy.js --network localhost
```

7. Start the frontend:
```bash
npm run dev
```

## 📋 Smart Contract Deployment

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

### Optimism Mainnet
```bash
# Deploy to Optimism
npx hardhat run scripts/deploy.js --network optimism
```

### Optimism Goerli (Testnet)
```bash
# Deploy to Optimism Goerli
npx hardhat run scripts/deploy.js --network optimismGoerli
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
npm test
```

Tests cover:
- Campaign creation and management
- NFT minting and supporter passes
- Reputation scoring system
- Token-gated access control
- Profile management

## 📖 API Documentation

### Core Functions

#### Campaign Management
- `createCampaign(title, description, imageUri, goalAmount, duration)`
- `supportCampaign(campaignId, tokenUri)` (payable)
- `getCampaign(campaignId)`

#### Profile System
- `getCreatorProfile(address)`
- `updateCreatorProfile(name, bio, avatar)`
- `getCreatorCampaigns(address)`

#### Token Gating
- `hasSupporterPass(user, campaignId)`
- `getSupporterTokens(address)`

## 🔧 Configuration

### Environment Variables
```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
VITE_CREDVAULT_CONTRACT_ADDRESS=deployed_contract_address
OPTIMISM_RPC_URL=https://mainnet.optimism.io
PRIVATE_KEY=your_deployment_private_key
```

### Network Configuration
The platform supports:
- **Optimism Mainnet** (Production)
- **Optimism Goerli** (Testing)
- **Local Hardhat** (Development)

## 🛡️ Security

### Smart Contract Security
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Access Control**: Proper permission management
- **Input Validation**: Comprehensive parameter checking
- **Overflow Protection**: SafeMath equivalent built into Solidity 0.8+

### Frontend Security
- **Wallet Integration**: Secure Web3 connection handling
- **Input Sanitization**: XSS prevention
- **HTTPS Only**: Secure communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [credvault.app](https://credvault.app)
- **Documentation**: [docs.credvault.app](https://docs.credvault.app)
- **Discord**: [discord.gg/credvault](https://discord.gg/credvault)
- **Twitter**: [@CredVault](https://twitter.com/credvault)

## 🙏 Acknowledgments

- **Zora Protocol** for NFT infrastructure
- **Optimism** for L2 scaling solution
- **Farcaster** for social features
- **RainbowKit** for wallet connection UX

---

Built with ❤️ for the Web3 creator economy