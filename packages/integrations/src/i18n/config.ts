const defaultLocale = "cs" as const;
const locales = ["cs", "en"] as const;

const configuredLocales = {
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
};

const localeCookie = {
	name: "redirected-locale",
	expDays: 60,
};

const config = {
	locales: configuredLocales,
	defaultLocale: defaultLocale,
	localeCookie: localeCookie,
};

type AllowedLocales = keyof typeof configuredLocales;

export { defaultLocale, AllowedLocales, config, locales };
