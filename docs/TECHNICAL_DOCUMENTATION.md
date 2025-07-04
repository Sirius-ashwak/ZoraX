# CredVault Technical Documentation

## Architecture Overview

CredVault is a full-stack Web3 application consisting of:

1. **Smart Contracts** (Solidity)
2. **Frontend Application** (React/TypeScript)
3. **Web3 Integration** (Wagmi/RainbowKit)
4. **Deployment Infrastructure** (Hardhat)

## Smart Contract Architecture

### Core Contract: CredVault.sol

The main contract inherits from:
- `ERC721URIStorage`: For NFT functionality
- `Ownable`: For access control
- `ReentrancyGuard`: For security

#### Key Data Structures

```solidity
struct Campaign {
    uint256 id;
    address creator;
    string title;
    string description;
    string imageUri;
    uint256 goalAmount;
    uint256 raisedAmount;
    uint256 supporterCount;
    uint256 endTime;
    bool isActive;
    uint256 createdAt;
}

struct SupporterPass {
    uint256 campaignId;
    address supporter;
    uint256 amount;
    uint256 tier;
    uint256 mintedAt;
}

struct CreatorProfile {
    address creator;
    string name;
    string bio;
    string avatar;
    uint256 totalRaised;
    uint256 totalSupporters;
    uint256 campaignCount;
    uint256 reputationScore;
    uint256 joinedAt;
}
```

#### Core Functions

##### Campaign Management
- `createCampaign()`: Creates new funding campaign
- `supportCampaign()`: Allows supporters to back campaigns with ETH
- `getCampaign()`: Retrieves campaign details

##### Reputation System
- Automatic reputation calculation based on:
  - Total funds raised
  - Number of campaigns
  - Supporter engagement
  - Campaign success rate

