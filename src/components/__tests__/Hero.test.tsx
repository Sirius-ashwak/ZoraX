import { render, screen } from '../../test/utils/testing';
import { Hero } from '../onboarding/Hero';

describe('Hero Component', () => {
  it('should render the cosmic hero section', () => {
    render(<Hero />);
    
    expect(screen.getByText('Think Bigger.')).toBeInTheDocument();
    expect(screen.getByText('Build Onchain.')).toBeInTheDocument();
    expect(screen.getByText('Welcome to CredVault.')).toBeInTheDocument();
    expect(screen.getByText('The platform for launching creator campaigns and earning onchain credibility.')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('should render scroll indicator', () => {
    render(<Hero />);
    
    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('should call onGetStarted when Get Started button is clicked', () => {
    const mockOnGetStarted = jest.fn();
    render(<Hero onGetStarted={mockOnGetStarted} />);
    
    const getStartedButton = screen.getByRole('button', { name: /get started/i });
    getStartedButton.click();
    
    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });
});
