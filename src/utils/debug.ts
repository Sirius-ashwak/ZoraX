// Debug configuration
export const debugConfig = {
  blockchain: process.env.NODE_ENV === 'development',
  api: process.env.NODE_ENV === 'development',
  performance: true,
  errorReporting: true,
};

// Debug logger utility
export class DebugLogger {
  private static instance: DebugLogger;
  private logs: Array<{
    timestamp: Date;
    level: 'info' | 'warn' | 'error' | 'debug';
    category: string;
    message: string;
    data?: any;
  }> = [];

  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  private log(level: 'info' | 'warn' | 'error' | 'debug', category: string, message: string, data?: any) {
    const logEntry = {
      timestamp: new Date(),
      level,
      category,
      message,
      data,
    };

    this.logs.push(logEntry);

    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs.shift();
    }

    // Console output in development
    if (process.env.NODE_ENV === 'development') {
      const logMessage = `[${category}] ${message}`;
      switch (level) {
        case 'error':
          console.error(logMessage, data);
          break;
        case 'warn':
          console.warn(logMessage, data);
          break;
        case 'debug':
          console.debug(logMessage, data);
          break;
        default:
          console.log(logMessage, data);
      }
    }
  }

  info(category: string, message: string, data?: any) {
    this.log('info', category, message, data);
  }

  warn(category: string, message: string, data?: any) {
    this.log('warn', category, message, data);
  }

  error(category: string, message: string, data?: any) {
    this.log('error', category, message, data);
  }

  debug(category: string, message: string, data?: any) {
    if (debugConfig.blockchain || debugConfig.api) {
      this.log('debug', category, message, data);
    }
  }

  getLogs(category?: string, level?: string) {
    return this.logs.filter(log => {
      if (category && log.category !== category) return false;
      if (level && log.level !== level) return false;
      return true;
    });
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  clearLogs() {
    this.logs = [];
  }
}

// Performance monitoring utility
export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();
  private static logger = DebugLogger.getInstance();

  static startMeasurement(name: string) {
    this.measurements.set(name, performance.now());
    this.logger.debug('performance', `Started measuring: ${name}`);
  }

  static endMeasurement(name: string) {
    const startTime = this.measurements.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.measurements.delete(name);
      this.logger.info('performance', `${name} completed in ${duration.toFixed(2)}ms`);
      return duration;
    }
    return null;
  }

  static measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startMeasurement(name);
    return fn().finally(() => {
      this.endMeasurement(name);
    });
  }

  static measureSync<T>(name: string, fn: () => T): T {
    this.startMeasurement(name);
    try {
      return fn();
    } finally {
      this.endMeasurement(name);
    }
  }
}

// Blockchain debugging utilities
export const blockchainDebug = {
  logTransaction: (hash: string, type: string, data?: any) => {
    DebugLogger.getInstance().info('blockchain', `Transaction ${type}: ${hash}`, data);
  },

  logContractCall: (method: string, args: any[], result?: any) => {
    DebugLogger.getInstance().debug('blockchain', `Contract call: ${method}`, { args, result });
  },

  logGasEstimate: (method: string, estimate: string) => {
    DebugLogger.getInstance().info('blockchain', `Gas estimate for ${method}: ${estimate}`);
  },

  logError: (operation: string, error: Error) => {
    DebugLogger.getInstance().error('blockchain', `${operation} failed`, {
      message: error.message,
      stack: error.stack,
    });
  },
};

// API debugging utilities
export const apiDebug = {
  logRequest: (url: string, method: string, data?: any) => {
    DebugLogger.getInstance().debug('api', `${method} ${url}`, data);
  },

  logResponse: (url: string, status: number, data?: any) => {
    DebugLogger.getInstance().debug('api', `Response from ${url}: ${status}`, data);
  },

  logError: (url: string, error: Error) => {
    DebugLogger.getInstance().error('api', `Request to ${url} failed`, {
      message: error.message,
      stack: error.stack,
    });
  },
};

// Component debugging utilities
export const componentDebug = {
  logRender: (componentName: string, props?: any) => {
    DebugLogger.getInstance().debug('component', `${componentName} rendered`, props);
  },

  logMount: (componentName: string) => {
    DebugLogger.getInstance().debug('component', `${componentName} mounted`);
  },

  logUnmount: (componentName: string) => {
    DebugLogger.getInstance().debug('component', `${componentName} unmounted`);
  },

  logError: (componentName: string, error: Error) => {
    DebugLogger.getInstance().error('component', `${componentName} error`, {
      message: error.message,
      stack: error.stack,
    });
  },
};

// Development tools
export const devTools = {
  // Add debug info to window for browser console access
  exposeToWindow: () => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).credvaultDebug = {
        logger: DebugLogger.getInstance(),
        performance: PerformanceMonitor,
        blockchain: blockchainDebug,
        api: apiDebug,
        component: componentDebug,
        config: debugConfig,
      };
    }
  },

  // Generate debug report
  generateReport: () => {
    const logger = DebugLogger.getInstance();
    const report = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      logs: logger.getLogs(),
      performance: {
        navigation: performance.getEntriesByType('navigation')[0],
        resources: performance.getEntriesByType('resource').slice(0, 20),
        memory: (performance as any).memory,
      },
      config: debugConfig,
    };

    return JSON.stringify(report, null, 2);
  },

  // Download debug report
  downloadReport: () => {
    const report = devTools.generateReport();
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credvault-debug-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

// Initialize debug tools
if (typeof window !== 'undefined') {
  devTools.exposeToWindow();
}
