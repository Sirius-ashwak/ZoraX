export interface FrameEvent {
  id: string;
  campaignId: string;
  eventType: 'view' | 'interaction' | 'mint' | 'error';
  userAddress?: string;
  userAgent?: string;
  referrer?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface AnalyticsData {
  views: number;
  interactions: number;
  mints: number;
  conversionRate: number;
  topReferrers: Array<{
    source: string;
    views: number;
  }>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    interactions: number;
    mints: number;
  }>;
}

export interface CampaignAnalytics {
  campaignId: string;
  totalViews: number;
  totalInteractions: number;
  totalMints: number;
  conversionRate: number;
  avgViewsPerDay: number;
  peakViewDay: string;
  topReferrers: string[];
  userEngagement: {
    bounceRate: number;
    avgTimeOnFrame: number;
    returnVisitors: number;
  };
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private events: Map<string, FrameEvent[]> = new Map();

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Track Frame view event
   */
  async trackFrameView(
    campaignId: string,
    userAgent?: string,
    referrer?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event: FrameEvent = {
        id: this.generateEventId(),
        campaignId,
        eventType: 'view',
        timestamp: Date.now(),
        ...(userAgent && { userAgent }),
        ...(referrer && { referrer }),
        ...(metadata && { metadata })
      };

      await this.storeEvent(event);
      console.log('Frame view tracked:', event);
    } catch (error) {
      console.error('Error tracking Frame view:', error);
    }
  }

  /**
   * Track Frame interaction event
   */
  async trackFrameInteraction(
    campaignId: string,
    action: string,
    userAddress?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event: FrameEvent = {
        id: this.generateEventId(),
        campaignId,
        eventType: 'interaction',
        timestamp: Date.now(),
        metadata: { action, ...metadata },
        ...(userAddress && { userAddress })
      };

      await this.storeEvent(event);
      console.log('Frame interaction tracked:', event);
    } catch (error) {
      console.error('Error tracking Frame interaction:', error);
    }
  }

  /**
   * Track mint event
   */
  async trackMintEvent(
    campaignId: string,
    userAddress: string,
    quantity: number,
    transactionHash: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event: FrameEvent = {
        id: this.generateEventId(),
        campaignId,
        eventType: 'mint',
        userAddress,
        timestamp: Date.now(),
        metadata: { quantity, transactionHash, ...metadata }
      };

      await this.storeEvent(event);
      console.log('Mint event tracked:', event);
    } catch (error) {
      console.error('Error tracking mint event:', error);
    }
  }

  /**
   * Track error event
   */
  async trackErrorEvent(
    campaignId: string,
    errorMessage: string,
    userAddress?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      const event: FrameEvent = {
        id: this.generateEventId(),
        campaignId,
        eventType: 'error',
        timestamp: Date.now(),
        metadata: { errorMessage, ...metadata },
        ...(userAddress && { userAddress })
      };

      await this.storeEvent(event);
      console.log('Error event tracked:', event);
    } catch (error) {
      console.error('Error tracking error event:', error);
    }
  }

  /**
   * Get analytics data for a campaign
   */
  async getFrameAnalytics(campaignId: string, timeRange: '24h' | '7d' | '30d'): Promise<AnalyticsData> {
    try {
      const events = this.getEventsForCampaign(campaignId);
      const filteredEvents = this.filterEventsByTimeRange(events, timeRange);

      const views = filteredEvents.filter(e => e.eventType === 'view').length;
      const interactions = filteredEvents.filter(e => e.eventType === 'interaction').length;
      const mints = filteredEvents.filter(e => e.eventType === 'mint').length;
      
      const conversionRate = views > 0 ? (mints / views) * 100 : 0;

      const topReferrers = this.calculateTopReferrers(filteredEvents);
      const timeSeriesData = this.generateTimeSeriesData(filteredEvents, timeRange);

      return {
        views,
        interactions,
        mints,
        conversionRate: Number(conversionRate.toFixed(2)),
        topReferrers,
        timeSeriesData
      };
    } catch (error) {
      console.error('Error getting Frame analytics:', error);
      
      // Return mock data as fallback
      return this.getMockAnalyticsData(timeRange);
    }
  }

  /**
   * Get comprehensive campaign analytics
   */
  async getCampaignAnalytics(campaignId: string): Promise<CampaignAnalytics> {
    try {
      const events = this.getEventsForCampaign(campaignId);
      
      const views = events.filter(e => e.eventType === 'view');
      const interactions = events.filter(e => e.eventType === 'interaction');
      const mints = events.filter(e => e.eventType === 'mint');

      const totalViews = views.length;
      const totalInteractions = interactions.length;
      const totalMints = mints.length;
      const conversionRate = totalViews > 0 ? (totalMints / totalViews) * 100 : 0;

      // Calculate daily averages
      const firstEvent = events.length > 0 ? Math.min(...events.map(e => e.timestamp)) : Date.now();
      const daysSinceFirst = Math.max(1, Math.ceil((Date.now() - firstEvent) / (24 * 60 * 60 * 1000)));
      const avgViewsPerDay = totalViews / daysSinceFirst;

      // Find peak view day
      const peakViewDay = this.findPeakViewDay(views);

      // Top referrers
      const topReferrers = this.calculateTopReferrers(events).map(r => r.source);

      // User engagement metrics (mock for now)
      const userEngagement = {
        bounceRate: Math.random() * 30 + 20, // 20-50%
        avgTimeOnFrame: Math.random() * 60 + 30, // 30-90 seconds
        returnVisitors: Math.floor(Math.random() * totalViews * 0.2) // Up to 20% return visitors
      };

      return {
        campaignId,
        totalViews,
        totalInteractions,
        totalMints,
        conversionRate: Number(conversionRate.toFixed(2)),
        avgViewsPerDay: Number(avgViewsPerDay.toFixed(2)),
        peakViewDay,
        topReferrers,
        userEngagement
      };
    } catch (error) {
      console.error('Error getting campaign analytics:', error);
      throw error;
    }
  }

  /**
   * Get real-time analytics
   */
  async getRealTimeAnalytics(campaignId: string): Promise<{
    activeViewers: number;
    recentInteractions: FrameEvent[];
    pendingMints: number;
  }> {
    try {
      const events = this.getEventsForCampaign(campaignId);
      const now = Date.now();
      const fiveMinutesAgo = now - (5 * 60 * 1000);

      // Active viewers (viewed in last 5 minutes)
      const recentViews = events.filter(e => 
        e.eventType === 'view' && e.timestamp > fiveMinutesAgo
      );
      const activeViewers = new Set(recentViews.map(e => e.userAgent || 'anonymous')).size;

      // Recent interactions (last 10)
      const recentInteractions = events
        .filter(e => e.eventType === 'interaction')
        .slice(-10)
        .reverse();

      // Pending mints (mock)
      const pendingMints = Math.floor(Math.random() * 5);

      return {
        activeViewers,
        recentInteractions,
        pendingMints
      };
    } catch (error) {
      console.error('Error getting real-time analytics:', error);
      throw error;
    }
  }

  /**
   * Store event (in-memory for now)
   */
  private async storeEvent(event: FrameEvent): Promise<void> {
    const campaignEvents = this.events.get(event.campaignId) || [];
    campaignEvents.push(event);
    this.events.set(event.campaignId, campaignEvents);

    // In production, this would save to a database
  }

  /**
   * Get events for a campaign
   */
  private getEventsForCampaign(campaignId: string): FrameEvent[] {
    return this.events.get(campaignId) || [];
  }

  /**
   * Filter events by time range
   */
  private filterEventsByTimeRange(events: FrameEvent[], timeRange: '24h' | '7d' | '30d'): FrameEvent[] {
    const now = Date.now();
    let cutoff: number;

    switch (timeRange) {
      case '24h':
        cutoff = now - (24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoff = now - (7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoff = now - (30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoff = 0;
    }

    return events.filter(e => e.timestamp > cutoff);
  }

  /**
   * Calculate top referrers from events
   */
  private calculateTopReferrers(events: FrameEvent[]): Array<{ source: string; views: number }> {
    const referrerCounts: Record<string, number> = {};

    events
      .filter(e => e.eventType === 'view' && e.referrer)
      .forEach(e => {
        const referrer = this.extractReferrerDomain(e.referrer!);
        referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
      });

    return Object.entries(referrerCounts)
      .map(([source, views]) => ({ source, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }

  /**
   * Extract domain from referrer URL
   */
  private extractReferrerDomain(referrer: string): string {
    try {
      const url = new URL(referrer);
      return url.hostname.replace('www.', '');
    } catch {
      return 'Direct';
    }
  }

  /**
   * Generate time series data
   */
  private generateTimeSeriesData(
    events: FrameEvent[], 
    timeRange: '24h' | '7d' | '30d'
  ): Array<{ date: string; views: number; interactions: number; mints: number }> {
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayStart = new Date(date).setHours(0, 0, 0, 0);
      const dayEnd = new Date(date).setHours(23, 59, 59, 999);

      const dayEvents = events.filter(e => e.timestamp >= dayStart && e.timestamp <= dayEnd);

      data.push({
        date: dateStr,
        views: dayEvents.filter(e => e.eventType === 'view').length,
        interactions: dayEvents.filter(e => e.eventType === 'interaction').length,
        mints: dayEvents.filter(e => e.eventType === 'mint').length
      });
    }

    return data;
  }

  /**
   * Find peak view day
   */
  private findPeakViewDay(viewEvents: FrameEvent[]): string {
    if (viewEvents.length === 0) {
      return new Date().toISOString().split('T')[0];
    }

    const dailyCounts: Record<string, number> = {};

    viewEvents.forEach(event => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const peakDay = Object.entries(dailyCounts).reduce((a, b) => 
      dailyCounts[a[0]] > dailyCounts[b[0]] ? a : b
    )[0];

    return peakDay;
  }

  /**
   * Generate mock analytics data as fallback
   */
  private getMockAnalyticsData(timeRange: '24h' | '7d' | '30d'): AnalyticsData {
    const views = Math.floor(Math.random() * 2000) + 500;
    const interactions = Math.floor(views * 0.15);
    const mints = Math.floor(interactions * 0.25);
    const conversionRate = (mints / views) * 100;

    return {
      views,
      interactions,
      mints,
      conversionRate: Number(conversionRate.toFixed(2)),
      topReferrers: [
        { source: 'Farcaster', views: Math.floor(views * 0.7) },
        { source: 'Direct', views: Math.floor(views * 0.2) },
        { source: 'Twitter', views: Math.floor(views * 0.1) }
      ],
      timeSeriesData: this.generateMockTimeSeriesData(timeRange)
    };
  }

  /**
   * Generate mock time series data
   */
  private generateMockTimeSeriesData(timeRange: '24h' | '7d' | '30d') {
    const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 20,
        interactions: Math.floor(Math.random() * 20) + 2,
        mints: Math.floor(Math.random() * 5) + 1
      });
    }

    return data;
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Export analytics data
   */
  async exportAnalyticsData(campaignId: string, format: 'json' | 'csv'): Promise<string> {
    try {
      const events = this.getEventsForCampaign(campaignId);
      const analytics = await this.getCampaignAnalytics(campaignId);

      if (format === 'json') {
        return JSON.stringify({ analytics, events }, null, 2);
      } else {
        // Convert to CSV format
        const csvHeaders = 'Date,Event Type,User Address,Metadata\n';
        const csvRows = events.map(e => 
          `${new Date(e.timestamp).toISOString()},${e.eventType},${e.userAddress || ''},${JSON.stringify(e.metadata || {})}`
        ).join('\n');
        
        return csvHeaders + csvRows;
      }
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      throw error;
    }
  }
}

export const analyticsService = AnalyticsService.getInstance();
