import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Santiago Crivellaro'),
  }),
});

export const collections = { blog };
