/**
 * Production Analytics Service
 * Tracks user interactions, page views, and business metrics
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp: string;
  sessionId: string;
}

interface PageView {
  path: string;
  title: string;
  referrer?: string;
  userId?: string;
  timestamp: string;
  sessionId: string;
}

interface ConversionEvent {
  type: 'campaign_created' | 'campaign_supported' | 'profile_completed' | 'wallet_connected';
  value?: number;
  campaignId?: string;
  userId?: string;
  timestamp: string;
}

class AnalyticsService {
  private sessionId: string;
  private isProduction: boolean;
  private apiUrl: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isProduction = import.meta.env.PROD;
    this.apiUrl = import.meta.env.VITE_ANALYTICS_URL || '/api/analytics';
  }

  /**
   * Track a custom event
   */
  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      userId: this.getCurrentUserId(),
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };

    this.sendEvent('events', event);
  }

  /**
   * Track page view
   */
  trackPageView(path?: string) {
    const pageView: PageView = {
      path: path || window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      userId: this.getCurrentUserId(),
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };

    this.sendEvent('pageviews', pageView);
  }

  /**
   * Track conversion events
   */
  trackConversion(type: ConversionEvent['type'], data?: Partial<ConversionEvent>) {
    const conversion: ConversionEvent = {
      type,
      ...data,
      userId: this.getCurrentUserId(),
      timestamp: new Date().toISOString()
    };

    this.sendEvent('conversions', conversion);
  }

  /**
   * Track campaign interactions
   */
  trackCampaignInteraction(action: string, campaignId: string, properties?: Record<string, any>) {
    this.track('campaign_interaction', {
      action,
      campaignId,
      ...properties
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(type: 'scroll' | 'click' | 'time_on_page', value?: number) {
    this.track('engagement', {
      type,
      value,
      page: window.location.pathname
    });
  }

  private async sendEvent(endpoint: string, data: any) {
    if (!this.isProduction) {
      console.log(`Analytics [${endpoint}]:`, data);
      return;
    }

    try {
      await fetch(`${this.apiUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUserId(): string | undefined {
    return localStorage.getItem('userId') || undefined;
  }
}

export const analytics = new AnalyticsService();

// Auto-track page views
let currentPath = window.location.pathname;
analytics.trackPageView();

// Track route changes
setInterval(() => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    analytics.trackPageView();
  }
}, 1000);

// Track scroll engagement
let maxScroll = 0;
window.addEventListener('scroll', () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent;
    if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
      analytics.trackEngagement('scroll', maxScroll);
    }
  }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
  const timeOnPage = Math.round((Date.now() - startTime) / 1000);
  analytics.trackEngagement('time_on_page', timeOnPage);
});
