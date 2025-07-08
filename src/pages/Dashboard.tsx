import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';
import { CreatorDashboard } from '../components/CreatorDashboard';
import { CampaignForm, CampaignFormData } from '../components/CampaignForm';
import { useCampaigns } from '../hooks/useCampaigns';
import { campaignService } from '../services/campaignService';

export const Dashboard: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { refreshCampaigns } = useCampaigns();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCampaign = () => {
    setShowCreateForm(true);
  };

  const handleFormSubmit = async (data: CampaignFormData) => {
    if (!address || !data.imageFile) {
      console.error('Missing required data for campaign creation');
      return;
    }

    setIsSubmitting(true);
    try {
      // Use the blockchain-integrated campaign creation
      await campaignService.createCampaignWithBlockchain(data, address, data.imageFile);
      
      // Refresh the campaigns list
      await refreshCampaigns();
      
      // Close the form
      setShowCreateForm(false);
      
      // TODO: Show success message
      console.log('Campaign created successfully with blockchain integration!');
    } catch (error) {
      console.error('Failed to create campaign:', error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Creator Dashboard</h1>
          <p className="text-gray-600 mb-8">Connect your wallet to access your dashboard</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <>
      <CreatorDashboard onCreateCampaign={handleCreateCampaign} />
      
      {/* Create Campaign Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <CampaignForm
              onSubmit={handleFormSubmit}
              onCancel={() => setShowCreateForm(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </>
  );
};
