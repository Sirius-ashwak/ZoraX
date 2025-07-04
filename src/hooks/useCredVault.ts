import { useContract, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import CredVaultABI from '../../artifacts/contracts/CredVault.sol/CredVault.json';

const CONTRACT_ADDRESS = process.env.VITE_CREDVAULT_CONTRACT_ADDRESS || '0x...';

export function useCredVault() {
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
  });

  return contract;
}

export function useCreateCampaign() {
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'createCampaign',
  });

  return useContractWrite(config);
}

export function useSupportCampaign(campaignId: number, amount: string, tokenUri: string) {
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'supportCampaign',
    args: [campaignId, tokenUri],
    value: parseEther(amount),
  });

  return useContractWrite(config);
}

export function useCampaign(campaignId: number) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'getCampaign',
    args: [campaignId],
  });
}

export function useCreatorProfile(address: string) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'getCreatorProfile',
    args: [address],
  });
}

export function useTotalCampaigns() {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'getTotalCampaigns',
  });
}

export function useCreatorCampaigns(address: string) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'getCreatorCampaigns',
    args: [address],
  });
}

export function useSupporterTokens(address: string) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CredVaultABI.abi,
    functionName: 'getSupporterTokens',
    args: [address],
  });
}