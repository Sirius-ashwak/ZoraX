// Animation variants for framer-motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

// Reputation badges
export const REPUTATION_BADGES = [
  { name: "Pioneer", color: "purple", description: "Early platform adopter" },
  { name: "Crowd Favorite", color: "cyan", description: "High supporter engagement" },
  { name: "Top Creator", color: "yellow", description: "Exceptional campaign performance" },
  { name: "Rising Star", color: "green", description: "Fast-growing creator" },
  { name: "Art Master", color: "blue", description: "Outstanding artistic contribution" },
  { name: "Community Builder", color: "pink", description: "Strong community engagement" },
  { name: "Innovation Leader", color: "orange", description: "Pioneering new concepts" },
  { name: "Consistency King", color: "teal", description: "Reliable campaign delivery" }
];

// Campaign categories
export const CAMPAIGN_CATEGORIES = [
  'Art',
  'Music',
  'Gaming',
  'Technology',
  'Education',
  'Health',
  'Environment',
  'Social Impact',
  'Entertainment',
  'Fashion',
  'Food & Beverage',
  'Sports',
  'Travel',
  'Literature',
  'Photography'
];

// Network configurations
export const NETWORKS = {
  optimism: {
    id: 10,
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    currency: 'ETH'
  }
};

// Social platforms
export const SOCIAL_PLATFORMS = {
  farcaster: {
    name: 'Farcaster',
    baseUrl: 'https://warpcast.com',
    color: 'purple'
  },
  twitter: {
    name: 'Twitter',
    baseUrl: 'https://twitter.com',
    color: 'blue'
  },
  discord: {
    name: 'Discord',
    baseUrl: 'https://discord.com',
    color: 'indigo'
  }
};