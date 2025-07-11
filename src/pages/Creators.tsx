import React from 'react';
import { CreatorSearch } from '../components/CreatorSearch';
import { Link } from 'react-router-dom';

export const Creators: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Creators</h1>
        <Link to="/reputation" className="text-accent underline">View Your Reputation Profile</Link>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CreatorSearch />
        </div>
      </div>
    </div>
  );
};
