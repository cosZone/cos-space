import { categoryMap } from '@constants/category';
import { getCollection, type CollectionEntry } from 'astro:content';

import type { BlogPost } from 'types/blog';

export async function getSortedPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog');

  // 按日期排序
  const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedPosts;
}

export const getAllTags = (posts: BlogPost[]) => {
  return posts.reduce<Record<string, number>>((acc, post) => {
    const postTags = post.data.tags || [];
    postTags.forEach((tag: string) => {
      if (!acc[tag]) {
        acc[tag] = 0;
      }
      acc[tag]++;
    });
    return acc;
  }, {});
};

export const getPostCount = async () => {
  const posts = await getCollection('blog');
  return posts?.length ?? 0;
};

export type Category = {
  name: string;
  children?: Category[];
};

export async function getCategoryList(): Promise<{ categories: Category[]; countMap: { [key: string]: number } }> {
  const allBlogPosts = await getCollection('blog');
  const countMap: { [key: string]: number } = {}; // TODO: 需要优化，应该以分类路径为键名而不是 name 如数据结构既是根分类也是笔记-后端-数据结构。
  const resCategories: Category[] = [];

  // 统计每个分类的直接文章数量
  for (let i = 0; i < allBlogPosts.length; ++i) {
    const post = allBlogPosts[i];
    const { catalog, categories } = post.data;
    if (!catalog || !categories?.length) {
      continue;
    }

    if (Array.isArray(categories[0]) && categories[0].length) {
      // categories[0] = ['笔记', '算法']
      for (let j = 0; j < categories[0].length; ++j) {
        const name = categories[0][j];
        countMap[name] = (countMap[name] || 0) + 1;
        if (j === 0) {
          addCategoryRecursively(resCategories, [], name);
        } else {
          const parentNames = categories[0].slice(0, j);
          addCategoryRecursively(resCategories, parentNames, name);
        }
      }
    } else {
      // categories[0] = '工具'
      const name = categories[0] as string;
      countMap[name] = (countMap[name] || 0) + 1;
      addCategoryRecursively(resCategories, [], name);
    }
  }
  // console.log('first countMap', JSON.stringify(countMap));

  return { categories: resCategories, countMap };
}

/**
 * 递归添加子分类 有副作用的函数 如 ['分类1', '分类2', '分类3'] 创建一级分类 '分类1'、二级分类 '分类2'、三级分类 '分类3'
 * @param rootCategories 根分类
 * @param parentNames 父分类名 ['分类1', '分类2']
 * @param name 子分类名 '分类3'
 * @returns
 */
export function addCategoryRecursively(rootCategories: Category[], parentNames: string[], name: string) {
  if (parentNames.length === 0) {
    const index = rootCategories.findIndex((c) => c.name === name); // 如果当前分类已存在，则直接返回
    if (index === -1) rootCategories.push({ name });
    return;
  } else {
    const rootParentName = parentNames[0];
    const index = rootCategories.findIndex((c) => c.name === rootParentName);
    if (index === -1) {
      // 如果父级分类不存在，则创建
      const rootParentCategory = { name: rootParentName, children: [] };
      rootCategories.push(rootParentCategory);
      addCategoryRecursively(rootParentCategory.children, parentNames.slice(1), name);
    } else {
      // 如果父级分类存在,找到这个分类
      const rootParentCategory = rootCategories[index];
      if (!rootParentCategory?.children) rootParentCategory.children = [];
      addCategoryRecursively(rootParentCategory.children, parentNames.slice(1), name);
    }
  }
}

// 统一 ['分类1', '分类2'] 和 '分类'
export function getCategoryArr(categories?: string[] | string) {
  if (!categories) return [];
  if (Array.isArray(categories) && categories.length) {
    return categories as string[];
  } else return [categories as string];
}

export function getCategoryLinks(categories?: Category[], parentLink?: string): string[] {
  if (!categories?.length) return [];
  // console.log('parentLink:', parentLink + ' categories:', categories.length);
  const res: string[] = [];
  categories.forEach((category: Category) => {
    const link = categoryMap[category.name];
    const fullLink = parentLink ? `${parentLink}/${link}` : link;
    res.push(fullLink);
    if (category?.children?.length) {
      const children = getCategoryLinks(category?.children, fullLink);
      res.push(...children);
    }
  });
  return res;
}

// categories/xxx/front-end
// return 前端
// get category name by link
export function getCategoryNameByLink(link: string): string {
  if (!link) return '';
  const arr = link.split('/');
  const last = arr[arr.length - 1];
  const res = Object.keys(categoryMap).find((key) => categoryMap[key] === last) ?? '';
  return res;
}

// 获取分类
export function getCategoryByLink(categories: Category[], link: string): Category | null {
  const name = getCategoryNameByLink(link);
  if (!name || !categories?.length) return null;
  for (let i = 0; i < categories.length; ++i) {
    const category = categories[i];
    if (category.name === name) {
      return category;
    }
    if (category?.children?.length) {
      const res = getCategoryByLink(category.children, link);
      if (res) return res;
    }
  }
  return null;
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

    // 处理两种分类格式
    if (Array.isArray(categories[0])) {
      // ['笔记', '算法']
      return categories[0].includes(categoryName);
    } else {
      // '工具'
      return categories[0] === categoryName;
    }
  });
}

export function getPostLastCategory(post: BlogPost): { link: string; name: string } {
  const { categories } = post.data;
  if (!categories?.length) return { link: '', name: '' };
  if (Array.isArray(categories[0])) {
    if (!categories[0]?.length) return { link: '', name: '' };
    const arr = categories[0];
    const link = '/categories/' + arr.map((c) => categoryMap[c]).join('/');
    return { link, name: arr[arr.length - 1] };
  } else {
    return { link: '/categories/' + categoryMap[categories[0] as string], name: categories[0] as string };
  }
}
