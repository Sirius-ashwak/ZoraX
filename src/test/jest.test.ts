/**
 * Basic Jest configuration test
 */

describe('Jest Configuration', () => {
  it('should run basic test successfully', () => {
    expect(true).toBe(true);
  });

  it('should have access to environment variables', () => {
    expect(process.env.VITE_GITHUB_ENABLED).toBe('false');
    expect(process.env.VITE_GITHUB_OWNER).toBe('test-owner');
    expect(process.env.VITE_GITHUB_REPO).toBe('test-repo');
  });

  it('should have mocked ResizeObserver', () => {
    expect(global.ResizeObserver).toBeDefined();
  });

  it('should have mocked IntersectionObserver', () => {
    expect(global.IntersectionObserver).toBeDefined();
  });

  it('should have mocked window.matchMedia', () => {
    expect(window.matchMedia).toBeDefined();
  });
});
