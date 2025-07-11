/**
 * Production Error Tracking Service
 * Handles error logging, user feedback, and crash reporting
 */

interface ErrorData {
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  userId?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

interface UserFeedback {
  email?: string;
  message: string;
  url: string;
  timestamp: string;
  userId?: string;
}

class ErrorTrackingService {
  private apiUrl: string;
  private isProduction: boolean;

  constructor() {
    this.apiUrl = import.meta.env.VITE_ERROR_TRACKING_URL || '/api/errors';
    this.isProduction = import.meta.env.PROD;
  }

  /**
   * Log an error to the tracking service
   */
  async logError(error: Error, context?: Record<string, any>, severity: ErrorData['severity'] = 'medium') {
    const errorData: ErrorData = {
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.getCurrentUserId(),
      timestamp: new Date().toISOString(),
      severity,
      context
    };

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error tracked:', errorData);
    }

    try {
      await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      });
    } catch (trackingError) {
      console.error('Failed to log error:', trackingError);
    }
  }

  /**
   * Submit user feedback
   */
  async submitFeedback(feedback: Omit<UserFeedback, 'timestamp' | 'url' | 'userId'>) {
    const feedbackData: UserFeedback = {
      ...feedback,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userId: this.getCurrentUserId()
    };

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw error;
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number, context?: Record<string, any>) {
    if (!this.isProduction) {
      console.log(`Performance metric: ${metric} = ${value}`, context);
    }

    // Send to analytics service
    try {
      fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric,
          value,
          context,
          timestamp: new Date().toISOString(),
          userId: this.getCurrentUserId()
        })
      });
    } catch (error) {
      console.error('Failed to track performance metric:', error);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Get user ID from your auth context
    return localStorage.getItem('userId') || undefined;
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  errorTracker.logError(new Error(event.message), {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  }, 'high');
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  errorTracker.logError(new Error(event.reason), {
    type: 'unhandledRejection'
  }, 'high');
});

export const errorTracker = new ErrorTrackingService();
