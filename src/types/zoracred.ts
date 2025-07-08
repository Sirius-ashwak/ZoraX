/**
 * ZoraCred Profile Types and Interfaces
 */

export enum AuraLevel {
  SPARK = 'spark',        // 0-10 supporters
  GLOW = 'glow',          // 11-50 supporters  
  RADIANT = 'radiant',    // 51-200 supporters
  LUMINOUS = 'luminous',  // 201-500 supporters
  LEGENDARY = 'legendary' // 500+ supporters
}

export interface CreatorMetrics {
  totalContracts: number;
  totalMints: number;
  totalVolume: {
    eth: string;
    usd: string;
  };
  uniqueSupporters: number;
  averageMintPrice: string;
  firstCampaignDate: Date;
  successfulCampaigns: number;
  activeContracts: number;
}

export interface ZoraCampaign {
  id: string;
  contractAddress: string;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  totalMints: number;
  maxSupply: number;
  priceETH: string;
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
  zoraUrl: string;
}

export interface CreatorProfile {
  address: string;
  name?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  twitter?: string;
  farcaster?: string;
  metrics: CreatorMetrics;
  auraLevel: AuraLevel;
  campaigns: ZoraCampaign[];
  joinedAt: Date;
  lastActivityAt: Date;
}

export interface AuraConfig {
  level: AuraLevel;
  name: string;
  color: string;
  glowColor: string;
  description: string;
  minSupporters: number;
  intensity: number;
}

export const AURA_CONFIGS: Record<AuraLevel, AuraConfig> = {
  [AuraLevel.SPARK]: {
    level: AuraLevel.SPARK,
    name: 'Spark',
    color: '#fbbf24', // amber-400
    glowColor: 'rgba(251, 191, 36, 0.4)',
    description: 'Just getting started',
    minSupporters: 0,
    intensity: 0.3,
  },
  [AuraLevel.GLOW]: {
    level: AuraLevel.GLOW,
    name: 'Glow',
    color: '#10b981', // emerald-500
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Building momentum',
    minSupporters: 11,
    intensity: 0.5,
  },
  [AuraLevel.RADIANT]: {
    level: AuraLevel.RADIANT,
    name: 'Radiant',
    color: '#3b82f6', // blue-500
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description: 'Strong community',
    minSupporters: 51,
    intensity: 0.7,
  },
  [AuraLevel.LUMINOUS]: {
    level: AuraLevel.LUMINOUS,
    name: 'Luminous',
    color: '#8b5cf6', // violet-500
    glowColor: 'rgba(139, 92, 246, 0.4)',
    description: 'Established creator',
    minSupporters: 201,
    intensity: 0.9,
  },
  [AuraLevel.LEGENDARY]: {
    level: AuraLevel.LEGENDARY,
    name: 'Legendary',
    color: '#ec4899', // pink-500
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description: 'Creator legend',
    minSupporters: 500,
    intensity: 1.0,
  },
};

/**
 * Calculate aura level based on metrics
 */
export function calculateAuraLevel(
  supporters: number, 
  volumeETH: number,
  campaignCount: number
): AuraLevel {
  // Weight factors for different metrics
  const supporterWeight = 0.6;
  const volumeWeight = 0.3;
  const campaignWeight = 0.1;
  
  // Normalize metrics to comparable scales
  const normalizedSupporters = supporters;
  const normalizedVolume = volumeETH * 100; // Scale volume impact
  const normalizedCampaigns = campaignCount * 10; // Scale campaign impact
  
  // Calculate weighted score
  const score = 
    normalizedSupporters * supporterWeight +
    normalizedVolume * volumeWeight +
    normalizedCampaigns * campaignWeight;
  
  // Determine level based on thresholds
  if (score >= 500) return AuraLevel.LEGENDARY;
  if (score >= 200) return AuraLevel.LUMINOUS;
  if (score >= 50) return AuraLevel.RADIANT;
  if (score >= 10) return AuraLevel.GLOW;
  return AuraLevel.SPARK;
}

/**
 * Generate aura styles for CSS
 */
export function getAuraStyles(level: AuraLevel): {
  boxShadow: string;
  border: string;
  animation: string;
} {
  const config = AURA_CONFIGS[level];
  const intensity = config.intensity;
  
  return {
    boxShadow: `
      0 0 ${20 * intensity}px ${config.glowColor},
      0 0 ${40 * intensity}px ${config.glowColor},
      0 0 ${60 * intensity}px ${config.glowColor}
    `,
    border: `2px solid ${config.color}`,
    animation: `aura-pulse-${level} ${2 + intensity}s ease-in-out infinite alternate`,
  };
}

/**
 * Profile SEO metadata
 */
export interface ProfileSEO {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
  keywords: string[];
}

export function generateProfileSEO(profile: CreatorProfile): ProfileSEO {
  const creatorName = profile.name || `Creator ${profile.address.slice(0, 6)}...${profile.address.slice(-4)}`;
  const supporterCount = profile.metrics.uniqueSupporters;
  const volumeETH = parseFloat(profile.metrics.totalVolume.eth);
  
  return {
    title: `${creatorName}'s ZoraCred Profile | CredVault`,
    description: `${creatorName} has ${supporterCount} supporters and ${volumeETH.toFixed(2)} ETH in total volume across ${profile.metrics.totalContracts} campaigns. ${AURA_CONFIGS[profile.auraLevel].name} level creator on CredVault.`,
    ogImage: `/api/og/profile/${profile.address}`, // Dynamic OG image endpoint
    canonicalUrl: `/profile/${profile.address}`,
    keywords: [
      'ZoraCred',
      'Creator Profile',
      'NFT Creator',
      'Zora',
      'Web3 Creator',
      creatorName,
      profile.auraLevel,
    ],
  };
}
