import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import paraglideAstro from "@inlang/paraglide-astro";
//@ts-ignore
import rehypeFigure from "@microflash/rehype-figure";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig, envField } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExtenalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import { loadEnv } from "vite";
import { astroI18nConfigPaths, defaultLocale, localeKeys } from "./i18n.config";
import iconConfig from "./icons.config";
import Logger from "./src/utils/logger";

const logger = new Logger("astro-config");

const envVars = {
	OA_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
	OA_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
	OA_ALLOWED_DOMAINS: envField.string({ context: "server", access: "secret", optional: true }),
	GITHUB_API_AUTH_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	HCAPTCHA_KEY: envField.string({ context: "client", access: "public", default: "50b2fe65-b00b-4b9e-ad62-3ba471098be2" }),
	CONTACT_FORM_ACCESS_KEY: envField.string({ context: "server", access: "public", default: "7d81d4b3-a54e-4341-9544-2553a5aa4daf" }),
	PREVIEW: envField.boolean({ context: "client", access: "public", default: false }),
	APP_VERSION_NAME: envField.string({ context: "client", access: "public", optional: true }),
	UPTIME_API_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
};

const { NODE_ENV, PREVIEW } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");
const PORT = 4321;
const DEV_ENV = NODE_ENV !== "production";
const SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://daliborhon.dev";

logger.info(`Using environment: '${NODE_ENV}'`);
logger.info(`Using SITE_URL: '${SITE_URL}'`);
logger.info(`Using PORT: '${PORT}'`);
logger.info(`Using PREVIEW: '${PREVIEW}'`);

// https://astro.build/config
// @ts-check
export default defineConfig({
	experimental: {
		serializeConfig: true,
	},
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
		// @ts-ignore
		defaultLocale: defaultLocale,
		// @ts-ignore
		locales: [...astroI18nConfigPaths],
		routing: "manual",
	},
	integrations: [
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
	],
	vite: {
		server: {
			port: PORT,
			watch: {
				ignored: ["./src/paraglide/messages/**", "./project.inlang/cache/**", "./messages/**"],
			},
		},
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
