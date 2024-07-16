import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { astroI18nConfigPaths, defaultLocale, localeKeys } from "./i18n.config";
import paraglide from "@inlang/paraglide-astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";
import iconConfig from "./icons.config";
import node from "@astrojs/node";
// Default config
const { NODE_ENV } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const DEV_ENV = NODE_ENV !== "production";
const SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://zo.daliborhon.dev";

console.log(`>> Using environment: '${NODE_ENV}'`);
console.log(`>> Using SITE_URL: '${SITE_URL}'`);
console.log(`>> Using PORT: '${PORT}'`);

const envVars = {
	OA_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
	OA_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
	OA_ALLOWED_DOMAINS: envField.string({ context: "server", access: "secret", optional: true }),
	GITHUB_API_AUTH_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	HCAPTCHA_KEY: envField.string({ context: "client", access: "public", default: "50b2fe65-b00b-4b9e-ad62-3ba471098be2" }),
	CONTACT_FORM_ACCESS_KEY: envField.string({ context: "server", access: "public", default: "7d81d4b3-a54e-4341-9544-2553a5aa4daf" }),
};

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: "hybrid",
	build: {
		format: "directory",
	},
	adapter: node({
		mode: "standalone",
	}),
	prefetch: {
		defaultStrategy: "hover",
	},
	markdown: {
		rehypePlugins: [
			"rehype-slug",
			["rehype-autolink-headings", { behavior: "append" }],
			["rehype-toc", { headings: ["h2", "h3", "h4", "h5", "h6"] }],
			[
				"rehype-external-links",
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
		react(),
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
		pagefind(),
		icon({
			...iconConfig,
		}),
		tailwind(),
		paraglide({
			project: "./src/project.inlang",
			outdir: "./src/paraglide",
		}),
		expressiveCode(),
	],
	vite: {
		server: {
			port: PORT,
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	experimental: {
		env: {
			schema: envVars,
		},
	},
});
