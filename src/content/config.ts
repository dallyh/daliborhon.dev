import { locales } from "@config/i18n";
import { defineCollection, reference, z } from "astro:content";

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
    categories: categoryCollection,
    projects: projectsCollection,
    "project-tags": projectTagsCollection,
};
