# GitHub Integration

This document explains how the GitHub star display feature works in the ZoraX header.

## Overview

The app now dynamically fetches and displays the star count from the official ZoraX GitHub repository in the top navigation bar.

## Configuration

The GitHub integration can be configured via environment variables:

```bash
# Enable/disable GitHub star display
VITE_GITHUB_ENABLED=true

# Repository configuration
VITE_GITHUB_OWNER=Sirius-ashwak
VITE_GITHUB_REPO=ZoraX

# Optional: GitHub token for higher API rate limits
VITE_GITHUB_TOKEN=your_github_token
```

## Current Repository

- **Repository**: https://github.com/Sirius-ashwak/ZoraX
- **Current Stars**: 0 (as of implementation)
- **Previous Hardcoded Value**: 1258 (incorrect)

## Features

### Dynamic Star Count
- Fetches real-time star count from GitHub API
- Updates automatically with caching (5-minute cache)
- Graceful fallback if API is unavailable

### Smart Display
- Shows actual star count when available
- Falls back to "Star" text if count unavailable
- Properly formatted with commas for large numbers
- Tooltip shows additional info

### Configuration Options
- Can be completely disabled via `VITE_GITHUB_ENABLED=false`
- Configurable repository owner and name
- Optional GitHub token for higher rate limits

## Implementation Details

### Files Modified
- `src/services/githubService.ts` - GitHub API service
- `src/hooks/useGitHub.ts` - React hook for GitHub data
- `src/components/layout/ZoraxLayout.tsx` - Header component
- `.env.local` - Local environment configuration
- `.env.example` - Example environment configuration

### API Usage
- Uses GitHub REST API v3
- Caches responses for 5 minutes
- Handles rate limiting gracefully
- No authentication required (but optional token supported)

### Error Handling
- Network failures are handled gracefully
- API rate limit exceeded shows fallback
- Repository not found shows fallback
- Invalid configuration shows fallback

## Rate Limits

GitHub API rate limits:
- **Unauthenticated**: 60 requests per hour per IP
- **Authenticated**: 5,000 requests per hour per token

With 5-minute caching, typical usage should stay well within limits.

## Maintenance

To update the repository:
1. Change `VITE_GITHUB_OWNER` and `VITE_GITHUB_REPO` in `.env.local`
2. Or update the defaults in `src/services/githubService.ts`

To disable the feature:
1. Set `VITE_GITHUB_ENABLED=false` in `.env.local`
2. The GitHub link will be hidden from the header
