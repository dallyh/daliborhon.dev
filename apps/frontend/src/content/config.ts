import { defineCollection, z } from "astro:content";

const resumeCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        currentPosition: z.string(),
    }),
});

export const collections = {
    resume: resumeCollection,
};
