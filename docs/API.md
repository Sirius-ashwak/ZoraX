# CredVault API Documentation

Complete API reference for CredVault backend services.

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.credvault.io/api
```

## Authentication

All API endpoints require proper authentication using Web3 wallet signatures.

### Authentication Header
```
Authorization: Bearer <jwt_token>
```

### Getting a JWT Token
```typescript
POST /api/auth/login
{
  "address": "0x...",
  "signature": "0x...",
  "message": "Login to CredVault"
}
```

## Campaign Management

### Create Campaign
Create a new creator campaign with Zora token deployment.

```typescript
POST /api/campaigns
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "My Art Collection",
  "description": "Limited edition digital art collection",
  "imageUri": "ipfs://...",
  "price": "0.05",
  "maxSupply": 1000,
  "duration": 30,
  "category": "art"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "campaign_123",
    "title": "My Art Collection",
    "description": "Limited edition digital art collection",
    "creator": "0x...",
    "tokenAddress": "0x...",
    "price": "0.05",
    "maxSupply": 1000,
    "currentSupply": 0,
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-31T00:00:00Z"
  }
}
```

### Get Campaign Details
Retrieve detailed information about a specific campaign.

```typescript
GET /api/campaigns/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "campaign_123",
    "title": "My Art Collection",
    "description": "Limited edition digital art collection",
    "creator": {
      "address": "0x...",
      "name": "Artist Name",
      "avatar": "ipfs://...",
      "zoracredScore": 850
    },
    "tokenAddress": "0x...",
    "price": "0.05",
    "maxSupply": 1000,
    "currentSupply": 127,
    "totalVolume": "6.35",
    "supporterCount": 89,
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-31T00:00:00Z",
    "metrics": {
      "viewCount": 1250,
      "shareCount": 45,
      "conversionRate": 0.071
    }
  }
}
```

### Get Creator's Campaigns
Retrieve all campaigns created by a specific address.

```typescript
GET /api/campaigns/creator/:address
Query Parameters:
  - status: "active" | "completed" | "expired" | "all" (default: "all")
  - limit: number (default: 10)
  - offset: number (default: 0)
  - sortBy: "created" | "volume" | "supporters" (default: "created")
  - sortOrder: "asc" | "desc" (default: "desc")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "campaign_123",
        "title": "My Art Collection",
        "status": "active",
        "currentSupply": 127,
        "maxSupply": 1000,
        "totalVolume": "6.35",
        "supporterCount": 89,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 15,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### Update Campaign
Update campaign details (only by creator).

```typescript
PUT /api/campaigns/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "description": "Updated description",
  "imageUri": "ipfs://new_image"
}
```

### Get Trending Campaigns
Retrieve trending campaigns based on recent activity.

```typescript
GET /api/campaigns/trending
Query Parameters:
  - timeframe: "1h" | "24h" | "7d" | "30d" (default: "24h")
  - limit: number (default: 10)
  - category: string (optional)
```

## Creator Profiles

### Get Creator Profile
Retrieve creator profile with ZoraCred reputation data.

```typescript
GET /api/profiles/:address
```

**Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x...",
    "name": "Artist Name",
    "bio": "Digital artist creating unique NFT collections",
    "avatar": "ipfs://...",
    "website": "https://artist.com",
    "twitter": "@artist",
    "zoracredScore": 850,
    "reputation": {
      "level": "Master Creator",
      "aura": "golden",
      "badges": ["early_adopter", "high_volume", "community_favorite"],
      "metrics": {
        "totalVolume": "45.7",
        "totalSupporters": 234,
        "campaignCount": 8,
        "averageCompletion": 0.89,
        "consistency": 0.92
      }
    },
    "stats": {
      "joinedAt": "2023-06-15T00:00:00Z",
      "lastActive": "2024-01-15T12:30:00Z",
      "totalEarnings": "45.7",
      "successfulCampaigns": 7
    }
  }
}
```

### Update Creator Profile
Update creator profile information.

```typescript
PUT /api/profiles/:address
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "New Artist Name",
  "bio": "Updated bio",
  "avatar": "ipfs://new_avatar",
  "website": "https://newsite.com",
  "twitter": "@newhandle"
}
```

### Get Creator Metrics
Retrieve detailed analytics for a creator.

```typescript
GET /api/profiles/:address/metrics
Query Parameters:
  - timeframe: "7d" | "30d" | "90d" | "1y" | "all" (default: "30d")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "timeframe": "30d",
    "volume": {
      "total": "12.5",
      "change": "+15.3%",
      "daily": [
        { "date": "2024-01-01", "volume": "0.8" },
        { "date": "2024-01-02", "volume": "1.2" }
      ]
    },
    "supporters": {
      "total": 89,
      "new": 12,
      "returning": 77,
      "change": "+8.5%"
    },
    "campaigns": {
      "active": 2,
      "completed": 1,
      "totalViews": 5420,
      "conversionRate": 0.064
    }
  }
}
```

## Farcaster Frame Integration

### Generate Frame
Create a Farcaster Frame for campaign sharing.

```typescript
POST /api/frames/generate
Content-Type: application/json
Authorization: Bearer <token>

{
  "campaignId": "campaign_123",
  "frameType": "mint" | "share" | "profile",
  "customMessage": "Check out my latest collection!",
  "includeAnalytics": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "frameId": "frame_456",
    "frameUrl": "https://frames.credvault.io/frame_456",
    "imageUrl": "https://frames.credvault.io/image/frame_456.png",
    "frameHtml": "<meta property=\"fc:frame\" content=\"vNext\">...",
    "shareText": "🎨 Just launched my new collection on @CredVault! Mint now: https://frames.credvault.io/frame_456",
    "analyticsEnabled": true,
    "expiresAt": "2024-02-01T00:00:00Z"
  }
}
```

### Process Frame Mint
Handle minting transaction from Farcaster Frame.

```typescript
POST /api/frames/mint
Content-Type: application/json

