import type { AstroIntegration } from "astro";
import { defaultLocale, config } from "./config.js";
import { getDtsContent } from "./typegen.js";
import { createVitePlugins, viteI18nRuntimePluginName } from "./virtual.js";

const astroI18nConfigPaths = Object.values(config.locales).map(({ path, codes }) => ({ path, codes }));

const paraglideScript = `
import { defineGetLocale } from "${viteI18nRuntimePluginName}";
defineGetLocale(() => document.documentElement.lang);
`;

export function astroI18nIntegration(): AstroIntegration {
	return {
		name: "astro-i18n",
		hooks: {
			"astro:config:setup": ({ updateConfig, addMiddleware, injectScript, logger }) => {
				updateConfig({
					i18n: {
						defaultLocale: defaultLocale,
						locales: [...astroI18nConfigPaths],
						routing: "manual",
					},
					vite: {
						plugins: [...createVitePlugins()],
					},
				});

				addMiddleware({
					entrypoint: "@daliborhon.dev/integrations/astro-i18n/paraglide-middleware",
					order: "pre",
				});

				addMiddleware({
					entrypoint: "@daliborhon.dev/integrations/astro-i18n/i18n-middleware",
					order: "post",
				});

				injectScript("before-hydration", paraglideScript);

				logger.info("Setup done.");
			},

			"astro:config:done": ({ injectTypes }) => {
				injectTypes({
					filename: "virtual.d.ts",
					content: getDtsContent(),
				});
			},
		},
	};
}
