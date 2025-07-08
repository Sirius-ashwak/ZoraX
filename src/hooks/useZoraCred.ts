import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Address } from 'viem';
import { zoraCredService } from '../services/zoraCredService';
import { CreatorProfile, AuraLevel } from '../types/zoracred';

/**
 * Hook for fetching creator profile data
 */
export function useCreatorProfile(address: Address) {
  return useQuery({
    queryKey: ['creatorProfile', address],
    queryFn: () => zoraCredService.getCreatorProfile(address),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook for searching creators
 */
export function useCreatorSearch(query: {
  searchTerm?: string;
  auraLevel?: AuraLevel;
  minSupporters?: number;
  minVolume?: number;
  sortBy?: 'supporters' | 'volume' | 'campaigns' | 'recent';
  limit?: number;
}) {
  return useQuery({
    queryKey: ['creatorSearch', query],
    queryFn: () => zoraCredService.searchCreators(query),
    enabled: !!(query.searchTerm || query.auraLevel || query.minSupporters || query.minVolume),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook for trending creators
 */
export function useTrendingCreators(limit: number = 10) {
  return useQuery({
    queryKey: ['trendingCreators', limit],
    queryFn: () => zoraCredService.getTrendingCreators(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for updating creator profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      address, 
      updates 
    }: { 
      address: Address;
      updates: Partial<Pick<CreatorProfile, 'name' | 'bio' | 'website' | 'twitter' | 'farcaster'>>;
    }) => zoraCredService.updateProfile(address, updates),
    onSuccess: (updatedProfile) => {
      // Update the cache with new profile data
      queryClient.setQueryData(['creatorProfile', updatedProfile.address], updatedProfile);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['trendingCreators'] });
      queryClient.invalidateQueries({ queryKey: ['creatorSearch'] });
    },
  });
}

/**
 * Hook for real-time metrics (for creator's own profile)
 */
export function useRealTimeMetrics(address: Address, enabled: boolean = false) {
  return useQuery({
    queryKey: ['realTimeMetrics', address],
    queryFn: () => zoraCredService.getCreatorProfile(address),
    enabled: enabled && !!address,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    staleTime: 15 * 1000, // 15 seconds
  });
}

/**
 * Hook for profile URL sharing
 */
export function useProfileSharing(address: Address) {
  const getProfileURL = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/profile/${address}`;
    }
    return `/profile/${address}`;
  };
  
  const shareProfile = async (platform?: 'twitter' | 'farcaster' | 'copy') => {
    const url = getProfileURL();
    const text = `Check out this creator's ZoraCred profile on CredVault!`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'farcaster':
        // Farcaster sharing would be implemented based on their sharing protocol
        window.open(`https://warpcast.com/~/compose?text=${encodeURIComponent(`${text} ${url}`)}`);
        break;
      case 'copy':
      default:
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          return true;
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          return true;
        }
    }
    return false;
  };
  
  return {
    profileURL: getProfileURL(),
    shareProfile,
  };
}
