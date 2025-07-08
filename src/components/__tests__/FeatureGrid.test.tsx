import { render, screen } from '@testing-library/react';
import { FeatureGrid } from '../onboarding/FeatureGrid';

describe('FeatureGrid Component', () => {
  it('should render all three feature cards', () => {
    render(<FeatureGrid />);
    
    expect(screen.getByText('Mint NFT Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Build Reputation (ZoraCred)')).toBeInTheDocument();
    expect(screen.getByText('Engage Supporters')).toBeInTheDocument();
  });

  it('should render the main heading', () => {
    render(<FeatureGrid />);
    
    expect(screen.getByText('Everything You Need to')).toBeInTheDocument();
    expect(screen.getByText('Build Your Economy')).toBeInTheDocument();
  });

  it('should render feature descriptions', () => {
    render(<FeatureGrid />);
    
    expect(screen.getByText(/Launch creative campaigns with NFT-powered fundraising/)).toBeInTheDocument();
    expect(screen.getByText(/Earn onchain credibility through successful campaigns/)).toBeInTheDocument();
    expect(screen.getByText(/Reward your most loyal fans with exclusive access/)).toBeInTheDocument();
  });

  it('should render learn more links', () => {
    render(<FeatureGrid />);
    
    const learnMoreLinks = screen.getAllByText('Learn more');
    expect(learnMoreLinks).toHaveLength(3);
  });
});
