/**
 * useFloatingUI Hook
 *
 * Shared Floating UI configuration for consistent popover/tooltip positioning.
 * Wraps @floating-ui/react with sensible defaults.
 *
 * @example
 * ```tsx
 * function Popover({ children, content }) {
 *   const { refs, floatingStyles, context } = useFloatingUI({
 *     placement: 'bottom',
 *     offset: 8
 *   });
 *
 *   return (
 *     <>
 *       <div ref={refs.setReference}>{children}</div>
 *       <div ref={refs.setFloating} style={floatingStyles}>
 *         {content}
 *       </div>
 *     </>
 *   );
 * }
 * ```
 */

import {
  autoUpdate,
  flip,
  offset as offsetMiddleware,
  type Placement,
  shift,
  useFloating as useFloatingBase,
  type UseFloatingReturn,
} from '@floating-ui/react';
import { useMemo } from 'react';

export interface UseFloatingUIOptions {
  /** Placement of floating element relative to reference */
  placement?: Placement;
  /** Offset distance from reference element (in pixels) */
  offset?: number;
  /** Whether floating element should flip when it doesn't fit */
  enableFlip?: boolean;
  /** Whether floating element should shift to stay in view */
  enableShift?: boolean;
  /** Whether to use autoUpdate for positioning */
  autoUpdate?: boolean;
}

/**
 * Hook for Floating UI with sensible defaults
 *
 * @param options - Floating UI options
 * @returns Floating UI instance
 */
export function useFloatingUI({
  placement = 'bottom',
  offset = 8,
  enableFlip = true,
  enableShift = true,
  autoUpdate: enableAutoUpdate = true,
}: UseFloatingUIOptions = {}): UseFloatingReturn {
  // Build middleware array
  const middleware = useMemo(() => {
    const middlewares = [offsetMiddleware(offset)];

    if (enableFlip) {
      middlewares.push(flip());
    }

    if (enableShift) {
      middlewares.push(shift({ padding: 8 }));
    }

    return middlewares;
  }, [offset, enableFlip, enableShift]);

  // Configure floating
  const floating = useFloatingBase({
    placement,
    middleware,
    whileElementsMounted: enableAutoUpdate ? autoUpdate : undefined,
  });

  return floating;
}
