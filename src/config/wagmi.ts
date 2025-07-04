import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { optimism, optimismGoerli, hardhat } from 'wagmi/chains';
import { http } from 'viem';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    optimism,
    optimismGoerli,
    ...(process.env.NODE_ENV === 'development' ? [hardhat] : []),
  ],
  [http()]
);

const { connectors } = getDefaultWallets({
  appName: 'CredVault',
  projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };