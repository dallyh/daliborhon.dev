import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import * as i18n from "./src/i18n/config";

// https://astro.build/config
export default defineConfig({
    site: "https://www.daliborhon.dev",
    base: "",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    prefetch: true,
    markdown: {
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
    integrations: [react()],
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
});
