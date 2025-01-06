import { getCollection } from 'astro:content';

import type { BlogPost } from 'types/blog';

export async function getSortedPosts() {
  const posts = await getCollection('blog');

  // 按日期排序
  const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return sortedPosts;
}

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
  const countMap: { [key: string]: number } = {};
  const resCategories: Category[] = [];
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
        const count = countMap[name] ? countMap[name] + 1 : 1;
        countMap[name] = count;
        if (j === 0) {
          addCategoryRecursively(resCategories, [], name);
        } else {
          const parentNames = categories[0].slice(0, j);
          addCategoryRecursively(resCategories, parentNames, name);
        }
      }
    } else {
      // categories[0] = '工具'
      addCategoryRecursively(resCategories, [], categories[0] as string);
    }
  }
  // console.log('countMap', JSON.stringify(countMap));
  // console.log('resCategories', JSON.stringify(resCategories, null, 2));
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
