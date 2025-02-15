import { type AllowedLocales, defaultLocale, locales } from "./config.js";

export function removeTrailingSlash(url: string) {
	return url.replace(/\/$/, "");
}

export function getRoutingLocale(locale: string | undefined) {
	/*
    // Use in case of prefixDefaultLocale = false in config :)
    if (locale === defaultLocale) {
        return undefined;
    }
    */

	return locale;
}

export function getDefaultLocale(locale: string | undefined) {
	if (locale === undefined) {
		return defaultLocale;
	}

	return locale;
}

export function getPathFromUrl(url: URL, baseUrl: string) {
	const pathname = url.pathname;
	const baseUrlWithoutTrailingSlash = removeTrailingSlash(baseUrl);
	let pathNameWithoutBaseUrl = baseUrl === "/" ? pathname : pathname.replace(baseUrlWithoutTrailingSlash, "");

	const segments = pathname?.split("/");
	const possibleLocale = segments.find((segment: AllowedLocales | undefined) => locales.includes(segment)) as AllowedLocales | undefined;

	// First check if we are on default locale
	if (possibleLocale && locales.includes(possibleLocale)) {
		pathNameWithoutBaseUrl = pathNameWithoutBaseUrl.substring(3, pathname.length);
	}

	return pathNameWithoutBaseUrl;
}

// i18n routing
export async function getStaticPaths() {
	const paths = locales.map((locale) => {
		return { params: { lang: getRoutingLocale(locale) }, props: { lang: locale } };
	});

	return paths;
}

export function checkValidSSRLangPath(lang: string | undefined) {
	if (!lang) {
		return false;
	}

	const isAllowedLocale = locales.find((loc) => {
		return loc === lang;
	});

	if (!isAllowedLocale) {
		return false;
	}

	return true;
}
