import '@testing-library/jest-dom';
import React from 'react';

// Mock environment variables for tests
process.env.VITE_GITHUB_ENABLED = 'false';
process.env.VITE_GITHUB_OWNER = 'test-owner';
process.env.VITE_GITHUB_REPO = 'test-repo';

// Mock RainbowKit and Wagmi
jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: () => React.createElement('div', { 'data-testid': 'connect-button' }, 'Connect Wallet'),
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: false,
    address: undefined,
  }),
  useConnect: () => ({
    connect: jest.fn(),
    connectors: [],
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
}));

// Mock Wouter router
jest.mock('wouter', () => ({
  useLocation: () => ['/'],
  Link: ({ children, href, ...props }: any) => 
    React.createElement('a', { href, ...props }, children),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    button: ({ children, ...props }: any) => React.createElement('button', props, children),
    span: ({ children, ...props }: any) => React.createElement('span', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Zap: () => React.createElement('div', { 'data-testid': 'zap-icon' }),
  Star: () => React.createElement('div', { 'data-testid': 'star-icon' }),
  Github: () => React.createElement('div', { 'data-testid': 'github-icon' }),
  Users: () => React.createElement('div', { 'data-testid': 'users-icon' }),
  TrendingUp: () => React.createElement('div', { 'data-testid': 'trending-up-icon' }),
  Heart: () => React.createElement('div', { 'data-testid': 'heart-icon' }),
  Crown: () => React.createElement('div', { 'data-testid': 'crown-icon' }),
  Award: () => React.createElement('div', { 'data-testid': 'award-icon' }),
}));

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