##### Token Gating
- `hasSupporterPass()`: Verifies supporter access rights
- Enables exclusive content and perks

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── Web3Provider.tsx      # Web3 context provider
│   ├── ConnectWallet.tsx     # Wallet connection UI
│   ├── CampaignCard.tsx      # Campaign display component
│   ├── CreateCampaignModal.tsx # Campaign creation form
│   ├── SupportModal.tsx      # Support/funding interface
│   └── CreatorProfile.tsx    # Profile display component
├── hooks/
│   └── useCredVault.ts       # Contract interaction hooks
├── pages/
│   ├── Dashboard.tsx         # Creator dashboard
│   └── Explore.tsx          # Campaign discovery
├── config/
│   └── wagmi.ts             # Web3 configuration
└── App.tsx                  # Main application
```

### State Management

The application uses React hooks and Wagmi for state management:

- **Wagmi Hooks**: For blockchain state and contract interactions
- **React State**: For UI state and form management
- **Local Storage**: For user preferences and session data

### Web3 Integration

#### Wallet Connection
- **RainbowKit**: Provides wallet connection UI
- **Wagmi**: Handles Web3 state management
- **Viem**: Low-level Ethereum interactions

#### Contract Interactions
```typescript
// Example hook usage
const { data: campaign } = useCampaign(campaignId);
const { write: createCampaign } = useCreateCampaign();
const { write: supportCampaign } = useSupportCampaign(campaignId, amount, tokenUri);
```

## Deployment Architecture

### Network Configuration

#### Optimism Mainnet
- **Chain ID**: 10
- **RPC**: https://mainnet.optimism.io
- **Explorer**: https://optimistic.etherscan.io

#### Optimism Goerli (Testnet)
- **Chain ID**: 420
- **RPC**: https://goerli.optimism.io
- **Explorer**: https://goerli-optimism.etherscan.io

### Contract Deployment Process

1. **Compilation**: `npx hardhat compile`
2. **Testing**: `npx hardhat test`
3. **Deployment**: `npx hardhat run scripts/deploy.js --network optimism`
4. **Verification**: Automatic Etherscan verification

## Security Considerations

### Smart Contract Security

#### Reentrancy Protection
```solidity
function supportCampaign(uint256 _campaignId, string memory _tokenUri) 
    external 
    payable 
    nonReentrant 
{
    // Function implementation
}
```

#### Access Control
- Campaign creators can only modify their own campaigns
- Profile updates restricted to profile owners
- Admin functions protected by ownership

#### Input Validation
- All user inputs validated for type and range
- String inputs checked for length limits
- Numeric inputs validated for overflow/underflow

### Frontend Security

#### XSS Prevention
- All user inputs sanitized
- Content Security Policy implemented
- Safe HTML rendering practices

#### Wallet Security
- Secure wallet connection handling
- Transaction confirmation prompts
- Network validation

## Performance Optimizations

### Smart Contract Optimizations

#### Gas Efficiency
- Batch operations where possible
- Efficient data structures
- Minimal storage operations

#### Storage Optimization
- Packed structs for gas savings
- Efficient mapping usage
- Event-based data retrieval

### Frontend Optimizations

#### React Performance
- Component memoization
- Lazy loading for routes
- Efficient re-rendering patterns

#### Web3 Performance
- Connection caching
- Batch RPC calls
- Optimistic updates

## Testing Strategy

### Smart Contract Tests

#### Unit Tests
- Individual function testing
- Edge case validation
- Error condition handling

#### Integration Tests
- End-to-end workflow testing
- Multi-contract interactions
- State consistency validation

### Frontend Tests

#### Component Tests
- UI component rendering
- User interaction handling
- State management validation

#### Integration Tests
- Web3 integration testing
- Contract interaction flows
- Error handling scenarios

## Monitoring and Analytics

### On-Chain Monitoring
- Contract event tracking
- Transaction monitoring
- Gas usage analysis

### Application Monitoring
- User interaction tracking
- Performance metrics
- Error reporting

## Future Enhancements

### Planned Features
1. **Farcaster Integration**: Social discovery and sharing
2. **Advanced Reputation**: ML-based scoring algorithms
3. **Cross-Chain Support**: Multi-chain deployment
4. **Mobile App**: React Native implementation

### Scalability Improvements
1. **Layer 2 Optimization**: Further gas optimizations
2. **IPFS Integration**: Decentralized metadata storage
3. **Subgraph Integration**: Enhanced data querying
4. **Caching Layer**: Redis-based caching system

## API Reference

### Contract Events

```solidity
event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goalAmount);
event SupportReceived(uint256 indexed campaignId, address indexed supporter, uint256 amount, uint256 tokenId);
event CampaignCompleted(uint256 indexed campaignId, uint256 totalRaised);
event ReputationUpdated(address indexed creator, uint256 newScore);
```

### Frontend Hooks

#### Campaign Hooks
- `useCampaign(campaignId)`: Get campaign details
- `useCreateCampaign()`: Create new campaign
- `useSupportCampaign()`: Support existing campaign

#### Profile Hooks
- `useCreatorProfile(address)`: Get creator profile
- `useCreatorCampaigns(address)`: Get creator's campaigns
- `useSupporterTokens(address)`: Get supporter's NFTs

## Troubleshooting

### Common Issues

#### Contract Deployment
- **Issue**: Deployment fails with gas estimation error
- **Solution**: Increase gas limit in hardhat.config.js

#### Wallet Connection
- **Issue**: Wallet not connecting
- **Solution**: Check network configuration and RPC endpoints

#### Transaction Failures
- **Issue**: Transactions reverting
- **Solution**: Validate input parameters and contract state

### Debug Tools

#### Development Tools
- **Hardhat Console**: Interactive contract debugging
- **React DevTools**: Component state inspection
- **MetaMask**: Transaction debugging

#### Production Monitoring
- **Etherscan**: Transaction and contract monitoring
- **Sentry**: Error tracking and reporting
- **Analytics**: User behavior tracking

---

For additional technical support, please refer to our [GitHub Issues](https://github.com/credvault/credvault/issues) or join our [Discord community](https://discord.gg/credvault).