import type { BlogSchema } from 'types/blog';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.any().optional(),
    // 兼容老 Hexo 博客
    subtitle: z.string().optional(),
    catalog: z.boolean().optional(),
  }) satisfies z.ZodType<BlogSchema>,
});

export const collections = {
  blog: blogCollection,
};
