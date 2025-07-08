import React from 'react';
import { UniswapTooltip } from './UniswapTooltip';

interface UniswapBadgeProps {
  variant?: 'profile' | 'campaign' | 'nft' | 'small';
  showTooltip?: boolean;
  className?: string;
}

export const UniswapBadge: React.FC<UniswapBadgeProps> = ({
  variant = 'campaign',
  showTooltip = true,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center gap-1.5 font-semibold text-white rounded-md transition-all duration-200 hover:transform hover:-translate-y-0.5";
  
  const variantClasses = {
    profile: "px-3 py-1.5 text-sm",
    campaign: "px-2.5 py-1 text-xs",
    nft: "px-2 py-1 text-xs",
    small: "px-2 py-0.5 text-xs"
  };

  const variantStyles = {
    profile: "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:shadow-pink-500/30",
    campaign: "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-md hover:shadow-pink-500/25",
    nft: "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-md hover:shadow-pink-500/25",
    small: "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-sm hover:shadow-pink-500/20"
  };

  const iconSize = variant === 'profile' ? 'w-4 h-4' : 'w-3 h-3';

  const UniswapIcon = () => (
    <svg 
      className={iconSize} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.868 14.62a4.655 4.655 0 0 1-1.936-3.745c0-2.565 2.075-4.64 4.64-4.64a4.655 4.655 0 0 1 3.745 1.936l.743-.743A5.84 5.84 0 0 0 8.572 5.05a5.827 5.827 0 0 0-5.827 5.827c0 1.857.87 3.513 2.223 4.583zm12.264-5.24a4.655 4.655 0 0 1 1.936 3.745c0 2.565-2.075 4.64-4.64 4.64a4.655 4.655 0 0 1-3.745-1.936l-.743.743a5.84 5.84 0 0 0 4.488 2.078 5.827 5.827 0 0 0 5.827-5.827c0-1.857-.87-3.513-2.223-4.583z"/>
      <circle cx="8.572" cy="8.572" r="2.922"/>
      <circle cx="15.428" cy="15.428" r="2.922"/>
    </svg>
  );

  const badgeContent = (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${variantStyles[variant]} ${className}`}
      role="img"
      aria-label="Uniswap V4 Compatible"
    >
      <UniswapIcon />
      <span>V4 Ready</span>
    </div>
  );

  if (showTooltip) {
    return (
      <UniswapTooltip variant={variant}>
        {badgeContent}
      </UniswapTooltip>
    );
  }

  return badgeContent;
};
