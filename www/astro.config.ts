import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import aiRobotsTxt from "astro-ai-robots-txt";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { loadEnv } from "vite";
import ecConfig from "./ec.config";
import envVars from "./env.config";
import iconConfig from "./icons.config";
import { Logger } from "./src/utils/logger";

const logger = new Logger("astro-config");

const { NODE_ENV, PREVIEW, PORT, SITE } = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const SERVER_PORT = PORT ?? 4321;
const SITE_URL = NODE_ENV !== "production" ? `http://localhost:${SERVER_PORT}` : SITE;

logger.info(`Using ENVIRONMENT: '${NODE_ENV}'`);
logger.info(`Using SITE_URL: '${SITE_URL}'`);
logger.info(`Using PORT: '${SERVER_PORT}'`);
logger.info(`Using PREVIEW: '${PREVIEW}'`);

if (!SITE_URL) {
	throw Error("Please provide the correct SITE environment variable.");
}

//https://astro.build/config
export default defineConfig({
	experimental: {
		preserveScriptOrder: true,
		headingIdCompat: true,
		contentIntellisense: true,
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: "JetBrains Mono",
				cssVariable: "--font-jetbrains-mono",
				subsets: ["latin", "latin-ext"],
				weights: ["100 800"],
			},
		],
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
		plugins: [
			//@ts-ignore what's up with the types?
			tailwindcss(),
			//@ts-ignore what's up with the types?
			paraglideVitePlugin({
				project: "./project.inlang",
				outdir: "./src/paraglide",
			}),
		],
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
