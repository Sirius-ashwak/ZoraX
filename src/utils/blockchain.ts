import { createPublicClient, http, type PublicClient } from 'viem';
import { optimism, optimismSepolia } from 'wagmi/chains';

// Create public clients for blockchain data fetching
export const optimismClient: PublicClient = createPublicClient({
  chain: optimism,
  transport: http(import.meta.env.VITE_OPTIMISM_RPC_URL || 'https://mainnet.optimism.io')
});

export const optimismSepoliaClient: PublicClient = createPublicClient({
  chain: optimismSepolia,
  transport: http(import.meta.env.VITE_OPTIMISM_SEPOLIA_RPC_URL || 'https://sepolia.optimism.io')
});

// Get the appropriate client based on environment
export const getBlockchainClient = (): PublicClient => {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? optimismSepoliaClient : optimismClient;
};

// Utility function to get current block number
export const getCurrentBlock = async (): Promise<bigint> => {
  const client = getBlockchainClient();
  return await client.getBlockNumber();
};

// Utility function to get ETH balance
export const getETHBalance = async (address: `0x${string}`): Promise<bigint> => {
  const client = getBlockchainClient();
  return await client.getBalance({ address });
};

// Utility function to format ETH amounts
export const formatETH = (wei: bigint, decimals: number = 4): string => {
  const eth = Number(wei) / Math.pow(10, 18);
  return eth.toFixed(decimals);
};

// Check if connected to correct network
export const getCurrentChainId = (): number => {
  const isDevelopment = import.meta.env.DEV;
  return isDevelopment ? optimismSepolia.id : optimism.id;
};

// Network switching utilities
export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case optimism.id:
      return 'Optimism';
    case optimismSepolia.id:
      return 'Optimism Sepolia';
    default:
      return 'Unknown Network';
  }
};
