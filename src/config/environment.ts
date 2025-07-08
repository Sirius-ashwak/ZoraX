// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 
           (import.meta.env.PROD 
             ? 'https://zorax-backend.onrender.com' 
             : 'http://localhost:3001'),
  timeout: 10000,
  retries: 3
};

// Environment-specific configurations
export const ENV_CONFIG = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'bc8552ee128eb75bef290f9ed41f7f41',
  optimismRpcUrl: import.meta.env.VITE_OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
  optimismSepoliaRpcUrl: import.meta.env.VITE_OPTIMISM_SEPOLIA_RPC_URL || 'https://sepolia.optimism.io',
  zoraApiBaseUrl: import.meta.env.VITE_ZORA_API_BASE_URL || 'https://api.zora.co',
  credVaultContractAddress: import.meta.env.VITE_ZORAX_CONTRACT_ADDRESS
};

// Logging configuration
export const LOGGING_CONFIG = {
  enableConsoleLogging: !import.meta.env.PROD,
  enableAnalytics: import.meta.env.PROD,
  logLevel: import.meta.env.VITE_LOG_LEVEL || (import.meta.env.PROD ? 'error' : 'debug')
};
