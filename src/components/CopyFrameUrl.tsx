import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface CopyFrameUrlProps {
  frameUrl: string;
  campaignTitle: string;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal';
}

export const CopyFrameUrl: React.FC<CopyFrameUrlProps> = ({
  frameUrl,
  campaignTitle,
  className = '',
  variant = 'default'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(frameUrl);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleOpenFrame = () => {
    // Open frame in Farcaster debugger
    const debuggerUrl = `https://warpcast.com/~/developers/frames?url=${encodeURIComponent(frameUrl)}`;
    window.open(debuggerUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Copy Frame URL"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <button
          onClick={handleOpenFrame}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Test Frame"
        >
          <ExternalLink className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-gray-50 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">Frame URL</p>
            <p className="text-sm font-mono text-gray-700 truncate">{frameUrl}</p>
          </div>
          <div className="flex items-center space-x-2 ml-3">
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Copy URL"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleOpenFrame}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Test Frame"
            >
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Farcaster Frame URL</h3>
        <p className="text-sm text-gray-600 mt-1">
          Share this URL to display your campaign as an interactive Frame on Farcaster
        </p>
      </div>

      {/* URL Display */}
      <div className="p-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-2">Frame URL for "{campaignTitle}"</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono text-gray-800 truncate">
                  {frameUrl}
                </code>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`p-2 rounded-lg border transition-colors ${
                    copied 
                      ? 'bg-green-50 border-green-200 text-green-600' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Copy URL"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              copied
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200'
            }`}
          >
            {copied ? 'Copied!' : 'Copy URL'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenFrame}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Test Frame
          </motion.button>
        </div>

        {/* Usage Instructions */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">How to use:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Copy the URL above</li>
            <li>• Paste it in a Farcaster cast</li>
            <li>• Your campaign will appear as an interactive Frame</li>
            <li>• Users can mint directly from the Frame</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
