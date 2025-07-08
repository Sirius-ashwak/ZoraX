import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// Re-export testing library functions
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Re-export specific functions that tests need
export { screen, fireEvent, waitFor } from '@testing-library/react';

// Mock config for testing
const mockConfig = {} as any;

const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <WagmiProvider config={mockConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) =>
  render(ui, {
    wrapper: TestProviders,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };

// Helper functions for testing
export const mockCampaignData = {
  title: 'Test Campaign',
  description: 'Test Description',
  goalAmount: '5.0',
  raisedAmount: '2.5',
  supporterCount: 25,
  endTime: Date.now() / 1000 + 86400 * 30,
  creator: '0x1234567890123456789012345678901234567890',
  isActive: true,
};

export const mockCreatorProfile = {
  name: 'Test Creator',
  bio: 'Test bio',
  avatar: 'https://example.com/avatar.jpg',
  auraLevel: 'spark' as const,
  metrics: {
    totalVolume: '10.5',
    uniqueSupporters: 50,
    averageMintPrice: '0.1',
    firstCampaignDate: new Date(),
    successfulCampaigns: 5,
    activeContracts: 3,
  },
  campaigns: [],
};

export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 100));
