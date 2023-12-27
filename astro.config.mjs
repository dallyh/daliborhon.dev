import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import * as i18n from "./src/i18n/consts"

// https://astro.build/config
export default defineConfig({
    site: "https://www.daliborhon.dev",
    base: "",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    prefetch: true,
    i18n: {
        defaultLocale: i18n.defaultLocale,
        locales: i18n.locales,
        routing: {
            prefixDefaultLocale: false
        }
    },
    integrations: [
        react()
    ],
});
