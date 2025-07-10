import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Eye, Save, Send, Camera, Palette, Coins, Gift } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface CampaignFormData {
  // Basic Information
  title: string;
  description: string;
  category: string;
  
  // NFT Details
  nftName: string;
  nftSymbol: string;
  totalSupply: number;
  price: string;
  currency: 'ETH' | 'USDC';
  
  // Funding
  fundingGoal: string;
  duration: number; // in days
  
  // Media
  imageFile: File | null;
  imagePreview: string;
  
  // Additional Features
  royaltyPercentage: number;
  enablePerks: boolean;
  perkDescription: string;
  
  // Social
  enableFarcasterFrame: boolean;
  customMessage: string;
}

const initialFormData: CampaignFormData = {
  title: '',
  description: '',
  category: 'Digital Art',
  nftName: '',
  nftSymbol: '',
  totalSupply: 100,
  price: '0.1',
  currency: 'ETH',
  fundingGoal: '10',
  duration: 30,
  imageFile: null,
  imagePreview: '',
  royaltyPercentage: 5,
  enablePerks: false,
  perkDescription: '',
  enableFarcasterFrame: true,
  customMessage: ''
};

const categories = [
  'Digital Art', 'Music', 'Photography', 'Gaming', 'Literature', 
  'Education', 'Technology', 'Fashion', 'Film', 'Other'
];

export const CreateCampaignPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { isConnected, connectWallet } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CampaignFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const totalSteps = 5;

  const handleInputChange = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imagePreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setIsDraft(true);
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Draft saved:', formData);
    setIsSubmitting(false);
    setIsDraft(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate campaign creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Campaign created:', formData);
    setIsSubmitting(false);
    setLocation('/campaigns');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6">
            You need to connect your wallet to create campaigns and launch NFT collections.
          </p>
          <button
            onClick={connectWallet}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Give your campaign a compelling title"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your campaign, its goals, and what supporters will receive"
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">NFT Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      NFT Name *
                    </label>
                    <input
                      type="text"
                      value={formData.nftName}
                      onChange={(e) => handleInputChange('nftName', e.target.value)}
                      placeholder="e.g., Cosmic Collection"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      NFT Symbol *
                    </label>
                    <input
                      type="text"
                      value={formData.nftSymbol}
                      onChange={(e) => handleInputChange('nftSymbol', e.target.value)}
                      placeholder="e.g., COSMIC"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Supply *
                    </label>
                    <input
                      type="number"
                      value={formData.totalSupply}
                      onChange={(e) => handleInputChange('totalSupply', parseInt(e.target.value))}
                      min="1"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Currency *
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="ETH">ETH</option>
                      <option value="USDC">USDC</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Royalty Percentage (0-10%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={formData.royaltyPercentage}
                    onChange={(e) => handleInputChange('royaltyPercentage', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Royalties you'll receive from secondary sales
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Campaign Image</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {formData.imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={formData.imagePreview}
                        alt="Campaign preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                      <div>
                        <h4 className="text-lg font-medium text-foreground mb-2">Upload Campaign Image</h4>
                        <p className="text-muted-foreground mb-4">
                          Choose a high-quality image that represents your campaign (Recommended: 1200x800px)
                        </p>
                        <button
                          type="button"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                          <Upload className="w-4 h-4 mr-2 inline" />
                          Upload Image
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Funding & Duration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Funding Goal ({formData.currency}) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.fundingGoal}
                      onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Campaign Duration (days) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enable-perks"
                    checked={formData.enablePerks}
                    onChange={(e) => handleInputChange('enablePerks', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                  <label htmlFor="enable-perks" className="text-sm font-medium text-foreground">
                    Enable supporter perks
                  </label>
                </div>
                
                {formData.enablePerks && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Perk Description
                    </label>
                    <textarea
                      value={formData.perkDescription}
                      onChange={(e) => handleInputChange('perkDescription', e.target.value)}
                      placeholder="Describe the exclusive perks supporters will receive"
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Social & Launch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enable-farcaster"
                    checked={formData.enableFarcasterFrame}
                    onChange={(e) => handleInputChange('enableFarcasterFrame', e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary/20"
                  />
                  <label htmlFor="enable-farcaster" className="text-sm font-medium text-foreground">
                    Auto-generate Farcaster Frame for social sharing
                  </label>
                </div>
                
                {formData.enableFarcasterFrame && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Custom Launch Message
                    </label>
                    <textarea
                      value={formData.customMessage}
                      onChange={(e) => handleInputChange('customMessage', e.target.value)}
                      placeholder="Write a message to announce your campaign launch (optional)"
                      rows={3}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="text-lg font-medium text-foreground mb-4">Campaign Preview</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">{formData.title || 'Untitled Campaign'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{formData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFT Supply:</span>
                      <span className="font-medium">{formData.totalSupply} tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{formData.price} {formData.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal:</span>
                      <span className="font-medium">{formData.fundingGoal} {formData.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{formData.duration} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setLocation('/campaigns')}
            className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Campaign</h1>
            <p className="text-muted-foreground">Launch your NFT campaign and connect with supporters</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-border rounded-lg p-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-4">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-secondary/50 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isDraft ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Creating...' : 'Launch Campaign'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};