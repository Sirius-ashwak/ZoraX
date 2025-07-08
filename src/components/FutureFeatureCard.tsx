import React from 'react';

interface FutureFeatureCardProps {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
  timeline?: string;
  className?: string;
}

export const FutureFeatureCard: React.FC<FutureFeatureCardProps> = ({
  title,
  description,
  icon,
  comingSoon = true,
  timeline = "When Uniswap V4 launches",
  className = ''
}) => {
  return (
    <div className={`relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow ${className}`}>
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            Coming Soon
          </span>
        </div>
      )}
      
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg mb-4">
        <span className="text-2xl" role="img" aria-label={title}>
          {icon}
        </span>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Timeline */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeline}
        </div>
      </div>
      
      {/* Disabled interaction overlay */}
      <div className="absolute inset-0 bg-gray-50/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0h-2m8-5a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Available Soon</p>
        </div>
      </div>
    </div>
  );
};
