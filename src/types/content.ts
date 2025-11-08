/**
 * Content Types
 *
 * This file contains types related to blog content, categories, tags, and content collections.
 */

// Re-export blog types for convenience
export type { BlogPost, BlogSchema } from './blog';

/**
 * Category structure (hierarchical)
 */
export interface Category {
  /** Category name */
  name: string;
  /** Child categories */
  children?: Category[];
}

/**
 * Category with count information
 */
export interface CategoryWithCount extends Category {
  /** Number of posts in this category */
  count: number;
}

/**
 * Category list result
 */
export interface CategoryListResult {
  /** Hierarchical category tree */
  categories: Category[];
  /** Map of category name to post count */
  countMap: Record<string, number>;
}

/**
 * Tag with count information
 */
export interface TagWithCount {
  /** Tag name */
  name: string;
  /** Number of posts with this tag */
  count: number;
}

/**
 * Post metadata for list views
 */
export interface PostMetadata {
  /** Post title */
  title: string;
  /** Post description */
  description?: string;
  /** Post URL */
  url: string;
  /** Post date */
  date: Date;
  /** Post cover image */
  cover?: string;
  /** Post tags */
  tags?: string[];
  /** Post categories */
  categories?: string[] | string[][];
  /** Reading time statistics */
  readingTime?: {
    text: string;
    minutes: number;
    words: number;
  };
}

/**
 * Pagination result
 */
export interface PaginatedResult<T> {
  /** Current page items */
  data: T[];
  /** Current page number (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Whether there's a next page */
  hasNext: boolean;
  /** Whether there's a previous page */
  hasPrev: boolean;
}
