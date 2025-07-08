import { test, expect } from '@playwright/test';

test.describe('ZoraCred Profile Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display creator profile correctly', async ({ page }) => {
    // Navigate to a creator profile
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    
    // Wait for profile to load
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check profile header elements
    await expect(page.locator('[data-testid="creator-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="creator-avatar"]')).toBeVisible();
    await expect(page.locator('[data-testid="creator-bio"]')).toBeVisible();
    
    // Check profile metrics
    await expect(page.locator('[data-testid="total-volume"]')).toBeVisible();
    await expect(page.locator('[data-testid="supporter-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="campaign-count"]')).toBeVisible();
    
    // Check aura level display
    await expect(page.locator('[data-testid="aura-level"]')).toBeVisible();
    await expect(page.locator('[data-testid="aura-badge"]')).toBeVisible();
  });

  test('should calculate aura level accurately', async ({ page }) => {
    // Mock high-activity creator data
    await page.addInitScript(() => {
      window.mockCreatorData = {
        metrics: {
          uniqueSupporters: 500,
          totalVolume: '100.5',
          successfulCampaigns: 10
        }
      };
    });
    
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Should display high aura level for high-activity creator
    await expect(page.locator('[data-testid="aura-level"]')).toContainText('Luminous');
    
    // Check aura visual effects
    const auraElement = page.locator('[data-testid="aura-badge"]');
    await expect(auraElement).toHaveClass(/aura-pulse-luminous/);
  });

  test('should show correct metrics data', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check metrics display
    const volumeElement = page.locator('[data-testid="total-volume"]');
    await expect(volumeElement).toContainText('ETH');
    
    const supportersElement = page.locator('[data-testid="supporter-count"]');
    await expect(supportersElement).toContainText('supporters');
    
    const campaignsElement = page.locator('[data-testid="campaign-count"]');
    await expect(campaignsElement).toContainText('campaigns');
    
    // Check that numbers are properly formatted
    await expect(volumeElement).toHaveText(/\d+\.?\d*\s*ETH/);
  });

  test('should handle profiles with no campaigns', async ({ page }) => {
    // Mock empty creator profile
    await page.addInitScript(() => {
      window.mockCreatorData = {
        name: 'New Creator',
        metrics: {
          uniqueSupporters: 0,
          totalVolume: '0',
          successfulCampaigns: 0,
          activeContracts: 0
        },
        campaigns: []
      };
    });
    
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Should show spark aura level for new creator
    await expect(page.locator('[data-testid="aura-level"]')).toContainText('Spark');
    
    // Should show empty state for campaigns
    await expect(page.locator('[data-testid="empty-campaigns"]')).toBeVisible();
    await expect(page.locator('[data-testid="empty-campaigns"]')).toContainText('No campaigns yet');
    
    // Should show zero metrics
    await expect(page.locator('[data-testid="total-volume"]')).toContainText('0 ETH');
    await expect(page.locator('[data-testid="supporter-count"]')).toContainText('0 supporters');
  });

  test('should generate shareable URLs properly', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Click share button
    await page.click('[data-testid="share-profile-button"]');
    
    // Check if share modal appears or native share is triggered
    await page.waitForTimeout(1000);
    
    // For browsers that don't support native share, check for copy URL functionality
    if (await page.isVisible('[data-testid="copy-url-button"]')) {
      await page.click('[data-testid="copy-url-button"]');
      
      // Check for success message
      await expect(page.locator('[data-testid="copy-success"]')).toBeVisible();
      await expect(page.locator('[data-testid="copy-success"]')).toContainText('URL copied');
    }
  });

  test('should display Uniswap integration section', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check for Uniswap integration section
    await expect(page.locator('[data-testid="uniswap-integration"]')).toBeVisible();
    await expect(page.locator('[data-testid="uniswap-badge"]')).toBeVisible();
    
    // Check for benefits grid
    await expect(page.locator('[data-testid="defi-benefits"]')).toBeVisible();
    await expect(page.locator('[data-testid="trading-preview"]')).toBeVisible();
    
    // Check for Uniswap branding
    await expect(page.locator('[data-testid="uniswap-integration"]')).toContainText('DeFi Integration');
  });

  test('should handle profile loading states', async ({ page }) => {
    // Mock slow loading
    await page.addInitScript(() => {
      window.slowLoading = true;
    });
    
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    
    // Check for loading skeleton
    await expect(page.locator('[data-testid="profile-skeleton"]')).toBeVisible();
    
    // Check for loading indicators
    await expect(page.locator('[data-testid="metrics-loading"]')).toBeVisible();
    await expect(page.locator('[data-testid="campaigns-loading"]')).toBeVisible();
  });

  test('should handle profile errors gracefully', async ({ page }) => {
    // Navigate to invalid profile
    await page.goto('/profile/0xinvalidaddress');
    
    // Should show error state
    await expect(page.locator('[data-testid="profile-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="profile-error"]')).toContainText('Profile not found');
  });

  test('should display campaign grid correctly', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check for campaigns grid
    await expect(page.locator('[data-testid="campaigns-grid"]')).toBeVisible();
    
    // Check for individual campaign cards
    const campaignCards = page.locator('[data-testid="campaign-card"]');
    expect(await campaignCards.count()).toBeGreaterThan(0);
    
    // Check campaign card content
    const firstCard = campaignCards.first();
    await expect(firstCard.locator('[data-testid="campaign-image"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="campaign-title"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="campaign-stats"]')).toBeVisible();
  });

  test('should handle social links correctly', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check for social links section
    if (await page.isVisible('[data-testid="social-links"]')) {
      const twitterLink = page.locator('[data-testid="twitter-link"]');
      const farcasterLink = page.locator('[data-testid="farcaster-link"]');
      const websiteLink = page.locator('[data-testid="website-link"]');
      
      // Check that external links open in new tab
      if (await twitterLink.isVisible()) {
        await expect(twitterLink).toHaveAttribute('target', '_blank');
        await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
      }
      
      if (await websiteLink.isVisible()) {
        await expect(websiteLink).toHaveAttribute('target', '_blank');
      }
    }
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check that profile adapts to mobile layout
    const profileHeader = page.locator('[data-testid="profile-header"]');
    await expect(profileHeader).toBeVisible();
    
    // Check that metrics stack vertically on mobile
    const metricsGrid = page.locator('[data-testid="metrics-grid"]');
    await expect(metricsGrid).toHaveClass(/flex-col|grid-cols-1/);
    
    // Check that campaigns grid adapts to mobile
    const campaignsGrid = page.locator('[data-testid="campaigns-grid"]');
    await expect(campaignsGrid).toHaveClass(/grid-cols-1|grid-cols-2/);
  });

  test('should have proper accessibility features', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check for proper heading hierarchy
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for alt text on images
    const avatarImage = page.locator('[data-testid="creator-avatar"]');
    await expect(avatarImage).toHaveAttribute('alt');
    
    // Check for keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check for ARIA labels
    const shareButton = page.locator('[data-testid="share-profile-button"]');
    if (await shareButton.isVisible()) {
      await expect(shareButton).toHaveAttribute('aria-label');
    }
  });

  test('should handle aura animations correctly', async ({ page }) => {
    await page.goto('/profile/0x1234567890123456789012345678901234567890');
    await page.waitForSelector('[data-testid="creator-profile"]');
    
    // Check for aura animation classes
    const auraElement = page.locator('[data-testid="aura-badge"]');
    await expect(auraElement).toHaveClass(/aura-pulse/);
    
    // Check for proper animation timing
    await expect(auraElement).toBeVisible();
    
    // Verify animation doesn't cause accessibility issues
    await expect(auraElement).not.toHaveClass(/animate-infinite/);
  });
});
