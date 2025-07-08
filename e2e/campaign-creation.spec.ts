import { test, expect } from '@playwright/test';

test.describe('Campaign Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
  });

  test('should complete full campaign creation flow', async ({ page }) => {
    // Navigate to dashboard
    await page.click('[data-testid="dashboard-link"]');
    
    // Click create campaign button
    await page.click('[data-testid="create-campaign-button"]');
    
    // Fill out campaign details
    await page.fill('[data-testid="campaign-title"]', 'Test Campaign E2E');
    await page.fill('[data-testid="campaign-description"]', 'This is a test campaign created via E2E testing');
    await page.fill('[data-testid="campaign-goal"]', '5.0');
    
    // Set end date (30 days from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const dateString = futureDate.toISOString().split('T')[0];
    await page.fill('[data-testid="campaign-end-date"]', dateString);
    
    // Upload mock image file
    await page.setInputFiles('[data-testid="campaign-image"]', {
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('mock-image-data')
    });
    
    // Proceed to next step
    await page.click('[data-testid="next-step-button"]');
    
    // Review campaign details
    await expect(page.locator('[data-testid="review-title"]')).toContainText('Test Campaign E2E');
    await expect(page.locator('[data-testid="review-goal"]')).toContainText('5.0 ETH');
    
    // Submit campaign (this would trigger wallet interaction in real app)
    await page.click('[data-testid="submit-campaign-button"]');
    
    // Check for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Campaign created successfully');
  });

  test('should validate form inputs', async ({ page }) => {
    await page.click('[data-testid="dashboard-link"]');
    await page.click('[data-testid="create-campaign-button"]');
    
    // Try to submit without filling required fields
    await page.click('[data-testid="next-step-button"]');
    
    // Check for validation errors
    await expect(page.locator('[data-testid="title-error"]')).toContainText('Title is required');
    await expect(page.locator('[data-testid="description-error"]')).toContainText('Description is required');
    await expect(page.locator('[data-testid="goal-error"]')).toContainText('Goal amount is required');
    
    // Fill with invalid data
    await page.fill('[data-testid="campaign-title"]', 'ab'); // Too short
    await page.fill('[data-testid="campaign-goal"]', '0'); // Invalid amount
    
    await page.click('[data-testid="next-step-button"]');
    
    // Check for specific validation errors
    await expect(page.locator('[data-testid="title-error"]')).toContainText('Title must be at least 3 characters');
    await expect(page.locator('[data-testid="goal-error"]')).toContainText('Goal must be greater than 0');
  });

  test('should handle wallet connection states', async ({ page }) => {
    // Mock wallet disconnected state
    await page.addInitScript(() => {
      window.ethereum = {
        isConnected: () => false,
        request: () => Promise.reject(new Error('User rejected')),
      };
    });
    
    await page.click('[data-testid="dashboard-link"]');
    
    // Should show connect wallet prompt
    await expect(page.locator('[data-testid="connect-wallet-prompt"]')).toBeVisible();
    
    // Click connect wallet
    await page.click('[data-testid="connect-wallet-button"]');
    
    // Should show wallet connection modal
    await expect(page.locator('[data-testid="wallet-modal"]')).toBeVisible();
  });

  test('should display gas estimates', async ({ page }) => {
    await page.click('[data-testid="dashboard-link"]');
    await page.click('[data-testid="create-campaign-button"]');
    
    // Fill out valid campaign data
    await page.fill('[data-testid="campaign-title"]', 'Gas Test Campaign');
    await page.fill('[data-testid="campaign-description"]', 'Testing gas estimation');
    await page.fill('[data-testid="campaign-goal"]', '2.5');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    await page.fill('[data-testid="campaign-end-date"]', futureDate.toISOString().split('T')[0]);
    
    await page.click('[data-testid="next-step-button"]');
    
    // Check for gas estimate display
    await expect(page.locator('[data-testid="gas-estimate"]')).toBeVisible();
    await expect(page.locator('[data-testid="gas-estimate"]')).toContainText('Estimated gas');
  });

  test('should handle deployment failures gracefully', async ({ page }) => {
    // Mock deployment failure
    await page.addInitScript(() => {
      window.ethereum = {
        isConnected: () => true,
        request: () => Promise.reject(new Error('Transaction failed')),
      };
    });
    
    await page.click('[data-testid="dashboard-link"]');
    await page.click('[data-testid="create-campaign-button"]');
    
    // Fill out campaign data
    await page.fill('[data-testid="campaign-title"]', 'Fail Test Campaign');
    await page.fill('[data-testid="campaign-description"]', 'Testing deployment failure');
    await page.fill('[data-testid="campaign-goal"]', '1.0');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    await page.fill('[data-testid="campaign-end-date"]', futureDate.toISOString().split('T')[0]);
    
    await page.click('[data-testid="next-step-button"]');
    await page.click('[data-testid="submit-campaign-button"]');
    
    // Check for error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Failed to create campaign');
    
    // Check for retry button
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
  });

  test('should show success state after deployment', async ({ page }) => {
    // Mock successful deployment
    await page.addInitScript(() => {
      window.ethereum = {
        isConnected: () => true,
        request: () => Promise.resolve('0x1234567890123456789012345678901234567890'),
      };
    });
    
    await page.click('[data-testid="dashboard-link"]');
    await page.click('[data-testid="create-campaign-button"]');
    
    // Fill out campaign data
    await page.fill('[data-testid="campaign-title"]', 'Success Test Campaign');
    await page.fill('[data-testid="campaign-description"]', 'Testing successful deployment');
    await page.fill('[data-testid="campaign-goal"]', '3.0');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    await page.fill('[data-testid="campaign-end-date"]', futureDate.toISOString().split('T')[0]);
    
    await page.click('[data-testid="next-step-button"]');
    await page.click('[data-testid="submit-campaign-button"]');
    
    // Check for success state
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="transaction-hash"]')).toBeVisible();
    await expect(page.locator('[data-testid="view-campaign-button"]')).toBeVisible();
  });

  test('should verify dashboard update after campaign creation', async ({ page }) => {
    // Mock successful campaign creation
    await page.addInitScript(() => {
      window.ethereum = {
        isConnected: () => true,
        request: () => Promise.resolve('0x1234567890123456789012345678901234567890'),
      };
    });
    
    await page.click('[data-testid="dashboard-link"]');
    
    // Count existing campaigns
    const initialCampaignCount = await page.locator('[data-testid="campaign-card"]').count();
    
    // Create new campaign
    await page.click('[data-testid="create-campaign-button"]');
    
    await page.fill('[data-testid="campaign-title"]', 'Dashboard Update Test');
    await page.fill('[data-testid="campaign-description"]', 'Testing dashboard update');
    await page.fill('[data-testid="campaign-goal"]', '1.5');
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    await page.fill('[data-testid="campaign-end-date"]', futureDate.toISOString().split('T')[0]);
    
    await page.click('[data-testid="next-step-button"]');
    await page.click('[data-testid="submit-campaign-button"]');
    
    // Wait for success and navigate back to dashboard
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await page.click('[data-testid="back-to-dashboard-button"]');
    
    // Verify dashboard has updated
    await page.waitForLoadState('networkidle');
    const newCampaignCount = await page.locator('[data-testid="campaign-card"]').count();
    expect(newCampaignCount).toBe(initialCampaignCount + 1);
    
    // Verify new campaign appears in list
    await expect(page.locator('[data-testid="campaign-title"]').first()).toContainText('Dashboard Update Test');
  });

  test('should handle file upload validation', async ({ page }) => {
    await page.click('[data-testid="dashboard-link"]');
    await page.click('[data-testid="create-campaign-button"]');
    
    // Try to upload invalid file type
    await page.setInputFiles('[data-testid="campaign-image"]', {
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('invalid-file-content')
    });
    
    // Check for validation error
    await expect(page.locator('[data-testid="file-error"]')).toContainText('Please select a valid image file');
    
    // Try to upload file that's too large
    await page.setInputFiles('[data-testid="campaign-image"]', {
      name: 'large-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.alloc(10 * 1024 * 1024) // 10MB file
    });
    
    await expect(page.locator('[data-testid="file-error"]')).toContainText('File size must be less than 5MB');
  });
});
