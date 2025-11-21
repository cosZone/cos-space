/**
 * Unified layout spacing constants
 *
 * This file defines standardized spacing values for consistent horizontal
 * and vertical spacing across all pages and components.
 */

/**
 * Content area padding for main content blocks
 */
export const CONTENT_PADDING = {
  // Standard content with top spacing
  standard: 'px-10 py-8 md:px-6 md:pt-6 md:pb-2',
  // Content without extra top spacing
  normal: 'px-6 py-4 md:px-6',
  // Compact content (for nested items)
  compact: 'px-4 py-2 md:px-2 md:py-1',
} as const;

/**
 * Max width constraints
 */
export const MAX_WIDTH = {
  // Main content container (1400px)
  content: 'max-w-7xl',
} as const;

/**
 * Header/Navigation spacing
 */
export const HEADER_SPACING = {
  outer: 'px-6 md:px-3',
  inner: 'px-6 md:pl-3 md:pr-0',
} as const;
