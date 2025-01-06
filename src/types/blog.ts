import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export interface BlogSchema {
  title: string;
  description?: string; // 文章描述
  link?: string; // 文章短链接
  date: Date;
  cover?: string;
  tags?: string[];
  /**
   * 老 hexo shoka 的分类有的是这样的, 为了兼容这么写了：
   * categories:
   * - [笔记, 算法]
   * 有的是这样的：
   * categories:
   * - 笔记
   */
  categories?: string[] | string[][];
  subtitle?: string; // 文章副标题
  catalog?: boolean; // 是否分离
}
