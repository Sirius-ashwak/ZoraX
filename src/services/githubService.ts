interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
}

interface GitHubConfig {
  owner: string;
  repo: string;
  enabled: boolean;
}

class GitHubService {
  private config: GitHubConfig;
  private cache: Map<string, { data: GitHubRepo; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Configuration - can be moved to environment variables
    this.config = {
      owner: process.env.VITE_GITHUB_OWNER || 'Sirius-ashwak',
      repo: process.env.VITE_GITHUB_REPO || 'ZoraX',
      enabled: process.env.VITE_GITHUB_ENABLED !== 'false', // default enabled
    };
  }

  /**
   * Fetch repository information from GitHub API
   */
  async getRepoInfo(): Promise<GitHubRepo | null> {
    if (!this.config.enabled) {
      return null;
    }

    const cacheKey = `${this.config.owner}/${this.config.repo}`;
    const cached = this.cache.get(cacheKey);

    // Check if we have valid cached data
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.config.owner}/${this.config.repo}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // Add GitHub token if available for higher rate limits
            ...(process.env.VITE_GITHUB_TOKEN && {
              'Authorization': `token ${process.env.VITE_GITHUB_TOKEN}`
            })
          }
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`GitHub repository ${cacheKey} not found`);
        } else if (response.status === 403) {
          console.warn('GitHub API rate limit exceeded');
        } else {
          console.warn(`GitHub API error: ${response.status}`);
        }
        return null;
      }

      const data: GitHubRepo = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.warn('Failed to fetch GitHub repository info:', error);
      return null;
    }
  }

  /**
   * Get star count with fallback
   */
  async getStarCount(): Promise<number | null> {
    const repoInfo = await this.getRepoInfo();
    return repoInfo?.stargazers_count || null;
  }

  /**
   * Get repository URL
   */
  getRepoUrl(): string {
    return `https://github.com/${this.config.owner}/${this.config.repo}`;
  }

  /**
   * Check if GitHub integration is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<GitHubConfig>): void {
    this.config = { ...this.config, ...newConfig };
    // Clear cache when config changes
    this.cache.clear();
  }

  /**
   * Clear cache manually
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Create singleton instance
export const githubService = new GitHubService();
export type { GitHubRepo, GitHubConfig };
