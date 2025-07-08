import React from 'react';
import { UniswapBadge } from './UniswapBadge';
import { TradingPreview } from './TradingPreview';

interface UniswapIntegrationSectionProps {
  contractAddress?: string;
  campaignId?: string;
  showPreview?: boolean;
  className?: string;
}

export const UniswapIntegrationSection: React.FC<UniswapIntegrationSectionProps> = ({
  contractAddress,
  campaignId,
  showPreview = false,
  className = ''
}) => {
  const integrationBenefits = [
    {
      title: "Enhanced Liquidity",
      description: "Trade supporter passes with improved capital efficiency",
      icon: "💧"
    },
    {
      title: "Custom Hooks", 
      description: "Leverage Uniswap V4's programmable hooks for advanced features",
      icon: "🔧"
    },
    {
      title: "Reduced Fees",
      description: "Benefit from V4's optimized fee structure",
      icon: "💰"
    },
    {
      title: "Better Price Discovery",
      description: "Access deeper liquidity and more accurate pricing",
      icon: "📊"
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">🦄</span>
            DeFi Integration
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Built for the future of decentralized finance
          </p>
        </div>
        <UniswapBadge variant="profile" />
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrationBenefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" role="img" aria-label={benefit.title}>
                {benefit.icon}
              </span>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                <path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              CoinV4 Protocol Integration
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Your supporter passes are built on Zora's CoinV4 protocol, ensuring seamless 
              compatibility with Uniswap V4 when it launches. This integration will unlock 
              advanced trading features, enhanced liquidity, and new DeFi opportunities.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                ERC-20 Compatible
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                V4 Hooks Ready
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Liquidity Provider Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Preview */}
      {showPreview && (
        <TradingPreview 
          contractAddress={contractAddress}
          campaignId={campaignId}
        />
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-2">Ready for Uniswap V4</h4>
            <p className="text-pink-100 text-sm">
              Your supporter passes will be tradeable on Uniswap V4 with enhanced features
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              onClick={() => window.open('https://uniswap.org/whitepaper-v4.pdf', '_blank')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
