import type { AstroIntegration } from "astro";
import { defaultLocale, config } from "./config.js";
import sitemap from "@astrojs/sitemap";

const localeKeys = Object.fromEntries(Object.entries(config.locales).map(([key, value]) => [key, value.path]));
const astroI18nConfigPaths = Object.values(config.locales).map(({ path, codes }) => ({ path, codes }));

const paraglideScript = `
import { defineGetLocale } from "@daliborhon.dev/integrations/astro-i18n/runtime";
defineGetLocale(() => document.documentElement.lang);
`;

export function astroi18nIntegration(): AstroIntegration {
	return {
		name: "astro-paraglide-i18n",
		hooks: {
			"astro:config:setup": ({ updateConfig, addMiddleware, injectScript, logger }) => {
				updateConfig({
					i18n: {
						defaultLocale: defaultLocale,
						locales: [...astroI18nConfigPaths],
						routing: "manual",
					},
					/*integrations: [
						sitemap({
							i18n: {
								defaultLocale: defaultLocale,
								locales: {
									...localeKeys,
								},
							},
						}),
					],*/
				});
				logger.info("Config updated...");
				addMiddleware({
					entrypoint: "@daliborhon.dev/integrations/astro-i18n/paraglide-middleware",
					order: "pre",
				});
				logger.info("Added paraglide-middleware...");
				addMiddleware({
					entrypoint: "@daliborhon.dev/integrations/astro-i18n/i18n-middleware",
					order: "post",
				});
				logger.info("Added i18n-middleware...");
				injectScript("before-hydration", paraglideScript);
				logger.info("Injected i18n script...");

				logger.info("Complete!");
			},
		},
	};
}
