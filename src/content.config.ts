import { defineCollection, reference, z } from "astro:content";
import { locales } from "@i18n-config";
import { getDevOrProdContentPath } from "@utils";
import { glob } from "astro/loaders";

const path = getDevOrProdContentPath();
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
	loader: glob({ pattern: "**/[^_]*.mdx", base: `./src/content/${path}/resume` }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		currentPosition: z.string(),
	}),
});

type LanguageColor = {
	[key: string]: {
		color: string; // A string representing a color (e.g., a hex code)
		url: string; // A string representing a valid URL
	};
};

const githubLanguages = defineCollection({
	loader: async () => {
		console.log("Loading github language colors...");
		const response = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
		const data: LanguageColor = await response.json();
		const langs = Object.keys(data).map((key) => ({
			id: key,
			color: data[key].color,
		}));
		return langs;
	},
	schema: z.object({
		color: z.string().nullable(),
	}),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
	posts,
	tags,
	projects,
	projectTags,
	resume,
	githubLanguages,
};
