import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            tags: z.array(z.string()).optional(), // Optional for localized files (inherits from EN)
            image: image().optional(),
            link: z.string().url().optional(),
            date: z.date().optional(), // Optional for localized files (inherits from EN)
            featured: z.boolean().default(false),
            inProgress: z.boolean().default(false).optional(),
            draft: z.boolean().default(false).optional(),
        }),
});

const certificationsCollection = defineCollection({
    loader: glob({
        pattern: "**/*.{json,yaml,yml}",
        base: "./src/content/certifications",
    }),
    schema: z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string(), // or date object
        badge: z.string().optional(),
        url: z.string().url().optional(),
        starred: z.boolean().default(false).optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
    certifications: certificationsCollection,
};
