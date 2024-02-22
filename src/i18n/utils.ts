import { defaultLocale, locales, type AllowedLocales } from "@config/i18n";
import { removeTrailingSlash } from "@utils";

export function getLocale(url: URL): AllowedLocales {
    const pathSegments = url.pathname.split("/");

    // Find the first valid language code in the path
    const lang = pathSegments.find((segment) => locales.includes(segment));

    // Return the found language or the default locale if none is found
    const locale = lang || defaultLocale;
    return locale as AllowedLocales;
}

export function getRoutingLocale(locale: string | undefined) {
    if (locale === defaultLocale) {
        return undefined;
    }

    return locale;
}

export function getDefaultLocale(locale: string | undefined) {
    if (locale === undefined) {
        return defaultLocale;
    }

    return locale;
}

export function getPathFromUrl(url: URL) {
    const pathname = url.pathname;
    const baseUrl = import.meta.env.BASE_URL;
    const baseUrlWithoutTrailingSlash = removeTrailingSlash(baseUrl);
    let pathNameWithoutBaseUrl = baseUrl === "/" ? pathname : pathname.replace(baseUrlWithoutTrailingSlash, "");

    const segments = pathname?.split("/");
    const possibleLocale = segments.find((segment) => locales.includes(segment));

    // First check if we are on default locale
    if (possibleLocale !== undefined && locales.includes(possibleLocale)) {
        pathNameWithoutBaseUrl = pathNameWithoutBaseUrl.substring(3, pathname.length);
    }

    return pathNameWithoutBaseUrl;
}

// i18n routing
export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        return { params: { lang: getRoutingLocale(locale) } };
    });

    return paths;
}
