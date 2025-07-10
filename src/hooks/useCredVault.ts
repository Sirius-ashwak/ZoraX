import { useReadContract, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

// Manually create a mock ABI to resolve import issues
const CredVaultABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "imageUri", "type": "string"},
      {"internalType": "uint256", "name": "goalAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "duration", "type": "uint256"}
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "campaignId", "type": "uint256"},
      {"internalType": "string", "name": "tokenUri", "type": "string"}
    ],
    "name": "supportCampaign",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "campaignId", "type": "uint256"}
    ],
    "name": "getCampaign",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "imageUri", "type": "string"},
      {"internalType": "uint256", "name": "goalAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "raisedAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "bool", "name": "active", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "creator", "type": "address"}
    ],
    "name": "getCreatorProfile",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "bio", "type": "string"},
      {"internalType": "string", "name": "imageUri", "type": "string"},
      {"internalType": "uint256", "name": "totalRaised", "type": "uint256"},
      {"internalType": "uint256", "name": "campaignCount", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalCampaigns",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "creator", "type": "address"}
    ],
    "name": "getCreatorCampaigns",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "supporter", "type": "address"}
    ],
    "name": "getSupporterTokens",
    "outputs": [
      {"internalType": "uint256[]", "name": "", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CREDVAULT_CONTRACT_ADDRESS) || '0x1234567890123456789012345678901234567890';

export function useCredVault() {
  return {
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI,
  };
}

export function useCreateCampaign() {
  const { writeContract } = useWriteContract();

  const createCampaign = (title: string, description: string, imageUri: string, goalAmount: string, duration: number) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CredVaultABI,
      functionName: 'createCampaign',
      args: [title, description, imageUri, parseEther(goalAmount), BigInt(duration)],
    });
  };

  return { createCampaign };
}

export function useSupportCampaign() {
  const { writeContract } = useWriteContract();

  const supportCampaign = (campaignId: number, amount: string, tokenUri: string) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CredVaultABI,
      functionName: 'supportCampaign',
      args: [BigInt(campaignId), tokenUri],
      value: parseEther(amount),
    });
  };

  return { supportCampaign };
}

export function useCampaign(campaignId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredVaultABI,
    functionName: 'getCampaign',
    args: [BigInt(campaignId)],
  });
}

export function useCreatorProfile(address: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredVaultABI,
    functionName: 'getCreatorProfile',
    args: [address as `0x${string}`],
  });
}

export function useTotalCampaigns() {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredVaultABI,
    functionName: 'getTotalCampaigns',
  });
}

export function useCreatorCampaigns(address: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredVaultABI,
    functionName: 'getCreatorCampaigns',
    args: [address as `0x${string}`],
  });
}

export function useSupporterTokens(address: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CredVaultABI,
    functionName: 'getSupporterTokens',
    args: [address as `0x${string}`],
  });
}