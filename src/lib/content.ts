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
