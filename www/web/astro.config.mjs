//@ts-check
import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { astroI18nIntegration } from "@daliborhon.dev/integrations";
import { Logger } from "@daliborhon.dev/integrations";
import { remarkAsidesIntegration } from "@daliborhon.dev/integrations";
import { createI18nSitemapConfig } from "@daliborhon.dev/integrations/i18n";
//@ts-ignore missing types
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
import iconConfig from "./icons.config";

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

const { NODE_ENV, PREVIEW } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const PORT = 4321;
const DEV_ENV = NODE_ENV !== "production";
const SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://daliborhon.dev";

logger.info(`Using ENVIRONMENT: '${NODE_ENV}'`);
logger.info(`Using SITE_URL: '${SITE_URL}'`);
logger.info(`Using PORT: '${PORT}'`);
logger.info(`Using PREVIEW: '${PREVIEW}'`);

//https://astro.build/config
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
	integrations: [
		astroI18nIntegration(),
		db(),
		react(),
		remarkAsidesIntegration(),
		expressiveCode(),
		mdx(),
		pagefind(),
		icon({
			...iconConfig,
		}),
		sitemap(createI18nSitemapConfig()),
	],
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
