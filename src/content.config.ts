import { defineCollection, reference, z } from "astro:content";
import { locales } from "@i18n-config";
import { glob } from "astro/loaders";

const isDevOrPreview = import.meta.env.DEV ? true : import.meta.env.PREVIEW ? true : false;
const path = isDevOrPreview ? "dev" : "prod";
console.log(`Content config -> using ${path} as path (ENV -> preview: ${import.meta.env.PREVIEW}, dev: ${import.meta.env.DEV}).`);

// Define a `type` and `schema` for each collection
const posts = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: `./src/content/${path}/posts` }),
	schema: () =>
		z.object({
			translationKey: z.string(),
			title: z.string(),
			pubDate: z.coerce.date(),
			modDate: z.coerce.date().or(z.string()).optional(),
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
const tags = defineCollection({
	loader: glob({ pattern: "**/[^_]*.yaml", base: `./src/content/${path}/tags` }),
	schema: z.object({
		id: z.string(),
		languages: z.object({
			cs: z.string(),
			en: z.string(),
		}),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: `./src/content/${path}/projects` }),
	schema: () =>
		z.object({
			title: z.string(),
			language: z.enum(locales as [string, ...string[]], {
				errorMap: () => ({
					message: "Please select the correct locale!",
				}),
			}),
			sourceUrl: z.string(),
			startDate: z.coerce.date(),
			image: z.string(),
			tags: z.array(reference("projectTags")),
			active: z.boolean().default(true),
		}),
});

const projectTags = defineCollection({
	loader: glob({ pattern: "**/[^_]*.yaml", base: `./src/content/${path}/project-tags` }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		bgColor: z.string(),
	}),
});

const resume = defineCollection({
	loader: glob({ pattern: "**/[^_]*.md", base: `./src/content/${path}/resume` }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		currentPosition: z.string(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
	posts,
	tags,
	projects,
	projectTags,
	resume,
};
