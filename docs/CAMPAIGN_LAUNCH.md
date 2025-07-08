# Campaign Launch System Documentation

## Overview
The campaign launch system allows creators to deploy NFT campaigns with Zora CoinV4 contracts, manage their campaigns through a beautiful dashboard, and track performance metrics.

## Architecture

### Frontend Components

#### CreatorDashboard (`src/components/CreatorDashboard.tsx`)
- **Purpose**: Main dashboard interface for creators
- **Features**:
  - Campaign overview with stats (total campaigns, volume, supporters)
  - Empty state for first-time users
  - Campaign grid with status indicators
  - Responsive design for mobile and desktop
  - Loading and error states

#### CampaignForm (`src/components/CampaignForm.tsx`)
- **Purpose**: Multi-step form for campaign creation
- **Features**:
  - 5-step creation process
  - Real-time form validation
  - Drag-and-drop file upload
  - Progress indicator
  - Review step before submission

#### Form Steps:
1. **Basic Info**: NFT name, symbol, description, duration
2. **NFT Config**: Supply, pricing (ETH/USDC), royalties
3. **Artwork Upload**: Drag-and-drop image upload with preview
4. **Perks Description**: Supporter benefits and rewards
5. **Review**: Final confirmation before deployment

### Backend API

#### Campaign Routes (`backend/src/routes/campaigns.ts`)
- **POST /api/campaigns**: Create new campaign
- **GET /api/campaigns**: Get creator's campaigns
- **GET /api/campaigns/:id**: Get specific campaign details
- **PUT /api/campaigns/:id/status**: Update campaign status

#### Features:
- File upload handling with Multer
- Input validation with Zod
- Error handling and logging
- In-memory storage (ready for database integration)

### Data Management

#### Campaign Service (`src/services/campaignService.ts`)
- **Purpose**: API client for campaign operations
- **Methods**:
  - `createCampaign()`: Submit new campaign
  - `getCampaigns()`: Fetch creator campaigns
  - `getCampaign()`: Get campaign details
  - `updateCampaignStatus()`: Update campaign state

#### Campaign Hook (`src/hooks/useCampaigns.ts`)
- **Purpose**: React state management for campaigns
- **Features**:
  - Automatic data fetching
  - Loading and error states
  - Campaign creation handling
  - Real-time updates

## Data Schema

