import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import { Button } from '@components';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div className="h-full w-full flex items-center justify-center bg-surface-1 p-4">
        <div className="bg-surface-2 border border-border p-8 flex flex-col items-center gap-5 max-w-md w-full">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-text-1 text-2xl font-bold">
              Something went wrong
            </h1>
            <p className="text-text-2 text-sm">
              An unexpected error occurred. Try reloading the page.
            </p>
          </div>

          {this.state.error?.message && (
            <pre className="font-mono text-xs text-text-3 bg-surface-3 p-3 border border-border w-full overflow-hidden line-clamp-3">
              {this.state.error.message}
            </pre>
          )}

          <Button variant="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }
}
