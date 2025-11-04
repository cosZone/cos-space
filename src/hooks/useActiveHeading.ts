/**
 * useActiveHeading Hook
 *
 * Tracks the currently active heading based on scroll position.
 * Uses scroll detection to determine which heading is currently visible.
 *
 * @example
 * ```tsx
 * function TableOfContents() {
 *   const activeId = useActiveHeading({ offsetTop: 120 });
 *
 *   return (
 *     <nav>
 *       {headings.map(heading => (
 *         <a
 *           key={heading.id}
 *           className={activeId === heading.id ? 'active' : ''}
 *         >
 *           {heading.text}
 *         </a>
 *       ))}
 *     </nav>
 *   );
 * }
 * ```
 */

import { useEffect, useState } from 'react';

export interface UseActiveHeadingOptions {
  /** Offset from top of viewport for detecting active heading (default: 120px for header) */
  offsetTop?: number;
  /** Throttle delay for scroll event (ms) */
  throttleDelay?: number;
}

/**
 * Hook to track the currently active heading based on scroll position
 *
 * @param options - Active heading options
 * @returns ID of the currently active heading
 */
export function useActiveHeading({ offsetTop = 120, throttleDelay = 100 }: UseActiveHeadingOptions = {}): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // Throttle scroll events
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

        // Find the currently visible heading
        let current = '';
        for (const heading of headingElements) {
          const rect = heading.getBoundingClientRect();
          // Check if heading is in viewport or above it (with some offset for header)
          if (rect.top <= offsetTop) {
            current = heading.id;
          } else {
            break;
          }
        }

        if (current && current !== activeId) {
          setActiveId(current);
        }

        timeoutId = null;
      }, throttleDelay);
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [activeId, offsetTop, throttleDelay]);

  return activeId;
}
