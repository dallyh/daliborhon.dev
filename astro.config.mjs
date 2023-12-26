import { defineConfig } from "astro/config";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// i18n
const defaultLocale = "cs";
const locales = {
    en: "en",
    cs: "cs",
};

// https://astro.build/config
export default defineConfig({
    site: "https://www.daliborhon.dev",
    base: "",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    prefetch: true,
    integrations: [
        react(),
        i18n({
            locales,
            defaultLocale,
            exclude: ["pages/[...lang]/**/*", "pages/api/**/*", "pages/rss.xml.ts", "pages/[locale]/rss.xml.ts"],
        }),
        sitemap({
            i18n: {
                locales,
                defaultLocale,
            },
            filter: filterSitemapByDefaultLocale({
                defaultLocale,
            }),
        }),
    ],
});
