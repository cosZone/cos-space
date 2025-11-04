/**
 * useMediaQuery Hook
 *
 * Hook for responding to media query changes (responsive breakpoints).
 *
 * @example
 * ```tsx
 * function Component() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *   const isDesktop = useMediaQuery('(min-width: 1024px)');
 *   const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 *
 *   return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
 * }
 * ```
 */

import { useEffect, useState } from 'react';

/**
 * Hook for media query matching
 *
 * @param query - Media query string (e.g., "(max-width: 768px)")
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with undefined to handle SSR
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if we're in browser environment
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Ensure we're in browser environment
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Update state with current match
    setMatches(mediaQuery.matches);

    // Define change handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    // Legacy browsers use addListener (deprecated but still supported)
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => {
        mediaQuery.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks based on Tailwind defaults
 */

/** Mobile (max-width: 640px) */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 640px)');
}

/** Tablet (min-width: 641px and max-width: 1024px) */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
}

/** Desktop (min-width: 1025px) */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}

/** User prefers dark color scheme */
export function usePrefersColorSchemeDark(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/** User prefers reduced motion for accessibility */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
