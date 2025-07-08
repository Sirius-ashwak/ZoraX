import React, { useState } from 'react';

interface UniswapTooltipProps {
  children: React.ReactNode;
  variant?: 'profile' | 'campaign' | 'nft' | 'small';
  className?: string;
}

export const UniswapTooltip: React.FC<UniswapTooltipProps> = ({
  children,
  variant = 'campaign',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipContent = {
    profile: {
      title: "Uniswap V4 Compatible",
      description: "This creator's campaigns use Zora CoinV4, making supporter passes compatible with Uniswap V4 for future trading.",
      benefits: [
        "Enhanced liquidity and trading",
        "Custom programmable hooks",
        "Reduced gas fees",
        "Better price discovery"
      ]
    },
    campaign: {
      title: "Uniswap V4 Ready",
      description: "Supporter passes from this campaign will be tradeable on Uniswap V4 when it launches.",
      benefits: [
        "Trade supporter passes seamlessly",
        "Provide liquidity and earn fees",
        "Access advanced DeFi features"
      ]
    },
    nft: {
      title: "DeFi Compatible NFT",
      description: "This NFT is built on CoinV4 protocol, enabling future trading on Uniswap V4 with enhanced features.",
      benefits: [
        "Trade on Uniswap V4",
        "Enhanced capital efficiency",
        "Programmable trading features"
      ]
    },
    small: {
      title: "V4 Compatible",
      description: "Compatible with Uniswap V4 for enhanced trading capabilities.",
      benefits: [
        "Future trading ready",
        "DeFi integration"
      ]
    }
  };

  const content = tooltipContent[variant];

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div
          className="absolute z-50 w-80 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl left-1/2 transform -translate-x-1/2"
          role="tooltip"
          aria-live="polite"
        >
          {/* Arrow */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg 
                  className="w-3 h-3 text-white" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M5.868 14.62a4.655 4.655 0 0 1-1.936-3.745c0-2.565 2.075-4.64 4.64-4.64a4.655 4.655 0 0 1 3.745 1.936l.743-.743A5.84 5.84 0 0 0 8.572 5.05a5.827 5.827 0 0 0-5.827 5.827c0 1.857.87 3.513 2.223 4.583zm12.264-5.24a4.655 4.655 0 0 1 1.936 3.745c0 2.565-2.075 4.64-4.64 4.64a4.655 4.655 0 0 1-3.745-1.936l-.743.743a5.84 5.84 0 0 0 4.488 2.078 5.827 5.827 0 0 0 5.827-5.827c0-1.857-.87-3.513-2.223-4.583z"/>
                  <circle cx="8.572" cy="8.572" r="2.922"/>
                  <circle cx="15.428" cy="15.428" r="2.922"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">{content.title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              {content.description}
            </p>
            
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Benefits:
              </p>
              <ul className="space-y-1">
                {content.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Powered by Zora CoinV4 • Compatible with Uniswap V4
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
