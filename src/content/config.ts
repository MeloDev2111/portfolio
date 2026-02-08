import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content', // v2.5.0+ ; 'content' for markdown/mdx
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: image().optional(),
        link: z.string().url().optional(),
        date: z.date(),
        featured: z.boolean().default(false),
    }),
});

const certificationsCollection = defineCollection({
    type: 'data', // JSON/YAML
    schema: z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string(), // or date object
        badge: z.string().optional(),
        url: z.string().url().optional(),
    })
});

export const collections = {
    projects: projectsCollection,
    certifications: certificationsCollection,
};
