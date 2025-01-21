import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { astroI18nConfigPaths, defaultLocale, localeKeys } from "./i18n.config";
import paraglideAstro from "@inlang/paraglide-astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import iconConfig from "./icons.config";
import node from "@astrojs/node";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";
import rehypeExtenalLinks from "rehype-external-links";
import rehypeFigure from "@microflash/rehype-figure";
import runtimeLogger from "@inox-tools/runtime-logger";
import db from "@astrojs/db";

import tailwind from "@astrojs/tailwind";

const envVars = {
	OA_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
	OA_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
	OA_ALLOWED_DOMAINS: envField.string({ context: "server", access: "secret", optional: true }),
	GITHUB_API_AUTH_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	HCAPTCHA_KEY: envField.string({ context: "client", access: "public", default: "50b2fe65-b00b-4b9e-ad62-3ba471098be2" }),
	CONTACT_FORM_ACCESS_KEY: envField.string({ context: "server", access: "public", default: "7d81d4b3-a54e-4341-9544-2553a5aa4daf" }),
	PREVIEW: envField.boolean({ context: "client", access: "public", default: false }),
	APP_VERSION_NAME: envField.string({ context: "client", access: "public", optional: true }),
	//ASTRO_DB_REMOTE_URL: envField.string({ context: "server", access: "secret", optional: false }),
	//ASTRO_DB_APP_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
};

const { NODE_ENV, PREVIEW } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const DEV_ENV = NODE_ENV !== "production";
const SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://daliborhon.dev";

console.log(`CONFIG >> Using environment: '${NODE_ENV}'`);
console.log(`CONFIG >> Using SITE_URL: '${SITE_URL}'`);
console.log(`CONFIG >> Using PORT: '${PORT}'`);
console.log(`CONFIG >> Using PREVIEW: '${PREVIEW}'`);

// https://astro.build/config
// @ts-check
export default defineConfig({
	site: SITE_URL,
	build: {
		format: "directory",
	},
	adapter: node({
		mode: "standalone",
	}),
	prefetch: {
		defaultStrategy: "hover",
	},
	env: {
		schema: envVars,
	},
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					content: {
						type: "element",
						tagName: "span",
						properties: { className: ["heading-link-icon"] },
						children: [],
					},
				},
			],
			[rehypeToc, { headings: ["h2", "h3", "h4", "h5", "h6"] }],
			[
				rehypeExtenalLinks,
				{
					content: {
						type: "element",
						tagName: "i",
						children: [],
					},
					contentProperties: { className: ["external-link-icon"] },
					target: "_blank",
					rel: "nofollow noopener noreferrer",
				},
			],
			rehypeFigure,
		],
		shikiConfig: {
			// Choose from Shiki's built-in themes (or add your own)
			// https://github.com/shikijs/shiki/blob/main/docs/themes.md
			theme: "material-theme-palenight",
		},
	},
	i18n: {
		defaultLocale: defaultLocale,
		locales: [...astroI18nConfigPaths],
		routing: "manual",
	},
	integrations: [
		runtimeLogger(),
		db(),
		react(),
		expressiveCode(),
		mdx(),
		pagefind(),
		sitemap({
			i18n: {
				defaultLocale: defaultLocale,
				locales: {
					...localeKeys,
				},
			},
			filter: (page) => {
				return !page.includes("404");
			},
		}),
		icon({
			...iconConfig,
		}),
		paraglideAstro({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		tailwind({ nesting: true }),
	],
	vite: {
		server: {
			port: PORT,
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
