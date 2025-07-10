import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ANIMATION_VARIANTS } from '@/lib/constants';

export function CreateCampaign() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create Campaign
        </h1>
        <p className="text-muted-foreground">
          Launch your NFT campaign and start building your onchain reputation
        </p>
      </div>

      <div className="coinbase-card p-8 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Campaign Builder Coming Soon
        </h3>
        <p className="text-muted-foreground mb-6">
          The campaign creation tool is under development. Soon you'll be able to create 
          NFT campaigns with custom artwork, pricing, and rewards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/explore">
            <button className="coinbase-button">
              Explore Existing Campaigns
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="coinbase-button-secondary">
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}