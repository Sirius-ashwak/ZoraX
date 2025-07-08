/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UniswapBadge } from '../../components/UniswapBadge';

describe('UniswapBadge', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<UniswapBadge />);
      
      expect(screen.getByText('V4 Ready')).toBeInTheDocument();
      expect(screen.getByLabelText('Uniswap V4 Compatible')).toBeInTheDocument();
    });

    it('should render different variants with correct styling', () => {
      const { rerender } = render(<UniswapBadge variant="profile" />);
      
      let badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveClass('px-3', 'py-1.5', 'text-sm');
      
      rerender(<UniswapBadge variant="small" />);
      badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('should render without tooltip when showTooltip is false', () => {
      render(<UniswapBadge showTooltip={false} />);
      
      const badge = screen.getByText('V4 Ready');
      fireEvent.mouseEnter(badge);
      
      // Tooltip should not appear
      expect(screen.queryByText('Uniswap V4 Compatible')).not.toBeInTheDocument();
    });
  });

  describe('Tooltip Functionality', () => {
    it('should show tooltip on hover', async () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByText('V4 Ready');
      fireEvent.mouseEnter(badge);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        expect(screen.getByText('Uniswap V4 Ready')).toBeInTheDocument();
      });
    });

    it('should hide tooltip when mouse leaves', async () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByText('V4 Ready');
      
      // Show tooltip
      fireEvent.mouseEnter(badge);
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
      
      // Hide tooltip
      fireEvent.mouseLeave(badge);
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('should show tooltip on focus for keyboard navigation', async () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByText('V4 Ready');
      fireEvent.focus(badge);
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveAttribute('role', 'img');
    });

    it('should be keyboard navigable', () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByText('V4 Ready');
      
      // Badge should be focusable
      fireEvent.focus(badge);
      expect(badge).toHaveFocus();
    });
  });

  describe('Visual Design', () => {
    it('should apply gradient styling', () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveClass('bg-gradient-to-r', 'from-pink-500', 'to-purple-600');
    });

    it('should have hover effects', () => {
      render(<UniswapBadge />);
      
      const badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveClass('hover:transform', 'hover:-translate-y-0.5');
    });

    it('should apply custom className', () => {
      render(<UniswapBadge className="custom-class" />);
      
      const badge = screen.getByLabelText('Uniswap V4 Compatible');
      expect(badge).toHaveClass('custom-class');
    });
  });

  describe('Icon Rendering', () => {
    it('should render Uniswap icon', () => {
      render(<UniswapBadge />);
      
      // Check for SVG icon
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render icon with correct size for different variants', () => {
      const { rerender } = render(<UniswapBadge variant="profile" />);
      
      let icon = document.querySelector('svg');
      expect(icon).toHaveClass('w-4', 'h-4');
      
      rerender(<UniswapBadge variant="small" />);
      icon = document.querySelector('svg');
      expect(icon).toHaveClass('w-3', 'h-3');
    });
  });
});
