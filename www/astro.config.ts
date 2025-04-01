import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import aiRobotsTxt from "astro-ai-robots-txt";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import ecConfig from "./ec.config";
import envVars from "./env.config";
import iconConfig from "./icons.config";
import { paraglideIntegration } from "./src/integrations/paraglide-js/integration";
import { Logger } from "./src/utils/logger";

const logger = new Logger("astro-config");

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
		preserveScriptOrder: true,
		headingIdCompat: true,
		contentIntellisense: true,
	},
	site: SITE_URL,
	build: {
		format: "directory",
	},
	adapter: node({
		mode: "standalone",
	}),
	i18n: {
		defaultLocale: "cs",
		locales: [
			{ path: "cs", codes: ["cs", "cs-CZ", "sk", "sk-SK"] },
			{ path: "en", codes: ["en", "en-GB", "en-US", "en-CA"] },
		],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
			fallbackType: "redirect",
		},
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	env: {
		schema: envVars,
	},
	integrations: [
		paraglideIntegration({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		db(),
		react(),
		expressiveCode(ecConfig),
		mdx(),
		pagefind(),
		icon({
			...iconConfig,
		}),
		sitemap({
			i18n: {
				defaultLocale: "cs",
				locales: {
					cs: "cs",
					en: "en",
				},
			},
		}),
		aiRobotsTxt(),
	],
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
