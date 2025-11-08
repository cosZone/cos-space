/**
 * Unified layout spacing constants
 *
 * This file defines standardized spacing values for consistent horizontal
 * and vertical spacing across all pages and components.
 */

/**
 * Container horizontal padding
 * - Desktop (≥1024px): 24px (px-6)
 * - Tablet (≥768px): 16px (px-4)
 * - Mobile (<768px): 12px (px-3)
 */
export const CONTAINER_PADDING = {
  horizontal: 'px-6 md:px-3',
  vertical: 'py-4 md:py-2',
  all: 'px-6 py-4 md:px-3 md:py-2',
} as const;

/**
 * Content area padding for main content blocks
 */
export const CONTENT_PADDING = {
  // Standard content with top spacing
  standard: 'px-6 pt-8 pb-4 md:px-3 md:pt-6 md:pb-2',
  // Content without extra top spacing
  normal: 'px-6 py-4 md:px-3 md:py-2',
  // Compact content (for nested items)
  compact: 'px-4 py-2 md:px-2 md:py-1',
} as const;

/**
 * Layout component spacing
 */
export const LAYOUT_SPACING = {
  // Gap between main content and sidebar in two-column layout
  twoColumnGap: 'gap-4 md:gap-4',
  // Section spacing
  sectionGap: 'gap-6 md:gap-4',
  // Grid/list item gaps
  gridGap: 'gap-4 md:gap-3',
} as const;

/**
 * Max width constraints
 */
export const MAX_WIDTH = {
  // Main content container (1400px)
  content: 'md:max-w-8xl',
  // Prose/reading content
  prose: 'max-w-5xl',
  // Wide layout
  wide: 'max-w-7xl',
} as const;

/**
 * Header/Navigation spacing
 */
export const HEADER_SPACING = {
  outer: 'px-6 md:px-3',
  inner: 'px-6 md:px-3',
} as const;
