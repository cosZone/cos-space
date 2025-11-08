/**
 * Post-related utility functions
 */

import { categoryMap } from '@constants/category';
import { getCollection, type CollectionEntry } from 'astro:content';

import type { BlogPost } from 'types/blog';

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
    const link = '/categories/' + firstCategory.map((c) => categoryMap[c]).join('/');
    return { link, name: firstCategory[firstCategory.length - 1] };
  } else if (typeof firstCategory === 'string') {
    return { link: '/categories/' + categoryMap[firstCategory], name: firstCategory };
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
