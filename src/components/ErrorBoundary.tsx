/**
 * Global Error Boundary Component
 * Catches React errors and provides fallback UI
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { errorTracker } from '../services/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isRetrying: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      isRetrying: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({ errorInfo });

    // Log error to tracking service
    errorTracker.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    }, 'critical');
  }

  handleRetry = () => {
    this.setState({ isRetrying: true });
    
    setTimeout(() => {
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        isRetrying: false
      });
    }, 1000);
  };

  handleReportBug = () => {
    const subject = encodeURIComponent(`Bug Report: ${this.state.error?.message || 'Unknown Error'}`);
    const body = encodeURIComponent(`
Error: ${this.state.error?.message || 'Unknown'}
Stack: ${this.state.error?.stack || 'Not available'}
Component Stack: ${this.state.errorInfo?.componentStack || 'Not available'}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `);
    
    window.open(`mailto:support@zorax.app?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h1 className="text-xl font-semibold text-foreground mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-muted-foreground mb-6">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>

              {import.meta.env.DEV && (
                <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-medium text-foreground mb-2">Error Details:</p>
                  <p className="text-xs text-muted-foreground break-all">
                    {this.state.error?.message}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  disabled={this.state.isRetrying}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${this.state.isRetrying ? 'animate-spin' : ''}`} />
                  {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>

                <button
                  onClick={this.handleReportBug}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-muted-foreground rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Bug className="w-4 h-4" />
                  Report Bug
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
