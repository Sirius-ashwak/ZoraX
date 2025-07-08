import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CreatorProfile } from '../components/CreatorProfile';
import { isAddress } from 'viem';

export const Profile: React.FC = () => {
  const { address } = useParams<{ address: string }>();

  // Validate that address is a valid Ethereum address
  if (!address || !isAddress(address)) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreatorProfile address={address} />
      </div>
    </div>
  );
};
