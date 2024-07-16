import { defineCollection, reference, z } from "astro:content";
import { locales } from "@i18n-config";

// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			translationKey: z.string(),
			title: z.string(),
			pubDate: z.date(),
			modDate: z.date().or(z.string()).optional(),
			hidden: z.boolean().optional(),
			description: z.string(),
			featured: z.boolean().default(false).optional(),
			language: z.enum(locales as [string, ...string[]], {
				errorMap: () => ({
					message: "Please select the correct locale!",
				}),
			}),
			image: z
				.object({
					src: z.string(),
					alt: z.string(),
				})
				.or(z.string())
				.optional(),
			tags: z.array(reference("tags")),
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
			sourceUrl: z.string(),
			startDate: z.date(),
			image: z.string(),
			tags: z.array(reference("project-tags")),
			active: z.boolean().default(true),
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

const resumeCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		currentPosition: z.string(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
	posts: postsCollection,
	tags: tagsCollection,
	projects: projectsCollection,
	"project-tags": projectTagsCollection,
	resume: resumeCollection,
};
