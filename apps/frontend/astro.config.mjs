import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { astroI18nConfigPaths, defaultLocale, localeKeys } from "@daliborhon.dev/shared/frontend/i18n";
import { CURRENT_API_VERSION, defaultWorkspace } from "@daliborhon.dev/studio/workspaces";
import paraglide from "@inlang/paraglide-js-adapter-astro";
import sanity from "@sanity/astro";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import expressiveCode from "astro-expressive-code";

const { CF_PAGES_BRANCH } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const DEV_ENV = import.meta.env.DEV;
const PREVIEW_BUILD = CF_PAGES_BRANCH && CF_PAGES_BRANCH.startsWith("dev");

let SITE_URL = DEV_ENV ? `http://localhost:${PORT}` : "https://www.daliborhon.dev/";
let SANITY_PERSPECTIVE = DEV_ENV ? "previewDrafts" : "published";
let SANITY_DATASET = DEV_ENV ? defaultWorkspace.getDevDataset() : defaultWorkspace.getProdDataset();

if (PREVIEW_BUILD) {
    SITE_URL = `https://${CF_PAGES_BRANCH}.daliborhon-dev.pages.dev`;
    SANITY_PERSPECTIVE = "previewDrafts";
}

console.log(`>> Using PREVIEW_BUILD: '${PREVIEW_BUILD}'`);
console.log(`>> Using SITE_URL: '${SITE_URL}'`);
console.log(`>> Using SANITY_PERSPECTIVE: '${SANITY_PERSPECTIVE}'`);
console.log(`>> Using SANITY_DATASET: '${SANITY_DATASET}'`);

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    output: "hybrid",
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
            perspective: import.meta.env.DEV ? "previewDrafts" : "published",
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
