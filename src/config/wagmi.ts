import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, optimism, base, polygon, arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ZoraX - Creator Economy Platform',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains: [mainnet, optimism, base, polygon, arbitrum],
  ssr: false,
});