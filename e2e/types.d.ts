// Type definitions for e2e tests

declare global {
  interface Window {
    ethereum?: {
      request?: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, handler: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
      selectedAddress?: string;
      isConnected?: () => boolean;
      [key: string]: any; // Allow additional properties
    };
    mockCreatorData?: any;
    slowLoading?: boolean;
  }

  // Extend PerformanceEntry for navigation timing
  interface PerformanceNavigationTiming extends PerformanceEntry {
    loadEventStart: number;
    loadEventEnd: number;
    domContentLoadedEventStart: number;
    domContentLoadedEventEnd: number;
    connectStart: number;
    connectEnd: number;
    requestStart: number;
    responseStart: number;
    responseEnd: number;
  }

  // Extend PerformanceEntry for resource timing
  interface PerformanceResourceTiming extends PerformanceEntry {
    transferSize: number;
    encodedBodySize: number;
    decodedBodySize: number;
    responseStart: number;
    responseEnd: number;
  }

  // Helper function overloads for performance API
  interface Performance {
    getEntriesByType(type: "navigation"): PerformanceNavigationTiming[];
    getEntriesByType(type: "resource"): PerformanceResourceTiming[];
    getEntriesByType(type: string): PerformanceEntry[];
  }
}

export {};
