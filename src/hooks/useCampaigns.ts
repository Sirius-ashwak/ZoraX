import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { campaignService, Campaign } from '../services/campaignService';
import { CampaignFormData } from '../components/CampaignForm';

export interface UseCampaignsResult {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  createCampaign: (formData: CampaignFormData) => Promise<void>;
  refreshCampaigns: () => Promise<void>;
}

export const useCampaigns = (): UseCampaignsResult => {
  const { address } = useAccount();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    if (!address) {
      setCampaigns([]);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await campaignService.getCampaigns(address);
      setCampaigns(response.campaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (formData: CampaignFormData) => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      setError(null);
      await campaignService.createCampaign(formData, address);
      // Refresh campaigns after successful creation
      await fetchCampaigns();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create campaign';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshCampaigns = async () => {
    setLoading(true);
    await fetchCampaigns();
  };

  useEffect(() => {
    fetchCampaigns();
  }, [address]);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    refreshCampaigns,
  };
};

export interface UseCampaignResult {
  campaign: Campaign | null;
  loading: boolean;
  error: string | null;
  updateStatus: (status: Campaign['status'], contractAddress?: string) => Promise<void>;
}

export const useCampaign = (campaignId: string): UseCampaignResult => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaign = async () => {
    if (!campaignId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await campaignService.getCampaign(campaignId);
      setCampaign(response.campaign);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaign');
      setCampaign(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: Campaign['status']) => {
    if (!campaignId) {
      throw new Error('Campaign ID is required');
    }

    try {
      setError(null);
      
      // Update the campaign status
      await campaignService.updateCampaignStatus(campaignId, status);
      
      // Refresh campaign after successful update
      await fetchCampaign();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update campaign status';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [campaignId]);

  return {
    campaign,
    loading,
    error,
    updateStatus,
  };
};
