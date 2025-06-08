import { i18n } from "astro:config/server";
import { type Locale, baseLocale, locales } from "@paraglide/runtime";

export function removeTrailingSlash(url: string) {
	return url.replace(/\/$/, "");
}

export function getRoutingLocale(locale: string | undefined) {
	if (typeof i18n?.routing === "object" && i18n.routing.prefixDefaultLocale === false) {
		if (locale === baseLocale) {
			return undefined;
		}
	}

	return locale;
}

export function getDefaultLocale(locale: string | undefined) {
	if (locale === undefined) {
		return baseLocale;
	}

	return locale;
}

export function getPathFromUrl(url: URL, baseUrl: string) {
	const pathname = url.pathname;
	const baseUrlWithoutTrailingSlash = removeTrailingSlash(baseUrl);
	let pathNameWithoutBaseUrl = baseUrl === "/" ? pathname : pathname.replace(baseUrlWithoutTrailingSlash, "");

	const segments = pathname?.split("/");
	const possibleLocale = segments.find((segment) => locales.includes(segment as Locale)) as Locale | undefined;

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
