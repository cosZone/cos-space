/**
 * Content utilities - Index file
 *
 * Re-exports all content-related utilities from modular files.
 * This maintains backward compatibility while organizing code better.
 */

// Export types
export type { Category, CategoryListResult } from './content/types';

// Export category utilities
export {
  addCategoryRecursively,
  buildCategoryPath,
  getCategoryArr,
  getCategoryByLink,
  getCategoryLinks,
  getCategoryList,
  getCategoryNameByLink,
  getParentCategory,
} from './content/categories';

// Export post utilities
export {
  getPostCount,
  getPostLastCategory,
  getPostsByCategory,
  getPostsBySticky,
  getRandomPosts,
  getSortedPosts,
} from './content/posts';

// Export tag utilities
export { getAllTags } from './content/tags';
