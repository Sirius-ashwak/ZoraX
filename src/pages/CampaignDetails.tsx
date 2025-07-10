import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ANIMATION_VARIANTS } from '@/lib/constants';

export function CampaignDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          className="mb-8"
        >
          <Link to="/explore" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Campaign Details
          </h1>
          <p className="text-xl text-gray-300">
            Campaign ID: {id}
          </p>
        </motion.div>

        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-xl">Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-4">
                Campaign Details Coming Soon
              </h3>
              <p className="text-gray-400 mb-6">
                The detailed campaign view is under development. Soon you'll be able to view 
                full campaign information, mint NFTs, and track progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/explore">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                    Back to Explore
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}