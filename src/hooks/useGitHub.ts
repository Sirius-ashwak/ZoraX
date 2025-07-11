import { useState, useEffect } from 'react';
import { githubService, GitHubRepo } from '../services/githubService';

interface UseGitHubResult {
  starCount: number | null;
  repoInfo: GitHubRepo | null;
  isLoading: boolean;
  error: string | null;
  repoUrl: string;
  isEnabled: boolean;
  refresh: () => void;
}

/**
 * Hook to fetch and manage GitHub repository data
 */
export function useGitHub(): UseGitHubResult {
  const [repoInfo, setRepoInfo] = useState<GitHubRepo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRepoInfo = async () => {
    if (!githubService.isEnabled()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await githubService.getRepoInfo();
      setRepoInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repository info');
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = () => {
    githubService.clearCache();
    fetchRepoInfo();
  };

  useEffect(() => {
    fetchRepoInfo();
  }, []);

  return {
    starCount: repoInfo?.stargazers_count || null,
    repoInfo,
    isLoading,
    error,
    repoUrl: githubService.getRepoUrl(),
    isEnabled: githubService.isEnabled(),
    refresh
  };
}
