import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    img: 'img',
    a: 'a',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock wagmi and viem
jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
  }),
  useConnect: () => ({
    connect: jest.fn(),
    connectors: [],
    error: null,
    isLoading: false,
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
  useContractWrite: () => ({
    write: jest.fn(),
    isLoading: false,
    error: null,
  }),
  useContractRead: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  useBalance: () => ({
    data: { formatted: '1.0', symbol: 'ETH' },
    isLoading: false,
  }),
}));

// Mock Zora SDK
jest.mock('@zoralabs/protocol-sdk', () => ({
  ZoraCreator1155Impl: {
    deploy: jest.fn(),
  },
}));

// Mock IPFS
jest.mock('ipfs-http-client', () => ({
  create: () => ({
    add: jest.fn().mockResolvedValue({ cid: 'QmMockCID' }),
  }),
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

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [];
  
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
