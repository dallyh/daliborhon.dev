import { locales } from "@config/i18n";
import { defineCollection, reference, z } from "astro:content";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            postId: z.string(),
            pubDateTime: z.date(),
            modDatetime: z.date().or(z.string()).optional(),
            hidden: z.boolean().optional(),
            description: z.string(),
            featured: z.boolean().default(false).optional(),
            language: z.enum(locales as [string, ...string[]], {
                errorMap: () => ({
                    message: "Please select the correct locale!",
                }),
            }),
            author: z.string().default("Dalibor Hon"),
            ogImage: image()
                .refine((img) => img.width >= 1200 && img.height >= 630, {
                    message: "OpenGraph image must be at least 1200 X 630 pixels!",
                })
                .or(z.string())
                .optional(),
            tags: z.array(reference("tags")),
            category: reference("categories").optional(),
            canonicalURL: z.string().optional(),
        }),
});

// TO-DO: Find a way to do this automatically with locales.map...
const tagsCollection = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string(),
        languages: z.object({
            cs: z.string(),
            en: z.string(),
        }),
    }),
});

// TO-DO: Find a way to do this automatically with locales.map...
const categoryCollection = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string(),
        languages: z.object({
            cs: z.object({ title: z.string(), description: z.string() }),
            en: z.object({ title: z.string(), description: z.string() }),
        }),
    }),
});

const projectsCollection = defineCollection({
    type: "content",
    schema: () =>
        z.object({
            title: z.string(),
            language: z.enum(locales as [string, ...string[]], {
                errorMap: () => ({
                    message: "Please select the correct locale!",
                }),
            }),
            href: z.string(),
            projectStartDate: z.date(),
            image: z.string(),
            projectTags: z.array(reference("project-tags")),
        }),
});

const projectTagsCollection = defineCollection({
    type: "data",
    schema: z.object({
        id: z.string(),
        title: z.string(),
        bgColor: z.string(),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
    tags: tagsCollection,
    categories: categoryCollection,
    projects: projectsCollection,
    "project-tags": projectTagsCollection,
};
