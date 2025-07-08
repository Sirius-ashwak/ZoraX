# Task 4: ZoraCred Basic Profile (Reputation Layer)

**Priority**: Must-Have  
**Estimated Time**: 8-10 hours  
**Status**: ⏳ Not Started  
**Dependencies**: Task 3 (Campaign Launch)

## Description
Implement the ZoraCred reputation system with public creator profiles that showcase on-chain achievements, supporter metrics, and visual "aura" indicators based on campaign performance.

## Sub-tasks

### 4.1 Design Basic Public Profile Page UI
- [ ] Create `CreatorProfile.tsx` component
- [ ] Design profile header with creator info
- [ ] Implement profile layout structure
- [ ] Add navigation and sharing options
- [ ] Create responsive design for all devices
- [ ] Apply consistent dark theme styling

**Profile Page Sections:**
- Profile header (avatar, name, wallet address)
- ZoraCred Aura display
- Campaign showcase grid
- Reputation metrics
- Social links and sharing

**Design Requirements:**
- Clean, professional layout
- Dark theme consistency
- Visual hierarchy for key metrics
- Mobile-responsive design
- Shareable URL structure

### 4.2 Implement Data Fetching for Zora CoinV4 Events
- [ ] Create blockchain data service
- [ ] Implement contract event parsing
- [ ] Query Optimism network for creator's contracts
- [ ] Aggregate mint events and volume data
- [ ] Cache data for performance

**Data to Query:**
```typescript
interface CreatorMetrics {
  totalContracts: number;
  totalMints: number;
  totalVolume: {
    eth: string;
    usd: string;
  };
  uniqueSupporters: number;
  averageMintPrice: string;
  firstCampaignDate: Date;
}
```

**Event Types to Track:**
- Contract deployment events
- NFT mint events
- Volume/revenue events
- Transfer events (for secondary sales)

### 4.3 Display Core Reputation Metrics
- [ ] Create metrics display components
- [ ] Show "Total Supporters" count
- [ ] Display "Total Volume (ETH/USD)"
- [ ] Add campaign count and success rate
- [ ] Implement real-time data updates
- [ ] Add historical performance trends

**Key Metrics to Display:**
- Total unique supporters
- Total volume (ETH and USD equivalent)
- Number of campaigns launched
- Average support per campaign
- Creator since date
- Most successful campaign

**Metrics Components:**
```typescript
interface MetricsDisplayProps {
  totalSupporters: number;
  totalVolumeETH: string;
  totalVolumeUSD: string;
  campaignCount: number;
  creatorSince: Date;
}
```

### 4.4 Implement ZoraCred Aura Visual System
- [ ] Design aura visual components
- [ ] Create dynamic glow effects based on metrics
- [ ] Implement aura intensity calculation
- [ ] Add smooth animations and transitions
- [ ] Create different aura levels/tiers

**Aura Calculation Logic:**
```typescript
enum AuraLevel {
  SPARK = 'spark',        // 0-10 supporters
  GLOW = 'glow',          // 11-50 supporters  
  RADIANT = 'radiant',    // 51-200 supporters
  LUMINOUS = 'luminous',  // 201-500 supporters
  LEGENDARY = 'legendary' // 500+ supporters
}

function calculateAuraLevel(supporters: number, volume: number): AuraLevel {
  // Algorithm considering both supporters and volume
}
```

**Visual Elements:**
- Subtle glow around profile picture/header
- Color intensity based on performance
- Animated particles or effects
- Smooth transitions between levels
- Accessibility-friendly alternatives

### 4.5 Add Direct Link to Zora Campaign Pages
- [ ] Create campaign link components
- [ ] Generate Zora campaign URLs
- [ ] Add "View on Zora" buttons
- [ ] Implement external link tracking
- [ ] Add campaign preview cards

**Campaign Links:**
- Direct links to Zora collection pages
- "Mint Now" buttons for active campaigns
- Campaign preview with basic info
- External link indicators
- Analytics tracking for outbound clicks

