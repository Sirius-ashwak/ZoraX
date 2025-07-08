import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Upload, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { GasEstimator } from './GasEstimator';
import { GasEstimation } from '../services/gasEstimationService';

export interface CampaignFormData {
  // Basic Info
  nftName: string;
  nftSymbol: string;
  description: string;
  duration: number;
  
  // NFT Configuration
  supply: number;
  priceETH: string;
  priceUSDC?: string;
  royaltyPercentage: number;
  
  // Artwork
  imageFile?: File;
  imagePreview?: string;
  
  // Perks
  perkDescription: string;
}

interface CampaignFormProps {
  onSubmit: (data: CampaignFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const STEPS = [
  { id: 1, title: 'Basic Info', description: 'Campaign details' },
  { id: 2, title: 'NFT Config', description: 'Pricing & supply' },
  { id: 3, title: 'Artwork', description: 'Upload image' },
  { id: 4, title: 'Perks', description: 'Supporter benefits' },
  { id: 5, title: 'Review', description: 'Final check' },
];

const StepIndicator: React.FC<{ currentStep: number }> = ({ 
  currentStep
}) => (
  <div className="flex items-center justify-center mb-8">
    {STEPS.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
            step.id < currentStep 
              ? 'bg-green-500 border-green-500 text-white' 
              : step.id === currentStep
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'bg-white border-gray-300 text-gray-500'
          }`}>
            {step.id < currentStep ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-medium">{step.id}</span>
            )}
          </div>
          <div className="mt-2 text-center">
            <div className={`text-sm font-medium ${
              step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step.title}
            </div>
            <div className="text-xs text-gray-500">{step.description}</div>
          </div>
        </div>
        {index < STEPS.length - 1 && (
          <div className={`w-12 h-0.5 mx-4 mt-5 transition-all duration-300 ${
            step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const BasicInfoStep: React.FC<{
  data: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        NFT Collection Name *
      </label>
      <input
        type="text"
        value={data.nftName}
        onChange={(e) => {
          const name = e.target.value;
          onChange({ 
            nftName: name,
            nftSymbol: name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10)
          });
        }}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors.nftName ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="My Awesome NFT Collection"
      />
      {errors.nftName && (
        <p className="mt-1 text-sm text-red-600">{errors.nftName}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        NFT Symbol *
      </label>
      <input
        type="text"
        value={data.nftSymbol}
        onChange={(e) => onChange({ nftSymbol: e.target.value.toUpperCase() })}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors.nftSymbol ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="AWESOME"
        maxLength={10}
      />
      {errors.nftSymbol && (
        <p className="mt-1 text-sm text-red-600">{errors.nftSymbol}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Campaign Description *
      </label>
      <textarea
        value={data.description}
        onChange={(e) => onChange({ description: e.target.value })}
        rows={4}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors.description ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Describe your NFT collection and what supporters will get..."
      />
      {errors.description && (
        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
      )}
      <p className="mt-1 text-sm text-gray-500">
        {data.description.length}/500 characters
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Campaign Duration (days)
      </label>
      <input
        type="number"
        value={data.duration}
        onChange={(e) => onChange({ duration: parseInt(e.target.value) || 30 })}
        min="1"
        max="365"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder="30"
      />
      <p className="mt-1 text-sm text-gray-500">
        How long should this campaign run? (Default: 30 days)
      </p>
    </div>
  </div>
);

const NFTConfigStep: React.FC<{
  data: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          NFT Supply *
        </label>
        <input
          type="number"
          value={data.supply}
          onChange={(e) => onChange({ supply: parseInt(e.target.value) || 1000 })}
          min="1"
          max="10000"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.supply ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="1000"
        />
        {errors.supply && (
          <p className="mt-1 text-sm text-red-600">{errors.supply}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price in ETH *
        </label>
        <input
          type="number"
          step="0.001"
          value={data.priceETH}
          onChange={(e) => onChange({ priceETH: e.target.value })}
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.priceETH ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0.01"
        />
        {errors.priceETH && (
          <p className="mt-1 text-sm text-red-600">{errors.priceETH}</p>
        )}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Alternative Price in USDC (Optional)
      </label>
      <input
        type="number"
        step="0.01"
        value={data.priceUSDC || ''}
        onChange={(e) => onChange({ priceUSDC: e.target.value })}
        min="0"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder="25.00"
      />
      <p className="mt-1 text-sm text-gray-500">
        Optional: Set a fixed USDC price as an alternative
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Royalty Percentage
      </label>
      <input
        type="number"
        step="0.1"
        value={data.royaltyPercentage}
        onChange={(e) => onChange({ royaltyPercentage: parseFloat(e.target.value) || 5 })}
        min="0"
        max="10"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder="5.0"
      />
      <p className="mt-1 text-sm text-gray-500">
        Percentage you'll earn on secondary sales (0-10%, default: 5%)
      </p>
    </div>

    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-2">Revenue Calculation</h4>
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>NFT Price:</span>
          <span>{data.priceETH || '0'} ETH</span>
        </div>
        <div className="flex justify-between">
          <span>Max Supply:</span>
          <span>{data.supply} NFTs</span>
        </div>
        <div className="flex justify-between font-medium text-gray-900 border-t pt-1">
          <span>Max Revenue:</span>
          <span>{((parseFloat(data.priceETH) || 0) * data.supply).toFixed(3)} ETH</span>
        </div>
      </div>
    </div>
  </div>
);

const ArtworkUploadStep: React.FC<{
  data: CampaignFormData;
  onChange: (data: Partial<CampaignFormData>) => void;
  errors: Record<string, string>;
}> = ({ data, onChange, errors }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({
          imageFile: file,
          imagePreview: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          NFT Artwork *
        </label>
        
        {data.imagePreview ? (
          <div className="relative">
            <img
              src={data.imagePreview}
              alt="NFT Preview"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => onChange({ imageFile: undefined, imagePreview: undefined })}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : errors.imageFile
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Drop your image here
              </p>
              <p className="text-gray-500">
                or{' '}
                <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  browse files
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF, SVG up to 10MB
              </p>
            </div>
          </div>
        )}
        
        {errors.imageFile && (
          <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Image Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use high-quality images for the best presentation</li>
          <li>• Square or landscape formats work best</li>
          <li>• Ensure your artwork is original or properly licensed</li>
          <li>• Consider how it will look as a small thumbnail</li>
        </ul>
      </div>
    </div>
  );
};

export const CampaignForm: React.FC<CampaignFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [gasEstimation, setGasEstimation] = useState<GasEstimation | null>(null);
  const [formData, setFormData] = useState<CampaignFormData>({
    nftName: '',
    nftSymbol: '',
    description: '',
    duration: 30,
    supply: 1000,
    priceETH: '0.01',
    royaltyPercentage: 5,
    perkDescription: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<CampaignFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(data);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.nftName.trim()) newErrors.nftName = 'NFT name is required';
        if (formData.nftName.length < 3) newErrors.nftName = 'NFT name must be at least 3 characters';
        if (!formData.nftSymbol.trim()) newErrors.nftSymbol = 'NFT symbol is required';
        if (formData.nftSymbol.length < 2) newErrors.nftSymbol = 'Symbol must be at least 2 characters';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
        break;
      case 2:
        if (formData.supply < 1) newErrors.supply = 'Supply must be at least 1';
        if (formData.supply > 10000) newErrors.supply = 'Supply cannot exceed 10,000';
        if (!formData.priceETH || parseFloat(formData.priceETH) <= 0) newErrors.priceETH = 'Price must be greater than 0';
        break;
      case 3:
        if (!formData.imageFile) newErrors.imageFile = 'Please upload an image for your NFT';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={formData} onChange={updateFormData} errors={errors} />;
      case 2:
        return <NFTConfigStep data={formData} onChange={updateFormData} errors={errors} />;
      case 3:
        return <ArtworkUploadStep data={formData} onChange={updateFormData} errors={errors} />;
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporter Perks & Benefits *
              </label>
              <textarea
                value={formData.perkDescription}
                onChange={(e) => updateFormData({ perkDescription: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Describe what supporters will get by holding your NFT..."
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.perkDescription.length}/1000 characters
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Perk Ideas</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Exclusive access to future content or products</li>
                <li>• Discord community membership</li>
                <li>• Early access to new releases</li>
                <li>• Behind-the-scenes content</li>
                <li>• Voting rights on creative decisions</li>
              </ul>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Campaign</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Basic Information</h4>
                  <p className="text-sm text-gray-600">Name: {formData.nftName}</p>
                  <p className="text-sm text-gray-600">Symbol: {formData.nftSymbol}</p>
                  <p className="text-sm text-gray-600">Duration: {formData.duration} days</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">NFT Configuration</h4>
                  <p className="text-sm text-gray-600">Supply: {formData.supply} NFTs</p>
                  <p className="text-sm text-gray-600">Price: {formData.priceETH} ETH</p>
                  <p className="text-sm text-gray-600">Royalty: {formData.royaltyPercentage}%</p>
                </div>
              </div>
              
              <div>
                {formData.imagePreview && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Artwork</h4>
                    <img
                      src={formData.imagePreview}
                      alt="NFT Preview"
                      className="w-full max-w-xs rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Campaign Description</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {formData.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Supporter Perks</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {formData.perkDescription}
              </p>
            </div>

            {/* Gas Estimator */}
            {address && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Deployment Cost</h4>
                <GasEstimator
                  formData={formData}
                  creatorAddress={address}
                  onEstimationUpdate={setGasEstimation}
                />
              </div>
            )}
            
            {/* Warning about blockchain deployment */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">🚀 Ready for Blockchain Deployment</h4>
              <p className="text-sm text-yellow-800">
                Your campaign will be deployed as an NFT contract on Optimism. This process includes:
              </p>
              <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                <li>• Uploading your artwork to IPFS for decentralized storage</li>
                <li>• Deploying a Zora CoinV4 NFT contract</li>
                <li>• Setting up automated royalty collection</li>
                <li>• Creating a public campaign page</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
              <button
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <StepIndicator currentStep={currentStep} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep === STEPS.length ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Campaign...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Create Campaign</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
