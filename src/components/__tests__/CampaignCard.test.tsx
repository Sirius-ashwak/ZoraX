/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CampaignCard } from '../../components/CampaignCard';
import { useCampaign } from '../../hooks/useCredVault';

// Mock the hook
jest.mock('../../hooks/useCredVault');
const mockUseCampaign = useCampaign as jest.MockedFunction<typeof useCampaign>;

// Helper to create mock hook return values
const createMockHookReturn = (overrides: any = {}) => ({
  data: undefined,
  error: null,
  isError: false,
  isPending: false,
  isLoading: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  isPlaceholderData: false,
  status: 'success' as const,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  fetchStatus: 'idle' as const,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isInitialLoading: false,
  isRefetching: false,
  isStale: false,
  refetch: jest.fn(),
  queryKey: ['campaign'],
  ...overrides,
});

describe('CampaignCard', () => {
  beforeEach(() => {
    mockUseCampaign.mockReturnValue(createMockHookReturn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading skeleton when loading', () => {
      mockUseCampaign.mockReturnValue(createMockHookReturn({
        isLoading: true,
        isPending: true,
        status: 'pending',
        isSuccess: false,
      }));

      render(<CampaignCard campaignId={1} />);
      
      // Check for loading skeleton elements
      expect(screen.getByTestId('campaign-loading') || document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('Mock Data Display', () => {
    it('should display mock campaign data when no blockchain data exists', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Check for mock campaign data
      expect(screen.getByText('Digital Art Collection: Onchain Memories')).toBeInTheDocument();
      expect(screen.getByText(/Creating a unique collection/)).toBeInTheDocument();
      expect(screen.getByText('47 supporters')).toBeInTheDocument();
      expect(screen.getByText('3.2 ETH raised')).toBeInTheDocument();
      expect(screen.getByText('5.0 ETH goal')).toBeInTheDocument();
    });

    it('should display different mock data for campaign ID 2', () => {
      render(<CampaignCard campaignId={2} />);
      
      expect(screen.getByText('Music Album: Sounds of Tomorrow')).toBeInTheDocument();
    });
  });

  describe('Progress Calculation', () => {
    it('should calculate and display correct funding progress', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Mock campaign 1: 3.2 ETH raised / 5.0 ETH goal = 64%
      expect(screen.getByText('64% funded')).toBeInTheDocument();
      
      // Check progress bar width
      const progressBar = document.querySelector('.bg-gradient-to-r.from-purple-600.to-blue-600');
      expect(progressBar).toHaveStyle('width: 64%');
    });

    it('should cap progress at 100% for overfunded campaigns', () => {
      // Create a mock campaign that's overfunded
      const overfundedCampaign = [
        'Overfunded Campaign',
        'Description',
        'image.jpg',
        BigInt('10000000000000000000'), // 10 ETH goal (in wei)
        BigInt('15000000000000000000'), // 15 ETH raised (in wei)
        BigInt(Math.floor(Date.now() / 1000) + 86400), // end time
        '0x1234567890123456789012345678901234567890' as `0x${string}`, // creator
        true // isActive
      ] as const;

      mockUseCampaign.mockReturnValue(createMockHookReturn({
        data: overfundedCampaign,
      }));

      render(<CampaignCard campaignId={1} />);
      
      // Progress should be capped at 100%
      const progressBar = document.querySelector('.bg-gradient-to-r.from-purple-600.to-blue-600');
      expect(progressBar).toHaveStyle('width: 100%');
    });
  });

  describe('Time Remaining', () => {
    it('should display days left for active campaigns', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Mock campaign has 15 days left
      expect(screen.getByText(/15 days left/)).toBeInTheDocument();
    });

    it('should display "Ended" for expired campaigns', () => {
      // Mock an ended campaign
      const endedCampaign = [
        'Ended Campaign',
        'Description',
        'image.jpg',
        BigInt('5000000000000000000'), // 5 ETH goal
        BigInt('1000000000000000000'), // 1 ETH raised
        BigInt(Math.floor(Date.now() / 1000) - 86400), // end time in past
        '0x1234567890123456789012345678901234567890' as `0x${string}`,
        false // isActive
      ] as const;

      mockUseCampaign.mockReturnValue(createMockHookReturn({
        data: endedCampaign,
      }));

      render(<CampaignCard campaignId={1} />);
      
      expect(screen.getByText('Ended')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should open support modal when support button is clicked', async () => {
      render(<CampaignCard campaignId={1} />);
      
      const supportButton = screen.getByText('Support');
      fireEvent.click(supportButton);
      
      await waitFor(() => {
        expect(screen.getByText('Support this Campaign') || screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should not show support button for campaign owner', () => {
      render(<CampaignCard campaignId={1} isOwner={true} />);
      
      expect(screen.queryByText('Support')).not.toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });
  });

  describe('Uniswap Integration', () => {
    it('should display Uniswap V4 badge', () => {
      render(<CampaignCard campaignId={1} />);
      
      expect(screen.getByText('V4 Ready')).toBeInTheDocument();
      expect(screen.getByLabelText('Uniswap V4 Compatible')).toBeInTheDocument();
    });
  });

  describe('Farcaster Integration', () => {
    it('should display share on Farcaster component', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Check for Farcaster share button
      expect(screen.getByText('Share Frame') || screen.getByLabelText(/share.*farcaster/i)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error message when campaign fetch fails', () => {
      mockUseCampaign.mockReturnValue(createMockHookReturn({
        isError: true,
        isSuccess: false,
        status: 'error',
      }));

      render(<CampaignCard campaignId={999} />);
      
      expect(screen.getByText('Campaign not found')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels and roles', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Check for campaign image alt text
      const campaignImage = screen.getByRole('img');
      expect(campaignImage).toHaveAttribute('alt', 'Digital Art Collection: Onchain Memories');
      
      // Check for creator avatar alt text
      const creatorAvatar = screen.getByAltText('Creator');
      expect(creatorAvatar).toBeInTheDocument();
      
      // Check for button accessibility
      const supportButton = screen.getByRole('button', { name: /support/i });
      expect(supportButton).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should render properly on different screen sizes', () => {
      render(<CampaignCard campaignId={1} />);
      
      // Check for responsive classes
      const cardElement = document.querySelector('.bg-white.rounded-xl');
      expect(cardElement).toBeInTheDocument();
      
      // Check for responsive grid/flex layouts
      const statsSection = screen.getByText('47 supporters').closest('div');
      expect(statsSection).toHaveClass('flex');
    });
  });
});
