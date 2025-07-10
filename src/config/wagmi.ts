import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ZoraX - Creator Economy Platform',
  projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [optimism],
  ssr: false,
});