### 4.6 Ensure Public Accessibility and Sharing
- [ ] Implement SEO optimization
- [ ] Add Open Graph meta tags
- [ ] Create shareable profile URLs
- [ ] Add social media sharing buttons
- [ ] Implement profile URL routing

**SEO and Sharing:**
```typescript
interface ProfileSEO {
  title: string; // "CreatorName's ZoraCred Profile"
  description: string; // Metrics summary
  ogImage: string; // Generated profile preview
  canonicalUrl: string;
}
```

**URL Structure:**
- `/profile/[walletAddress]` or `/profile/[ensName]`
- Clean, shareable URLs
- Support for ENS name resolution
- Proper 404 handling for invalid profiles

## Components to Create

### Core Profile Components
- `CreatorProfile.tsx` - Main profile container
- `ProfileHeader.tsx` - Creator info and avatar
- `AuraDisplay.tsx` - Visual reputation indicator
- `MetricsGrid.tsx` - Key statistics display
- `CampaignShowcase.tsx` - Creator's campaigns grid

### Utility Components
- `ShareButtons.tsx` - Social sharing options
- `ExternalLink.tsx` - Zora campaign links
- `LoadingProfile.tsx` - Profile loading state
- `ProfileNotFound.tsx` - 404 profile state
- `MetricCard.tsx` - Individual metric display

### Data Components
- `useCreatorMetrics.tsx` - Data fetching hook
- `useAuraCalculation.tsx` - Aura level calculation
- `ProfileDataProvider.tsx` - Profile context provider

## Data Flow Architecture

### 1. Profile Route Handler
```typescript
// pages/profile/[address].tsx
export async function getServerSideProps({ params }) {
  const { address } = params;
  const creatorData = await fetchCreatorMetrics(address);
  return { props: { creatorData } };
}
```

### 2. Metrics Calculation Service
```typescript
// services/metricsService.ts
export async function fetchCreatorMetrics(address: string): Promise<CreatorMetrics> {
  // Query blockchain for creator's contracts
  // Aggregate mint events and volume
  // Calculate derived metrics
  // Return formatted data
}
```

### 3. Aura Calculation System
```typescript
// utils/auraCalculator.ts
export function calculateAura(metrics: CreatorMetrics): AuraData {
  const level = determineAuraLevel(metrics);
  const intensity = calculateIntensity(metrics);
  const color = getAuraColor(level);
  return { level, intensity, color };
}
```

## Acceptance Criteria
- [ ] Public creator profiles are accessible via clean URLs
- [ ] All reputation metrics display correctly
- [ ] ZoraCred Aura visual system works smoothly
- [ ] Links to Zora campaigns function properly
- [ ] Profile pages are SEO optimized and shareable
- [ ] Data fetching handles errors gracefully
- [ ] Loading states provide good user experience
- [ ] Responsive design works on all devices
- [ ] Performance is optimized for fast loading

## Technical Requirements
- Server-side rendering for SEO
- Efficient blockchain data querying
- Caching strategy for performance
- Error boundary implementation
- Accessibility compliance
- Analytics integration
- Real-time data updates where appropriate

## Performance Considerations
- Cache blockchain queries aggressively
- Use pagination for large datasets
- Optimize images and animations
- Implement lazy loading for heavy components
- Monitor and optimize Core Web Vitals

## Integration Points
- Optimism blockchain for event data
- Zora API for campaign information
- ENS for name resolution
- IPFS for profile images
- Analytics for usage tracking

## Definition of Done
- [ ] Creator profiles display complete metrics
- [ ] Aura system calculates and displays correctly
- [ ] All external links work properly
- [ ] SEO and sharing features are functional
- [ ] Error handling covers edge cases
- [ ] Performance meets optimization targets
- [ ] Code is tested and documented
- [ ] UI/UX is polished and accessible
