import React from 'react';

interface TradingPreviewProps {
  contractAddress?: string;
  campaignId?: string;
  className?: string;
}

export const TradingPreview: React.FC<TradingPreviewProps> = ({
  className = ''
}) => {
  const mockPriceData = [
    { time: '00:00', price: 0.1 },
    { time: '04:00', price: 0.12 },
    { time: '08:00', price: 0.15 },
    { time: '12:00', price: 0.18 },
    { time: '16:00', price: 0.16 },
    { time: '20:00', price: 0.19 },
    { time: '24:00', price: 0.22 }
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Future Trading Interface</h3>
            <p className="text-pink-100 text-sm">Available when Uniswap V4 launches</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-xs font-medium">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Trading Interface Preview */}
      <div className="p-6 space-y-6">
        {/* Price Chart */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Price Chart</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Current Price:</span>
              <span className="font-semibold text-green-600">$0.22</span>
              <span className="text-xs text-green-600">+22%</span>
            </div>
          </div>
          
          <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="url(#priceGradient)"
                strokeWidth="2"
                points="0,80 60,70 120,50 180,30 240,35 300,25 360,15"
              />
              <circle cx="360" cy="15" r="3" fill="#8b5cf6" />
            </svg>
            
            {/* Mock time labels */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-between text-xs text-gray-400">
              {mockPriceData.map((point, index) => (
                <span key={index}>{point.time}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Trading Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buy Panel */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Buy Supporter Passes</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">You Pay</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="0.0"
                    className="w-20 text-right bg-transparent border-none outline-none"
                    disabled
                  />
                  <span className="text-sm font-medium">ETH</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">You Get</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="0.0"
                    className="w-20 text-right bg-transparent border-none outline-none"
                    disabled
                  />
                  <span className="text-sm font-medium">PASS</span>
                </div>
              </div>
              <button
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Available on Uniswap V4
              </button>
            </div>
          </div>

          {/* Liquidity Panel */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Provide Liquidity</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Pool Share</span>
                  <span className="text-sm font-medium">0.00%</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Fee Tier</span>
                  <span className="text-sm font-medium">0.30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">APR</span>
                  <span className="text-sm font-medium text-green-600">~12.5%</span>
                </div>
              </div>
              <button
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Add Liquidity (V4)
              </button>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Uniswap V4 Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm">🚀</span>
              </div>
              <p className="text-xs text-gray-600">Custom Hooks</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm">⚡</span>
              </div>
              <p className="text-xs text-gray-600">Gas Optimization</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm">🔧</span>
              </div>
              <p className="text-xs text-gray-600">Advanced Features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
