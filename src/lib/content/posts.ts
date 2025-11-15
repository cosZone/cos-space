/**
 * Post-related utility functions
 */

import { getCollection, type CollectionEntry } from 'astro:content';

import { siteConfig } from '@constants/site-config';
import type { BlogPost } from 'types/blog';
import { buildCategoryPath } from './categories';

/**
 * Get all posts sorted by date (newest first)
 */
export async function getSortedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');

  // 按日期排序
  const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedPosts;
}

/**
 * Get posts separated by sticky status
 * @returns Object containing sticky and non-sticky posts, both sorted by date (newest first)
 */
export async function getPostsBySticky(): Promise<{
  stickyPosts: CollectionEntry<'blog'>[];
  nonStickyPosts: CollectionEntry<'blog'>[];
}> {
  const posts = await getSortedPosts();

  const stickyPosts: CollectionEntry<'blog'>[] = [];
  const nonStickyPosts: CollectionEntry<'blog'>[] = [];

  for (const post of posts) {
    if (post.data?.sticky) {
      stickyPosts.push(post);
    } else {
      nonStickyPosts.push(post);
    }
  }

  return { stickyPosts, nonStickyPosts };
}

/**
 * Get post count
 */
export async function getPostCount() {
  const posts = await getCollection('blog');
  return posts?.length ?? 0;
}

/**
 * 获取分类下的所有文章
 * @param categoryName 分类名
 * @returns 文章列表
 */
export async function getPostsByCategory(categoryName: string): Promise<BlogPost[]> {
  const posts = await getSortedPosts();
  return posts.filter((post) => {
    const { categories } = post.data;
    if (!categories?.length) return false;

    const firstCategory = categories[0];
    // 处理两种分类格式
    if (Array.isArray(firstCategory)) {
      // ['笔记', '算法']
      return firstCategory.includes(categoryName);
    } else if (typeof firstCategory === 'string') {
      // '工具'
      return firstCategory === categoryName;
    }
    return false;
  });
}

/**
 * Get the last (deepest) category of a post
 */
export function getPostLastCategory(post: BlogPost): { link: string; name: string } {
  const { categories } = post.data;
  if (!categories?.length) return { link: '', name: '' };

  const firstCategory = categories[0];
  if (Array.isArray(firstCategory)) {
    if (!firstCategory.length) return { link: '', name: '' };
    return {
      link: buildCategoryPath(firstCategory),
      name: firstCategory[firstCategory.length - 1],
    };
  } else if (typeof firstCategory === 'string') {
    return {
      link: buildCategoryPath(firstCategory),
      name: firstCategory,
    };
  }

  return { link: '', name: '' };
}

/**
 * 获取随机文章
 * @param count 文章数量
 * @returns 随机文章列表
 */
export async function getRandomPosts(count: number = 10): Promise<BlogPost[]> {
  const posts = await getSortedPosts();
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, posts.length));
}

/**
 * 获取文章所属系列的所有文章（基于最深层分类）
 * @param post 当前文章
 * @returns 系列文章列表（按日期排序，最新的在前）
 */
export async function getSeriesPosts(post: BlogPost): Promise<BlogPost[]> {
  const lastCategory = getPostLastCategory(post);
  if (!lastCategory.name) return [];

  return await getPostsByCategory(lastCategory.name);
}

/**
 * 获取文章的上一篇和下一篇（在同一系列中）
 * @param currentPost 当前文章
 * @returns 上一篇和下一篇文章
 */
export async function getAdjacentSeriesPosts(currentPost: BlogPost): Promise<{
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}> {
  const seriesPosts = await getSeriesPosts(currentPost);

  if (seriesPosts.length === 0) {
    return { prevPost: null, nextPost: null };
  }

  const currentIndex = seriesPosts.findIndex((post) => post.slug === currentPost.slug);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // 因为文章是按日期降序排列的（最新的在前）
  // prevPost 是更新的文章（索引 - 1）
  // nextPost 是更旧的文章（索引 + 1）
  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
}

/**
 * 检查文章是否属于特定分类
 * @param post 文章
 * @param categoryName 分类名
 * @returns 是否属于该分类
 */
function isPostInCategory(post: BlogPost, categoryName: string): boolean {
  const { categories } = post.data;
  if (!categories?.length) return false;

  const firstCategory = categories[0];
  if (Array.isArray(firstCategory)) {
    return firstCategory.includes(categoryName);
  } else if (typeof firstCategory === 'string') {
    return firstCategory === categoryName;
  }
  return false;
}

/**
 * 获取所有周刊文章
 * @returns 周刊文章列表（按日期排序，最新的在前）
 */
export async function getWeeklyPosts(): Promise<BlogPost[]> {
  const { featuredSeries } = siteConfig;
  if (!featuredSeries?.enabled || !featuredSeries.categoryName) {
    return [];
  }

  return await getPostsByCategory(featuredSeries.categoryName);
}

/**
 * 获取最新一篇周刊文章
 * @returns 最新周刊文章或 null
 */
export async function getLatestWeeklyPost(): Promise<BlogPost | null> {
  const weeklyPosts = await getWeeklyPosts();
  return weeklyPosts[0] ?? null;
}

/**
 * 获取所有非周刊文章（已排序）
 * @returns 非周刊文章列表（按日期排序，最新的在前）
 */
export async function getNonWeeklyPosts(): Promise<BlogPost[]> {
  const { featuredSeries } = siteConfig;
  if (!featuredSeries?.enabled || !featuredSeries.categoryName) {
    return await getSortedPosts();
  }

  const allPosts = await getSortedPosts();
  return allPosts.filter((post) => !isPostInCategory(post, featuredSeries.categoryName));
}

/**
 * 获取非周刊文章，按置顶状态分组
 * @returns 置顶和非置顶的非周刊文章
 */
export async function getNonWeeklyPostsBySticky(): Promise<{
  stickyPosts: BlogPost[];
  allPosts: BlogPost[];
}> {
  const nonWeeklyPosts = await getNonWeeklyPosts();

  const stickyPosts: BlogPost[] = [];
  const allPosts: BlogPost[] = [];

  for (const post of nonWeeklyPosts) {
    if (post.data?.sticky) {
      stickyPosts.push(post);
    }
    allPosts.push(post);
  }

  return { stickyPosts, allPosts };
}
