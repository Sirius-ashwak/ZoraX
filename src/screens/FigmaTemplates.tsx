// Template screens based on common CredVault patterns
// You can customize these based on your Figma designs

import React from 'react';

// 1. Landing/Home Screen Template
export const LandingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              CredVault
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Monetize your work. Prove your value. Grow your onchain identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-900 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                Launch Campaign
              </button>
              <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all">
                Explore Campaigns
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CredVault?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The ultimate platform for creators to monetize their work and build their onchain reputation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature cards would go here */}
          </div>
        </div>
      </section>
    </div>
  );
};

// 2. Campaign Creation Screen Template
export const CampaignCreationScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Create Campaign</h1>
          <p className="text-gray-600 mt-2">Launch your Supporter Pass NFT campaign</p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Campaign creation form would go here */}
        </div>
      </main>
    </div>
  );
};

// 3. Profile Screen Template
export const ProfileScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Profile content would go here */}
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile sections would go here */}
      </div>
    </div>
  );
};
