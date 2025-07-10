import { createPublicClient, http } from 'viem';
import { optimism, optimismSepolia } from 'viem/chains';
import { env } from '../config/env';

// Create blockchain clients
const mainnetClient = createPublicClient({
  chain: optimism,
  transport: http(env.OPTIMISM_RPC_URL)
});

const testnetClient = createPublicClient({
  chain: optimismSepolia,
  transport: http(env.OPTIMISM_SEPOLIA_RPC_URL)
});

// Select client based on environment
const client = env.NODE_ENV === 'production' ? mainnetClient : testnetClient;

export class BlockchainService {
  /**
   * Get the current block number
   */
  async getBlockNumber(): Promise<bigint> {
    try {
      return await client.getBlockNumber();
    } catch (error) {
      console.error('Failed to get block number:', error);
      throw new Error('Blockchain service error: Failed to get block number');
    }
  }

  /**
   * Get ETH balance for an address
   */
  async getBalance(address: `0x${string}`): Promise<bigint> {
    try {
      return await client.getBalance({ address });
    } catch (error) {
      console.error(`Failed to get balance for ${address}:`, error);
      throw new Error(`Blockchain service error: Failed to get balance for ${address}`);
    }
  }

  /**
   * Mock function for campaign data
   * This would be replaced with actual contract calls in production
   */
  async getCampaignData(campaignId: string): Promise<any> {
    // Mock implementation
    return {
      id: campaignId,
      onChainId: parseInt(campaignId),
      title: `Campaign ${campaignId}`,
      raised: BigInt(100) * BigInt(10 ** 18),
      goal: BigInt(1000) * BigInt(10 ** 18),
      supporters: 5,
      active: true
    };
  }
}

export const blockchainService = new BlockchainService();
