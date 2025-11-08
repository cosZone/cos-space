/**
 * FloatingErrorBoundary Component
 *
 * Error boundary specifically designed for floating UI components (Popover, Tooltip, Dropdown).
 * Prevents crashes in floating elements from breaking the entire UI.
 *
 * @example
 * ```tsx
 * <FloatingErrorBoundary>
 *   <Popover>...</Popover>
 * </FloatingErrorBoundary>
 * ```
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface FloatingErrorBoundaryProps {
  /** Content to render inside error boundary */
  children: ReactNode;
  /** Optional fallback UI to display on error */
  fallback?: ReactNode;
  /** Callback when error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Optional component name for better error messages */
  componentName?: string;
}

interface FloatingErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary for floating UI components.
 * Gracefully handles errors without breaking the main UI.
 */
class FloatingErrorBoundary extends Component<FloatingErrorBoundaryProps, FloatingErrorBoundaryState> {
  constructor(props: FloatingErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): FloatingErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error('FloatingErrorBoundary caught an error:', error, errorInfo);
      if (this.props.componentName) {
        console.error(`Component: ${this.props.componentName}`);
      }
    }

    // Call optional error callback
    this.props.onError?.(error, errorInfo);

    // TODO: Send to error reporting service (e.g., Sentry)
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback: render nothing (graceful degradation)
      // Floating UI components failing should not block the main content
      return null;
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap components with FloatingErrorBoundary
 *
 * @example
 * ```tsx
 * const SafePopover = withFloatingErrorBoundary(Popover, 'Popover');
 * <SafePopover>...</SafePopover>
 * ```
 */
export function withFloatingErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => (
    <FloatingErrorBoundary componentName={componentName}>
      <Component {...props} />
    </FloatingErrorBoundary>
  );

  WrappedComponent.displayName = `withFloatingErrorBoundary(${componentName || Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default FloatingErrorBoundary;
