import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import * as i18n from "./src/config/i18n";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
import pagefind from "astro-pagefind";
import icon from "astro-icon";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "rehype-toc";

const { SITE_URL, SITE_BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const URL = import.meta.env.DEV ? `http://localhost:${PORT}` : SITE_URL ?? "https://www.daliborhon.dev/";
console.log(`Using SITE_URL: '${URL}'`);
console.log(`Using SITE_BASE: '${SITE_BASE === undefined ? "/" : SITE_BASE}'`);

// https://astro.build/config
export default defineConfig({
    site: URL,
    base: SITE_BASE,
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    prefetch: true,
    markdown: {
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }], [rehypeToc, { headings: ["h1", "h2", "h3"] }]],
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: "material-theme-palenight",
        },
    },
    i18n: {
        defaultLocale: i18n.defaultLocale,
        locales: i18n.locales,
        routing: {
            prefixDefaultLocale: false,
        },
    },
    integrations: [
        react(),
        sitemap({
            i18n: {
                defaultLocale: i18n.defaultLocale,
                // All urls that don't contain `es` or `fr` after `https://stargazers.club/` will be treated as default locale, i.e. `en`
                locales: {
                    ...i18n.localeKeys,
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
            },
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
