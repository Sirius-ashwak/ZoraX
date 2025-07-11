/**
 * Production Performance Monitoring Service
 * Tracks Core Web Vitals and application performance
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
}

interface CoreWebVitals {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private observer?: PerformanceObserver;
  private isProduction: boolean;

  constructor() {
    this.isProduction = import.meta.env.PROD;
    this.initializeObserver();
    this.trackCoreWebVitals();
  }

  /**
   * Track custom performance metric
   */
  trackMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.getCurrentUserId()
    };

    this.metrics.push(metric);
    this.sendMetric(metric);
  }

  /**
   * Measure function execution time
   */
  async measureFunction<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.trackMetric(`function_${name}`, duration);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.trackMetric(`function_${name}_error`, duration);
      throw error;
    }
  }

  /**
   * Track page load performance
   */
  trackPageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          this.trackMetric('page_load_time', navigation.loadEventEnd - navigation.fetchStart);
          this.trackMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
          this.trackMetric('dom_interactive', navigation.domInteractive - navigation.fetchStart);
          this.trackMetric('ttfb', navigation.responseStart - navigation.fetchStart);
        }
      }, 0);
    });
  }

  /**
   * Track resource loading performance
   */
  trackResourcePerformance() {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach(resource => {
      if (resource.duration > 1000) { // Track slow resources (>1s)
        this.trackMetric('slow_resource', resource.duration);
      }
    });
  }

  /**
   * Track Core Web Vitals
   */
  private trackCoreWebVitals() {
    // First Contentful Paint (FCP)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.trackMetric('fcp', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackMetric('lcp', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Cast to PerformanceEventTiming which has processingStart property
        const eventEntry = entry as PerformanceEventTiming;
        if (eventEntry.processingStart) {
          const fid = eventEntry.processingStart - entry.startTime;
          this.trackMetric('fid', fid);
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.trackMetric('cls', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  /**
   * Track memory usage
   */
  trackMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.trackMetric('memory_used', memory.usedJSHeapSize);
      this.trackMetric('memory_total', memory.totalJSHeapSize);
      this.trackMetric('memory_limit', memory.jsHeapSizeLimit);
    }
  }

  /**
   * Initialize performance observer
   */
  private initializeObserver() {
    if (!('PerformanceObserver' in window)) return;

    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          this.trackMetric(entry.name, entry.duration);
        }
      }
    });

    this.observer.observe({ entryTypes: ['measure'] });
  }

  /**
   * Send metric to server
   */
  private async sendMetric(metric: PerformanceMetric) {
    if (!this.isProduction) {
      console.log('Performance metric:', metric);
      return;
    }

    try {
      await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      console.error('Failed to send performance metric:', error);
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): CoreWebVitals & { customMetrics: PerformanceMetric[] } {
    const summary: CoreWebVitals = {};
    const customMetrics: PerformanceMetric[] = [];

    this.metrics.forEach(metric => {
      switch (metric.name) {
        case 'fcp':
          summary.fcp = metric.value;
          break;
        case 'lcp':
          summary.lcp = metric.value;
          break;
        case 'fid':
          summary.fid = metric.value;
          break;
        case 'cls':
          summary.cls = metric.value;
          break;
        case 'ttfb':
          summary.ttfb = metric.value;
          break;
        default:
          customMetrics.push(metric);
      }
    });

    return { ...summary, customMetrics };
  }

  private getCurrentUserId(): string | undefined {
    return localStorage.getItem('userId') || undefined;
  }
}

export const performanceService = new PerformanceService();

// Initialize performance tracking
performanceService.trackPageLoad();
