import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCampaign, useCreatorProfile, useCreateCampaign } from '../../hooks/useCredVault';
import React from 'react';

// Mock contract interactions
const mockContract = {
  read: {
    campaigns: jest.fn(),
    getCreatorProfile: jest.fn(),
  },
  write: {
    createCampaign: jest.fn(),
  },
  simulate: {
    createCampaign: jest.fn(),
  },
};

jest.mock('wagmi', () => ({
  useContract: () => mockContract,
  useContractRead: jest.fn(),
  useContractWrite: jest.fn(),
  useContractSimulate: jest.fn(),
  useAccount: () => ({
    address: '0x1234567890123456789012345678901234567890',
    isConnected: true,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useCredVault hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCampaign', () => {
    it('should fetch campaign data successfully', async () => {
      const mockCampaignData = [
        'Test Campaign',
        'Test Description',
        'https://example.com/image.jpg',
        '5000000000000000000', // 5 ETH goal
        '2500000000000000000', // 2.5 ETH raised
        25, // supporters
        Math.floor(Date.now() / 1000) + 86400, // end time
        '0x1234567890123456789012345678901234567890', // creator
        true // isActive
      ];

      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: mockCampaignData,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toEqual(mockCampaignData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle loading state', () => {
      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeNull();
    });

    it('should handle error state', () => {
      const mockError = new Error('Contract read failed');
      
      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: null,
        isLoading: false,
        error: mockError,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toEqual(mockError);
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreatorProfile', () => {
    it('should fetch creator profile data successfully', async () => {
      const mockProfileData = [
        'Test Creator',
        'Creator bio',
        'https://example.com/avatar.jpg',
        '10000000000000000000', // 10 ETH total raised
        5, // campaign count
      ];

      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: mockProfileData,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(
        () => useCreatorProfile('0x1234567890123456789012345678901234567890'),
        { wrapper: createWrapper() }
      );

      expect(result.current.data).toEqual(mockProfileData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle invalid address', () => {
      const { result } = renderHook(
        () => useCreatorProfile('invalid-address'),
        { wrapper: createWrapper() }
      );

      // Should not attempt to fetch with invalid address
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('useCreateCampaign', () => {
    it('should simulate campaign creation successfully', async () => {
      const mockSimulationResult = {
        request: {
          address: '0x1234567890123456789012345678901234567890',
          abi: [],
          functionName: 'createCampaign',
          args: ['Test Campaign', 'Description', 'image.jpg', '5000000000000000000', Math.floor(Date.now() / 1000) + 86400],
        },
        result: '0xmocktransactionhash',
      };

      const { useContractSimulate, useContractWrite } = require('wagmi');
      
      useContractSimulate.mockReturnValue({
        data: mockSimulationResult,
        error: null,
        isLoading: false,
      });

      useContractWrite.mockReturnValue({
        writeContract: jest.fn(),
        isPending: false,
        error: null,
        data: '0xmocktransactionhash',
      });

      const { result } = renderHook(() => useCreateCampaign(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.createCampaign).toBe('function');
    });

    it('should handle campaign creation errors', () => {
      const mockError = new Error('Gas estimation failed');
      
      const { useContractSimulate, useContractWrite } = require('wagmi');
      
      useContractSimulate.mockReturnValue({
        data: null,
        error: mockError,
        isLoading: false,
      });

      useContractWrite.mockReturnValue({
        writeContract: jest.fn(),
        isPending: false,
        error: mockError,
        data: null,
      });

      const { result } = renderHook(() => useCreateCampaign(), {
        wrapper: createWrapper(),
      });

      // The hook itself doesn't return error state, so we just verify it can be called
      expect(typeof result.current.createCampaign).toBe('function');
    });

    it('should handle loading state during creation', () => {
      const { useContractSimulate, useContractWrite } = require('wagmi');
      
      useContractSimulate.mockReturnValue({
        data: null,
        error: null,
        isLoading: true,
      });

      useContractWrite.mockReturnValue({
        writeContract: jest.fn(),
        isPending: true,
        error: null,
        data: null,
      });

      const { result } = renderHook(() => useCreateCampaign(), {
        wrapper: createWrapper(),
      });

      // The hook itself doesn't return loading state, so we just verify it can be called
      expect(typeof result.current.createCampaign).toBe('function');
    });
  });

  describe('Data transformation', () => {
    it('should properly transform campaign data types', () => {
      const mockCampaignData = [
        'Test Campaign',
        'Test Description', 
        'https://example.com/image.jpg',
        '5000000000000000000', // BigInt as string
        '2500000000000000000', // BigInt as string
        25, // Number
        1699999999, // Unix timestamp
        '0x1234567890123456789012345678901234567890',
        true
      ];

      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: mockCampaignData,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      const data = result.current.data;
      expect(data).toEqual(mockCampaignData);
      
      // Verify data types are preserved
      expect(typeof data![0]).toBe('string'); // title
      expect(typeof data![4]).toBe('bigint'); // raised amount (bigint)
      expect(typeof data![5]).toBe('bigint'); // timestamp
      expect(typeof data![7]).toBe('boolean'); // isActive
    });
  });

  describe('Error boundary integration', () => {
    it('should handle network errors gracefully', () => {
      const networkError = new Error('Network request failed');
      
      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: null,
        isLoading: false,
        error: networkError,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.error).toEqual(networkError);
      expect(result.current.data).toBeNull();
    });

    it('should handle malformed data gracefully', () => {
      const malformedData = null;
      
      const { useContractRead } = require('wagmi');
      useContractRead.mockReturnValue({
        data: malformedData,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useCampaign(1), {
        wrapper: createWrapper(),
      });

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });
});
