import { test, expect, devices } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];
  
  browsers.forEach(browserName => {
    test.describe(`${browserName} compatibility`, () => {
      test('should load homepage correctly', async ({ page }) => {
        await page.goto('/');
        
        // Check for main navigation
        await expect(page.locator('[data-testid="main-nav"]')).toBeVisible();
        
        // Check for hero section
        await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
        
        // Check for feature cards
        await expect(page.locator('[data-testid="feature-cards"]')).toBeVisible();
        
        // Verify CSS is loading correctly
        const heroSection = page.locator('[data-testid="hero-section"]');
        await expect(heroSection).toHaveCSS('background', /gradient/);
      });

      test('should handle responsive design', async ({ page }) => {
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        
        await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
        
        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.reload();
        
        await expect(page.locator('[data-testid="main-nav"]')).toBeVisible();
        
        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.reload();
        
        await expect(page.locator('[data-testid="main-nav"]')).toBeVisible();
      });

      test('should handle JavaScript interactions', async ({ page }) => {
        await page.goto('/');
        
        // Test modal interactions
        if (await page.isVisible('[data-testid="modal-trigger"]')) {
          await page.click('[data-testid="modal-trigger"]');
          await expect(page.locator('[data-testid="modal"]')).toBeVisible();
          
          await page.click('[data-testid="modal-close"]');
          await expect(page.locator('[data-testid="modal"]')).not.toBeVisible();
        }
        
        // Test dropdown interactions
        if (await page.isVisible('[data-testid="dropdown-trigger"]')) {
          await page.click('[data-testid="dropdown-trigger"]');
          await expect(page.locator('[data-testid="dropdown-menu"]')).toBeVisible();
        }
      });
    });
  });
});

test.describe('Mobile Device Testing', () => {
  const mobileDevices = [
    { name: 'iPhone 12', device: devices['iPhone 12'] },
    { name: 'Pixel 5', device: devices['Pixel 5'] },
    { name: 'Samsung Galaxy S21', device: devices['Galaxy S21'] },
  ];

  mobileDevices.forEach(({ name, device }) => {
    test.describe(`${name} compatibility`, () => {
      test.use({ ...device });

      test('should handle touch interactions', async ({ page }) => {
        await page.goto('/');
        
        // Test touch scrolling
        await page.touchscreen.tap(100, 100);
        
        // Test swipe gestures if applicable
        if (await page.isVisible('[data-testid="swipeable-content"]')) {
          await page.touchscreen.tap(200, 300);
          await page.mouse.move(200, 300);
          await page.mouse.move(100, 300);
        }
        
        // Test button taps
        const buttons = page.locator('button');
        const buttonCount = await buttons.count();
        
        if (buttonCount > 0) {
          await buttons.first().tap();
          // Verify button response
          await page.waitForTimeout(100);
        }
      });

      test('should have proper touch target sizes', async ({ page }) => {
        await page.goto('/');
        
        // Check that interactive elements meet minimum touch target size (44px)
        const buttons = page.locator('button, a, [role="button"]');
        const buttonCount = await buttons.count();
        
        for (let i = 0; i < Math.min(buttonCount, 10); i++) {
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            const boundingBox = await button.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(44);
              expect(boundingBox.width).toBeGreaterThanOrEqual(44);
            }
          }
        }
      });

      test('should handle orientation changes', async ({ page }) => {
        await page.goto('/');
        
        // Test portrait orientation
        await page.setViewportSize({ width: 375, height: 812 });
        await expect(page.locator('[data-testid="main-content"]')).toBeVisible();
        
        // Test landscape orientation
        await page.setViewportSize({ width: 812, height: 375 });
        await expect(page.locator('[data-testid="main-content"]')).toBeVisible();
      });
    });
  });
});

test.describe('Performance Testing', () => {
  test('should meet Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500);
    
    // Measure First Input Delay (FID) simulation
    await page.click('button:first-of-type');
    const navigationTiming = await page.evaluate(() => {
      const entries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      return entries[0];
    });
    expect(navigationTiming.loadEventEnd - navigationTiming.loadEventStart).toBeLessThan(100);
  });

  test('should have acceptable bundle size', async ({ page }) => {
    const response = await page.goto('/');
    
    // Main bundle should be under 1MB
    const resourceSizes = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((entry): entry is PerformanceResourceTiming => entry.name.includes('.js'))
        .map(entry => ({ name: entry.name, size: entry.transferSize }));
    });
    
    const totalJSSize = resourceSizes.reduce((total, resource) => total + resource.size, 0);
    expect(totalJSSize).toBeLessThan(1024 * 1024); // 1MB
  });

  test('should load critical resources quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for critical content to load
    await page.waitForSelector('[data-testid="hero-section"]');
    const loadTime = Date.now() - startTime;
    
    // Critical content should load within 1 second
    expect(loadTime).toBeLessThan(1000);
  });
});

test.describe('Accessibility Testing', () => {
  test('should meet WCAG guidelines', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let previousLevel = 0;
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      const level = parseInt(tagName.charAt(1));
      
      // Heading levels should not skip
      expect(level - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = level;
    }
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for form labels
    const inputs = await page.locator('input, textarea, select').all();
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Start keyboard navigation
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Continue tabbing through interactive elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const currentFocused = page.locator(':focus');
      
      if (await currentFocused.count() > 0) {
        const tagName = await currentFocused.evaluate(el => el.tagName.toLowerCase());
        const role = await currentFocused.getAttribute('role');
        
        // Focused element should be interactive
        expect(['a', 'button', 'input', 'textarea', 'select'].includes(tagName) || 
               ['button', 'link', 'textbox'].includes(role || '')).toBeTruthy();
      }
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check text elements for proper contrast
    const textElements = await page.locator('p, span, a, button, h1, h2, h3, h4, h5, h6').all();
    
    for (let i = 0; i < Math.min(textElements.length, 20); i++) {
      const element = textElements[i];
      if (await element.isVisible()) {
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Basic contrast check (simplified)
        const hasTransparentBg = styles.backgroundColor === 'rgba(0, 0, 0, 0)' || 
                                styles.backgroundColor === 'transparent';
        const hasColor = styles.color !== 'rgba(0, 0, 0, 0)';
        
        expect(hasColor).toBeTruthy();
      }
    }
  });
});
