import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareOnFarcasterProps {
  campaignId: string;
  campaignTitle: string;
  creatorName: string;
  contractAddress?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'compact';
}

export const ShareOnFarcaster: React.FC<ShareOnFarcasterProps> = ({
  campaignId,
  campaignTitle,
  creatorName,
  contractAddress,
  className = '',
  variant = 'button'
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFrameUrl = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Generate Farcaster Frame URL
      const response = await fetch('/api/frames/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          contractAddress: contractAddress || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate Frame URL');
      }

      const data = await response.json();
      setFrameUrl(data.frameUrl);
      
      // Auto-copy to clipboard
      await navigator.clipboard.writeText(data.frameUrl);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      
    } catch (err) {
      console.error('Error generating Frame URL:', err);
      setError('Failed to generate Frame URL. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyFrameUrl = async () => {
    if (!frameUrl) return;
    
    try {
      await navigator.clipboard.writeText(frameUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareToFarcaster = () => {
    if (!frameUrl) return;
    
    const text = `Check out "${campaignTitle}" by ${creatorName} on CredVault! 🚀\n\nMint directly through this Frame:`;
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text + '\n' + frameUrl)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Compact variant for dashboard cards
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={generateFrameUrl}
          disabled={isGenerating}
          className="inline-flex items-center space-x-2 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 disabled:opacity-50 text-purple-700 text-sm font-medium rounded-lg transition-colors"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          <span>Share Frame</span>
        </button>
        
        {frameUrl && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 min-w-[280px]">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Farcaster Frame URL</p>
                <p className="text-sm font-mono text-gray-700 truncate">{frameUrl}</p>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={copyFrameUrl}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy URL"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={shareToFarcaster}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Share on Farcaster"
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Icon variant for minimal space
  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateFrameUrl}
        disabled={isGenerating}
        className={`p-2 bg-purple-100 hover:bg-purple-200 disabled:opacity-50 text-purple-700 rounded-lg transition-colors ${className}`}
        title="Share on Farcaster"
      >
        {isGenerating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
      </motion.button>
    );
  }

  // Full button variant
  return (
    <div className={`space-y-3 ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateFrameUrl}
        disabled={isGenerating}
        className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-all duration-200"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating Frame...</span>
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            <span>Share on Farcaster</span>
          </>
        )}
      </motion.button>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {frameUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">Farcaster Frame Ready!</h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                ✓ Generated
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Frame URL</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-sm bg-white px-2 py-1 rounded border font-mono text-gray-700 truncate">
                  {frameUrl}
                </code>
                <button
                  onClick={copyFrameUrl}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy URL"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={shareToFarcaster}
                className="flex-1 inline-flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Share on Farcaster</span>
              </button>
              
              <button
                onClick={copyFrameUrl}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
