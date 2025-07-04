import React from 'react';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { wagmiConfig, chains } from '../config/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme="light">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}