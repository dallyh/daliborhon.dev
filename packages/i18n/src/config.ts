export const config = {
	locales: {
		cs: {
			path: "cs",
			codes: ["cs", "cs-CZ", "sk", "sk-SK"],
			title: "Čeština",
		},
		en: {
			path: "en",
			codes: ["en", "en-GB", "en-US", "en-CA"],
			title: "English",
		},
	},
	defaultLocale: "cs",
	localeCookie: {
		name: "redirected-locale",
		expDays: 60,
	},
} as const;

export const defaultLocale = config.defaultLocale;
export const locales = ["cs", "en"] as const;
export const localeKeys = Object.fromEntries(Object.entries(config.locales).map(([key, value]) => [key, value.path]));
export const astroI18nConfigPaths = Object.values(config.locales).map(({ path, codes }) => ({ path, codes }));
export type AllowedLocales = keyof typeof config.locales;
