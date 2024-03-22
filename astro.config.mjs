import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { locales, localeKeys, defaultLocale } from "./src/i18n/config";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import { imageService } from "@unpic/astro/service";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import paraglide from "@inlang/paraglide-js-adapter-astro";

const { SITE_URL, SITE_BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const URL = import.meta.env.DEV ? `http://localhost:${PORT}` : SITE_URL ?? "https://www.daliborhon.dev/";

console.log(`Using SITE_URL: '${URL}'`);
console.log(`Using SITE_BASE: '${SITE_BASE === undefined ? "/" : SITE_BASE}'`);

// https://astro.build/config
export default defineConfig({
    site: URL,
    base: SITE_BASE,
    trailingSlash: "never",
    build: {
        format: "file",
    },
    image: {
        domains: ["assets.caisy.io"],
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
        locales: locales,
        routing: {
            prefixDefaultLocale: false,
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
            filter: (page) => page !== `'${URL}admin'`,
        }),
        pagefind(),
        icon({
            iconDir: "src/assets/icons",
            include: {
                bi: ["*"],
                devicon: ["*"],
                tabler: ["error-404"],
                heroicons: ["chevron-down"],
            },
        }),
        tailwind(),
        paraglide({
            project: "./project.inlang",
            outdir: "./src/paraglide",
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
    output: "hybrid",
    adapter: cloudflare({
        imageService: "compile",
        runtime: {
            type: "pages",
            mode: "local",
        },
    }),
});
