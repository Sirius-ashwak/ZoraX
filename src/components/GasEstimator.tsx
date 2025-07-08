import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fuel, AlertCircle, Loader2 } from 'lucide-react';
import { GasEstimation } from '../services/gasEstimationService';
import { CampaignFormData } from './CampaignForm';
import { Address } from 'viem';

interface GasEstimatorProps {
  formData: CampaignFormData;
  creatorAddress: Address;
  onEstimationUpdate?: (estimation: GasEstimation) => void;
  className?: string;
}

export const GasEstimator: React.FC<GasEstimatorProps> = ({
  formData,
  creatorAddress,
  onEstimationUpdate,
  className = '',
}) => {
  const [estimation, setEstimation] = useState<GasEstimation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<'slow' | 'standard' | 'fast'>('standard');

  useEffect(() => {
    if (formData.nftName && formData.supply && formData.priceETH && creatorAddress) {
      estimateGas();
    }
  }, [formData, creatorAddress, selectedSpeed]);

  const estimateGas = async () => {
    try {
      setLoading(true);
      setError(null);

      // Import the campaign service dynamically to avoid circular imports
      const { campaignService } = await import('../services/campaignService');
      const gasEstimation = await campaignService.getGasEstimation(formData, creatorAddress);
      
      setEstimation(gasEstimation);
      onEstimationUpdate?.(gasEstimation);
    } catch (err) {
      console.error('Gas estimation failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to estimate gas');
      setEstimation(null);
    } finally {
      setLoading(false);
    }
  };

  const formatGasPrice = (gasPrice: bigint): string => {
    const gwei = Number(gasPrice) / 1e9;
    return `${gwei.toFixed(2)} gwei`;
  };

  const getSpeedInfo = (speed: 'slow' | 'standard' | 'fast') => {
    switch (speed) {
      case 'slow':
        return { label: 'Slow', time: '~2-5 min', color: 'text-gray-600' };
      case 'standard':
        return { label: 'Standard', time: '~1-2 min', color: 'text-blue-600' };
      case 'fast':
        return { label: 'Fast', time: '~30 sec', color: 'text-green-600' };
    }
  };

  if (loading) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <div>
            <h3 className="text-sm font-medium text-blue-900">Estimating Gas Costs</h3>
            <p className="text-sm text-blue-600">Getting current network fees...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="text-sm font-medium text-red-900">Gas Estimation Failed</h3>
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={estimateGas}
              className="text-sm text-red-700 hover:text-red-800 underline mt-1"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!estimation) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <Fuel className="w-5 h-5 text-gray-400" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Gas Estimation</h3>
            <p className="text-sm text-gray-600">Complete the form to see deployment costs</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <Fuel className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Deployment Cost</h3>
      </div>

      {/* Speed Selection */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(['slow', 'standard', 'fast'] as const).map((speed) => {
          const speedInfo = getSpeedInfo(speed);
          return (
            <button
              key={speed}
              onClick={() => setSelectedSpeed(speed)}
              className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                selectedSpeed === speed
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className={`text-sm font-medium ${speedInfo.color}`}>
                {speedInfo.label}
              </div>
              <div className="text-xs text-gray-500">{speedInfo.time}</div>
            </button>
          );
        })}
      </div>

      {/* Gas Details */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Gas Limit</span>
          <span className="text-sm font-medium">{estimation.gasLimit.toString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Gas Price</span>
          <span className="text-sm font-medium">{formatGasPrice(estimation.gasPrice)}</span>
        </div>
        
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">Total Cost</span>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {estimation.totalCostETH} ETH
              </div>
              {estimation.totalCostUSD && (
                <div className="text-sm text-gray-600">
                  ≈ ${estimation.totalCostUSD} USD
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 This cost covers the deployment of your NFT contract on Optimism. 
          The actual cost may vary slightly depending on network conditions.
        </p>
      </div>

      {/* Refresh Button */}
      <button
        onClick={estimateGas}
        className="mt-3 w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        Refresh Estimate
      </button>
    </motion.div>
  );
};
