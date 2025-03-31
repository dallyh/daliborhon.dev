import { defineCollection, reference, z } from "astro:content";
import { locales } from "@paraglide/runtime";
import { type Loader, type LoaderContext, file, glob } from "astro/loaders";

// Define a `type` and `schema` for each collection
const posts = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./content/posts` }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.coerce.date(),
			modDate: z.coerce.date().or(z.string()).nullable(),
			draft: z.boolean().optional().default(true),
			description: z.string(),
			featured: z.boolean().default(false).optional(),
			locale: z.enum(locales, {
				errorMap: () => ({
					message: "Please select the correct locale!",
				}),
			}),
			image: image().or(z.string().url()).optional(),
			tags: z.array(reference("tags")),
		}),
});

const tags = defineCollection({
	loader: file(`./content/tags.yaml`),
	schema: z.object({
		id: z.string(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./content/projects` }),
	schema: () =>
		z.object({
			title: z.string(),
			locale: z.enum(locales, {
				errorMap: () => ({
					message: "Please select the correct locale!",
				}),
			}),
			sourceUrl: z.string(),
			startDate: z.coerce.date(),
			tags: z.array(reference("projectTags")),
			active: z.boolean().default(true),
		}),
});

const projectTags = defineCollection({
	loader: file(`./content/project-tags.yaml`),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		bgColor: z.string(),
	}),
});

const resume = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./content/resume` }),
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

function ghLanguagesLoader(): Loader {
	return {
		name: "gh-lang-loader",
		load: async ({ store, logger, parseData, generateDigest }: LoaderContext) => {
			logger.info("Loading github language colors...");

			const response = await fetch("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
			const data: LanguageColor = await response.json();
			const langs = Object.keys(data).map((key) => ({
				id: key,
				color: data[key].color,
			}));

			for (const item of langs) {
				const data = await parseData({
					id: item.id,
					data: {
						color: item.color,
					},
				});

				const digest = generateDigest(data);

				store.set({
					id: item.id,
					data: data,
					digest: digest,
				});
			}
		},
	};
}

const githubLanguages = defineCollection({
	loader: ghLanguagesLoader(),
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