### Campaign Interface
```typescript
interface Campaign {
  id: string;
  creatorAddress: string;
  contractAddress?: string;
  nftName: string;
  nftSymbol: string;
  description: string;
  duration: number;
  supply: number;
  priceETH: string;
  priceUSDC?: string;
  royaltyPercentage: number;
  imageIPFSHash?: string;
  perkDescription: string;
  status: 'draft' | 'deploying' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

### Form Data Interface
```typescript
interface CampaignFormData {
  nftName: string;
  nftSymbol: string;
  description: string;
  duration: number;
  supply: number;
  priceETH: string;
  priceUSDC?: string;
  royaltyPercentage: number;
  imageFile?: File;
  imagePreview?: string;
  perkDescription: string;
}
```

## User Experience Flow

### Campaign Creation Flow
1. **Dashboard Access**: Creator connects wallet and accesses dashboard
2. **Creation Trigger**: Click "Create Campaign" button
3. **Form Navigation**: Navigate through 5-step form
4. **Validation**: Real-time validation with helpful error messages
5. **File Upload**: Drag-and-drop image upload with preview
6. **Review**: Final review of all entered data
7. **Submission**: Submit campaign data to backend
8. **Processing**: Backend validates and stores campaign
9. **Success**: Return to dashboard with new campaign visible

### Dashboard Experience
- **Empty State**: First-time users see encouraging empty state
- **Campaign Cards**: Visual cards showing campaign status and metrics
- **Stats Overview**: Quick metrics at the top (campaigns, volume, supporters)
- **Status Indicators**: Clear visual status for each campaign
- **Responsive**: Works beautifully on mobile and desktop

## Validation Rules

### Client-side Validation
- **NFT Name**: 3-50 characters, alphanumeric
- **NFT Symbol**: 2-10 characters, uppercase letters
- **Description**: 50-500 characters
- **Supply**: 1-10,000 tokens
- **Price**: Must be > 0 ETH
- **Image**: Required, valid format (PNG/JPG/GIF/SVG), max 10MB

### Server-side Validation
- **Zod Schema**: Comprehensive validation with type safety
- **File Validation**: MIME type and size checks
- **Input Sanitization**: Prevent XSS and injection attacks

## Error Handling

### Frontend
- **Form Errors**: Real-time validation with user-friendly messages
- **Network Errors**: Graceful handling with retry options
- **Loading States**: Clear feedback during operations
- **Error Boundaries**: Prevent crashes with fallback UI

### Backend
- **Input Validation**: Detailed error messages for validation failures
- **File Upload Errors**: Specific messages for upload issues
- **Server Errors**: Proper HTTP status codes and error responses
- **Logging**: Comprehensive error logging for debugging

## File Upload System

### Frontend
- **Drag-and-Drop**: Intuitive drag-and-drop interface
- **File Preview**: Immediate preview of uploaded images
- **Validation**: Client-side file type and size validation
- **Progress**: Upload progress indication

### Backend
- **Multer Integration**: Robust file upload handling
- **File Storage**: Temporary storage with cleanup
- **Validation**: Server-side file validation
- **IPFS Ready**: Architecture ready for IPFS integration

## Status Management

### Campaign Statuses
- **Draft**: Campaign created but not deployed
- **Deploying**: Contract deployment in progress
- **Active**: Campaign live and accepting supporters
- **Completed**: Campaign ended

### Visual Indicators
- **Color Coding**: Green (active), Yellow (deploying), Gray (draft/completed)
- **Status Badges**: Clear status indicators on campaign cards
- **Progress Tracking**: Visual feedback during status changes

## Performance Considerations

### Frontend Optimizations
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Client-side image compression
- **Caching**: Smart caching of campaign data
- **Bundle Splitting**: Efficient code splitting

### Backend Optimizations
- **Input Validation**: Fast validation with Zod
- **Error Handling**: Efficient error processing
- **Memory Management**: Proper cleanup of uploaded files
- **Rate Limiting**: Protection against abuse

## Security Features

### Authentication
- **Wallet-based Auth**: Creator identity via wallet signature
- **Address Validation**: Proper wallet address validation
- **CORS Protection**: Secure cross-origin requests

### Input Security
- **SQL Injection Prevention**: Parameterized queries ready
- **XSS Prevention**: Input sanitization
- **File Upload Security**: MIME type validation and size limits
- **Rate Limiting**: API endpoint protection

## Testing Strategy

### Frontend Testing
- **Component Tests**: Unit tests for all components
- **Hook Tests**: Testing custom hooks behavior
- **Integration Tests**: End-to-end form submission
- **Responsive Tests**: Mobile and desktop compatibility

### Backend Testing
- **API Tests**: Endpoint functionality testing
- **Validation Tests**: Input validation coverage
- **Error Handling Tests**: Error scenario coverage
- **File Upload Tests**: Upload functionality testing

## Future Enhancements

### Immediate (Next Phase)
- **Zora Contract Integration**: Actual contract deployment
- **IPFS Integration**: Decentralized image storage
- **Gas Estimation**: Real-time deployment cost calculation
- **Transaction Monitoring**: Live transaction status updates

### Medium Term
- **Campaign Analytics**: Detailed performance metrics
- **Supporter Management**: Supporter communication tools
- **Revenue Tracking**: Financial dashboard
- **Multi-tier Campaigns**: Multiple support levels

### Long Term
- **Campaign Templates**: Pre-built campaign types
- **Bulk Operations**: Mass campaign management
- **Advanced Analytics**: Deep performance insights
- **Integration Marketplace**: Third-party integrations

## Dependencies

### Frontend
- **React**: UI framework
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **Wagmi**: Web3 integration
- **Lucide React**: Icons

### Backend
- **Express**: Web server
- **Multer**: File uploads
- **Zod**: Input validation
- **CORS**: Cross-origin requests
- **Helmet**: Security headers

## API Documentation

### Create Campaign
```
POST /api/campaigns
Headers: { x-wallet-address: string }
Body: FormData with campaign fields + image file
Response: { success: boolean, campaign: { id, status, createdAt } }
```

### Get Campaigns
```
GET /api/campaigns
Headers: { x-wallet-address: string }
Response: { success: boolean, campaigns: Campaign[] }
```

### Get Campaign
```
GET /api/campaigns/:id
Response: { success: boolean, campaign: Campaign }
```

This campaign launch system provides a complete foundation for creator campaign management with beautiful UI/UX, robust validation, and scalable architecture ready for blockchain integration.
