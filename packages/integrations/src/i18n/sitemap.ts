import { config, defaultLocale } from "./config.js";

const localeKeys = Object.fromEntries(Object.entries(config.locales).map(([key, value]) => [key, value.path]));

export function createI18nSitemapConfig() {
	const sitemapConfig = {
		i18n: {
			defaultLocale: defaultLocale,
			locales: {
				...localeKeys,
			},
		},
	};

	return sitemapConfig;
}
