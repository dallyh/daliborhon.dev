import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { astroI18nConfigPaths, defaultLocale, localeKeys } from "@daliborhon.dev/shared/frontend/i18n";
import { CURRENT_API_VERSION, defaultWorkspace } from "@daliborhon.dev/studio/workspaces";
import paraglide from "@inlang/paraglide-astro";
import sanity from "@sanity/astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { CF_PAGES_BRANCH, NODE_ENV, BUILD_DEV_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const DEV_ENV = NODE_ENV !== "production";
const PREVIEW_BUILD = CF_PAGES_BRANCH && CF_PAGES_BRANCH.startsWith("dev");

let SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://www.daliborhon.dev/";
let SANITY_PERSPECTIVE = DEV_ENV ? "previewDrafts" : "published";
let SANITY_DATASET = DEV_ENV ? defaultWorkspace.getDevDataset() : BUILD_DEV_DATASET ? defaultWorkspace.getDevDataset() : defaultWorkspace.getProdDataset();

// First on every new post a new build is triggered for previewing with webhooks.
// Production deployment is done manually by me.
if (PREVIEW_BUILD) {
	SITE_URL = `https://${CF_PAGES_BRANCH}.daliborhon-dev.pages.dev`;
	SANITY_PERSPECTIVE = "previewDrafts";
}

console.log(`>> Building for environment: '${NODE_ENV}'`);
console.log(`>> Using PREVIEW_BUILD: '${PREVIEW_BUILD ?? false}'`);
console.log(`>> Using SITE_URL: '${SITE_URL}'`);
console.log(`>> Using SANITY_PERSPECTIVE: '${SANITY_PERSPECTIVE}'`);
console.log(`>> Using SANITY_DATASET: '${SANITY_DATASET}'`);

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: "hybrid",
	trailingSlash: "ignore",
	build: {
		// Format has to be set to file because of this:
		// https://developers.cloudflare.com/pages/configuration/serving-pages/#not-found-behavior
		format: "file",
	},
	adapter: cloudflare({
		imageService: "compile",
		runtime: {
			type: "pages",
			mode: "local",
		},
	}),
	image: {
		domains: ["cdn.sanity.io", "astro.badg.es"],
		remotePatterns: [
			{
				protocol: "https",
			},
		],
	},
	prefetch: {
		defaultStrategy: "hover",
	},
	i18n: {
		defaultLocale: defaultLocale,
		locales: [...astroI18nConfigPaths],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
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
			iconDir: "src/assets/icons",
			include: {
				bi: ["*"],
				devicon: ["*"],
				heroicons: ["chevron-down"],
			},
		}),
		tailwind(),
		paraglide({
			project: "./project.inlang",
			outdir: "./src/paraglide",
		}),
		sanity({
			projectId: defaultWorkspace.projectId,
			dataset: SANITY_DATASET,
			useCdn: false,
			apiVersion: CURRENT_API_VERSION,
			perspective: SANITY_PERSPECTIVE,
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
});
