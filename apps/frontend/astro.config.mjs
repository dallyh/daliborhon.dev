import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import paraglide from "@inlang/paraglide-js-adapter-astro";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import { defaultLocale, localeKeys, astroI18nConfigPaths } from "shared/frontend/i18n";
import { sanityWorkspaces, currentApiVersion } from "shared/studio";

const { CF_PAGES_BRANCH } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const SANITY_DATASET = import.meta.env.DEV ? sanityWorkspaces.defaultWorkspace.getDevDataset() : sanityWorkspaces.defaultWorkspace.getProdDataset();

// Construct URL on Cloudflare build
// https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
let SITE_URL = import.meta.env.DEV ? `http://localhost:${PORT}` : "https://www.daliborhon.dev/";
if (CF_PAGES_BRANCH && CF_PAGES_BRANCH.startsWith("dev")) {
    SITE_URL = `https://${CF_PAGES_BRANCH}.daliborhon-dev.pages.dev`;
}
console.log(`> Using SITE_URL: '${SITE_URL}'`);



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
        domains: ["assets.caisy.io", "astro.badg.es"],
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
            projectId: sanityWorkspaces.defaultWorkspace.projectId,
            dataset: SANITY_DATASET,
            useCdn: false,
            apiVersion: currentApiVersion,
            perspective: import.meta.env.DEV ? "previewDrafts" : "published",
        }),
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
