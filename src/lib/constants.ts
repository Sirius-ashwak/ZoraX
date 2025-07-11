// Animation variants for consistent motion across the app
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
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Common API endpoints
export const API_ENDPOINTS = {
  CAMPAIGNS: '/campaigns',
  CREATORS: '/creators',
  MINTS: '/mints',
  REPUTATION: '/reputation',
  FRAMES: '/frames',
  HEALTH: '/health'
};

// Network configuration
export const NETWORK_CONFIG = {
  OPTIMISM_CHAIN_ID: 10,
  OPTIMISM_CHAIN_ID_HEX: '0xa',
  OPTIMISM_RPC: 'https://mainnet.optimism.io',
  ZORA_CONTRACT_ADDRESS: '0x777777C9898D384F785Ee44Acfe945efDFf5f3E0'
};

// App constants
export const APP_CONFIG = {
  NAME: 'ZoraX',
  DESCRIPTION: 'Creator-Supporter Economic Platform',
  TWITTER_HANDLE: '@ZoraX_Platform',
  DISCORD_INVITE: 'https://discord.gg/zorax',
  DOCS_URL: 'https://docs.zorax.io'
};

// Reputation levels
export const REPUTATION_LEVELS = {
  NOVICE: { min: 0, max: 99, color: 'from-gray-500 to-gray-400', label: 'Novice' },
  APPRENTICE: { min: 100, max: 499, color: 'from-blue-500 to-blue-400', label: 'Apprentice' },
  EXPERT: { min: 500, max: 1999, color: 'from-purple-500 to-purple-400', label: 'Expert' },
  MASTER: { min: 2000, max: 4999, color: 'from-orange-500 to-orange-400', label: 'Master' },
  LEGEND: { min: 5000, max: Infinity, color: 'from-gradient-to-r from-yellow-400 via-pink-500 to-purple-600', label: 'Legend' }
};