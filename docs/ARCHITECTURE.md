# CredVault Architecture Documentation

## System Overview

CredVault is a full-stack Web3 application built with modern technologies, designed for scalability, maintainability, and exceptional user experience. The architecture follows a modular, service-oriented design with clear separation of concerns.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Blockchain    │
│   (React/TS)    │◄──►│   (Node.js)     │◄──►│   (Optimism)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Storage   │    │    Database     │    │   Zora Protocol │
│   (IPFS/AWS)    │    │  (PostgreSQL)   │    │   (CoinV4)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Frontend Architecture

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state, React Query for server state
- **Web3 Integration**: Wagmi v2, Viem, RainbowKit
- **Testing**: Jest, React Testing Library, Playwright

### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI primitives
│   ├── forms/           # Form components
│   ├── navigation/      # Navigation components
│   └── features/        # Feature-specific components
├── pages/               # Route-level page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── config/              # Configuration files
└── assets/              # Static assets
```

### Component Architecture Principles

1. **Atomic Design**: Components follow atomic design methodology
   - Atoms: Basic UI elements (Button, Input, Icon)
   - Molecules: Simple combinations (SearchBox, CampaignCard)
   - Organisms: Complex sections (Header, Dashboard, CampaignGrid)
   - Templates: Page layouts
   - Pages: Complete pages with data

2. **Container/Presentational Pattern**: 
   - Presentational components focus on UI rendering
   - Container components handle data fetching and business logic

3. **Composition over Inheritance**: Components use composition for flexibility

### State Management

```typescript
// Global State (Zustand)
interface AppState {
  user: User | null;
  campaigns: Campaign[];
  ui: UIState;
}

// Server State (React Query)
const useCampaigns = () => useQuery({
  queryKey: ['campaigns'],
  queryFn: fetchCampaigns
});

// Component State (useState/useReducer)
const [formData, setFormData] = useState<FormData>();
```

### Web3 Integration Layer

```typescript
// Wagmi Configuration
const config = createConfig({
  chains: [optimism],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'CredVault' })
  ],
  transports: {
    [optimism.id]: http()
  }
});

// Custom Hooks for Web3 Operations
const useCreateCampaign = () => {
  const { writeContract } = useWriteContract();
  
  return useMutation({
    mutationFn: async (campaignData) => {
      return writeContract({
        address: CREDVAULT_ADDRESS,
        abi: credVaultABI,
        functionName: 'createCampaign',
        args: [campaignData]
      });
    }
  });
};
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js with middleware architecture
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Web3 signature verification
- **File Storage**: IPFS for decentralized storage
- **Caching**: Redis for session and API response caching

### Service-Oriented Architecture

```
backend/
├── src/
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   ├── models/          # Database models (Prisma)
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration management
│   └── types/           # TypeScript interfaces
├── prisma/              # Database schema and migrations
└── tests/               # Backend tests
```

### Service Layer Design

```typescript
// Abstract Service Base Class
abstract class BaseService {
  protected db: PrismaClient;
  protected logger: Logger;
  
  constructor(db: PrismaClient, logger: Logger) {
    this.db = db;
    this.logger = logger;
  }
  
  abstract create(data: any): Promise<any>;
  abstract findById(id: string): Promise<any>;
  abstract update(id: string, data: any): Promise<any>;
  abstract delete(id: string): Promise<void>;
}

// Campaign Service Implementation
class CampaignService extends BaseService {
  async create(campaignData: CreateCampaignDTO): Promise<Campaign> {
    // Validate input
    // Deploy Zora token
    // Save to database
    // Return campaign data
  }
  
  async getAnalytics(campaignId: string): Promise<Analytics> {
    // Aggregate analytics data
    // Return formatted metrics
  }
}
```

### API Layer

```typescript
// Route Structure
app.use('/api/campaigns', campaignRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/frames', frameRoutes);
app.use('/api/analytics', analyticsRoutes);

// Route Handler Example
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaignData = validateCampaignData(req.body);
    const campaign = await campaignService.create(campaignData);
    
    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
```

### Database Schema

