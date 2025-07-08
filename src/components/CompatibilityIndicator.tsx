import React from 'react';
import { UniswapBadge } from './UniswapBadge';

interface CompatibilityIndicatorProps {
  showBadge?: boolean;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CompatibilityIndicator: React.FC<CompatibilityIndicatorProps> = ({
  showBadge = true,
  showDetails = false,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const compatibilityFeatures = [
    { name: 'ERC-20 Standard', status: 'active' },
    { name: 'Uniswap V4 Hooks', status: 'ready' },
    { name: 'Liquidity Provision', status: 'ready' },
    { name: 'Custom Fee Tiers', status: 'ready' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {showBadge && (
        <div className="flex items-center gap-2">
          <UniswapBadge variant="small" />
          <span className={`text-gray-600 ${sizeClasses[size]}`}>
            Compatible with Uniswap V4
          </span>
        </div>
      )}
      
      {showDetails && (
        <div className="space-y-2">
          <h4 className={`font-medium text-gray-900 ${sizeClasses[size]}`}>
            Compatibility Features
          </h4>
          <div className="space-y-1">
            {compatibilityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`text-gray-600 ${sizeClasses[size]}`}>
                  {feature.name}
                </span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                  {feature.status === 'active' ? '✓' : '🔜'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
