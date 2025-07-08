import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  optimismRpcUrl: string;
  optimismSepoliaRpcUrl: string;
  zoraApiKey: string | undefined;
  databaseUrl: string | undefined;
  jwtSecret: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  optimismRpcUrl: process.env.OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
  optimismSepoliaRpcUrl: process.env.OPTIMISM_SEPOLIA_RPC_URL || 'https://sepolia.optimism.io',
  zoraApiKey: process.env.ZORA_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'change-this-in-production'
};

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredVars = ['PORT', 'FRONTEND_URL'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName] && varName !== 'PORT') {
      console.warn(`⚠️  Warning: ${varName} environment variable not set`);
    }
  }

  if (config.nodeEnv === 'production') {
    if (!config.zoraApiKey) {
      console.warn('⚠️  Warning: ZORA_API_KEY not set for production');
    }
    if (!config.databaseUrl) {
      console.warn('⚠️  Warning: DATABASE_URL not set for production');
    }
    if (config.jwtSecret === 'change-this-in-production') {
      console.error('🚨 Error: JWT_SECRET must be changed in production');
      process.exit(1);
    }
  }
};
