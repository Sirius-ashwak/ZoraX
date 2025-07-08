# Task 5: Farcaster Integration

**Priority**: Must-Have  
**Estimated Time**: 6-8 hours  
**Status**: ⏳ Not Started  
**Dependencies**: Task 3 (Campaign Launch), Task 4 (ZoraCred Profile)

## Description
Integrate Farcaster Frames to enable creators to share their campaigns directly on Farcaster with interactive "Mint Now" functionality, expanding the reach and accessibility of CredVault campaigns.

## Sub-tasks

### 5.1 Add "Share on Farcaster" Button
- [ ] Create `ShareOnFarcaster.tsx` component
- [ ] Add button to Creator Dashboard for each campaign
- [ ] Implement button styling consistent with app theme
- [ ] Add copy-to-clipboard functionality for Frame URL
- [ ] Include success/error feedback for sharing actions

**Button Placement:**
- Creator Dashboard campaign cards
- Individual campaign detail pages
- Campaign creation success screen

**Button Features:**
- Copy Frame URL to clipboard
- Direct share to Farcaster (if possible)
- Visual feedback on successful copy
- Error handling for failed operations

### 5.2 Develop Backend Frame Metadata Generation
- [ ] Create `POST /api/frames/generate` endpoint
- [ ] Implement dynamic OpenGraph metadata generation
- [ ] Create Frame-compliant HTML templates
- [ ] Add campaign data integration
- [ ] Implement caching for performance

**Frame Metadata Structure:**
```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="<campaign_image_url>" />
<meta property="fc:frame:button:1" content="Mint Now" />
<meta property="fc:frame:button:1:action" content="tx" />
<meta property="fc:frame:button:1:target" content="<mint_transaction_url>" />
<meta property="fc:frame:post_url" content="<callback_url>" />
```

**API Endpoint:**
```typescript
POST /api/frames/generate
Body: {
  campaignId: string;
  contractAddress: string;
}

Response: {
  frameUrl: string;
  metadata: FrameMetadata;
}
```

### 5.3 Implement Frame Image Generation
- [ ] Create dynamic Frame image service
- [ ] Generate campaign preview images
- [ ] Include campaign details in image
- [ ] Optimize images for Farcaster requirements
- [ ] Add fallback images for errors

**Frame Image Requirements:**
- Aspect ratio: 1.91:1 (recommended)
- Max size: 10MB
- Formats: PNG, JPEG, GIF, WebP
- Minimum dimensions: 600x314px

**Image Content:**
- Campaign NFT artwork
- Campaign name and creator
- Mint price and supply remaining
- "Mint Now" call-to-action
- CredVault branding

### 5.4 Implement Mint Transaction Handling
- [ ] Create Frame transaction endpoint
- [ ] Handle Farcaster Frame button interactions
- [ ] Process mint transactions through Zora CoinV4
- [ ] Implement transaction status tracking
- [ ] Add error handling for failed mints

**Transaction Flow:**
1. User clicks "Mint Now" in Frame
2. Farcaster sends POST to frame endpoint
3. Backend initiates mint transaction
4. Return transaction hash and status
5. Update Frame with transaction result

**Transaction Endpoint:**
```typescript
POST /api/frames/mint
Headers: {
  'X-Farcaster-User-Data': string; // User info from Farcaster
}
Body: {
  campaignId: string;
  contractAddress: string;
  quantity?: number;
}

Response: {
  transactionHash: string;
  status: 'pending' | 'success' | 'failed';
  nextFrameUrl?: string;
}
```

### 5.5 Create Frame URL Generation System
- [ ] Implement Frame URL structure
- [ ] Create unique URLs per campaign
- [ ] Add URL validation and sanitization
- [ ] Implement URL shortening (optional)
- [ ] Add analytics tracking parameters

**URL Structure:**
```
https://credvault.app/frames/campaign/[campaignId]
```

**URL Features:**
- SEO-friendly structure
- Campaign-specific metadata
- Analytics tracking parameters
- Proper error handling for invalid campaigns

