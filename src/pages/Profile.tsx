import React from 'react';
import { CreatorProfile } from '../components/CreatorProfile';
import { isAddress } from 'viem';

interface ProfileProps {
  address?: string;
  onNavigateBack?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ address, onNavigateBack }) => {
  // Validate that address is a valid Ethereum address
  if (!address || !isAddress(address)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Address</h2>
          <p className="text-gray-600 mb-6">Please provide a valid Ethereum address.</p>
          {onNavigateBack && (
            <button
              onClick={onNavigateBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreatorProfile address={address} />
      </div>
    </div>
  );
};
