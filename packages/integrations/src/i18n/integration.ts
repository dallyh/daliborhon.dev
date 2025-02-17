import type { AstroIntegration } from "astro";
import { config, defaultLocale } from "./config.js";
const astroI18nConfigPaths = Object.values(config.locales).map(({ path, codes }) => ({ path, codes }));

const paraglideScript = `
import { defineGetLocale } from "@daliborhon.dev/integrations/i18n/runtime";
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
						routing: {
							prefixDefaultLocale: true,
							redirectToDefaultLocale: false,
							fallbackType: "redirect",
						},
					},
				});

				addMiddleware({
					entrypoint: new URL("./middleware.js", import.meta.url),
					order: "pre",
				});

				injectScript("before-hydration", paraglideScript);

				logger.info("Setup done");
			},
		},
	};
}