{
  "frameId": "frame_456",
  "fid": 12345,
  "address": "0x...",
  "messageHash": "0x...",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionHash": "0x...",
    "tokenId": 128,
    "mintPrice": "0.05",
    "recipient": "0x...",
    "timestamp": "2024-01-15T12:30:00Z"
  }
}
```

### Get Frame Analytics
Retrieve analytics for a specific Frame.

```typescript
GET /api/frames/:frameId/analytics
Query Parameters:
  - timeframe: "1h" | "24h" | "7d" | "30d" (default: "24h")
```

**Response:**
```json
{
  "success": true,
  "data": {
    "frameId": "frame_456",
    "campaignId": "campaign_123",
    "stats": {
      "views": 1250,
      "clicks": 89,
      "mints": 12,
      "shares": 34,
      "clickRate": 0.071,
      "conversionRate": 0.135
    },
    "sources": {
      "farcaster": 1100,
      "twitter": 100,
      "direct": 50
    },
    "timeline": [
      {
        "timestamp": "2024-01-15T12:00:00Z",
        "views": 45,
        "clicks": 3,
        "mints": 1
      }
    ]
  }
}
```

## Analytics & Events

### Track Event
Record user interaction events for analytics.

```typescript
POST /api/analytics/events
Content-Type: application/json

{
  "event": "campaign_view" | "campaign_mint" | "profile_view" | "frame_click",
  "properties": {
    "campaignId": "campaign_123",
    "userAddress": "0x...",
    "source": "direct" | "farcaster" | "twitter",
    "metadata": {}
  },
  "timestamp": "2024-01-15T12:30:00Z"
}
```

### Get Campaign Analytics
Retrieve detailed analytics for a campaign.

```typescript
GET /api/analytics/campaign/:id
Query Parameters:
  - timeframe: "1h" | "24h" | "7d" | "30d" (default: "24h")
  - metrics: "views,mints,revenue" (comma-separated)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "campaignId": "campaign_123",
    "timeframe": "24h",
    "summary": {
      "views": 1250,
      "uniqueViews": 980,
      "mints": 27,
      "revenue": "1.35",
      "conversionRate": 0.0216
    },
    "timeline": [
      {
        "timestamp": "2024-01-15T12:00:00Z",
        "views": 45,
        "mints": 2,
        "revenue": "0.1"
      }
    ],
    "demographics": {
      "topCountries": ["US", "UK", "CA"],
      "devices": {
        "desktop": 60,
        "mobile": 35,
        "tablet": 5
      }
    }
  }
}
```

## Transactions

### Get Transaction History
Retrieve transaction history for campaigns or profiles.

```typescript
GET /api/transactions
Query Parameters:
  - address: string (filter by user address)
  - campaignId: string (filter by campaign)
  - type: "mint" | "transfer" | "burn" (filter by transaction type)
  - limit: number (default: 20)
  - offset: number (default: 0)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "tx_789",
        "hash": "0x...",
        "type": "mint",
        "campaignId": "campaign_123",
        "from": "0x...",
        "to": "0x...",
        "amount": "0.05",
        "tokenId": 127,
        "timestamp": "2024-01-15T12:30:00Z",
        "status": "confirmed",
        "gasUsed": "21000",
        "gasPrice": "0.000000015"
      }
    ],
    "pagination": {
      "total": 156,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "price",
      "issue": "Must be a positive number"
    }
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `VALIDATION_ERROR` | Invalid request parameters | 400 |
| `AUTHENTICATION_REQUIRED` | Missing or invalid auth token | 401 |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions | 403 |
| `RESOURCE_NOT_FOUND` | Requested resource doesn't exist | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_SERVER_ERROR` | Server encountered an error | 500 |
| `BLOCKCHAIN_ERROR` | Blockchain transaction failed | 503 |

## Rate Limiting

- **Public endpoints**: 100 requests per minute
- **Authenticated endpoints**: 1000 requests per minute
- **Frame endpoints**: 500 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
```

## Webhooks

Subscribe to real-time events for campaigns and transactions.

### Webhook Events
- `campaign.created`
- `campaign.mint`
- `campaign.completed`
- `frame.generated`
- `transaction.confirmed`

### Webhook Payload Example
```json
{
  "event": "campaign.mint",
  "data": {
    "campaignId": "campaign_123",
    "tokenId": 127,
    "minter": "0x...",
    "amount": "0.05",
    "timestamp": "2024-01-15T12:30:00Z"
  },
  "signature": "sha256=..."
}
```

## SDK Support

### JavaScript/TypeScript SDK
```bash
npm install @credvault/sdk
```

```typescript
import { CredVault } from '@credvault/sdk';

const credvault = new CredVault({
  apiKey: 'your-api-key',
  network: 'optimism'
});

// Create campaign
const campaign = await credvault.campaigns.create({
  title: 'My Collection',
  price: '0.05',
  maxSupply: 1000
});
```

## Testing

### Test Endpoints
All endpoints have corresponding test versions with `/test` prefix:
```
POST /api/test/campaigns
GET /api/test/profiles/:address
```

Test endpoints use Optimism Goerli testnet and don't require real transactions.

---

For more examples and detailed implementation guides, see our [Developer Documentation](./DEVELOPMENT.md).