```sql
-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address VARCHAR(42) UNIQUE NOT NULL,
  name VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  token_address VARCHAR(42),
  price DECIMAL(18,8),
  max_supply INTEGER,
  current_supply INTEGER DEFAULT 0,
  status campaign_status DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  user_id UUID REFERENCES users(id),
  transaction_hash VARCHAR(66),
  token_id INTEGER,
  amount DECIMAL(18,8),
  type transaction_type,
  status transaction_status DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Blockchain Integration

### Smart Contract Architecture

```solidity
// CredVault.sol - Main Contract
contract CredVault {
    struct Campaign {
        address creator;
        string tokenURI;
        uint256 price;
        uint256 maxSupply;
        uint256 currentSupply;
        bool active;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(address => uint256[]) public creatorCampaigns;
    
    function createCampaign(
        string memory tokenURI,
        uint256 price,
        uint256 maxSupply
    ) external returns (uint256);
    
    function mintSupporter(uint256 campaignId) external payable;
}
```

### Zora Protocol Integration

```typescript
// Zora CoinV4 Integration
const deployZoraCoin = async (campaignData: CampaignData) => {
  const zoraCoinFactory = new ethers.Contract(
    ZORA_COIN_FACTORY_ADDRESS,
    zoraCoinFactoryABI,
    signer
  );
  
  const tx = await zoraCoinFactory.create({
    name: campaignData.title,
    symbol: generateSymbol(campaignData.title),
    totalSupply: campaignData.maxSupply,
    price: parseEther(campaignData.price),
    creator: campaignData.creator
  });
  
  const receipt = await tx.wait();
  return receipt.logs[0].args.tokenAddress;
};
```

### Transaction Management

```typescript
class TransactionService {
  async processTransaction(txData: TransactionData): Promise<void> {
    try {
      // 1. Validate transaction
      await this.validateTransaction(txData);
      
      // 2. Update database state
      await this.updateCampaignSupply(txData.campaignId);
      
      // 3. Record transaction
      await this.recordTransaction(txData);
      
      // 4. Update creator reputation
      await this.updateCreatorReputation(txData.creator);
      
      // 5. Emit events
      this.eventEmitter.emit('transaction.confirmed', txData);
      
    } catch (error) {
      await this.handleTransactionError(txData, error);
    }
  }
}
```

## Data Flow Architecture

### Campaign Creation Flow

```
1. User Input (Frontend)
   └── Form Validation
       └── Web3 Wallet Signature
           └── API Request to Backend
               └── Business Logic Validation
                   └── Zora Token Deployment
                       └── Database Persistence
                           └── Response to Frontend
                               └── UI Update
```

### Minting Flow

```
1. User Clicks Mint (Frontend/Frame)
   └── Price Calculation
       └── Transaction Preparation
           └── Wallet Confirmation
               └── Blockchain Transaction
                   └── Transaction Monitoring
                       └── Database Update
                           └── Analytics Recording
                               └── UI Refresh
```

### Reputation Calculation Flow

```
1. Transaction Event
   └── Extract Metrics
       └── Calculate Scores
           └── Weight Factors
               └── Aggregate Score
                   └── Update Profile
                       └── Badge Evaluation
                           └── Aura Assignment
```

## Security Architecture

### Authentication & Authorization

```typescript
// JWT Authentication Middleware
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Web3 Signature Verification
const verifySignature = (message: string, signature: string, address: string): boolean => {
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  return recoveredAddress.toLowerCase() === address.toLowerCase();
};
```

### Input Validation & Sanitization

```typescript
// Validation Schemas
const campaignSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000),
  price: z.string().regex(/^\d+(\.\d{1,18})?$/),
  maxSupply: z.number().min(1).max(1000000)
});

// Sanitization Middleware
const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitizeHtml(req.body);
  next();
};
```

### Smart Contract Security

```solidity
// Security Features
contract CredVault {
    using ReentrancyGuard for uint256;
    using SafeMath for uint256;
    
    modifier onlyCreator(uint256 campaignId) {
        require(campaigns[campaignId].creator == msg.sender, "Not creator");
        _;
    }
    
    modifier campaignActive(uint256 campaignId) {
        require(campaigns[campaignId].active, "Campaign not active");
        _;
    }
    
    function mintSupporter(uint256 campaignId) 
        external 
        payable 
        nonReentrant 
        campaignActive(campaignId) 
    {
        // Implementation with security checks
    }
}
```

## Performance Architecture

### Frontend Performance

1. **Code Splitting**: Dynamic imports for route-based splitting
2. **Component Lazy Loading**: Suspend components for better UX
3. **Asset Optimization**: Image compression and WebP conversion
4. **Bundle Analysis**: Regular bundle size monitoring
5. **CDN Integration**: Static asset delivery optimization

```typescript
// Code Splitting Example
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Explore = lazy(() => import('./pages/Explore'));

// Image Optimization
const OptimizedImage = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    {...props}
  />
);
```

### Backend Performance

1. **Database Optimization**: Proper indexing and query optimization
2. **Caching Strategy**: Redis for frequent data access
3. **Connection Pooling**: Efficient database connection management
4. **Rate Limiting**: API protection against abuse
5. **Response Compression**: GZIP compression for API responses

```typescript
// Caching Implementation
class CacheService {
  private redis = new Redis(REDIS_URL);
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }
  
  async set(key: string, value: any, ttl = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
}
```

### Blockchain Performance

1. **Transaction Batching**: Group operations when possible
2. **Gas Optimization**: Efficient contract design
3. **Event Indexing**: Proper event structure for filtering
4. **State Management**: Minimize on-chain storage

## Monitoring & Observability

### Application Monitoring

```typescript
// Error Tracking
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV
});

// Performance Monitoring
const performanceMonitor = {
  trackAPICall: (endpoint: string, duration: number) => {
    metrics.timing('api.response_time', duration, [`endpoint:${endpoint}`]);
  },
  
  trackUserAction: (action: string, metadata: any) => {
    analytics.track('user.action', { action, ...metadata });
  }
};
```

### Health Checks

```typescript
// Health Check Endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION,
    uptime: process.uptime()
  });
});

app.get('/health/database', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.json({ status: 'healthy' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});
```

## Deployment Architecture

### Environment Strategy

```
Development → Staging → Production
     ↓           ↓          ↓
   Local DB → Test DB → Prod DB
     ↓           ↓          ↓
  Test Chain → Goerli → Optimism
```

### Infrastructure as Code

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_API_URL=${API_URL}
  
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=credvault
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
  
  redis:
    image: redis:7-alpine
```

## Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple backend instances behind load balancer
- **Database Sharding**: Partition data by creator address or region
- **CDN Distribution**: Global content delivery for frontend assets

### Vertical Scaling
- **Resource Optimization**: CPU and memory profiling
- **Database Tuning**: Connection pooling and query optimization
- **Caching Layers**: Multi-level caching strategy

### Future Architecture
- **Microservices**: Split services by domain (campaigns, profiles, analytics)
- **Event-Driven Architecture**: Async processing with message queues
- **Multi-Chain Support**: Abstract blockchain layer for multiple networks

This architecture provides a solid foundation for CredVault's current needs while maintaining flexibility for future growth and feature additions.
