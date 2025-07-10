import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ANIMATION_VARIANTS } from '@/lib/constants';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        {...ANIMATION_VARIANTS.fadeIn}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-6 opacity-50">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
        </motion.div>

        <motion.div
          {...ANIMATION_VARIANTS.slideUp}
          transition={{ delay: 0.2 }}
        >
          <Link to="/">
            <Button
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}