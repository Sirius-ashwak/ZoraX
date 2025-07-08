import React, { useState, useEffect } from 'react';
import { Eye, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FramePreviewProps {
  campaignId: string;
  campaignTitle: string;
  campaignImage: string;
  creatorName: string;
  mintPrice: string;
  totalSupply?: number;
  className?: string;
}

interface FrameMetadata {
  title: string;
  description: string;
  image: string;
  buttons: Array<{
    label: string;
    action: string;
    target?: string;
  }>;
  postUrl: string;
}

export const FramePreview: React.FC<FramePreviewProps> = ({
  campaignId,
  campaignTitle,
  campaignImage,
  creatorName,
  mintPrice,
  totalSupply,
  className = ''
}) => {
  const [frameMetadata, setFrameMetadata] = useState<FrameMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFramePreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/frames/preview/${campaignId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load Frame preview');
      }
      
      const data = await response.json();
      setFrameMetadata(data.metadata);
    } catch (err) {
      console.error('Error loading Frame preview:', err);
      setError('Failed to load Frame preview');
      
      // Fallback metadata
      setFrameMetadata({
        title: campaignTitle,
        description: `Mint "${campaignTitle}" by ${creatorName} for ${mintPrice} ETH`,
        image: campaignImage,
        buttons: [
          { label: 'Mint Now', action: 'tx' },
          { label: 'View Campaign', action: 'link', target: `https://credvault.app/campaign/${campaignId}` }
        ],
        postUrl: `https://credvault.app/api/frames/mint`
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFramePreview();
  }, [campaignId]);

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-500">Loading Frame preview...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !frameMetadata) {
    return (
      <div className={`bg-white rounded-lg border border-red-200 p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={loadFramePreview}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!frameMetadata) return null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Farcaster Frame Preview</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={loadFramePreview}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh preview"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
            
            <a
              href={`https://warpcast.com/~/developers/frames?url=${encodeURIComponent(`https://credvault.app/frames/campaign/${campaignId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Test in Farcaster"
            >
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Frame Mockup */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Simulated Farcaster UI */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="text-xs text-gray-500 mb-3 text-center">
              Preview in Farcaster feed
            </div>
            
            {/* Frame Content */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Frame Image */}
              <div className="aspect-[1.91/1] bg-gray-100 overflow-hidden">
                <img 
                  src={frameMetadata.image} 
                  alt={frameMetadata.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x314/f3f4f6/6b7280?text=Frame+Image';
                  }}
                />
              </div>
              
              {/* Frame Metadata */}
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                  {frameMetadata.title}
                </h4>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {frameMetadata.description}
                </p>
                
                {/* Frame Buttons */}
                <div className="space-y-2">
                  {frameMetadata.buttons.map((button, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-2 px-3 text-sm font-medium rounded transition-colors ${
                        button.action === 'tx' 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {button.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Simulated Farcaster Actions */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                <span>💜 12</span>
                <span>🔄 5</span>
                <span>💬 3</span>
              </div>
              <span>2m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Details */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Frame Metadata</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex">
              <span className="w-20 text-gray-500">Title:</span>
              <span className="text-gray-900">{frameMetadata.title}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">Image:</span>
              <span className="text-gray-900 truncate">{frameMetadata.image}</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">Buttons:</span>
              <span className="text-gray-900">{frameMetadata.buttons.length} actions</span>
            </div>
            <div className="flex">
              <span className="w-20 text-gray-500">Post URL:</span>
              <span className="text-gray-900 truncate">{frameMetadata.postUrl}</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-6 pb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-yellow-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
