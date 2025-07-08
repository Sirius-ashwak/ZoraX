import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism, optimismSepolia } from 'wagmi/chains';
import { http } from 'viem';

// Define RPC URLs with fallbacks
const optimismRpcUrl = import.meta.env.VITE_OPTIMISM_RPC_URL || 'https://mainnet.optimism.io';
const optimismSepoliaRpcUrl = import.meta.env.VITE_OPTIMISM_SEPOLIA_RPC_URL || 'https://sepolia.optimism.io';

export const config = getDefaultConfig({
  appName: 'ZoraX - Creator Economy Platform',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'bc8552ee128eb75bef290f9ed41f7f41',
  chains: [optimism, optimismSepolia],
  transports: {
    [optimism.id]: http(optimismRpcUrl),
    [optimismSepolia.id]: http(optimismSepoliaRpcUrl),
  },
  ssr: false,
});

export { optimism, optimismSepolia };