### 5.6 Add Frame Analytics and Tracking
- [ ] Track Frame view events
- [ ] Monitor mint conversion rates
- [ ] Log user interactions
- [ ] Create analytics dashboard for creators
- [ ] Implement performance monitoring

**Analytics Events:**
- Frame views
- Button interactions
- Successful mints
- Failed transactions
- User acquisition from Farcaster

## Components to Create

### Frontend Components
- `ShareOnFarcaster.tsx` - Share button component
- `FramePreview.tsx` - Frame preview for creators
- `FrameAnalytics.tsx` - Frame performance metrics
- `CopyFrameUrl.tsx` - URL copy utility

### Backend Services
- `frameService.ts` - Frame generation logic
- `imageService.ts` - Dynamic image generation
- `transactionService.ts` - Mint transaction handling
- `analyticsService.ts` - Frame analytics tracking

### Frame Templates
- `campaign-frame.html` - Base Frame template
- `success-frame.html` - Post-mint success Frame
- `error-frame.html` - Error state Frame

## Frame Implementation Details

### 1. Frame Metadata Generation
```typescript
interface FrameMetadata {
  title: string;
  description: string;
  image: string;
  buttons: FrameButton[];
  postUrl: string;
}

interface FrameButton {
  label: string;
  action: 'post' | 'link' | 'tx';
  target?: string;
}
```

### 2. Dynamic Image Generation
```typescript
async function generateFrameImage(campaign: Campaign): Promise<string> {
  // Use canvas or image generation service
  // Combine campaign artwork with metadata
  // Add CredVault branding
  // Return optimized image URL
}
```

### 3. Transaction Processing
```typescript
async function processMintTransaction(
  campaignId: string,
  userAddress: string,
  quantity: number = 1
): Promise<TransactionResult> {
  // Validate campaign and user
  // Initiate Zora CoinV4 mint
  // Return transaction details
}
```

## Farcaster Frame Specifications

### Required Meta Tags
```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="<image_url>" />
<meta property="fc:frame:button:1" content="Mint Now" />
<meta property="fc:frame:button:1:action" content="tx" />
<meta property="fc:frame:post_url" content="<callback_url>" />
```

### Optional Enhancements
```html
<meta property="fc:frame:button:2" content="View Campaign" />
<meta property="fc:frame:button:2:action" content="link" />
<meta property="fc:frame:button:2:target" content="<campaign_url>" />
<meta property="fc:frame:input:text" content="Quantity to mint" />
```

## Acceptance Criteria
- [ ] "Share on Farcaster" buttons appear in correct locations
- [ ] Frame URLs generate correctly for all campaigns
- [ ] Frame metadata displays properly in Farcaster
- [ ] "Mint Now" button functionality works end-to-end
- [ ] Dynamic images generate with campaign information
- [ ] Transaction processing handles success and error cases
- [ ] Frame URLs are copyable and shareable
- [ ] Analytics track Frame performance
- [ ] Error handling covers edge cases
- [ ] Performance is optimized for fast loading

## Technical Requirements
- Comply with Farcaster Frame v2 specifications
- Handle rate limiting and API quotas
- Implement proper error boundaries
- Cache generated content appropriately
- Monitor transaction success rates
- Ensure Frame responsiveness

## Testing Requirements
- Test Frame rendering in Farcaster clients
- Verify transaction flows work correctly
- Test with different campaign states
- Validate error handling scenarios
- Performance test under load
- Cross-browser compatibility

## Integration Points
- Farcaster Frame API
- Zora CoinV4 for minting
- IPFS for image storage
- Analytics platforms
- Error monitoring services

## Definition of Done
- [ ] Farcaster sharing functionality is complete
- [ ] Frame generation works for all campaigns
- [ ] Mint transactions process successfully
- [ ] Error handling covers all scenarios
- [ ] Analytics tracking is operational
- [ ] Performance meets requirements
- [ ] Code is tested and documented
- [ ] Integration is live and functional
