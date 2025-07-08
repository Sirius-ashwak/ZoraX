/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ShareOnFarcaster } from '../ShareOnFarcaster';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: jest.fn(),
});

describe('ShareOnFarcaster', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        frameUrl: 'https://frames.credvault.xyz/test-frame',
        shareUrl: 'https://warpcast.com/~/compose?text=Check%20out%20this%20campaign&embeds[]=https://frames.credvault.xyz/test-frame'
      }),
    });

    (navigator.clipboard.writeText as jest.Mock).mockClear();
    (window.open as jest.Mock).mockClear();
  });

  describe('Rendering Variants', () => {
    it('should render button variant by default', () => {
      render(
        <ShareOnFarcaster
          campaignId="test-campaign"
          campaignTitle="Test Campaign"
          creatorName="Test Creator"
        />
      );

      expect(screen.getByText('Share Frame')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2');
    });

    it('should render icon variant correctly', () => {
      render(
        <ShareOnFarcaster
          campaignId="test-campaign"
          campaignTitle="Test Campaign"
          creatorName="Test Creator"
          variant="icon"
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('p-2');
      expect(screen.queryByText('Share Frame')).not.toBeInTheDocument();
    });

    it('should render compact variant correctly', () => {
      render(
        <ShareOnFarcaster
          campaignId="test-campaign"
          campaignTitle="Test Campaign"
          creatorName="Test Creator"
          variant="compact"
        />
      );

      expect(screen.getByText('Share')).toBeInTheDocument();
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-sm');
    });
  });

  describe('Frame Generation and Sharing', () => {
    it('should generate Frame and show share options on click', async () => {
      render(
        <ShareOnFarcaster
          campaignId="test-campaign"
          campaignTitle="Test Campaign"
          creatorName="Test Creator"
        />
      );

      const shareButton = screen.getByRole('button');
      fireEvent.click(shareButton);

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText('Generating...')).toBeInTheDocument();
      });

      // Check API call
      expect(fetch).toHaveBeenCalledWith('/api/frames/generate', expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('test-campaign'),
      }));

      // Wait for completion and check share options
      await waitFor(() => {
        expect(screen.getByText('Copy Frame URL')).toBeInTheDocument();
        expect(screen.getByText('Open Warpcast')).toBeInTheDocument();
      });
    });
  });
});
