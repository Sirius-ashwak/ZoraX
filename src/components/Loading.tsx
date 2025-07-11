/**
 * Production Loading Components
 * Optimized loading states for better UX
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', lines = 1 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-secondary/50 rounded ${i > 0 ? 'mt-2' : ''} ${
            lines > 1 ? (i === lines - 1 ? 'w-3/4' : 'w-full') : 'w-full'
          } h-4`} 
        />
      ))}
    </div>
  );
};

export const CampaignCardSkeleton: React.FC = () => (
  <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
    <div className="aspect-video bg-secondary/30" />
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="w-20" />
        <Skeleton className="w-16" />
      </div>
      <Skeleton lines={2} />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="w-16" />
          <Skeleton className="w-12" />
        </div>
        <div className="w-full bg-secondary/30 rounded-full h-2" />
        <div className="flex justify-between">
          <Skeleton className="w-24" />
          <Skeleton className="w-20" />
        </div>
      </div>
    </div>
  </div>
);

interface PageLoadingProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ 
  message = 'Loading...' 
}) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <LoadingSpinner size="lg" className="mx-auto text-primary" />
      </motion.div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

interface LazyLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: React.ReactNode;
}

export const LazyLoading: React.FC<LazyLoadingProps> = ({ 
  children, 
  fallback,
  error 
}) => {
  return (
    <React.Suspense 
      fallback={fallback || <PageLoading />}
    >
      {children}
    </React.Suspense>
  );
};

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className = '',
  showPercentage = false
}) => (
  <div className={`space-y-2 ${className}`}>
    {showPercentage && (
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
    )}
    <div className="w-full bg-secondary rounded-full h-2">
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  </div>
);

export const LoadingOverlay: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({ 
  isLoading, 
  children 
}) => (
  <div className="relative">
    {children}
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-primary" />
          <p className="text-muted-foreground mt-2">Processing...</p>
        </div>
      </motion.div>
    )}
  </div>
);
