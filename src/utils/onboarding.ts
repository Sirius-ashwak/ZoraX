/**
 * Utility functions for managing onboarding state
 */

const ONBOARDING_COMPLETED_KEY = 'zorax-onboarding-completed';

export const onboardingUtils = {
  /**
   * Check if user has completed onboarding
   */
  hasCompletedOnboarding(): boolean {
    try {
      return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Mark onboarding as completed
   */
  markOnboardingCompleted(): void {
    try {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    } catch (error) {
      console.warn('Could not save onboarding state:', error);
    }
  },

  /**
   * Reset onboarding state (useful for testing)
   */
  resetOnboarding(): void {
    try {
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    } catch (error) {
      console.warn('Could not reset onboarding state:', error);
    }
  },

  /**
   * Add debug function to window for testing
   */
  addDebugTools(): void {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as any).zoraxDebug = {
        resetOnboarding: this.resetOnboarding,
        hasCompletedOnboarding: this.hasCompletedOnboarding,
      };
    }
  }
};
