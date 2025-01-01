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
   * 老 hexo 的分类有的是这样的：
   * categories:
   * - [笔记, 算法]
   * 新博客的分类是这样的：
   * categories:
   * - 笔记
   * - 算法
   * 需要写一个转换脚本兼容老 Hexo 博客
   */
  categories?: any;
  subtitle?: string; // 文章副标题
  catalog?: boolean; // 是否分离
}
