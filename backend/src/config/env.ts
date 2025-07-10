import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

// Load environment variables from multiple locations
dotenv.config({ path: path.join(__dirname, '../../.env') }); // backend/.env
dotenv.config({ path: path.join(__dirname, '../../../.env') }); // project root .env

// Environment variable schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  
  // Blockchain Configuration
  OPTIMISM_RPC_URL: z.string().default('https://mainnet.optimism.io'),
  OPTIMISM_SEPOLIA_RPC_URL: z.string().default('https://sepolia.optimism.io'),
  
  // API Keys (optional for development)
  ZORA_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  
  // Security
  JWT_SECRET: z.string().default('your_jwt_secret_here_change_in_production'),
});

// Validate and export environment variables
export const env = envSchema.parse(process.env);

// Export individual variables for convenience
export const {
  NODE_ENV,
  PORT,
  FRONTEND_URL,
  OPTIMISM_RPC_URL,
  OPTIMISM_SEPOLIA_RPC_URL,
  ZORA_API_KEY,
  DATABASE_URL,
  JWT_SECRET,
} = env;

// Log configuration in development
if (NODE_ENV === 'development') {
  console.log('🔧 Environment configuration loaded:', {
    NODE_ENV,
    PORT,
    FRONTEND_URL,
    OPTIMISM_RPC_URL: OPTIMISM_RPC_URL.substring(0, 30) + '...',
    ZORA_API_KEY: ZORA_API_KEY ? '***' : 'not set',
    DATABASE_URL: DATABASE_URL ? '***' : 'not set',
    JWT_SECRET: JWT_SECRET ? '***' : 'not set',
  });
}