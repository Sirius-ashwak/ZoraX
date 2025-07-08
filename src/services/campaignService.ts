import { CampaignFormData } from '../components/CampaignForm';
import { zoraContractService, campaignToZoraParams, ZoraContractDeployment } from './zoraContractService';
import { ipfsService, createNFTMetadata } from './ipfsService';
import { gasEstimationService, GasEstimation } from './gasEstimationService';
import { Address } from 'viem';

export interface Campaign {
  id: string;
  creatorAddress: string;
  contractAddress?: string;
  transactionHash?: string;
  nftName: string;
  nftSymbol: string;
  description: string;
  duration: number;
  supply: number;
  priceETH: string;
  priceUSDC?: string;
  royaltyPercentage: number;
  imageIPFSHash?: string;
  metadataIPFSHash?: string;
  perkDescription: string;
  status: 'draft' | 'uploading' | 'deploying' | 'active' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  gasEstimation?: GasEstimation;
  deploymentResult?: ZoraContractDeployment;
}

export interface CreateCampaignResponse {
  success: boolean;
  campaign: {
    id: string;
    status: string;
    createdAt: string;
  };
}

export interface GetCampaignsResponse {
  success: boolean;
  campaigns: Campaign[];
}

export interface CampaignError {
  error: string;
  details?: any;
}

class CampaignService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  /**
   * Create a new campaign
   */
  async createCampaign(
    formData: CampaignFormData, 
    walletAddress: string
  ): Promise<CreateCampaignResponse> {
    const form = new FormData();
    
    // Add form fields
    form.append('nftName', formData.nftName);
    form.append('nftSymbol', formData.nftSymbol);
    form.append('description', formData.description);
    form.append('duration', formData.duration.toString());
    form.append('supply', formData.supply.toString());
    form.append('priceETH', formData.priceETH);
    form.append('royaltyPercentage', formData.royaltyPercentage.toString());
    form.append('perkDescription', formData.perkDescription);
    
    if (formData.priceUSDC) {
      form.append('priceUSDC', formData.priceUSDC);
    }
    
    if (formData.imageFile) {
      form.append('imageFile', formData.imageFile);
    }

    const response = await fetch(`${this.baseURL}/campaigns`, {
      method: 'POST',
      headers: {
        'x-wallet-address': walletAddress,
      },
      body: form,
    });

    if (!response.ok) {
      const error: CampaignError = await response.json();
      throw new Error(error.error || 'Failed to create campaign');
    }

    return response.json();
  }

  /**
   * Get campaigns for a creator
   */
  async getCampaigns(walletAddress: string): Promise<GetCampaignsResponse> {
    const response = await fetch(`${this.baseURL}/campaigns`, {
      headers: {
        'x-wallet-address': walletAddress,
      },
    });

    if (!response.ok) {
      const error: CampaignError = await response.json();
      throw new Error(error.error || 'Failed to fetch campaigns');
    }

    return response.json();
  }

  /**
   * Get specific campaign details
   */
  async getCampaign(campaignId: string): Promise<{ success: boolean; campaign: Campaign }> {
    const response = await fetch(`${this.baseURL}/campaigns/${campaignId}`);

    if (!response.ok) {
      const error: CampaignError = await response.json();
      throw new Error(error.error || 'Failed to fetch campaign');
    }

    return response.json();
  }

  /**
   * Create a new campaign with full blockchain integration
   */
  async createCampaignWithBlockchain(
    formData: CampaignFormData,
    creatorAddress: Address,
    imageFile: File
  ): Promise<Campaign> {
    try {
      console.log('Starting campaign creation with blockchain integration...');

      // Step 1: Upload image and metadata to IPFS
      console.log('Uploading assets to IPFS...');
      const nftMetadata = createNFTMetadata(formData);
      const ipfsResults = await ipfsService.uploadCampaignAssets(imageFile, nftMetadata);

      // Step 2: Get gas estimation
      console.log('Estimating gas costs...');
      // Note: Gas estimation will be done in real-time during deployment

      // Step 3: Create campaign record in database
      console.log('Creating campaign record...');
      const enhancedFormData = {
        ...formData,
        imageFile, // Keep the original image file for the existing API
      };

      const campaignResponse = await this.createCampaign(enhancedFormData, creatorAddress);

      // Step 4: Deploy Zora contract
      console.log('Deploying Zora contract...');
      try {
        // Update status to deploying
        await this.updateCampaignStatus(campaignResponse.campaign.id, 'deploying');

        // Create Zora deployment parameters
        const zoraParams = campaignToZoraParams(formData, creatorAddress, ipfsResults.metadataResult.url);
        const deploymentResult = await zoraContractService.deployZoraContract(zoraParams);
        
        // Update campaign with deployment results
        const updatedCampaign = await this.updateCampaignAfterDeployment(campaignResponse.campaign.id, deploymentResult);
        
        console.log('Campaign created successfully with blockchain integration!');
        return updatedCampaign;
      } catch (deploymentError) {
        console.error('Contract deployment failed:', deploymentError);
        // Update status to failed
        await this.updateCampaignStatus(campaignResponse.campaign.id, 'failed');
        throw deploymentError;
      }
    } catch (error) {
      console.error('Failed to create campaign with blockchain integration:', error);
      throw new Error(`Campaign creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get gas estimation for campaign deployment
   */
  async getGasEstimation(_formData: CampaignFormData, _creatorAddress: Address): Promise<GasEstimation> {
    try {
      // Use the gas estimation service for contract deployment
      return await gasEstimationService.estimateContractDeployment('0x', [], { speed: 'standard' });
    } catch (error) {
      console.error('Failed to estimate gas:', error);
      throw new Error(`Gas estimation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update campaign status
   */
  async updateCampaignStatus(campaignId: string, status: Campaign['status']): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/campaigns/${campaignId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update campaign status: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to update campaign status:', error);
      throw error;
    }
  }

  /**
   * Update campaign after successful deployment
   */
  async updateCampaignAfterDeployment(
    campaignId: string, 
    deploymentResult: ZoraContractDeployment
  ): Promise<Campaign> {
    try {
      const response = await fetch(`${this.baseURL}/campaigns/${campaignId}/deployment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractAddress: deploymentResult.contractAddress,
          transactionHash: deploymentResult.transactionHash,
          status: 'active',
          deploymentResult,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update campaign after deployment: ${response.statusText}`);
      }

      const data = await response.json();
      return data.campaign;
    } catch (error) {
      console.error('Failed to update campaign after deployment:', error);
      throw error;
    }
  }

  /**
   * Get campaign contract information
   */
  async getCampaignContractInfo(contractAddress: Address): Promise<{
    name: string;
    symbol: string;
    totalSupply: number;
    maxSupply: number;
    owner: Address;
  }> {
    try {
      return await zoraContractService.getContractInfo(contractAddress);
    } catch (error) {
      console.error('Failed to get contract info:', error);
      throw error;
    }
  }

  /**
   * Monitor campaign deployment status
   */
  async monitorDeployment(transactionHash: string): Promise<Campaign['status']> {
    try {
      const status = await zoraContractService.monitorDeployment(transactionHash);
      return status === 'success' ? 'active' : 'failed';
    } catch (error) {
      console.error('Failed to monitor deployment:', error);
      return 'failed';
    }
  }
}

export const campaignService = new CampaignService();
