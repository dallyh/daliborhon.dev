import { z, defineCollection } from "astro:content";
import { locales } from "@i18n/config";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            postId: z.string(),
            pubDateTime: z.date(),
            modDatetime: z.date().optional(),
            draft: z.boolean().optional(),
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
            tags: z.array(z.string()),
            canonicalURL: z.string().optional(),
        }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
    posts: postsCollection,
};